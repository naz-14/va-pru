import { Resolvers } from '../../../generated'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { Op } from 'sequelize'

const countersResolver: Resolvers = {
  Query: {
    getAllCounters: async (_, {}, context) => {
      const clausePendings: any = {
        status_id: 1,
        is_active: true,
      }
      const clauseProccesing: any = {
        status_id: 2,
        is_active: true,
      }
      const clauseBilling: any = {
        status_id: 3,
        is_active: true,
      }
      const clauseLocalShipping: any = {
        type_id: 2,
        is_active: true,
      }
      const clauseNationalShipping: any = {
        type_id: 1,
        is_active: true,
      }

      const clauseToSupply: any = {
        status_id: 6,
        is_active: true,
      }
      const clauseRoute: any = {
        status_id: 7,
        is_active: true,
      }
      const clauseCollect: any = {
        status_id: 8,
        is_active: true,
      }
      const clauseComplete: any = {
        status_id: 11,
        is_active: true,
      }
      const clauseRejected: any = {
        is_active: true,
        [Op.or]: [{ status_id: 12 }, { status_id: 13 }],
      }
      if (context.storeId) {
        clausePendings.store_id = context.storeId
        clauseProccesing.store_id = context.storeId
        clauseBilling.store_id = context.storeId
        clauseLocalShipping.store_id = context.storeId
        clauseNationalShipping.store_id = context.storeId
        clauseToSupply.store_id = context.storeId
        clauseRoute.store_id = context.storeId
        clauseCollect.store_id = context.storeId
        clauseComplete.store_id = context.storeId
        clauseRejected.store_id = context.storeId
      }
      const pendings = await Order.count({ where: clausePendings })

      const processing = await Order.count({
        where: clauseProccesing,
      })
      const billing = await Order.count({
        where: clauseBilling,
      })
      const localShipping = await Order.count({
        where: clauseLocalShipping,
      })
      const nationalShipping = await Order.count({
        where: clauseNationalShipping,
      })
      const toSupply = await Order.count({
        where: clauseToSupply,
      })
      const route = await Order.count({
        where: clauseRoute,
      })
      const collect = await Order.count({
        where: clauseCollect,
      })
      const complete = await Order.count({
        where: clauseComplete,
      })
      const rejected = await Order.count({
        where: clauseRejected,
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
        rejected,
      }
    },
  },
}

export default countersResolver
