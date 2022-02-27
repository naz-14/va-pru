import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import ShippingCompanies from '../../../../models/Catalogs/ShippingCompanies/ShippingCompanies'
import { Resolvers } from '../../../generated'

const orderNotFound = 'No se encontro el pedido'
const logisticNotFound = 'No se encontro el empresa de logística'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const collectOrders: Resolvers = {
  Query: {
    getCollectOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: { status_id: 8 },
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
    changeToCollect: async (_, { order_id, shipping_company_id }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const { userId } = context
        const order = await Order.findOne({
          where: {
            id: order_id,
          },
        })
        if (!order) {
          await transaction.rollback()
          return Promise.reject(Error(orderNotFound))
        }

        if (shipping_company_id) {
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
            statusId: 8,
            userId: userId,
            transaction,
          })

          if (!timeLineCreate) {
            await transaction.rollback()
            return Promise.reject(Error(defaultError))
          }

          await order.update(
            {
              status_id: 8,
              user_id: userId,
              shipping_company_id,
            },
            { transaction }
          )
        } else {
          await order.update(
            {
              status_id: 8,
              user_id: userId,
            },
            { transaction }
          )
        }
        await transaction.commit()
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default collectOrders
