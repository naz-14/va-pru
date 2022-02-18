import { Op } from 'sequelize';
import sequelize from '../../../../db/connection';
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd';
import Order from '../../../../models/Catalogs/Orders/OrderModel';
import { Resolvers } from '../../../generated';

const shippedOrdersResolver: Resolvers = {
  Query:{
    getShippedOrders: async (_, { searchQuery, limit, offset, platform }, context ) =>{
      const clause: any = {
        where: {},
      }
      
      if (context.roleId === 4) {
        clause.where[Op.and] = [
          {status_id: 11},
          {store_id: context.storeId}
        ]
      } else {
        clause.where = {status_id: 11}
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
            id: order_id
          },
        })
        if (!order) {
          return Promise.reject(Error('No se encontro el pedido'))
        }

        const timeLineCreate = await TimeLineAdd({orderId:order_id, userId, transaction})
        if(!timeLineCreate) return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
        
        await order.update({
          status_id: 11,
          user_id: userId,
        })
        
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
  }
}

export default shippedOrdersResolver;