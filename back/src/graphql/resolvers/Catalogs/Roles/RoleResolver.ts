import sequelize from '../../../../db/connection'
import { Op } from 'sequelize'
import userPermissions from '../../../../helpers/userPermissions'
import { Resolvers } from '../../../generated'
import RoleModel from './../../../../models/Catalogs/Roles/RoleModel'
const invalidPermissions = 'No tienes permiso para realizar esta acción'
const roleExist = 'Ya existe un rol con ese nombre'
const roleNotExist = 'El rol no existe'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const RoleResolver: Resolvers = {
  Query: {
    getAllRoles: async (_, { limit, offset, searchQuery }, context) => {
      try {
        if (context.roleId === 1) {
          if (limit !== null && offset !== null) {
            if (searchQuery) {
              return Promise.resolve(
                await RoleModel.findAndCountAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    is_active: true,
                    [Op.or]: [
                      {
                        role_name: { [Op.like]: `%${searchQuery}%` },
                      },
                      { description: { [Op.like]: `%${searchQuery}%` } },
                    ],
                  },
                })
              )
            }
            return Promise.resolve(
              await RoleModel.findAndCountAll({
                offset: offset,
                limit: limit,
                where: { is_active: true },
              })
            )
          }
          return Promise.resolve(
            await RoleModel.findAndCountAll({
              where: { is_active: true },
            })
          )
        } else {
          if (limit !== null && offset !== null) {
            if (searchQuery) {
              return Promise.resolve(
                await RoleModel.findAndCountAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    is_active: true,
                    [Op.or]: [
                      {
                        role_name: { [Op.like]: `%${searchQuery}%` },
                      },
                      { description: { [Op.like]: `%${searchQuery}%` } },
                    ],
                  },
                })
              )
            }
            return Promise.resolve(
              await RoleModel.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                  is_active: true,
                  id: {
                    [Op.ne]: 1,
                  },
                },
              })
            )
          }
          return Promise.resolve(
            await RoleModel.findAndCountAll({
              where: {
                is_active: true,
                id: {
                  [Op.ne]: 1,
                },
              },
            })
          )
        }
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    getOneRole: async (_, { id }, context) => {
      try {
        const havePermissions = await userPermissions({
          _path: context.path,
          _userId: context.userId,
          _permissionType: 'read',
        })
        if (!havePermissions) {
          return Promise.reject(Error(invalidPermissions))
        }

        if (context.roleId !== 1) {
          if (id === 1) {
            return Promise.reject(Error(roleNotExist))
          }
        }
        const roleExist = await RoleModel.findOne({
          where: { id, is_active: true },
        })
        if (!roleExist) {
          return Promise.reject(Error(roleNotExist))
        }
        return await RoleModel.findByPk(id)
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Mutation: {
    getAllRolesExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await RoleModel.findAll({
            where: {
              is_active: true,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },

    createRole: async (_, { input }, context) => {
      const transaction = await sequelize.transaction()

      try {
        const { role_name, description, id_user_register } = input

        const findRole = await RoleModel.findOne({
          where: { role_name, is_active: true },
          transaction,
        })

        if (findRole) {
          await transaction.rollback()
          return Promise.reject(Error(roleExist))
        }

        const newRole = await RoleModel.create(
          {
            role_name,
            description,
            id_user_register,
            is_active: true,
          },
          { transaction }
        )

        await transaction.commit()

        return newRole
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },

    updateRole: async (_, { roleId, input }, context) => {
      const transaction = await sequelize.transaction()
      try {
        if (context.roleId !== 1) {
          if (roleId === 1) {
            return Promise.reject(Error(roleNotExist))
          }
        }

        const roleFound = await RoleModel.findOne({ where: { id: roleId } })
        if (!roleFound) {
          await transaction.rollback()
          return Promise.reject(Error(roleNotExist))
        }

        const { role_name, description, id_user_update } = input
        const findRole = await RoleModel.findOne({
          where: { role_name, id: { [Op.not]: roleId }, is_active: true },
          transaction,
        })
        if (findRole) {
          await transaction.rollback()
          return Promise.reject(Error(roleExist))
        }
        await RoleModel.update(
          {
            role_name,
            description,
            id_user_update,
            is_active: true,
          },
          { where: { id: roleId }, transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },

    deleteRole: async (_, { id, userId }, context) => {
      const transaction = await sequelize.transaction()
      try {
        if (context.roleId !== 1) {
          if (id === 1) {
            await transaction.rollback()
            return Promise.reject(Error(roleNotExist))
          }
        }

        const roleFound = await RoleModel.findOne({ where: { id: id } })
        if (!roleFound) {
          await transaction.rollback()
          return Promise.reject(Error(roleNotExist))
        }
        await RoleModel.update(
          { is_active: false, id_user_delete: userId },
          { where: { id } }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default RoleResolver
