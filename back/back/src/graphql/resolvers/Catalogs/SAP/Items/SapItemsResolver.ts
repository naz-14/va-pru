import sequelize from '../../../../../db/connection'
import SapItems from '../../../../../models/Catalogs/SAP/Items/SapItemsModel'
import { Resolvers } from '../../../../generated'
import SapBusinessPartner from '../../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapItemsResolver: Resolvers = {
  Query: {
    getSapItems: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapItems.findAll(clause)
    },
  },
  SapItems: {
    business_partner: async ({ business_partner_id }) => {
      return await SapBusinessPartner.findOne({
        where: {
          id: business_partner_id,
        },
      })
    },
  },
}

export default SapItemsResolver
