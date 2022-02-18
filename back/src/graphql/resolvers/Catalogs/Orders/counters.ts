import { Resolvers } from '../../../generated'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { Op } from 'sequelize';

const countersResolver: Resolvers = {
  Query: {
    getAllCounters: async (_, {}, context) => {
      const pendings = await Order.count({
        where: { 
          status_id: 1, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const processing = await Order.count({
        where: { 
          status_id: 2, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const billing = await Order.count({
        where: { 
          status_id: 3, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const localShipping = await Order.count({
        where: { 
          status_id: 4, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const nationalShipping = await Order.count({
        where: { 
          status_id: 5, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const toSupply = await Order.count({
        where: { 
          status_id: 6, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const route = await Order.count({
        where: { 
          status_id: 7, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const collect = await Order.count({
        where: { 
          status_id: 8, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const complete = await Order.count({
        where: { 
          status_id: 11, 
          store_id: context.storeId || null, 
          is_active: true 
        }
      })
      const rejected = await Order.count({
        where: { 
          [Op.or]: [
            {status_id: 12},
            {status_id: 13}
          ],
          store_id: context.storeId || null, 
          is_active: true
        }
      })

      return {
        pendings,
        processing,
        billing,
        toSupply,
        collect,
        route,
        localShipping,
        nationalShipping,
        complete,
        rejected
      }
    },
  },
}

export default countersResolver
