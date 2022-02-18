import Module from '../models/Catalogs/Modules/ModuleModel'
import Submodule from '../models/Catalogs/Modules/SubmoduleModel'
import UserModules from '../models/Users/UserModulesModel'

interface permissionsValidate {
  id_user: number
  path: string
}

async function validatePermissions({ id_user, path }: permissionsValidate) {
  const relativePath = getRelativepath(path)
  if (path.includes('users/permissions/edit')) {
    const module = await Module.findOne({
      where: { relative_link: '/catalog/users/permissions/edit/:id?' },
    })
    const permission = UserModules.findOne({
      where: { id_user, id_module: module?.id },
    })
    const havePermission = !!permission
    return { havePermissions: havePermission, path: relativePath }
  }
  const permissions = await UserModules.findAll({
    where: { id_user: id_user },
  })
  let havePermission = false
  const module = await Module.findOne({
    where: { relative_link: relativePath },
  })
  if (module) {
    const moduleCount = await (
      await UserModules.findAndCountAll({
        where: { id_module: module.id, id_submodule: null },
      })
    ).count
    if (moduleCount != 0 && permissions) {
      havePermission = getPermission(permissions, module, null, path)
    }
  } else {
    const submoduleSplit = relativePath.split('/')
    const submodulePath = submoduleSplit[submoduleSplit.length - 1]
    const submodule = await Submodule.findOne({
      where: { relative_link: `/${submodulePath}` },
    })
    if (submodule) {
      havePermission = getPermission(permissions, null, submodule, path)
    }
  }
  return { havePermissions: havePermission, path: relativePath }
}

const getRelativepath = (path: string) => {
  if (path.includes('new')) {
    return path.split('new')[0].replace(/.$/, '')
  } else if (path.includes('edit')) {
    return path.split('edit')[0].replace(/.$/, '')
  } else if (path.includes('details')) {
    return path.split('details')[0].replace(/.$/, '')
  } else {
    return path
  }
}

const getPermission = (
  permissions: any,
  module: any,
  submodule: any,
  path: string
) => {
  const permissionType = module ? 'id_module' : 'id_submodule'
  const object = module ? module : submodule
  let havePermission = false
  permissions.forEach((permission: any) => {
    if (permission[permissionType] === object?.id) {
      if (path.includes('new')) {
        havePermission = permission.access_retrieve
        return
      }
      if (path.includes('edit')) {
        havePermission = permission.access_edit
        return
      }
      if (path.includes('details')) {
        havePermission = permission.access_read
        return
      }
      havePermission = true
    }
  })
  return havePermission
}

export default validatePermissions
