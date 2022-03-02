import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapItemsAttributes {
  id: number
  item_code: string | null
  item_name: string | null
  item_group_code: number | null
  item_code_bar: string | null
  purchase_pack_msr: string | null
  purchase_pack_un: number | null
  sal_pack_msr: string | null
  sal_pack_un: number | null
  indirect_tax: string | null
  card_code: string | null
  tax_code_ar: string | null
  tax_code_ap: string | null
  inventory_item: string | null
  sell_item: string | null
  purchase_item: string | null
  business_partner_id: number | null
  is_active: boolean
}

interface SapItemsCreationAttributes
  extends Optional<
    SapItemsAttributes,
    | 'id'
    | 'item_code'
    | 'item_name'
    | 'item_group_code'
    | 'item_code_bar'
    | 'purchase_pack_msr'
    | 'purchase_pack_un'
    | 'sal_pack_msr'
    | 'sal_pack_un'
    | 'indirect_tax'
    | 'card_code'
    | 'tax_code_ar'
    | 'tax_code_ap'
    | 'inventory_item'
    | 'sell_item'
    | 'purchase_item'
    | 'business_partner_id'
  > {}

class SapItems
  extends Model<SapItemsAttributes, SapItemsCreationAttributes>
  implements SapItemsAttributes
{
  public id!: number
  public item_code!: string
  public item_name!: string
  public item_group_code!: number
  public item_code_bar!: string
  public purchase_pack_msr!: string
  public purchase_pack_un!: number
  public sal_pack_msr!: string
  public sal_pack_un!: number
  public indirect_tax!: string
  public card_code!: string
  public tax_code_ar!: string
  public tax_code_ap!: string
  public inventory_item!: string
  public sell_item!: string
  public purchase_item!: string
  public business_partner_id!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapItems.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    item_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    item_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    item_group_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_code_bar: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    purchase_pack_msr: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    purchase_pack_un: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sal_pack_msr: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    sal_pack_un: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    indirect_tax: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N',
    },
    card_code: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    tax_code_ar: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    tax_code_ap: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    inventory_item: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y',
    },
    sell_item: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y',
    },
    purchase_item: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y',
    },
    business_partner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_items',
  }
)

export default SapItems
