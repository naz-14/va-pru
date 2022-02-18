import { gql } from '@apollo/client'

export const GET_LOCAL_ORDERS = gql`
query GetLocalOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getLocalOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
    rows {
      id
      platform_id
      platform {
        name
        id
      }
      status {
        id
        name
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
