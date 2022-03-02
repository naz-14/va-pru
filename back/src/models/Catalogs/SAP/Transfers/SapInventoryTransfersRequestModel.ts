import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface InventoryTransferRequestAttributes {
  id: number
  doc_date: string | null
  doc_due_date: string | null
  doc_num: string | null
  num_at_card: string | null
  doc_total: number | null
  comments: string | null
  status: number | null
  doc_entry: number | null
  series: number | null
  series_name: string | null
  price_list: string | null
  disc_prcnt: number | null
  from_whs_code: string | null
  to_whs_code: string | null
  is_active: boolean
}
interface InventoryTransferRequestCreationAttributes
  extends Optional<
    InventoryTransferRequestAttributes,
    | 'id'
    | 'doc_date'
    | 'doc_due_date'
    | 'doc_num'
    | 'num_at_card'
    | 'doc_total'
    | 'comments'
    | 'status'
    | 'doc_entry'
    | 'series'
    | 'series_name'
    | 'price_list'
    | 'disc_prcnt'
    | 'from_whs_code'
    | 'to_whs_code'
    | 'is_active'
  > {}
class InventoryTransferRequest
  extends Model<
    InventoryTransferRequestAttributes,
    InventoryTransferRequestCreationAttributes
  >
  implements InventoryTransferRequestAttributes
{
  public id!: number
  public doc_date!: string
  public doc_due_date!: string
  public doc_num!: string
  public num_at_card!: string
  public doc_total!: number
  public comments!: string
  public status!: number
  public doc_entry!: number
  public series!: number
  public series_name!: string
  public price_list!: string
  public disc_prcnt!: number
  public from_whs_code!: string
  public to_whs_code!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
InventoryTransferRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doc_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_due_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_num: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_at_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_total: {
      type: DataTypes.DOUBLE,
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
    doc_entry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    series: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    from_whs_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to_whs_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_inventory_transfer_request',
  }
)

export default InventoryTransferRequest
