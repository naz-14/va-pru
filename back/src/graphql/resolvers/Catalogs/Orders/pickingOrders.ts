import { Resolvers } from '../../../generated'
import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import sequelize from '../../../../db/connection'
import OrdersWarehouse from '../../../../models/App/Catalogs/Orders/OrdersWarehouse/OrdersWarehouseModel'

const PickingOrdersResolver: Resolvers = {
  Query: {
    getPickingOrders: async (_, {}) => {
      return await Order.findAndCountAll({ where: { status_id: 9 } })
    },
  },
  Mutation: {
    changeToPicking: async (_, { order_id }, context) => {
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

        const timeLineCreate = await TimeLineAdd({
          orderId: order_id,
          userId,
          transaction,
        })
        if (!timeLineCreate)
          return Promise.reject(Error('Algo salio mal, vuelve a intentar'))

        await order.update({
          status_id: 9,
          user_id: userId,
        })
        let parts = Math.ceil(order.product_quantity / 10)
        for (let i = 0; i <= parts - 1; i++) {
          await OrdersWarehouse.create({
            order_id: order.id,
            part: i + 1,
            total_parts: parts,
            open: true,
            is_active: true,
          })
        }

        return order
      } catch (error) {
        console.log(error)
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
  },
}

export default PickingOrdersResolver
