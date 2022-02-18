import { gql } from "@apollo/client"

export const GET_QUOTES = gql`
query GetQuotes {
  getQuotes {
    id
    cardCode
    cardName
    docDate
    docTime
    docStatus
    comments
    whsCode
    status {
      id
      name
    }
  }
}
` 
export const CREATE_QUOTE = gql`
mutation CreateQuote($inputQuote: quoteData!) {
  createQuote(inputQuote: $inputQuote)
}
`

export const GET_PROVIDER_INFO = gql`
mutation GetInfoProvider($inputProvider: providerData!) {
  getInfoProvider(inputProvider: $inputProvider)
}
`
