import { Resolvers } from '../../../generated'
import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import ModuleModel from '../../../../models/Catalogs/Modules/ModuleModel'
import SubmoduleModel from '../../../../models/Catalogs/Modules/SubmoduleModel'
import usersModulesModel from '../../../../models/Users/UserModulesModel'
import UserModel from '../../../../models/Users/UserModel'
import User from '../../../../models/Users/UserModel'

const invalidPermissions = 'No tienes permiso para realizar esta acción'
const moduleExist = 'Ya existe un módulo con ese nombre'
const moduleNotFound = 'El módulo no existe'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const ModuleResolver: Resolvers = {
  Query: {
    getAllModules: async (_, { limit, offset, searchQuery }, context) => {
      try {
        if (context.roleId !== 1) {
          if (limit !== null && offset !== null) {
            if (searchQuery) {
              return Promise.resolve(
                await ModuleModel.findAndCountAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    is_active: true,
                    [Op.or]: [
                      {
                        name: { [Op.like]: `%${searchQuery}%` },
                      },
                      { relative_link: { [Op.like]: `%${searchQuery}%` } },
                      { front_label: { [Op.like]: `%${searchQuery}%` } },
                    ],
                  },
                })
              )
            }
            return Promise.resolve(
              await ModuleModel.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                  is_active: true,
                  [Op.and]: [
                    { name: { [Op.notLike]: 'UserProfileMain' } },
                    { name: { [Op.notLike]: 'Modules' } },
                    { name: { [Op.notLike]: 'Users' } },
                    { name: { [Op.notLike]: 'UsersPermissions' } },
                  ],
                },
              })
            )
          }
          return Promise.resolve(
            await ModuleModel.findAndCountAll({
              where: {
                is_active: true,
                [Op.and]: [
                  { name: { [Op.notLike]: 'UserProfileMain' } },
                  { name: { [Op.notLike]: 'Modules' } },
                  { name: { [Op.notLike]: 'Users' } },
                  { name: { [Op.notLike]: 'UsersPermissions' } },
                ],
              },
            })
          )
        }
        if (limit !== null && offset !== null) {
          if (searchQuery) {
            return Promise.resolve(
              await ModuleModel.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                  is_active: true,
                  [Op.or]: [
                    {
                      name: { [Op.like]: `%${searchQuery}%` },
                    },
                    { relative_link: { [Op.like]: `%${searchQuery}%` } },
                    { front_label: { [Op.like]: `%${searchQuery}%` } },
                  ],
                },
              })
            )
          }
          return Promise.resolve(
            await ModuleModel.findAndCountAll({
              offset: offset,
              limit: limit,
              where: {
                is_active: true,
                [Op.and]: [{ name: { [Op.notLike]: 'UserProfileMain' } }],
              },
            })
          )
        }
        return Promise.resolve(
          await ModuleModel.findAndCountAll({
            where: {
              is_active: true,
              [Op.and]: [{ name: { [Op.notLike]: 'UserProfileMain' } }],
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    getOneModule: async (_, { id }, context) => {
      try {
        if (context.roleId !== 1) {
          return Promise.reject(Error(invalidPermissions))
        }

        const moduleFound = await ModuleModel.findOne({
          where: { id, is_active: true },
        })
        if (!moduleFound) {
          return Promise.reject(Error(moduleNotFound))
        }
        return moduleFound
      } catch (e) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Mutation: {
    getAllModulesExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await ModuleModel.findAll({
            where: {
              is_active: true,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    createModule: async (_, { moduleInput, submoduleInput }, context) => {
      const transaction = await sequelize.transaction()
      const { name, relative_link, icon, front_label } = moduleInput
      try {
        if (context.roleId !== 1) {
          await transaction.rollback()
          return Promise.reject(Error(invalidPermissions))
        }

        const findModule = await ModuleModel.findOne({
          where: { name, is_active: true },
          transaction,
        })
        if (findModule) {
          await transaction.rollback()
          return Promise.reject(Error(moduleExist))
        }

        let moduleCreated = await ModuleModel.create(
          {
            name,
            relative_link,
            icon,
            front_label,
            is_active: true,
          },
          { transaction }
        )

        const Users = await UserModel.findAll({
          where: { id_role: 1 },
          transaction,
        })
        if (submoduleInput.length < 1) {
          for (const user of Users) {
            await usersModulesModel.create(
              {
                id_module: moduleCreated.id,
                id_user: user.id,
                id_submodule: null,
                access_delete: true,
                access_edit: true,
                access_read: true,
                access_retrieve: true,
                access_export: true,
                is_active: true,
              },
              { transaction }
            )
          }
        }
        const submoduleArray = []

        for (const submodule of submoduleInput) {
          if (!submodule) {
            return {
              id: moduleCreated.id,
              name: moduleCreated.name,
              front_label: moduleCreated.front_label,
              relative_link: moduleCreated.relative_link,
              icon: moduleCreated.icon,
            }
          }
          const submoduleCreated = await SubmoduleModel.create(
            {
              module_id: moduleCreated.id,
              name: submodule.name,
              front_label: submodule.front_label,
              relative_link: submodule.relative_link,
              icon: submodule.icon,
              is_active: true,
            },
            { transaction }
          )
          const submoduleObject = {
            id: submoduleCreated.id,
            module_id: moduleCreated.id,
            name: submoduleCreated.name,
            front_label: submoduleCreated.front_label,
            relative_link: submoduleCreated.relative_link,
            icon: submoduleCreated.icon,
          }
          submoduleArray.push(submoduleObject)
          for (const user of Users) {
            await usersModulesModel.create(
              {
                id_module: moduleCreated.id,
                id_user: user.id,
                id_submodule: submoduleCreated.id,
                access_delete: true,
                access_edit: true,
                access_read: true,
                access_retrieve: true,
                access_export: true,
                is_active: true,
              },
              { transaction }
            )
          }
        }
        await transaction.commit()

        return {
          id: moduleCreated.id,
          name: moduleCreated.name,
          front_label: moduleCreated.front_label,
          relative_link: moduleCreated.relative_link,
          icon: moduleCreated.icon,
          submodules: submoduleArray,
        }
      } catch (e) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    updateModule: async (
      _,
      { moduleId, moduleInput, submoduleInput, submodulesIdsTodelete },
      context
    ) => {
      const transaction = await sequelize.transaction()

      try {
        const { name, relative_link, icon, front_label } = moduleInput

        if (context.roleId !== 1) {
          await transaction.rollback()
          return Promise.reject(Error(invalidPermissions))
        }
        const findModule = await ModuleModel.findOne({
          where: { name, id: { [Op.not]: moduleId }, is_active: true },
          transaction,
        })
        if (findModule) {
          await transaction.rollback()
          return Promise.reject(Error(moduleExist))
        }
        await ModuleModel.update(
          { name, relative_link, icon, front_label },
          { where: { id: moduleId }, transaction }
        )

        for (const submoduleToDelete of submodulesIdsTodelete) {
          await SubmoduleModel.destroy({
            where: { id: submoduleToDelete, is_active: true },
            transaction,
          })
          //DELETE PERMISSIONS OF SUBMODULES
          await usersModulesModel.destroy({
            where: { id_submodule: submoduleToDelete, is_active: true },
            transaction,
          })
        }

        const submoduleArray = []
        for (const submodule of submoduleInput) {
          if (!submodule) {
            return {
              id: moduleId,
              name: name,
              front_label: front_label,
              relative_link: relative_link,
              icon: icon,
            }
          }

          let submoduleCreated = {} as any
          if (submodule.id !== 0) {
            submoduleCreated = await SubmoduleModel.update(
              {
                module_id: moduleId,
                name: submodule.name,
                front_label: submodule.front_label,
                relative_link: submodule.relative_link,
                icon: submodule.icon,
                is_active: true,
              },
              { where: { id: submodule.id }, transaction }
            )
          } else {
            submoduleCreated = await SubmoduleModel.create(
              {
                module_id: moduleId,
                name: submodule.name,
                front_label: submodule.front_label,
                relative_link: submodule.relative_link,
                icon: submodule.icon,
                is_active: true,
              },
              { transaction }
            )
            //CREATE PERMISSIONS FOR MASTERS FOR NEW MODULE
            const Users = await User.findAll({ where: { id_role: 1 } })
            for (const user of Users) {
              await usersModulesModel.create(
                {
                  id_module: moduleId,
                  id_user: user.id,
                  id_submodule: submoduleCreated.id,
                  access_delete: true,
                  access_edit: true,
                  access_read: true,
                  access_retrieve: true,
                  access_export: true,
                  is_active: true,
                },
                { transaction }
              )
            }
          }

          const submoduleObject = {
            id: submoduleCreated.id,
            module_id: moduleId,
            name: submoduleCreated.name,
            front_label: submoduleCreated.front_label,
            relative_link: submoduleCreated.relative_link,
            icon: submoduleCreated.icon,
          }
          submoduleArray.push(submoduleObject)
        }

        await transaction.commit()

        return {
          id: moduleId,
          name: name,
          front_label: front_label,
          relative_link: relative_link,
          icon: icon,
          submodules: submoduleArray,
        }
      } catch (e) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    deleteModule: async (_, { id }, context) => {
      const transaction = await sequelize.transaction()

      try {
        if (context.roleId !== 1) {
          await transaction.rollback()
          return Promise.reject(Error(invalidPermissions))
        }
        await usersModulesModel.destroy({
          where: { id_module: id },
          transaction,
        })
        await ModuleModel.destroy({
          where: { id, is_active: true },
          transaction,
        })
        await SubmoduleModel.destroy({
          where: { module_id: id, is_active: true },
          transaction,
        })
        await transaction.commit()
        return true
      } catch (e) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Module: {
    submodules: async ({ id }) => {
      return await SubmoduleModel.findAll({ where: { module_id: id } })
    },
  },
}

export default ModuleResolver
