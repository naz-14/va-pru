import { gql } from '@apollo/client'

export const GET_PENDING_ORDERS = gql`
  query GetPendingOrders(
    $searchQuery: String
    $limit: Int
    $offset: Int
    $platform: Int
  ) {
    getPendingOrders(
      searchQuery: $searchQuery
      limit: $limit
      offset: $offset
      platform: $platform
    ) {
      rows {
        id
        platform {
          name
        }
        type {
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
        store {
          name
        }
        warehouse {
          name
        }
      }
      count
    }
  }
`

export const GET_ORDER_DETAILS_BY_ID = gql`
  query GetOrderById($id: Int!) {
    getOrderById(id: $id) {
      id
      platform {
        name
      }
      type_id
      type {
        name
      }
      method_id
      method {
        name
      }
      payment {
        platform
        payment_id
      }
      shipping {
        first_name
        last_name
        email
        phone
        address_1
        postcode
        state
        city
      }
      order_id
      store_id
      store {
        name
      }
      uber_id
      total_price
      shipping_price
      product_quantity
      products {
        id
        product_id
        name
        sku
        quantity
        price
        total
      }
      warehouse_id
      warehouse {
        name
      }
      status_id
      status {
        id
      }
      reason {
        id
        reason
        issusse_id
        user_id
        userDetails {
          name
        }
        issusesDetails {
          id
          name
        }
        createdAt
      }
      order_date
    }
  }
`
export const EXPORT_PENDING_ORDERS = gql`
  mutation GetAllPendingExport {
    getAllPendingExport {
      id
      platform {
        name
      }
      type {
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
      store {
        name
      }
    }
  }
`

export const CHANGE_TO_PROCESS = gql`
  mutation ChangeToProcess($orderId: Int!, $storeId: Int!) {
    changeToProcess(order_id: $orderId, store_id: $storeId) {
      id
      status_id
    }
  }
`

export const CHANGE_TO_BILLING = gql`
  mutation changeToBilling($orderId: Int!, $shippingCompayId: Int!) {
    changeToBilling(order_id: $orderId, shipping_compay_id: $shippingCompayId) {
      id
      shipping_compay_id
      status {
        id
        name
      }
    }
  }
`
