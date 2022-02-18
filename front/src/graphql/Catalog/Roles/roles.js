import { gql } from '@apollo/client'

export const GET_ROLES = gql`
  query GetAllRoles($searchQuery: String, $limit: Int, $offset: Int) {
    getAllRoles(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      rows {
        id
        role_name
        description
      }
      count
    }
  }
`

export const GET_ROLE_BY_ID = gql`
  query GetOneRole($getOneRoleId: Int!) {
    getOneRole(id: $getOneRoleId) {
      id
      role_name
      description
    }
  }
`

export const EXPORT_ROLES = gql`
  mutation GetAllRolesExport {
    getAllRolesExport {
      role_name
      description
      id_user_register
      id_user_delete
      id_user_update
      id
    }
  }
`

export const CREATE_ROLE = gql`
  mutation CreateRole($input: RoleInput!) {
    createRole(input: $input) {
      id
      role_name
      description
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation UpdateRole($roleId: Int!, $input: RoleInput!) {
    updateRole(roleId: $roleId, input: $input)
  }
`

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: Int!, $userId: Int!) {
    deleteRole(id: $id, userId: $userId)
  }
`
