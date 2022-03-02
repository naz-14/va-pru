import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapPurchasesOrdersAttributes {
  id: number
  business_partner_id: number | null
  document_date: string | null
  document_due_date: string | null
  number_at_card: string | null
  document_total: number | null
  comments: string | null
  document_status: string | null
  document_number: number | null
  document_entry: number | null
  series: number | null
  disc_prcnt: number | null
  is_active: boolean
}

interface SapPurchasesOrdersCreationAttributes
  extends Optional<
    SapPurchasesOrdersAttributes,
    | 'id'
    | 'business_partner_id'
    | 'document_date'
    | 'document_due_date'
    | 'number_at_card'
    | 'document_total'
    | 'comments'
    | 'document_status'
    | 'document_number'
    | 'document_entry'
    | 'series'
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
  public document_date!: string
  public document_due_date!: string
  public number_at_card!: string
  public document_total!: number
  public comments!: string
  public document_status!: string
  public document_number!: number
  public document_entry!: number
  public series!: number
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
    document_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_due_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number_at_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_status: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    document_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    document_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    series: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    disc_prcnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:false,
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
