import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../../db/connection'

interface OrdersWarehouseAttributes {
  id: number
  order_id: number
  rack_id: number | null
  picking_user_id: number | null
  packing_user_id: number | null
  open: Boolean
  uncompleted: Boolean
  is_active: Boolean
}

interface OrdersWarehouseCreationAttributes
  extends Optional<
    OrdersWarehouseAttributes,
    'id' | 'rack_id' | 'picking_user_id' | 'packing_user_id' | 'uncompleted'
  > {}

class OrdersWarehouse
  extends Model<OrdersWarehouseAttributes, OrdersWarehouseCreationAttributes>
  implements OrdersWarehouseAttributes
{
  public id!: number
  public order_id!: number
  public rack_id!: number
  public picking_user_id!: number
  public packing_user_id!: number
  public open!: boolean
  public uncompleted!: boolean
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrdersWarehouse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rack_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    picking_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    packing_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    open: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    uncompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: 'orders_warehouse',
  }
)

export default OrdersWarehouse
