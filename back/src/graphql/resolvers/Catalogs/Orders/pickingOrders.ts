import { Resolvers } from '../../../generated'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'
import sequelize from '../../../../db/connection'
import OrdersWarehouse from '../../../../models/App/Catalogs/Orders/OrdersWarehouse/OrdersWarehouseModel'

const orderNotFound = 'No se encontro el pedido'
const defaultError = 'Algo salio mal, vuelve a intentar'

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
        const clause: any = {
          where: {
            id: order_id,
          },
        }
        if (context.store_id) clause.where.store_id = context.store_id
        const order = await Order.findOne(clause)
        if (!order) {
          await transaction.rollback()
          return Promise.reject(Error(orderNotFound))
        }

        const timeLineCreate = await TimeLineAdd({
          orderId: order.order_id,
          statusId: 9,
          userId: userId,
          transaction,
        })
        if (!timeLineCreate) return Promise.reject(Error(defaultError))

        await order.update(
          {
            status_id: 9,
            user_id: userId,
          },
          { transaction }
        )

        await OrdersWarehouse.create(
          {
            order_id: order.id,
            open: true,
            is_active: true,
          },
          { transaction }
        )
        await transaction.commit()
        return order
      } catch (error) {
        console.log(error)
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default PickingOrdersResolver
