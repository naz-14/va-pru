import sequelize from '../../../../db/connection'
import IssussesModel from '../../../../models/Catalogs/Issusses/IssussesModel'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import Reasons from '../../../../models/Catalogs/Reason/ReasonModel'
import User from '../../../../models/Users/UserModel'
import { Resolvers } from '../../../generated'
import moment from 'moment'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

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
    createReason: async (_, { inputReason }) => {
      const transaction = await sequelize.transaction()

      const { order_id, issusse_id, user_id, reason } = inputReason
      try {
        /* CHECK IF REASON ALREADY EXISTS */
        const resReasons = await Reasons.findOne({ where: { order_id } })

        if (resReasons)
          return Promise.reject(Error('La orden ya ha sido rechazada'))

        /* CHECK IF ORDER ALREADY EXISTS */
        const resOrders = await Order.findOne({ where: { order_id } })
        if (!resOrders) return Promise.reject(Error('No existe la orden'))

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
