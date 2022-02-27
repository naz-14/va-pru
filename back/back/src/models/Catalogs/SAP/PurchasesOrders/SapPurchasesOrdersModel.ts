import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapPurchasesOrdersAttributes {
  id: number
  business_partner_id: number | null
  doc_date: string | null
  doc_due_date: string | null
  num_at_card: string | null
  doc_total: number | null
  comments: string | null
  status: number | null
  doc_num: number | null
  doc_entry: number | null
  series: number | null
  series_name: string | null
  price_list: number | null
  disc_prcnt: number | null
  is_active: boolean
}

interface SapPurchasesOrdersCreationAttributes
  extends Optional<
    SapPurchasesOrdersAttributes,
    | 'id'
    | 'business_partner_id'
    | 'doc_date'
    | 'doc_due_date'
    | 'num_at_card'
    | 'doc_total'
    | 'comments'
    | 'status'
    | 'doc_num'
    | 'doc_entry'
    | 'series'
    | 'series_name'
    | 'price_list'
    | 'disc_prcnt'
  > {}

class SapPurchasesOrders
  extends Model<
    SapPurchasesOrdersAttributes,
    SapPurchasesOrdersCreationAttributes
  >
  implements SapPurchasesOrdersAttributes
{
  public id!: number
  public business_partner_id!: number
  public doc_date!: string
  public doc_due_date!: string
  public num_at_card!: string
  public doc_total!: number
  public comments!: string
  public status!: number
  public doc_num!: number
  public doc_entry!: number
  public series!: number
  public series_name!: string
  public price_list!: number
  public disc_prcnt!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapPurchasesOrders.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    business_partner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doc_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_due_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_at_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doc_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doc_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    series: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    series_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_list: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    disc_prcnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_purchases_orders',
  }
)

export default SapPurchasesOrders
