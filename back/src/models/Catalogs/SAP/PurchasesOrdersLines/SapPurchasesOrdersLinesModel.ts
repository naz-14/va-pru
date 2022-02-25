import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapPurchasesOrdersLinesAttributes {
  id: number
  purcharse_order_id: number | null
  line_num: number | null
  item_code: string | null
  target_type: string | null
  doc_entry: number | null
  trget_entry: number | null
  line_status: number | null
  quantity: number | null
  open_qty: number | null
  price: number | null
  tax_code: string | null
  disc_prcnt: number | null
  line_total: number | null
  whs_code: string | null
  ieps: number | null
  iva: number | null
  total: number | null
  is_active: boolean
}

interface SapPurchasesOrdersLinesCreationAttributes
  extends Optional<
    SapPurchasesOrdersLinesAttributes,
    | 'id'
    | 'purcharse_order_id'
    | 'line_num'
    | 'item_code'
    | 'target_type'
    | 'doc_entry'
    | 'trget_entry'
    | 'line_status'
    | 'quantity'
    | 'open_qty'
    | 'price'
    | 'tax_code'
    | 'disc_prcnt'
    | 'line_total'
    | 'whs_code'
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
  public purcharse_order_id!: number
  public line_num!: number
  public item_code!: string
  public target_type!: string
  public doc_entry!: number
  public trget_entry!: number
  public line_status!: number
  public quantity!: number
  public open_qty!: number
  public price!: number
  public tax_code!: string
  public disc_prcnt!: number
  public line_total!: number
  public whs_code!: string
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
    purcharse_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trget_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    open_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tax_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disc_prcnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    whs_code: {
      type: DataTypes.STRING,
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
    tableName: 'catalog_sap_purchases_orders_lines',
  }
)

export default SapPurchasesOrdersLines
