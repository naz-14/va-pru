import sequelize from '../../../../db/connection'
import { Resolvers } from '../../../generated'
import { ApiSapReceiver } from '../../../../helpers/ApiSapReceiver'

import SapPurchasesOrdersLines from '../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel'
import ScheduleOrdersLines from '../../../../models/Documents/ScheduleOrdersLines/ScheduleOrdersLinesModel'
import SapBusinessPartner from '../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel'
import SapPurchasesOrders from '../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel'
import Schedule from '../../../../models/Documents/Schedule/ScheduleModel'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus'
const ScheduleOrdersLinesResolver: Resolvers = {
  Query: {
    getQuotesOrdersLines: async (_, {}) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      // if (limit !== null && offset !== null) {
      //   clause.offset = offset
      //   clause.limit = limit
      // }
      return await ScheduleOrdersLines.findAll(clause)
    },
  },
  Mutation:{
    getScheduleOrdersLinesByScheduleId: async (_, {scheduleId}) => {
      const clause: any = {
        where: {
          schedule_id: scheduleId,
          is_active: 1,
        },
      }

      return await ScheduleOrdersLines.findAll(clause)
    },
  },
  QuotesOrdersLines: {
    business_partner: async ({ business_partner_id }) => {
      return await SapBusinessPartner.findOne({
        where: {
          id: business_partner_id,
          is_active:1,
        },
      })
    },
    purchases_orders: async ({ sap_purchases_orders_id }) => {
      return await SapPurchasesOrders.findOne({
        where: {
          id: sap_purchases_orders_id,
          is_active:1,
        },
      })
    },
    purchases_orders_lines: async ({ sap_purchases_orders_lines_id }) => {
      return await SapPurchasesOrdersLines.findOne({
        where: {
          id: sap_purchases_orders_lines_id,
          is_active:1,
        },
      })
    },
    schedule:async ({ schedule_id }) => {
      return await Schedule.findOne({
        where: {
          id: schedule_id,
          is_active:1,
        },
      })
    },
  },
}
export default ScheduleOrdersLinesResolver
