import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import { Resolvers, TypeAvatar } from '../../../generated'
import { GraphQLUpload } from 'graphql-upload'
import bcrypt from 'bcrypt'
import User from '../../../../models/Users/UserModel'
import AddressesModel from '../../../../models/Catalogs/Addresses/AddressModel'
import UserContactsModel from '../../../../models/Users/UserContacModel'
import ContactsModel from '../../../../models/Catalogs/Contacts/ContactModel'
import usersModulesModel from '../../../../models/Users/UserModulesModel'
import ModuleModel from '../../../../models/Catalogs/Modules/ModuleModel'
import submoduleModel from '../../../../models/Catalogs/Modules/SubmoduleModel'
import FileModel from '../../../../models/Files/FileModel'
import CountryModel from '../../../../models/Catalogs/Addresses/Sepomex/CountryModel'
import StateModel from './../../../../models/Catalogs/Addresses/Sepomex/StateModel'
import CityModel from '../../../../models/Catalogs/Addresses/Sepomex/CitieModel'
import MunicipalityModel from '../../../../models/Catalogs/Addresses/Sepomex/MunicipalityModel'
import ColonyModel from '../../../../models/Catalogs/Addresses/Sepomex/ColonyModel'
import { UploadFile, CleanPreviousFile } from '../../../../helpers/UploadFile'

interface UserData {
  id: number
  user_name: string
  name: string
  first_name: string
  last_name: string
  email: string
  id_store: number
  id_avatar_file: number
  id_role: number
  id_address: number
  id_user_register: number
  id_user_update: number
  id_user_delete: number
  password: string
}
interface UserReturn {
  id: number
  user_name: string
  name: string
  first_name: string
  last_name: string
  id_store: number
  id_address: number
  id_role: number
}

const invalidPermissions = 'No tienes permiso para realizar esta acción'
const userEmailExists = 'Ya existe un perfil con ese nombre de usuario o email'
const userNotFound = 'El usuario no existe'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const invalidPassword = 'La contraseña es invalida verifica que sea la correcta'

const UserResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    Users: async (_, { limit, offset, searchQuery }, context) => {
      try {
        if (limit !== null && offset !== null) {
          if (searchQuery) {
            return Promise.resolve(
              await User.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                  is_active: true,
                  [Op.or]: [
                    {
                      name: { [Op.like]: `%${searchQuery}%` },
                    },
                    { first_name: { [Op.like]: `%${searchQuery}%` } },
                    { last_name: { [Op.like]: `%${searchQuery}%` } },
                    { user_name: { [Op.like]: `%${searchQuery}%` } },
                  ],
                  id_role: {
                    [Op.not]: 1,
                  },
                },
              })
            )
          }
          return Promise.resolve(
            await User.findAndCountAll({
              offset: offset,
              limit: limit,
              where: {
                is_active: true,
                id_role: {
                  [Op.not]: 1,
                },
                id: {
                  [Op.not]: context.userId,
                },
              },
            })
          )
        } else {
          return Promise.resolve(
            await User.findAndCountAll({
              where: {
                is_active: true,
                id_role: {
                  [Op.not]: 1,
                },
                id: {
                  [Op.not]: context.userId,
                },
              },
            })
          )
        }
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    GetUserById: async (_, { id }, context) => {
      try {
        if (context.roleId !== 1) {
          const isMaster = await User.findOne({
            where: { id, id_role: 1, is_active: true },
          })
          if (isMaster) {
            return Promise.reject(Error(userNotFound))
          }
        }
        const userExist = await User.findOne({
          where: { id, is_active: true },
        })
        if (!userExist) {
          return Promise.reject(Error(userNotFound))
        }
        return await User.findOne({
          where: { id: id, is_active: true },
        })
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Mutation: {
    getAllUsersExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await User.findAll({
            where: {
              is_active: true,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    getUser: async (_, { userID }, context) => {
      try {
        if (context.roleId !== 1) {
          const isMaster = await User.findOne({
            where: { id: userID, id_role: 1, is_active: true },
          })
          if (isMaster) {
            return Promise.reject(Error(userNotFound))
          }
        }
        const userExist = await User.findOne({
          where: { id: userID, is_active: true },
        })
        if (!userExist) {
          return Promise.reject(Error(userNotFound))
        }

        return (await User.findOne({
          where: { id: userID, is_active: true },
        })) as UserData
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    registerUser: async (
      _,
      { input, inputAvatar, inputAddress, inputContact },
      context
    ) => {
      const transaction = await sequelize.transaction() //START TRANSACTION
      try {
        let {
          password,
          user_name,
          name,
          id_role,
          id_store,
          first_name,
          last_name,
          email: email_input,
          id_user_register: id_user_register_input,
        } = input

        //MASTER VALIDATION
        if (context.roleId !== 1) {
          if (id_role === 1) {
            await transaction.rollback()
            return Promise.reject(Error(invalidPermissions))
          }
        }

        const userExists = await User.findOne({
          where: {
            [Op.or]: {
              email: email_input,
              user_name,
            },
            is_active: true,
          },
          transaction,
        })
        if (userExists) {
          await transaction.rollback()
          return Promise.reject(Error(userEmailExists))
        }

        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)

        const {
          street,
          external_number,
          internal_number,
          id_country,
          id_state,
          id_city,
          id_municipality,
          id_colony,
          zip_code,
          id_user_register: id_user_register_address,
        } = inputAddress
        const address = await AddressesModel.create(
          {
            street,
            external_number,
            internal_number: internal_number || '',
            id_country,
            id_state,
            id_city,
            id_municipality,
            id_colony,
            zip_code,
            id_user_register: id_user_register_address,
            is_active: true,
          },
          { transaction }
        )

        const idContacts = inputContact.map(async (contact) => {
          const {
            name,
            lastname,
            second_lastname,
            phone,
            ext,
            mobile,
            email,
            id_user_register,
          } = contact
          const createdContact = await ContactsModel.create(
            {
              name,
              lastname,
              second_lastname,
              phone,
              ext,
              mobile,
              email,
              id_user_register,
              is_active: true,
            },
            { transaction }
          )
          return createdContact.id as number
        })

        const userAvatar = await UploadFile({
          file: inputAvatar,
          type: 'img',
          userID: context.userId,
          transaction: transaction,
        })
        if (!userAvatar) {
          return Promise.reject(Error(defaultError))
        }
        const user = await User.create(
          {
            password,
            user_name,
            name,
            first_name,
            last_name,
            id_role,
            id_store,
            id_avatar_file: userAvatar.id,
            id_address: address.id,
            email: email_input,
            id_user_register: id_user_register_input,
            is_active: true,
          },
          { transaction }
        )

        //CREATE MASTER PERMISSIONS
        if (id_role === 1) {
          const permissions: {
            id_module: number
            id_user: number
            id_submodule: number | null
          }[] = []
          const modules = await ModuleModel.findAll()
          const submodules = await submoduleModel.findAll()
          for (const submodule of submodules) {
            const submoduleObject = {
              id_module: submodule.module_id,
              id_user: user.id,
              id_submodule: submodule.id,
            }
            permissions.push(submoduleObject)
          }

          for (const module of modules) {
            const exists = permissions.some((permission) => {
              if (permission.id_module === module.id) {
                return true
              }
            })
            if (!exists) {
              const submoduleObject = {
                id_module: module.id,
                id_user: user.id,
                id_submodule: null,
              }
              permissions.push(submoduleObject)
            }
          }

          const permissionsUniques = [...new Set(permissions)]

          for (const permission of permissionsUniques) {
            await usersModulesModel.create(
              {
                id_module: permission.id_module,
                id_user: permission.id_user,
                id_submodule: permission.id_submodule,
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
        } else {
          //CREATE PERMISSIONS FOR COMMON MODULES
          const existsProfileModule = await ModuleModel.findOne({
            where: { name: 'UserProfileMain' },
          })
          if (existsProfileModule) {
            await usersModulesModel.create({
              id_user: user.id,
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
        }

        for await (let idContact of idContacts) {
          await UserContactsModel.create(
            {
              id_contact: idContact,
              id_user: user.id,
              is_active: true,
            },
            { transaction }
          )
        }
        await transaction.commit()
        return user as UserReturn
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    updateUser: async (
      _,
      { userID, input, addressId, inputAvatar, inputAddress, inputContact },
      context
    ) => {
      const transaction = await sequelize.transaction()
      try {
        if (context.roleId !== 1) {
          const isMaster = await User.findOne({
            where: { id: userID, id_role: 1, is_active: true },
          })
          if (isMaster) {
            await transaction.rollback()

            return Promise.reject(Error(userNotFound))
          }
        }

        const userFound = await User.findOne({ where: { id: userID } })
        if (!userFound) {
          await transaction.rollback()
          return Promise.reject(Error(userNotFound))
        }

        let {
          password,
          user_name,
          name,
          first_name,
          last_name,
          email: email_input,
          id_role,
          id_store,
          id_user_update: id_user_update_input,
        } = input

        let checkPass = password

        if (password === '1') {
          checkPass = userFound.password
        } else {
          const salt = await bcrypt.genSalt(10)
          checkPass = await bcrypt.hash(password, salt)
        }

        const checkUserUnique = await User.findOne({
          where: {
            [Op.or]: {
              email: email_input,
              user_name,
            },
            id: { [Op.not]: userID },

            is_active: true,
          },
          transaction,
        })
        if (checkUserUnique) {
          await transaction.rollback()
          return Promise.reject(Error(userEmailExists))
        }

        await User.update(
          {
            name,
            first_name,
            last_name,
            email: email_input,
            password: checkPass,
            user_name,
            id_role,
            id_store,
            id_user_update: id_user_update_input,
            is_active: true,
          },
          { where: { id: userID, is_active: true } }
        )

        const {
          street,
          external_number,
          internal_number,
          id_country,
          id_state,
          id_city,
          id_municipality,
          id_colony,
          zip_code,
          id_user_update: id_user_update_address,
        } = inputAddress

        await AddressesModel.update(
          {
            street,
            external_number,
            internal_number: internal_number || '',
            id_country,
            id_state,
            id_city,
            id_municipality,
            id_colony,
            zip_code,
            id_user_update: id_user_update_address,
            is_active: true,
          },
          { where: { id: addressId, is_active: true }, transaction }
        )

        const idContactsDestroy = await UserContactsModel.findAll({
          where: { id_user: userID },
          attributes: ['id_contact'],
        })

        for await (let idContactDestroy of idContactsDestroy) {
          await ContactsModel.destroy({
            where: { id: idContactDestroy.getDataValue('id_contact') },
            transaction,
          })
        }
        await UserContactsModel.destroy({
          where: { id_user: userID },
          transaction,
        })

        const idContacts = inputContact.map(async (contact) => {
          const {
            name,
            lastname,
            second_lastname,
            phone,
            ext,
            mobile,
            email,
            id_user_update,
          } = contact

          const createdContact = await ContactsModel.create(
            {
              name,
              lastname,
              second_lastname,
              phone,
              ext,
              mobile,
              email,
              id_user_update,
              is_active: true,
            },
            { transaction }
          )
          return createdContact.id as number
        })

        for await (let idContact of idContacts) {
          await UserContactsModel.create(
            {
              id_contact: idContact,
              id_user: userID,
              is_active: true,
            },
            { transaction }
          )
        }

        if (inputAvatar) {
          const userAvatar = await UploadFile({
            file: inputAvatar,
            type: 'img',
            userID: context.userId,
            transaction: transaction,
          })
          if (!userAvatar) {
            return Promise.reject(Error(defaultError))
          }
          await User.update(
            {
              id_avatar_file: userAvatar.id,
            },
            { where: { id: userID, is_active: true } }
          )

          const fileName = await FileModel.findOne({
            where: { is_active: true, id: userFound.id_avatar_file },
          })
          if (fileName) {
            const cleanStatus = await CleanPreviousFile({
              previous: fileName.url,
            })
            if (!cleanStatus) {
              await transaction.rollback()
              return Promise.reject(Error(defaultError))
            }
          } else {
            await transaction.rollback()
            return Promise.reject(Error(defaultError))
          }
        }

        await transaction.commit()

        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    deleteUser: async (_, { id, userId }) => {
      const transaction = await sequelize.transaction()
      try {
        const userFound = await User.findOne({ where: { id: id } })
        if (!userFound) {
          await transaction.rollback()
          return Promise.reject(Error(userNotFound))
        }
        await User.update(
          {
            is_active: false,
            id_user_delete: userId,
          },
          { where: { id: id, is_active: true }, transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    passwordUpdate: async (_, { id_user, currentPassword, password }) => {
      const transaction = await sequelize.transaction()
      try {
        const userFound = await User.findOne({ where: { id: id_user } })
        if (!userFound) {
          await transaction.rollback()
          return Promise.reject(Error(userNotFound))
        }
        const salt = await bcrypt.genSalt(10)

        const validatePassword = await new Promise(async (resolve) => {
          const validate = await bcrypt.compare(
            currentPassword,
            userFound.password
          )
          resolve(validate)
        })

        if (!validatePassword) {
          await transaction.rollback()
          return Promise.reject(Error(invalidPassword))
        }

        const checkPass = await bcrypt.hash(password, salt)
        await User.update(
          {
            password: checkPass,
          },
          { where: { id: id_user, is_active: true }, transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
    avatarUpdate: async (_, { id_user, avatar }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const userFound = await User.findOne({ where: { id: id_user } })
        if (!userFound) {
          await transaction.rollback()
          return Promise.reject(Error(userNotFound))
        }
        const avatarFound = await FileModel.findOne({
          where: { id: userFound.id_avatar_file, is_active: true },
        })

        if (avatarFound) {
          const userAvatar = await UploadFile({
            file: avatar,
            type: 'img',
            userID: context.userId,
            transaction: transaction,
          })
          if (!userAvatar) {
            await transaction.rollback()
            return Promise.reject(Error(defaultError))
          }
          await User.update(
            { id_avatar_file: userAvatar.id },
            { where: { id: id_user, is_active: true }, transaction }
          )
        }
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },

  addressesCatalog: {
    country: async ({ id_country }) => {
      return await CountryModel.findOne({
        where: { id: id_country, is_active: true },
      })
    },
    state: async ({ id_state }) => {
      return await StateModel.findOne({
        where: { id: id_state, is_active: true },
      })
    },
    city: async ({ id_city }) => {
      return await CityModel.findOne({
        where: { id: id_city, is_active: true },
      })
    },
    colony: async ({ id_colony }) => {
      return await ColonyModel.findOne({
        where: { id: id_colony, is_active: true },
      })
    },
    municipality: async ({ id_municipality }) => {
      return await MunicipalityModel.findOne({
        where: { id: id_municipality, is_active: true },
      })
    },
  },

  User: {
    address: async ({ id_address }) => {
      return await AddressesModel.findOne({
        where: { id: id_address, is_active: true },
      })
    },
    contacts: async ({ id }) => {
      return await UserContactsModel.findAll({
        where: { id_user: id, is_active: true },
      })
    },
    avatar: async ({ id_avatar_file }) => {
      return (await FileModel.findOne({
        where: { id: id_avatar_file, is_active: true },
      })) as unknown as TypeAvatar
    },
  },
  userContacts: {
    contact_data: async ({ id_contact }) => {
      return await ContactsModel.findOne({ where: { id: id_contact } })
    },
  },
}

export default UserResolver
