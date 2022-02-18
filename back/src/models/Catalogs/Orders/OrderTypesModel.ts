import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderTypesAttributes {
  id: number
  name: string
  is_active: boolean
}
interface OrderTypesCreationAttributes
  extends Optional<OrderTypesAttributes, 'id'> {}

class OrderTypes
  extends Model<OrderTypesAttributes, OrderTypesCreationAttributes>
  implements OrderTypesAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
OrderTypes.init(
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
    modelName: 'orders_types',
  }
)

export default OrderTypes
