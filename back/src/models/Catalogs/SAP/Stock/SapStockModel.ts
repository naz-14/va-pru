import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface StocksAttributes {
  id: number
  item_code: string | null
  warehouse_code: string | null
  on_hand: number | null
  is_commit: number | null
  on_order: number | null
  consignation: number | null
  counted: number | null
  was_counted: string | null
  min_stock: number | null
  max_stock: number | null
  locked: string | null
  is_active: boolean
}
interface StocksCreationAttributes
  extends Optional<
    StocksAttributes,
    | 'id'
    | 'item_code'
    | 'warehouse_code'
    | 'on_hand'
    | 'is_commit'
    | 'on_order'
    | 'consignation'
    | 'counted'
    | 'was_counted'
    | 'min_stock'
    | 'max_stock'
    | 'locked'
  > {}
class Stocks
  extends Model<StocksAttributes, StocksCreationAttributes>
  implements StocksAttributes
{
  public id!: number
  public item_code!: string | null
  public warehouse_code!: string | null
  public on_hand!: number | null
  public is_commit!: number | null
  public on_order!: number | null
  public consignation!: number | null
  public counted!: number | null
  public was_counted!: string | null
  public min_stock!: number | null
  public max_stock!: number | null
  public locked!: string | null
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Stocks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warehouse_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    on_hand: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_commit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    on_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    consignation: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    counted: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    was_counted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_stock: {
      type: DataTypes.INTEGER,
    },
    max_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    locked: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_stocks',
  }
)

export default Stocks
