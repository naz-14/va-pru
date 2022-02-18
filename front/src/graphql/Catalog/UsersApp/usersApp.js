import { gql } from '@apollo/client'

export const GET_ALL_USERS_APP = gql`
  query GetAllAppUsers($searchQuery: String, $limit: Int, $offset: Int) {
    getAllAppUsers(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      rows {
        name
        first_name
        last_name
        id
        username
        userType {
          name
        }
      }
      count
    }
  }
`

export const DELETE_USER_APP = gql`
  mutation DeleteAppUser($id: Int!) {
    deleteAppUser(id: $id)
  }
`

export const CREATE_USER_APP = gql`
  mutation CreateAppUser($input: AppUserInput!) {
    createAppUser(input: $input)
  }
`

export const UPDATE_USER_APP = gql`
  mutation UpdateAppUser($updateAppUserId: Int!, $input: AppUserUpdateInput!) {
    updateAppUser(id: $updateAppUserId, input: $input)
  }
`

export const GET_APP_USER = gql`
  query GetAppUser($getAppUserId: Int!) {
    getAppUser(id: $getAppUserId) {
      id
      name
      first_name
      last_name
      phone
      email
      username
      id_type
    }
  }
`
