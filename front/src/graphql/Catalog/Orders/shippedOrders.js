import { gql } from '@apollo/client'

export const GET_SHIPPED_ORDERS = gql`
query GetShippedOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getShippedOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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

export const CHANGE_TO_SHIPPED = gql`
  mutation ChangeToShipped($orderId: Int!) {
    changeToShipped(order_id: $orderId) {
      id
      status {
        id
        name
      }
    }
  }
`
