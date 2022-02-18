import { Op } from 'sequelize';
import Order from '../../../../models/Catalogs/Orders/OrderModel';
import { Resolvers } from '../../../generated';

const nationalOrdersResolver: Resolvers = {
  Query:{
    getNationalOrders: async (_, { searchQuery, limit, offset, platform } ) =>{
      const clause: any = {
        where: {
          [Op.or]: [
            {status_id: 3},
            {status_id: 7},
            {status_id: 8},
            {status_id: 9},
            {status_id: 10}
          ],
          type_id: 1,
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

export default nationalOrdersResolver;