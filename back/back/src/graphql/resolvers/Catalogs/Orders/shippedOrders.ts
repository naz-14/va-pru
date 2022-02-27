import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { Resolvers } from '../../../generated'

const orderNotFound = 'No se encontro el pedido'
const defaultError = 'Algo salio mal, vuelve a intentar'

const shippedOrdersResolver: Resolvers = {
  Query: {
    getShippedOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: { status_id: 11 },
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
    changeToShipped: async (_, { order_id }, context) => {
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

        const timeLineCreate = await TimeLineAdd({
          orderId: order.order_id,
          statusId: 11,
          userId: userId,
          transaction,
        })
        if (!timeLineCreate) return Promise.reject(Error(defaultError))

        await order.update(
          {
            status_id: 11,
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

export default shippedOrdersResolver
