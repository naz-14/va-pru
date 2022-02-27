import { Resolvers } from '../../../generated'
import UserModulesModel from '../../../../models/Users/UserModulesModel'
import ModuleModel from '../../../../models/Catalogs/Modules/ModuleModel'
import SubmoduleModel from '../../../../models/Catalogs/Modules/SubmoduleModel'

const userPermissionsNotFound = 'No se encontrarón permisos para el usuario'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const UserModulesResolver: Resolvers = {
  Mutation: {
    getAllUserPermissions: async (_, { userID }) => {
      try {
        const UserModulesFound = await UserModulesModel.findAll({
          where: { id_user: userID },
        })
        return UserModulesFound
      } catch (e) {
        return Promise.reject(Error(defaultError))
      }
    },
    updateUserPermission: async (_, { userID, modules }) => {
      try {
        const userModulesFound = await UserModulesModel.findAll({
          where: { id_user: userID, is_active: true },
        })
        if (!userModulesFound)
          return Promise.reject(Error(userPermissionsNotFound))

        await UserModulesModel.destroy({
          where: { id_user: userID, is_active: true },
        })

        const existsProfileModule = await ModuleModel.findOne({
          where: { name: 'UserProfileMain' },
        })
        if (existsProfileModule) {
          await UserModulesModel.create({
            id_user: userID,
            id_module: existsProfileModule.id,
            id_submodule: null,
            access_retrieve: true,
            access_read: true,
            access_edit: true,
            access_delete: true,
            access_export: true,
            is_active: true,
          })
        }
        for (const module of modules) {
          await UserModulesModel.create({
            id_user: userID,
            id_module: module.id_module,
            id_submodule: module.id_submodule || null,
            access_retrieve: module.access_retrieve,
            access_read: module.access_read,
            access_edit: module.access_edit,
            access_delete: module.access_delete,
            access_export: module.access_export,
            is_active: true,
          })
        }
        return true
      } catch (e) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
  userModule: {
    module_info: async ({ id_module }) => {
      return await ModuleModel.findOne({
        where: { id: id_module },
      })
    },
    submodule_info: async ({ id_submodule }) => {
      return await SubmoduleModel.findOne({
        where: { id: id_submodule },
      })
    },
  },
}
export default UserModulesResolver
