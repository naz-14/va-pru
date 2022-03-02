import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapPurchasesOrdersLinesAttributes {
  id: number
  purchases_order_id: number | null
  line_number: number | null
  item_code: string | null
  target_type: number | null
  document_entry: number | null
  target_entry: number | null
  line_status: string | null
  quantity: number | null
  open_quantity: number | null
  price: number | null
  tax_code: string | null
  disc_prcnt: number | null
  line_total: number | null
  warehouses_code: number | null
  ieps: number | null
  iva: number | null
  total: number | null
  is_active: boolean
}

interface SapPurchasesOrdersLinesCreationAttributes
  extends Optional<
    SapPurchasesOrdersLinesAttributes,
    | 'id'
    | 'purchases_order_id'
    | 'line_number'
    | 'item_code'
    | 'target_type'
    | 'document_entry'
    | 'target_entry'
    | 'line_status'
    | 'quantity'
    | 'open_quantity'
    | 'price'
    | 'tax_code'
    | 'disc_prcnt'
    | 'line_total'
    | 'warehouses_code'
    | 'ieps'
    | 'iva'
    | 'total'
  > {}

class SapPurchasesOrdersLines
  extends Model<
    SapPurchasesOrdersLinesAttributes,
    SapPurchasesOrdersLinesCreationAttributes
  >
  implements SapPurchasesOrdersLinesAttributes
{
  public id!: number
  public purchases_order_id!: number
  public line_number!: number
  public item_code!: string
  public target_type!: number
  public document_entry!: number
  public target_entry!: number
  public line_status!: string
  public quantity!: number
  public open_quantity!: number
  public price!: number
  public tax_code!: string
  public disc_prcnt!: number
  public line_total!: number
  public warehouses_code!: number
  public ieps!: number
  public iva!: number
  public total!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapPurchasesOrdersLines.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    purchases_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    target_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    document_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    target_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_status: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    open_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    tax_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disc_prcnt: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    line_total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    warehouses_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ieps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    iva: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total: {
      type: DataTypes.DOUBLE,
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
    tableName: 'catalog_sap_purchases_orders_lines',
  }
)

export default SapPurchasesOrdersLines
