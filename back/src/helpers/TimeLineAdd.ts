import moment from 'moment'
import Order from '../models/Catalogs/Orders/OrderModel'
import Timeline from '../models/Catalogs/Timeline/TimelineModel'

export const TimeLineAdd = async ({ transaction, orderId, userId }: any) => {
  try {
    const order = await Order.findOne({ where: { id: orderId } })
    if (!order) return false

    const { order_id, status_id } = order
    return await Timeline.create(
      {
        order_id,
        status_id,
        user_id: userId,
        dateStatus: moment().format(),
        is_active: true,
      },
      { transaction }
    )
  } catch (e) {
    console.log(e)
    await transaction.rollback()
    return false
  }
}
