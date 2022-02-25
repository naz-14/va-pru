import ModuleModel from '../models/Catalogs/Modules/ModuleModel'
import SubmoduleModel from '../models/Catalogs/Modules/SubmoduleModel'
import UserModulesModel from '../models/Users/UserModulesModel'
import { throwHttpGraphQLError } from 'apollo-server-core/dist/runHttpQuery'

interface userPermissions {
  _path: string
  _userId: number
  _permissionType: string
}

const userPermissions = async ({
  _path,
  _userId,
  _permissionType,
}: userPermissions) => {
  if (!_path.includes('permissions')) {
    if (_path.includes('/new')) {
      _path = _path.replace('/new', '')
    }
    if (_path.includes('/edit')) {
      let pathArray = _path.split('/')
      pathArray.pop()
      pathArray.pop()
      _path = pathArray.join('/')
    }
  }
  if (_path.includes('/edit') && _path.includes('permissions')) {
    let pathArray = _path.split(/([0-9]+)/)
    pathArray.pop()
    pathArray.pop()
    _path = pathArray.join('/') + ':id?'
  }
  const moduleFound = await ModuleModel.findOne({
    where: { relative_link: _path },
  })
  if (!moduleFound) {
    const requestPathSplit = _path.split('/')
    const submodulePath = '/' + requestPathSplit[requestPathSplit.length - 1]
    const submoduleFound = await SubmoduleModel.findOne({
      where: { relative_link: submodulePath },
    })
    if (!submoduleFound) throwHttpGraphQLError(400, [Error('not found')])
    const submoduleId = submoduleFound.id
    const permission = await findSubmodulePermissionsByType(
      _permissionType,
      _userId,
      submoduleId
    )
    if (!permission) return false
    return true
  }
  const moduleId = moduleFound.id
  const permission = await findModulePermissionsByType(
    _permissionType,
    _userId,
    moduleId
  )
  if (permission) {
    return true
  }
}

const findSubmodulePermissionsByType = async (
  type: string,
  _userId: number,
  submoduleId: number
) => {
  if (type === 'read') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_submodule: submoduleId,
        access_read: true,
      },
    })
  }
  if (type === 'edit') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_submodule: submoduleId,
        access_edit: true,
      },
    })
  }
  if (type === 'delete') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_submodule: submoduleId,
        access_delete: true,
      },
    })
  }
  if (type === 'retrieve') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_submodule: submoduleId,
        access_retrieve: true,
      },
    })
  }
}
const findModulePermissionsByType = async (
  type: string,
  _userId: number,
  moduleId: number
) => {
  if (type === 'read') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_module: moduleId,
        id_submodule: null,
        access_read: true,
      },
    })
  }
  if (type === 'edit') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_module: moduleId,
        id_submodule: null,
        access_edit: true,
      },
    })
  }
  if (type === 'delete') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_module: moduleId,
        id_submodule: null,
        access_delete: true,
      },
    })
  }
  if (type === 'retrieve') {
    return await UserModulesModel.findOne({
      where: {
        id_user: _userId,
        id_module: moduleId,
        id_submodule: null,
        access_retrieve: true,
      },
    })
  }
}

export default userPermissions
