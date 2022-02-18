import {gql} from '@apollo/client'

export const SEPOMEX_MUTATION = gql`
  mutation GetFullAddressByZipcodeMutation($zipCode: Int!) {
  getFullAddressByZipcode(zipCode: $zipCode) {
      id
      colonies {
        id_colony
        colony_name
      }
      id_municipality
      municipality_name
      id_city
      city_name
      id_state
      state_name
      id_country
      country_name
  }
}
`