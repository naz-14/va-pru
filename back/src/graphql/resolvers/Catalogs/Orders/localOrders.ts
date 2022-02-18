import { Resolvers } from "../../../generated";
import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'

const localOrdersResolver: Resolvers = {
  Query:{
    getLocalOrders: async (_, { searchQuery, limit, offset, platform } ) =>{
      const clause: any = {
        where: {
          [Op.or]: [
            {status_id: 2},
            {status_id: 6},
            {status_id: 7},
            {status_id: 8}
          ],
          type_id: 2,
        },
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

export default localOrdersResolver;