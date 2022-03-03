import { Resolvers } from '../../../generated'
import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import ShippingCompanies from '../../../../models/Catalogs/ShippingCompanies/ShippingCompanies'
import ShippingOrders from '../../../../models/Catalogs/Orders/OrderShippingModel'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import sequelize from '../../../../db/connection'
import { UploadDocument } from '../../../../helpers/UploadFile'
import ApiSapReceiver from '../../../../helpers/ApiSapReceiver'
import OrderInvoice from '../../../../models/Catalogs/Orders/OrderInvoiceModel'
import moment from 'moment'
import PlatformOrderCounter from '../../../../models/Catalogs/Orders/PlatformOrderCounter'

const orderNotFound = 'No se encontro el pedido'
const logisticNotFound = 'No se encontro el empresa de logística'
const defaultError = 'Algo salio mal, vuelve a intentar'

const billingOrdersResolver: Resolvers = {
  Query: {
    getBillingOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: { status_id: 3 },
      }

      if (context.storeId) {
        clause.where.store_id = context.storeId
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      if (platform !== null) {
        clause.where.platform_id = platform
      }

      if (searchQuery) {
        clause.where[Op.or] = [
          // { status_id: { [Op.like]: `%${searchQuery}%` } },
          // { method_id: { [Op.like]: `%${searchQuery}%` } },
        ]
      }

      return await Order.findAndCountAll(clause)
    },
  },
  Mutation: {
    changeToBilling: async (
      _,
      { order_id, shipping_company_id, uploadReceipt },
      context
    ) => {
      const transaction = await sequelize.transaction()
      try {
        const { userId } = context
        const order = await Order.findOne({
          where: {
            id: order_id,
            status_id: 1,
          },
        })
        if (!order) {
          await transaction.rollback()
          return Promise.reject(Error(orderNotFound))
        }
        const shippingCompany = await ShippingCompanies.findOne({
          where: {
            id: shipping_company_id,
          },
        })
        if (!shippingCompany) {
          await transaction.rollback()
          return Promise.reject(Error(logisticNotFound))
        }

        const timeLineCreate = await TimeLineAdd({
          orderId: order.order_id,
          statusId: 3,
          userId: context.userId,
          transaction,
        })
        if (!timeLineCreate) {
          return Promise.reject(Error(defaultError))
        }
        await order.update(
          {
            status_id: 3,
            user_id: userId,
            shipping_company_id,
          },
          { where: { order_id }, transaction }
        )

        // const uploadedReceipt = await UploadDocument({
        //   file: uploadReceipt,
        //   type: 'pdf',
        //   userID: userId,
        //   transaction,
        // })
        //
        // if (!uploadedReceipt) {
        //   return Promise.reject(Error(defaultError))
        // }

        // await ShippingOrders.update(
        //   {
        //     id_file_receipt: uploadedReceipt.id,
        //   },
        //   { where: { order_id }, transaction }
        // )
        await transaction.commit()
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    billingProcess: async (_, { order_id }, context) => {
      try {
        const PrincipalOrder = await Order.findOne({
          where: { id: order_id },
        })
        const counter = await PlatformOrderCounter.findOne({
          where: {
            id: 1,
          },
        })
        const actualOrder = counter!.count || 0
        const newOrder = `${actualOrder + 1}`
        const code = `${moment().format('YYYYMMDD')}PO${newOrder.padStart(
          6,
          '0'
        )}` // PO means Platform Order
        const resp = await ApiSapReceiver([
          {
            key: code,
            name: 'createOrder',
            values: { order_id },
          },
        ])
        counter!.count = actualOrder + 1
        await counter!.save()
        // const data = resp.result
        return resp[0].result.statusCode === 200
        // return data.statusCode === 200
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
}

export default billingOrdersResolver
