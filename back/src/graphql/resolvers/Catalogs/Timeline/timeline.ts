import OrderStatus from '../../../../models/Catalogs/Orders/OrderStatusModel'
import TimelineModel from '../../../../models/Catalogs/Timeline/TimelineModel'
import AppUser from '../../../../models/Users/AppUser'
import User from '../../../../models/Users/UserModel'
import { Resolvers } from '../../../generated'

const timelineResolver: Resolvers = {
  Query: {
    getTimeline: async (_, { id }) => {
      const clause: any = {
        where: {
          is_active: true,
          order_id: id,
        },
        order: [['dateStatus', 'ASC']],
      }

      return await TimelineModel.findAll(clause)
    },
  },
  Timeline: {
    status: async ({ status_id }) => {
      return await OrderStatus.findOne({ where: { id: status_id } })
    },
    user: async ({ user_id, status_id }) => {
      if (status_id === 9 || status_id === 10) {
        return await AppUser.findOne({ where: { id: user_id } })
      }
      return await User.findOne({ where: { id: user_id } })
    },
  },
}

export default timelineResolver
