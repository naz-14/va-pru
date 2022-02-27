import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface WarehouseOrderBoxesAttributes {
  id: number
  warehouse_order_id: number
  box_id: number
  quantity: number
  is_active: Boolean
}

interface WarehouseOrderBoxesCreationAttributes
  extends Optional<WarehouseOrderBoxesAttributes, 'id'> {}

class WarehouseOrderBoxes
  extends Model<
    WarehouseOrderBoxesAttributes,
    WarehouseOrderBoxesCreationAttributes
  >
  implements WarehouseOrderBoxesAttributes
{
  public id!: number
  public warehouse_order_id!: number
  public box_id!: number
  public quantity!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

WarehouseOrderBoxes.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouse_order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    box_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'warehouse_order_boxes',
  }
)

export default WarehouseOrderBoxes
