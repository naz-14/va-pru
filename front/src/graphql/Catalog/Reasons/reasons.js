import { gql } from "@apollo/client";

export const CREATE_REASON = gql`
mutation CreateReason($inputReason: reasonData!) {
  createReason(inputReason: $inputReason)
}
`