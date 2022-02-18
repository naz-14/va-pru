import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query getUsers($searchQuery: String, $limit: Int, $offset: Int) {
    Users(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      rows {
        id
        name
        first_name
        last_name
        user_name
        email
        id_role
      }
      count
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: Int!) {
    GetUserById(id: $getUserByIdId) {
      name
      id
      first_name
      last_name
      user_name
      email
      id_role
      id_store
      password
      id_address
      id_user_register
      id_avatar_file
      avatar {
        id
        url
      }
      address {
        id
        street
        external_number
        internal_number
        id_country
        country {
          id
          name
        }
        id_state
        state {
          name
          id
          id_country
        }
        id_city
        city {
          id
          name
          id_state
        }
        id_municipality
        municipality {
          id
          id_city
          name
        }
        id_colony
        colony {
          id
          name
          id_municipality
          zip_code
        }
        zip_code
      }
      contacts {
        id
        id_user
        id_contact
        contact_data {
          id
          name
          lastname
          second_lastname
          phone
          ext
          mobile
          email
        }
      }
    }
  }
`

export const EXPORT_USERS = gql`
  mutation GetAllUsersExport {
    getAllUsersExport {
      name
      id
      first_name
      last_name
      user_name
      email
      id_role
      id_store
      password
      id_address
      id_user_register
      id_avatar_file
      avatar {
        id
        url
      }
      address {
        id
        street
        external_number
        internal_number
        id_country
        country {
          id
          name
        }
        id_state
        state {
          name
          id
          id_country
        }
        id_city
        city {
          id
          name
          id_state
        }
        id_municipality
        municipality {
          id
          id_city
          name
        }
        id_colony
        colony {
          id
          name
          id_municipality
          zip_code
        }
        zip_code
      }
    }
  }
`

export const GET_USER = gql`
  mutation getOneUser($userId: Int!) {
    getUser(userID: $userId) {
      name
      first_name
      last_name
      user_name
    }
  }
`
export const GET_ALL_USER_PERMISSIONS = gql`
  mutation getAllUserPermissions($userID: Int!) {
    getAllUserPermissions(userID: $userID) {
      id
      id_module
      module_info {
        name
        relative_link
        icon
        front_label
      }
      submodule_info {
        name
        relative_link
        icon
        front_label
      }
      id_submodule
      access_retrieve
      access_read
      access_edit
      access_delete
      access_export
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $input: userRegisterInput!
    $inputAvatar: Upload!
    $inputAddress: addressInput!
    $inputContact: [contactInput!]!
  ) {
    registerUser(
      input: $input
      inputAvatar: $inputAvatar
      inputAddress: $inputAddress
      inputContact: $inputContact
    ) {
      id
      user_name
      id_role
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: Int!
    $inputAvatar: Upload
    $input: userRegisterInput!
    $addressId: Int!
    $inputAddress: addressInput!
    $inputContact: [contactInput!]!
  ) {
    updateUser(
      userID: $userId
      inputAvatar: $inputAvatar
      input: $input
      addressId: $addressId
      inputAddress: $inputAddress
      inputContact: $inputContact
    )
  }
`

export const DELETE_USER = gql`
  mutation DeleteUserMutation($id: Int!, $userId: Int!) {
    deleteUser(id: $id, userId: $userId)
  }
`

export const CREATE_TOKEN_RECOVERY = gql`
  mutation CreateRecoveryToken($userName: String!) {
    createRecoveryToken(userName: $userName) {
      id
      token_recovery
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation RecoveryUserPassword($inputRecovery: passwordRecoveryInput!) {
    recoveryUserPassword(inputRecovery: $inputRecovery)
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation PasswordUpdate(
    $idUser: Int!
    $currentPassword: String!
    $password: String!
  ) {
    passwordUpdate(
      id_user: $idUser
      currentPassword: $currentPassword
      password: $password
    )
  }
`

export const CHECK_TOKEN_RECOVERY = gql`
  mutation checkTokenRecovery($token: String!) {
    checkTokenRecovery(token: $token)
  }
`
