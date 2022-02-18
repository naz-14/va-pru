import { gql } from "@apollo/client"

export const GET_DOCUMENTS_STATUSES = gql`
query GetDocumentsStatuses {
  getDocumentsStatuses {
    id
    name
  }
}
` 