import { gql } from '@apollo/client'

export const GET_IN_PROCESS_ORDERS = gql`
query GetInProcessOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
    getInProcessOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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