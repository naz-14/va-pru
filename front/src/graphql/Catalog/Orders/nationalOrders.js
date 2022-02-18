import { gql } from '@apollo/client'

export const GET_NATIONAL_ORDERS = gql`
query GetNationalOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
  getNationalOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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
      status {
        id
        name
      }
      warehouse {
        name
      }
      payment {
        platform
        payment_id
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
