import sequelize from '../../../../../db/connection'
import SapListPrices from '../../../../../models/Catalogs/SAP/ListPrices/SapListPricesModel'
import { Resolvers } from '../../../../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapListPricesResolver: Resolvers = {
  Query: {
    getSapListPrices: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapListPrices.findAll(clause)
    },
  },
}

export default SapListPricesResolver
