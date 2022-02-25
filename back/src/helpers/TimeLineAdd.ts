import moment from 'moment'
import Order from '../models/Catalogs/Orders/OrderModel'
import Timeline from '../models/Catalogs/Timeline/TimelineModel'

export const TimeLineAdd = async ({
  transaction,
  orderId,
  userId,
  statusId,
}: any) => {
  try {
    return await Timeline.create(
      {
        order_id: orderId,
        status_id: statusId,
        user_id: userId,
        dateStatus: moment().format(),
        is_active: true,
      },
      { transaction }
    )
  } catch (e) {
    await transaction.rollback()
    return false
  }
}
