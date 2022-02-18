import { gql } from '@apollo/client'

export const GET_IN_ROUTE_ORDERS = gql`
query GetInRouteOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getInRouteOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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

export const CHANGE_TO_IN_ROUTE = gql`
  mutation ChangeToInRoute($orderId: Int!) {
    changeToInRoute(order_id: $orderId) {
      id
      status {
        id
        name
      }
    }
  }
`