import { gql } from '@apollo/client'

export const GET_COUNTERS_ORDERS = gql`
  query GetAllCounters {
    getAllCounters {
      pendings
      processing
      billing
      toSupply
      collect
      route
      localShipping
      nationalShipping
      complete
      rejected
    }
  }
`
