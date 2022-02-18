import { gql } from '@apollo/client'

export const GET_TIMELINE = gql`
query GetTimeline($id: Int!) {
  getTimeline(id: $id) {
    id
    order_id
    status_id
    dateStatus
    status {
      id
      name
    }
    user_id
    user {
      id
      name
    }
    dateStatus
  }
}
`
