import { gql } from '@apollo/client'

export const GET_BILLING_ORDERS = gql`
query GetBillingOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
    getBillingOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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