import sequelize from '../../../../db/connection'
import InternalNotes from '../../../../models/Catalogs/InternalNotes/InternalNotesModel'
import User from '../../../../models/Users/UserModel'
import FileModel from '../../../../models/Files/FileModel'
import { Resolvers, TypeFile } from '../../../generated'
import { GraphQLUpload } from 'graphql-upload'
import { UploadDocument, getFile } from '../../../../helpers/UploadFile'
import moment from 'moment'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const internalNotesResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getInternalNotes: async (_, { orderId }) => {
      const clause: any = {
        where: {
          is_active: true,
          order_id: orderId,
        },
        order: [['createdAt', 'ASC']],
      }

      return await InternalNotes.findAll(clause)
    },
  },
  Mutation: {
    createInternalNote: async (_, { inputInternalNote }) => {
      const transaction = await sequelize.transaction()
      try {
        const { order_id, user_id, text, type, file } = inputInternalNote

        let typeFile = type
        if (type === 'jpg' || type === 'png' || type === 'jpeg')
          typeFile = 'image'

        if (file) {
          const documentInternal = await UploadDocument({
            file,
            type,
            userID: user_id,
            transaction,
          })

          if (!documentInternal) {
            return Promise.reject(Error(defaultError))
          }

          await InternalNotes.create(
            {
              user_id,
              order_id,
              text,
              type: typeFile,
              file_id: documentInternal.id,
              createdAt: moment().format(),
              is_active: true,
            },
            { transaction }
          )
          await transaction.commit()
          return true
        }

        await InternalNotes.create(
          {
            user_id,
            order_id,
            text,
            type: typeFile,
            file_id: null,
            createdAt: moment().format(),
            is_active: true,
          },
          { transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
  InternalNotes: {
    user: async ({ user_id }) => {
      return await User.findOne({ where: { id: user_id } })
    },
    fileInternal: async ({ file_id }) => {
      const file = await FileModel.findOne({ where: { id: file_id } })
      if (file) {
        const url = await getFile(file.url)
        return { id: file.id, url: url } as TypeFile
      } else {
        return null
      }
    },
  },
}

export default internalNotesResolver
