import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import Store from '../../../../models/Catalogs/Stores/StoreModel'
import { Resolvers } from '../../../generated'

const inProcessOrdersResolver: Resolvers = {
  Query: {
    getInProcessOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: {},
      }

      if (context.roleId === 4) {
        clause.where[Op.and] = [{ status_id: 2 }, { store_id: context.storeId }]
      } else {
        clause.where = { status_id: 2 }
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
    changeToProcess: async (_, { store_id, order_id }, context) => {
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
          return Promise.reject(Error('No se encontro el pedido'))
        }
        const store = await Store.findOne({
          where: {
            id: store_id,
          },
        })
        if (!store) {
          return Promise.reject(Error('No se encontro la tienda'))
        }

        const timeLineCreate = await TimeLineAdd({
          orderId: order_id,
          userId,
          transaction,
        })
        if (!timeLineCreate)
          return Promise.reject(Error('Algo salio mal, vuelve a intentar'))

        await order.update({
          status_id: 2,
          store_id,
          user_id: userId,
        })
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
  },
}

export default inProcessOrdersResolver
