import sequelize from '../../../../../db/connection'
import SapNumberGroups from '../../../../../models/Catalogs/SAP/NumberGroups/SapNumberGroupsModel'
import { Resolvers } from '../../../../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapNumberGroupsResolver: Resolvers = {
  Query: {
    getSapNumberGroups: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapNumberGroups.findAll(clause)
    },
  },
}

export default SapNumberGroupsResolver