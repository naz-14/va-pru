import sequelize from '../../../../../db/connection'
import SapWarehouses from '../../../../../models/Catalogs/SAP/Warehouses/SapWarehousesModel'
import { Resolvers } from '../../../../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapWarehousesResolver: Resolvers = {
  Query: {
    getSapWarehouses: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapWarehouses.findAll(clause)
    },
  },
}

export default SapWarehousesResolver