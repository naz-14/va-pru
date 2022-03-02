import sequelize from '../../../../../db/connection'
import SapBusinessPartner from '../../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel'
import { Resolvers } from '../../../../generated'
import SapPartnerGroup from '../../../../../models/Catalogs/SAP/PartnerGroup/SapPartnerGroupModel'
import SapListPrices from '../../../../../models/Catalogs/SAP/ListPrices/SapListPricesModel'
import SapNumberGroups from '../../../../../models/Catalogs/SAP/NumberGroups/SapNumberGroupsModel'
import SapPurchasesOrders from '../../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapBusinessPartnerResolver: Resolvers = {
  Query: {
    getSapBusinessPartner: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
          card_type: 'S'
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapBusinessPartner.findAndCountAll(clause)
    },
  },
  Mutation:{
    getSapBusinessPartnerSellerById: async (_, { idBusinessPartner }) => {
      const clause: any = {
        where: {
          is_active: 1,
          card_type: 'S',
          id:idBusinessPartner
        },
      }

      return await SapBusinessPartner.findOne(clause)
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
