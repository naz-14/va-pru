import { gql } from '@apollo/client'

export const GET_SIPPING_COMPANIES = gql`
query Query {
  getAllShippingCompanies {
    id
    name
  }
}
`