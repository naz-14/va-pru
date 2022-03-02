import sequelize from '../../../../../db/connection'
import SapPurchasesOrdersLines from '../../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel'
import { Resolvers } from '../../../../generated'
import SapPurchasesOrders from '../../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel'
import SapItems from '../../../../../models/Catalogs/SAP/Items/SapItemsModel'
import { Op, where } from 'sequelize'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapPurchasesOrdersLinesResolver: Resolvers = {
  Query: {
    getSapPurchasesOrdersLines: async (_, { limit, offset }) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }

      if (limit !== null && offset !== null) {
        clause.offset = offset
        clause.limit = limit
      }

      return await SapPurchasesOrdersLines.findAll(clause)
    },
  },
  Mutation:{
    getSapPurchasesOrdersLinesByPurchaseOrdersId: async (_, { purchasesOrdersId }) => {
      const clause: any = {
        where: {
          is_active: true,
        },
      }

      if(purchasesOrdersId){
        const newClause = purchasesOrdersId.map((id) => {
          return { purchases_order_id : id }
        })
        clause.where[Op.or] = newClause
      }


      return await SapPurchasesOrdersLines.findAll(clause);
    },
  },
  SapPurchasesOrdersLines: {
    purchase_order: async ({ purchases_order_id }) => {
      return await SapPurchasesOrders.findOne({
        where: {
          id: purchases_order_id,
        },
      })
    },
    item: async ({ item_code }) => {
      return await SapItems.findOne({
        where: {
          item_code:item_code,
        },
      })
    },
  },
}

export default SapPurchasesOrdersLinesResolver
