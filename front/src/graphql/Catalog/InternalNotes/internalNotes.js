import { gql } from '@apollo/client'

export const GET_INTERNAL_NOTES = gql`
query GetInternalNotes($orderId: Int!) {
  getInternalNotes(orderId: $orderId) {
    id
    order_id
    user_id
    text
    file_id
    type
    user {
      id
      name
    }
    fileInternal {
      id
      url
    }
  }
}
`

export const CREATE_INTERNAL_NOTE = gql`
mutation CreateInternalNote($inputInternalNote: internalNote!) {
  createInternalNote(inputInternalNote: $inputInternalNote)
}
`
