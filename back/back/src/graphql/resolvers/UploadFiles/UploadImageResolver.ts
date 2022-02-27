import sequelize from '../../../db/connection'
import userPermissions from '../../../helpers/userPermissions'
import { Resolvers } from '../../generated'
import { GraphQLUpload } from 'graphql-upload'
import path from 'path'
import fs from 'fs'
import shortid from 'shortid'
import moment from 'moment'

const invalidPermissions = 'No tienes permiso para realizar esta acción'
const notLogged = 'No has iniciado sesión'
const invalidImageFormat = 'Solo se admiten imágenes'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const UploadImageResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {},
  Mutation: {
    uploadImage: async (_, { file }, context) => {
      try {
        const { createReadStream, mimetype } = await file
        if (!mimetype.includes('image')) {
          return Promise.reject(Error(invalidImageFormat))
        }
        const imageName = `img${shortid()}-${moment().format(
          'YYYYMMDDhmmss'
        )}.jpg`
        const stream = createReadStream()
        const pathName = path.join(
          __dirname,
          `./../../../../public/files/${imageName}`
        )
        await stream.pipe(fs.createWriteStream(pathName))
        return { url: `http://localhost:4000/files/${imageName}` }
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    uploadFile: async (_, { file }, context) => {
      try {
        if (!context.isAuth) {
          return Promise.reject(Error(notLogged))
        }
        const havePermissions = await userPermissions({
          _path: context.path,
          _userId: context.userId,
          _permissionType: 'retrieve',
        })
        if (!havePermissions) {
          return Promise.reject(Error(invalidPermissions))
        }

        const { createReadStream, mimetype } = await file
        const imageName = `doc${shortid()}-${moment().format(
          'YYYYMMDDhmmss'
        )}.jpg`
        const stream = createReadStream()
        const pathName = path.join(
          __dirname,
          `./../../../../public/files/${imageName}`
        )

        await stream.pipe(fs.createWriteStream(pathName))
        return { url: `http://localhost:4000/files/${imageName}` }
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default UploadImageResolver
