import sequelize from '../../../../../db/connection'
import { Resolvers } from '../../../../generated'
import SapListPricesItems from '../../../../../models/Catalogs/SAP/ListPricesItems/SapListPricesItemsModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapListPricesItemsResolver: Resolvers = {
  Query: {
    getSapListPricesItems: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapListPricesItems.findAll(clause)
    },
  },
}

export default SapListPricesItemsResolver
