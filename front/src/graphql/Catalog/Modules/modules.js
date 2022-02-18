import { gql } from '@apollo/client'

export const ALL_MODULES = gql`
  query getAllModules($searchQuery: String, $limit: Int, $offset: Int) {
    getAllModules(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      rows {
        id
        name
        front_label
        icon
        relative_link
        submodules {
          id
          name
          relative_link
          front_label
          icon
        }
      }
      count
    }
  }
`
export const GET_ONE_MODULE = gql`
  query GetOneModule($getOneModuleId: Int!) {
    getOneModule(id: $getOneModuleId) {
      id
      name
      front_label
      relative_link
      icon
      submodules {
        id
        module_id
        name
        front_label
        icon
        relative_link
      }
    }
  }
`

export const EXPORT_MODULES = gql`
  mutation GetAllModulesExport {
    getAllModulesExport {
      id
      name
      front_label
      icon
      relative_link
      submodules {
        id
        name
        relative_link
        front_label
        icon
      }
    }
  }
`

export const CREATE_MODULE = gql`
  mutation CreateModuleMutation(
    $moduleInput: moduleInput!
    $submoduleInput: [submoduleInput]!
  ) {
    createModule(moduleInput: $moduleInput, submoduleInput: $submoduleInput) {
      id
      name
    }
  }
`

export const UPDATE_MODULE = gql`
  mutation UpdateModule(
    $moduleId: Int!
    $moduleInput: moduleInput!
    $submoduleInput: [submoduleInput]!
    $submodulesIdsTodelete: [Int]!
  ) {
    updateModule(
      moduleId: $moduleId
      moduleInput: $moduleInput
      submoduleInput: $submoduleInput
      submodulesIdsTodelete: $submodulesIdsTodelete
    ) {
      id
      name
      front_label
      relative_link
      icon
      submodules {
        front_label
        id
        icon
        module_id
      }
    }
  }
`
export const DELETE_MODULE = gql`
  mutation deleteModule($id: Int!) {
    deleteModule(id: $id)
  }
`

export const All_USER_PERMISSIONS = gql`
  mutation GetAllUserPermissionsMutation($userID: Int!) {
    getAllUserPermissions(userID: $userID) {
      id
      id_module
      id_submodule
      access_delete
      access_retrieve
      access_read
      access_edit
      access_export
      module_info {
        name
      }
      submodule_info {
        name
      }
    }
  }
`

export const CREATE_PERMISSIONS = gql`
  mutation CreateUserPermissionMutation(
    $userId: Int!
    $modules: [userModuleInput!]!
  ) {
    createUserPermission(userID: $userId, modules: $modules)
  }
`
export const UPDATE_PERMISSIONS = gql`
  mutation UpdateUserPermissionMutation(
    $userId: Int!
    $modules: [userModuleInput!]!
  ) {
    updateUserPermission(userID: $userId, modules: $modules)
  }
`
