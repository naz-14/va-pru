import { Resolvers } from '../../../generated'
import AppUser from '../../../../models/Users/AppUser'
import AppUserTypes from '../../../../models/Users/AppUserTypes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import sequelize from '../../../../db/connection'
import User from '../../../../models/Users/UserModel'
import StoreModel from '../../../../models/Catalogs/Stores/StoreModel'

const AppUserResolver: Resolvers = {
  Query: {
    getAllAppUsers: async (_, { searchQuery, limit, offset }, context) => {
      const clause: any = {
        where: { is_active: true },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      if (searchQuery) {
        clause.where[Op.or] = [
          // { status_id: { [Op.like]: `%${searchQuery}%` } },
          // { method_id: { [Op.like]: `%${searchQuery}%` } },
        ]
      }

      return Promise.resolve(await AppUser.findAndCountAll(clause))
    },
    getAppUser: async (_, { id }, context) => {
      return Promise.resolve(await AppUser.findByPk(id))
    },
  },
  Mutation: {
    createAppUser: async (_, { input }, context) => {
      try {
        let { password } = input
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        await AppUser.create({
          ...input,
          password,
          id_user_update: context.userId,
          is_active: true,
        })
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    updateAppUser: async (_, { id, input }, context) => {
      try {
        let { password } = input
        if (password) {
          const salt = await bcrypt.genSalt(10)
          password = await bcrypt.hash(password, salt)
        }
        const user = await AppUser.findByPk(id)
        await user?.update({
          ...input,
          id_user_update: context.userId,
          password: password || user.password,
        })
        await user?.save()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    authAppUser: async (_, { username, password }, context) => {
      try {
        const user = await AppUser.findOne({
          where: { [Op.or]: [{ username }, { email: username }] },
        })
        if (user) {
          const validPass = bcrypt.compareSync(password, user.password)
          if (!validPass) {
            return Promise.reject(Error('Invalid Password'))
          }
          return jwt.sign(
            {
              id: user.id,
              username: user.username,
              name: user.name,
              email: user.email,
              id_type: user.id_type,
            },
            `${process.env.SECRET_KEY}`,
            { expiresIn: '24h' }
          )
        }
        return Promise.reject(Error('Invalid Username or Password'))
      } catch (e) {
        return Promise.reject(Error('Invalid Username or Password'))
      }
    },
    deleteAppUser: async (_, { id }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const userFound = await AppUser.findOne({ where: { id: id } })
        const userId = context.userId
        if (!userFound) {
          await transaction.rollback()
          return Promise.reject(Error('Usuario no encontrado'))
        }
        await AppUser.update(
          {
            is_active: false,
            id_user_update: userId,
          },
          { where: { id: id, is_active: true }, transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error('Algo salio mal'))
      }
    },
  },
  AppUser: {
    userType: async ({ id_type }) => {
      return await AppUserTypes.findOne({ where: { id: id_type } })
    },
  },
}

export default AppUserResolver
