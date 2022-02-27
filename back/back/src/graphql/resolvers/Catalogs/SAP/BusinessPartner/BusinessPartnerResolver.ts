import sequelize from '../../../../../db/connection'
import SapBusinessPartner from '../../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel'
import { Resolvers } from '../../../../generated'
import SapPartnerGroup from '../../../../../models/Catalogs/SAP/PartnerGroup/SapPartnerGroupModel'
import SapListPrices from '../../../../../models/Catalogs/SAP/ListPrices/SapListPricesModel'
import SapNumberGroups from '../../../../../models/Catalogs/SAP/NumberGroups/SapNumberGroupsModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapBusinessPartnerResolver: Resolvers = {
  Query: {
    getSapBusinessPartner: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapBusinessPartner.findAll(clause)
    },
  },
  SapBusinessPartner: {
    partner_group: async ({ group_code }) => {
      return await SapPartnerGroup.findOne({
        where: {
          id: group_code,
        },
      })
    },
    list: async ({ list_number }) => {
      return await SapListPrices.findOne({
        where: {
          id: list_number,
        },
      })
    },
    group: async ({ group_number }) => {
      return await SapNumberGroups.findOne({
        where: {
          id: group_number,
        },
      })
    },
  },
}

export default SapBusinessPartnerResolver
