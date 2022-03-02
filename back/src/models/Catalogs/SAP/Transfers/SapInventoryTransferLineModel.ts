import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'
interface InventoryTransferLineAttributes {
  id: number
  inventory_transfer_id: number | null
  line_num: number | null
  item_code: string | null
  target_type: string | null
  doc_entry: string | null
  target_entry: string | null
  line_status: string | null
  quantity: number | null
  open_quantity: number | null
  price: number | null
  disc_pront: number | null
  line_total: number | null
  tax_code: string | null
  whs_code: string | null
  ieps: number | null
  iva: number | null
  total: number | null
  is_active: boolean
}
interface InventoryTransferLineCreationAttributes
  extends Optional<
    InventoryTransferLineAttributes,
    | 'id'
    | 'inventory_transfer_id'
    | 'line_num'
    | 'item_code'
    | 'target_type'
    | 'doc_entry'
    | 'target_entry'
    | 'line_status'
    | 'quantity'
    | 'open_quantity'
    | 'price'
    | 'disc_pront'
    | 'line_total'
    | 'tax_code'
    | 'whs_code'
    | 'ieps'
    | 'iva'
    | 'total'
    | 'is_active'
  > {}
class InventoryTransferLine
  extends Model<
    InventoryTransferLineAttributes,
    InventoryTransferLineCreationAttributes
  >
  implements InventoryTransferLineAttributes
{
  public id!: number
  public inventory_transfer_id!: number
  public line_num!: number
  public item_code!: string
  public target_type!: string
  public doc_entry!: string
  public target_entry!: string
  public line_status!: string
  public quantity!: number
  public open_quantity!: number
  public price!: number
  public tax_code!: string
  public disc_pront!: number
  public line_total!: number
  public whs_code!: string
  public ieps!: number
  public iva!: number
  public total!: number

  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
InventoryTransferLine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inventory_transfer_id: {
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
    target_entry: {
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
    open_quantity: {
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
    disc_pront: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    line_total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    whs_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ieps: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    iva: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_inventory_transfer_lines',
  }
)

export default InventoryTransferLine
