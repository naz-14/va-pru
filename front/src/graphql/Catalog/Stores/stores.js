import { gql } from '@apollo/client'

export const GET_STORES = gql`
  query GetAllStores($searchQuery: String, $limit: Int, $offset: Int) {
  getAllStores(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
    rows {
      id
      name
    }
  }
}
`