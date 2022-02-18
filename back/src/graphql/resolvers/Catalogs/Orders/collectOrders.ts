import { Op } from 'sequelize';
import sequelize from '../../../../db/connection';
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd';
import Order from '../../../../models/Catalogs/Orders/OrderModel';
import ShippingCompanies from '../../../../models/Catalogs/ShippingCompanies/ShippingCompanies';
import { Resolvers } from '../../../generated';

const collectOrders: Resolvers = {
  Query:{
    getCollectOrders: async (_, { searchQuery, limit, offset, platform }, context) =>{
      const clause: any = {
        where: {},
      }
      
      if (context.roleId === 4) {
        clause.where[Op.and] = [
          {status_id: 8},
          {store_id: context.storeId}
        ]
      } else {
        clause.where = {status_id: 8}
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
    changeToCollect: async (_, { order_id, shipping_compay_id }, context) => {
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

        if (shipping_compay_id) {
          const shippingCompany = await ShippingCompanies.findOne({
            where: {
              id: shipping_compay_id,
            },
          })
          if (!shippingCompany) {
            return Promise.reject(Error('No se encontro el empresa de logistica'))
          }
  
          const timeLineCreate = await TimeLineAdd({orderId:order_id, userId, transaction})
          if(!timeLineCreate) return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
  
          await order.update({
            status_id: 8,
            user_id: userId,
            shipping_compay_id
          })
        } else {
          await order.update({
            status_id: 8,
            user_id: userId,
          })
        }
        
        return order
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
  },
}

export default collectOrders;