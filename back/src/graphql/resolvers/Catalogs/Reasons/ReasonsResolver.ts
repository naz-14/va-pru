import sequelize from '../../../../db/connection'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import Reasons from '../../../../models/Catalogs/Reason/ReasonModel'
import User from '../../../../models/Users/UserModel'
import { Resolvers } from '../../../generated'
import moment from 'moment'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const orderAlreadyRejected = 'La orden ya ha sido rechazada'
const orderNotFound = 'No se encontro el pedido'

const ReasonsResolver: Resolvers = {
  Query: {
    getReason: async (_, { orderId }) => {
      const clause: any = {
        where: {
          order_id: orderId,
        },
      }
      return await Reasons.findAll(clause)
    },
  },
  Mutation: {
    createReason: async (_, { inputReason }, context) => {
      const transaction = await sequelize.transaction()

      const { order_id, issusse_id, user_id, reason } = inputReason
      try {
        /* CHECK IF REASON ALREADY EXISTS */
        const resReasons = await Reasons.findOne({ where: { order_id } })

        if (resReasons) {
          await transaction.rollback()
          return Promise.reject(Error(orderAlreadyRejected))
        }
        /* CHECK IF ORDER ALREADY EXISTS */
        const resOrders = await Order.findOne({ where: { order_id } })
        if (!resOrders) {
          await transaction.rollback()
          return Promise.reject(Error(orderNotFound))
        }

        /* CREATE NEW REASON */
        await Reasons.create(
          {
            order_id,
            reason,
            issusse_id,
            user_id,
            is_active: true,
            createdAt: moment().format(),
          },
          { transaction }
        )

        await Order.update(
          {
            status_id: 12,
          },
          { where: { order_id }, transaction }
        )

        const timeLineCreate = await TimeLineAdd({
          orderId: order_id,
          statusId: 12,
          userId: context.userId,
          transaction,
        })

        if (!timeLineCreate) return Promise.reject(Error(defaultError))

        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
  reasonsData: {
    userDetails: async ({ user_id }) => {
      return await User.findOne({ where: { id: user_id } })
    },
  },
}

export default ReasonsResolver
