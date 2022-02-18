import { gql } from '@apollo/client'

export const GET_TO_REJECTED_ORDERS = gql`
query GetRejectedOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getRejectedOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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
    # count
  }
}
`
export const CHANGE_TO_REJECTED = gql`
  mutation changeToRejected($orderId: Int!) {
    changeToRejected(order_id: $orderId) {
      id
      status {
        id
        name
      }
    }
  }
`
export const CHANGE_TO_RETURNED = gql`
  mutation ChangeToReturned($orderId: Int!) {
    changeToReturned(order_id: $orderId) {
      id
      status {
        id
        name
      }
    }
  }
`