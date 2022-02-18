import { gql } from '@apollo/client'

export const GET_ISSUES = gql`
query GetIssues($searchQuery: String, $limit: Int, $offset: Int, $platform: Int) {
    getIssues(searchQuery: $searchQuery, limit: $limit, offset: $offset, platform: $platform) {
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

export const GET_ALL_ISSUES = gql`
query GetAllIssusses {
  getAllIssusses {
    id
    name
  }
}
`