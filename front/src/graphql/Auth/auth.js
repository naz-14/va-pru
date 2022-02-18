import { gql } from '@apollo/client'

export const DECRYPT_TOKEN = gql`
  mutation decryptToken($token: String!) {
    decryptToken(token: $token) {
      id
      user_name
      name
      first_name
      last_name
      avatar
      role
      email
    }
  }
`

export const AUTH_USER = gql`
  mutation authUser($input: userLoginInput!) {
    authUser(input: $input) {
      token
    }
  }
`

export const EMPTY = gql`
  mutation _emptyMutation {
    _empty
  }
`

export const APP_CONFIG = gql`
  query AppConfig {
    getConfigSys {
      project_logo
      project_name
      project_mini_logo
      project_favicon
    }
  }
`
