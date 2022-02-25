import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { Resolvers } from '../../../generated'

const nationalOrdersResolver: Resolvers = {
  Query: {
    getNationalOrders: async (
      _,
      { searchQuery, limit, offset, platform },
      context
    ) => {
      const clause: any = {
        where: {
          type_id: 1,
        },
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
}

export default nationalOrdersResolver
