import sequelize from '../../../../../db/connection'
import SapPartnerGroup from '../../../../../models/Catalogs/SAP/PartnerGroup/SapPartnerGroupModel'
import { Resolvers } from '../../../../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapPartnerGroupResolver: Resolvers = {
  Query: {
    getSapPartnerGroup: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapPartnerGroup.findAll(clause)
    },
  },
}

export default SapPartnerGroupResolver