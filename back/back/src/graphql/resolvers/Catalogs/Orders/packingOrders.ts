import { Resolvers } from '../../../generated'
import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import RacksModel from '../../../../models/Catalogs/Racks/RacksModel'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import sequelize from '../../../../db/connection'

const orderNotFound = 'No se encontro el pedido'
const rackNotFound = 'No se encontro el codigo de rack'
const defaultError = 'Algo salio mal, vuelve a intentar'

const PackingOrdersResolver: Resolvers = {
  Query: {
    getPackingOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: { status_id: 10 },
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
    changeToPacking: async (_, { order_id, rack_code }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const { userId } = context
        const order = await Order.findOne({
          where: {
            id: order_id,
            status_id: 9,
          },
        })
        if (!order) {
          await transaction.rollback()
          return Promise.reject(Error(orderNotFound))
        }
        const rack = await RacksModel.findOne({
          where: {
            code: rack_code,
          },
        })
        if (!rack) {
          await transaction.rollback()
          return Promise.reject(Error(rackNotFound))
        }
        const timeLineCreate = await TimeLineAdd({
          orderId: order.order_id,
          statusId: 10,
          userId: userId,
          transaction,
        })
        if (!timeLineCreate) return Promise.reject(Error(defaultError))
        await order.update(
          {
            status_id: 10,
            user_id: userId,
          },
          { transaction }
        )

        await transaction.commit()
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default PackingOrdersResolver
