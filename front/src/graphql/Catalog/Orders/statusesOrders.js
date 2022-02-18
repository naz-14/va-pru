import { gql } from "@apollo/client";

export const GET_ALL_STATUSES_ORDERS = gql`
query GetAllStatusesOrders {
  getAllStatusesOrders {
    id
    name
  }
}
`