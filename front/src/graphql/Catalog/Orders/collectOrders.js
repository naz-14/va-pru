import { gql } from '@apollo/client'

export const GET_COLLECT_ORDERS = gql`
query GetCollectOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getCollectOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
    rows {
      id
      platform_id
      platform {
        name
        id
      }
      type {
        name
      }
      payment {
        platform
        payment_id
      }
      store {
        name
      }
      warehouse {
        name
      }
      shipping {
        first_name
        last_name
      }
      order_id
      order_date
    }
    count
  }
}
`

export const CHANGE_TO_COLLECT = gql`
  mutation ChangeToCollect($orderId: Int!, $shippingCompayId: Int) {
    changeToCollect(order_id: $orderId, shipping_compay_id: $shippingCompayId) {
      id
      status {
        id
        name
      }
    }
  }
`
