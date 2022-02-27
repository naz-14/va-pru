import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderStatusAttributes {
  id: number
  name: string
  is_active: boolean
}
interface OrderStatusCreationAttributes
  extends Optional<OrderStatusAttributes, 'id'> {}

class OrderStatus
  extends Model<OrderStatusAttributes, OrderStatusCreationAttributes>
  implements OrderStatusAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
OrderStatus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: 'orders_status',
  }
)

export default OrderStatus
