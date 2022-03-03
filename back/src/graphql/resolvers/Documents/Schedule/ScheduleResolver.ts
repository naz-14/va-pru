import sequelize from '../../../../db/connection'
import { Resolvers } from '../../../generated'

import OrderStatus from '../../../../models/Catalogs/Orders/OrderStatusModel'
import { ApiSapReceiver } from '../../../../helpers/ApiSapReceiver'
import SapPurchasesOrders from '../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel'
import SapBusinessPartner from '../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel'
import SapPurchasesOrdersLines from '../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel'
import SapItems from '../../../../models/Catalogs/SAP/Items/SapItemsModel'
import Docks from '../../../../models/Catalogs/Docks/DocksModel'
import SapWarehouses from '../../../../models/Catalogs/SAP/Warehouses/SapWarehousesModel'
import Schedule from '../../../../models/Documents/Schedule/ScheduleModel'
import ScheduleOrdersLines from '../../../../models/Documents/ScheduleOrdersLines/ScheduleOrdersLinesModel'
import ScheduleDocks from '../../../../models/Documents/ScheduleDocks/ScheduleDocksModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus'
const schedulNotFound = 'No se encontro esta cita o ha cambiado de estatus'
const ScheduleResolver: Resolvers = {
  Query: {
    getSchedule: async (_, {}) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      return await Schedule.findAll(clause)
    },
    getSapPurchasesOrdersQuotes: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }
      return await SapPurchasesOrders.findAndCountAll(clause)
    },
    getSapPurchasesOrdersQuotesById: async (_, { idPurcharseOrder }) => {
      const clause: any = {
        where: {
          is_active: 1,
          id: idPurcharseOrder,
        },
      }
      const order = await SapPurchasesOrders.findOne(clause)
      if (!order) return Promise.reject(Error(orderNotFound))
      else return order
    },
  },
  Mutation: {
    createSchedule: async (_, { inputSchedule }) => {
      const transaction = await sequelize.transaction()
      const {
        dock_ids,
        document_date,
        document_time_start,
        document_time_end,
        comments,
        warehouse_code,
        document_status_id,
        ordersReceived,
        provider_id,
      } = inputSchedule

      try {
        /* CREATE NEW SCHEDULE */
        const scheduleCreated = await Schedule.create(
          {
            document_date,
            document_time_start,
            document_time_end,
            comments,
            warehouse_code,
            document_status_id,
            is_active: true,
          },
          { transaction }
        )
        /* CREATE DOCUMENT SCHEDULE ORDERS LINE */
        for (const order of ordersReceived) {
          await ScheduleOrdersLines.create(
            {
              business_partner_id:provider_id,
              schedule_id:scheduleCreated.id,
              sap_purchases_orders_id:order.purcharse_order_id,
              sap_purchases_orders_lines_id:order.id_order,
              is_active: true,
            },
            { transaction }
          )
        }
        /* CREATE DOCUMENT SCHEDULS DOCKS */
        for(const dock of dock_ids){
          await ScheduleDocks.create(
            {
              schedule_id:scheduleCreated.id,
              dock_id: dock.value,
              is_active: true,
            },
            { transaction }
          )
        }

        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Schedule: {
    status: async ({ document_status_id }) => {
      return await OrderStatus.findOne({ where: { id: document_status_id } })
    },
    warehouse: async ({ warehouse_code }) => {
      return await SapWarehouses.findOne({ where: { warehouse_code: warehouse_code } })
    },
    scheduleLines: async ({ id }) => {
      return await ScheduleOrdersLines.findAll({ where: { schedule_id: id } })
    },
  },
  SapPurchasesOrdersQuotes: {
    business_partner: async ({ business_partner_id }) => {
      return await SapBusinessPartner.findOne({
        where: {
          id: business_partner_id,
        },
      })
    },
  },
  SapPurchasesOrdersQuotesById: {
    business_partner: async ({ business_partner_id }) => {
      return await SapBusinessPartner.findOne({
        where: {
          id: business_partner_id,
        },
      })
    },
    purchases_orders_lines: async ({ id }) => {
      return await SapPurchasesOrdersLines.findAll({
        where: {
          purchases_order_id: id,
        },
      })
    },
  },
}
export default ScheduleResolver
