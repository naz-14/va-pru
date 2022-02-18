import { Op } from 'sequelize';
import sequelize from '../../../../db/connection';
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd';
import Issusses from '../../../../models/Catalogs/Issusses/IssussesModel';
import Order from '../../../../models/Catalogs/Orders/OrderModel';
import { Resolvers } from '../../../generated';

const rejectedOrders: Resolvers = {
  Query:{
    getRejectedOrders: async (_, { searchQuery, limit, offset, platform }, context ) =>{
      const clause: any = {
        where: {},
      }
      
      if (context.roleId === 4) {
        clause.where[Op.and] = [
          {store_id: context.storeId}
        ]
        clause.where[Op.or] = [
          {status_id: 12},
          {status_id: 13}
        ]
      } else {
        clause.where[Op.or] = [
          {status_id: 12},
          {status_id: 13}
        ]
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
    changeToRejected: async (_, { order_id, id_reason }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const { userId } = context
        const order = await Order.findOne({
          where: {
            id: order_id,
          },
        })
        if (!order) {
          return Promise.reject(Error('No se encontro el pedido'))
        }
        const reason = await Issusses.findOne({
          where: {
            id: id_reason,
          },
        })
        if (!reason) {
          return Promise.reject(Error('No se encontro el motivo de cancelacion'))
        }
        
        const timeLineCreate = await TimeLineAdd({orderId: order_id , transaction})
        if(!timeLineCreate) return Promise.reject(Error('Algo salio mal, vuelve a intentar'))

        await order.update({
          status_id: 12,
          user_id: userId,
        })
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    changeToReturned: async (_, { order_id }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const { userId } = context
        const order = await Order.findOne({
          where: {
            id: order_id,
          },
        })
        if (!order) {
          return Promise.reject(Error('No se encontro el pedido'))
        }
        const reason = await Issusses.findOne({
          where: {
            id: 5,
          },
        })
        if (!reason) {
          return Promise.reject(Error('No se encontro el motivo de cancelacion'))
        }

        const timeLineCreate = await TimeLineAdd({orderId:order_id, userId, transaction})
        if(!timeLineCreate) return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
        
        await order.update({
          status_id: 13,
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

export default rejectedOrders;