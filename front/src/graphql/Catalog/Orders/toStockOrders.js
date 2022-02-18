import { gql } from '@apollo/client'

export const GET_TO_STOCK_ORDERS = gql`
query GetToStockOrders($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
    getToStockOrders(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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

export const CHANGE_TO_SUPPLY = gql`
  mutation ChangeToSupply($orderId: Int!) {
    changeToSupply(order_id: $orderId) {
      id
      status {
        id
        name
      }
    }
  }
`
