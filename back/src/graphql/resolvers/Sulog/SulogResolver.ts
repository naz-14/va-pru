import { Resolvers } from '../../generated'
import sequelize from '../../../db/connection'
import Sulog from '../../../models/Sulog/SulogModel'
import ApiSapReceiver from '../../../helpers/ApiSapReceiver'

const documentNotFound = 'El numero de documento no existe'
const documentWasNotCreated = 'No se puedo crear el documento'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SulogResolver: Resolvers = {
  Query: {
    // getAllSulogDocs: async (_, {}) => {
    //   return Sulog.findAll()
    // },
    // getOneSulogDoc: async (_, { id }) => {
    //   return Sulog.findOne({ where: { id } })
    // },
  },
  Mutation: {
    createSulogDoc: async (_, { ordersId }) => {
      const transaction = await sequelize.transaction()
      try {
        const data = ordersId.map((order) => {
          return {
            order_id: order,
            key: order.toString(),
            name: 'createOrder',
            values: {
              order_id: order,
            },
          }
        })
        const sulogCreate = await ApiSapReceiver(data)

        if (!sulogCreate) {
          await transaction.rollback()
          return Promise.reject(Error(documentWasNotCreated))
        }

        // const { cardCode, cardName, docDate, comments, numAtCard } = sulogCreate

        // const newDoc = await Sulog.create(
        //   {
        //     cardCode,
        //     cardName,
        //     docDate,
        //     comments,
        //     numAtCard,
        //   },
        //   { transaction }
        // )

        await transaction.commit()
        return sulogCreate as any
      } catch (error: any) {
        await transaction.rollback()
        return Promise.reject(Error(error.message))
      }
    },
  },
}

export default SulogResolver
