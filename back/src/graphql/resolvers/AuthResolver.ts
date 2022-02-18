import { Resolvers } from '../generated'
import User from '../../models/Users/UserModel'
import FileModel from '../../models/Files/FileModel'
import StoreModel from '../../models/Catalogs/Stores/StoreModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface tokenDecrypted {
  id: number
  user_name: string
  name: string
  first_name: string
  last_name: string
  email: string
  role: number
  store: string
  id_store: number
  avatar: string
  iat: number
  exp: number
}

interface tokenDecryptedApp {
  id: number
  username: string
  name: string
  email: string
  id_type: number
  iat: number
  exp: number
}

require('dotenv').config()

const userNotFound = 'No se encontro este usuario'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const wrongPassword = 'Usuario o contraseña incorrecta'

const AuthResolver: Resolvers = {
  Mutation: {
    authUser: async (_, { input }) => {
      try {
        const { password, userName } = input
        const userFound = await User.findOne({ where: { user_name: userName } })
        if (!userFound) {
          return Promise.reject(Error(userNotFound))
        }
        const storeFound = await StoreModel.findOne({
          where: { id: userFound.id_store },
        })
        const avatar = await FileModel.findOne({
          where: { id: userFound.id_avatar_file },
        })
        const validPass = await bcrypt.compareSync(password, userFound.password)
        if (!validPass) {
          return Promise.reject(Error(wrongPassword))
        }
        const token = jwt.sign(
          {
            user_name: userName,
            id: userFound.id,
            name: userFound.name,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
            role: userFound.id_role,
            id_store: storeFound?.id,
            store: storeFound?.name,
            avatar: avatar?.url,
          },
          `${process.env.SECRET_KEY}`,
          { expiresIn: '24h' }
        )
        return {
          token,
        }
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    decryptToken: async (_, { token }) => {
      return jwt.verify(token, `${process.env.SECRET_KEY}`) as tokenDecrypted
    },
    decryptTokenApp: async (_, { token }) => {
      return jwt.verify(token, `${process.env.SECRET_KEY}`) as tokenDecryptedApp
    },
  },
}

export default AuthResolver
