import { Op } from 'sequelize'
import SapItems from '../../../../../models/Catalogs/SAP/Items/SapItemsModel'
import SapStocks from '../../../../../models/Catalogs/SAP/Stock/SapStockModel'
import { Resolvers } from '../../../../generated'

SapStocks.hasMany(SapItems, { foreignKey: 'item_code', constraints: false })

const SapProducts: Resolvers = {
  Query: {},
  Mutation: {
    getProductSap: async (_, { warehouseCode, searchQuery }) => {
      let list = [] as any

      const clause: any = {
        where: { warehouse_code: warehouseCode, locked: 'N' },
        include: [
          {
            model: SapItems,
            on: {
              item_code: { [Op.col]: 'Stocks.item_code' },
              [Op.or]: [
                { item_code: { [Op.like]: `%${searchQuery}%` } },
                { item_name: { [Op.like]: `%${searchQuery}%` } },
                { item_code_bar: { [Op.like]: `%${searchQuery}%` } },
              ],
            },
          },
        ],
      }

      const result = await SapStocks.findAll(clause)

      result.map((item: any) => {
        item.SapItems.map((product: any) => {
          list.push({
            id: item.dataValues.id,
            item_code: item.dataValues.item_code,
            warehouse_code: item.dataValues.warehouse_code,
            on_hand: item.dataValues.on_hand,
            is_commit: item.dataValues.is_commit,
            on_order: item.dataValues.on_order,
            consignation: item.dataValues.consignation,
            counted: item.dataValues.counted,
            min_stock: item.dataValues.min_stock,
            was_counted: item.dataValues.was_counted,
            max_stock: item.dataValues.max_stock,
            locked: item.dataValues.locked,
            SapItem_id: product.dataValues.id,
            SapItem_item_code: product.dataValues.item_code,
            SapItem_item_name: product.dataValues.item_name,
            SapItem_item_code_bar: product.dataValues.item_code_bar,
            SapItem_item_group_code: product.dataValues.item_group_code,
            SapItem_purchase_pack_msr: product.dataValues.purchase_pack_msr,
            SapItem_purchase_pack_un: product.dataValues.purchase_pack_un,
            SapItem_sal_pack_msr: product.dataValues.sal_pack_msr,
            SapItem_sal_pack_un: product.dataValues.sal_pack_un,
            SapItem_indirect_tax: product.dataValues.indirect_tax,
            SapItem_card_code: product.dataValues.card_code,
            SapItem_tax_code_ar: product.dataValues.tax_code_ar,
            SapItem_tax_code_ap: product.dataValues.tax_code_ap,
            SapItem_inventory_item: product.dataValues.inventory_item,
            SapItem_sell_item: product.dataValues.sell_item,
            SapItem_purchase_item: product.dataValues.purchase_item,
            SapItem_business_partner_id: product.dataValues.business_partner_id,
          })
        })
      })
      return list
    },
  },
}

export default SapProducts
