import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderPaymentAttributes {
  id: number
  order_id: number
  platform: string
  payment_id: string
  is_active: boolean
}
interface OrderPaymentCreationAttributes
  extends Optional<OrderPaymentAttributes, 'id'> {}

class OrderPayment
  extends Model<OrderPaymentAttributes, OrderPaymentCreationAttributes>
  implements OrderPaymentAttributes
{
  public id!: number
  public order_id!: number
  public platform!: string
  public payment_id!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
OrderPayment.init(
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
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_id: {
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
    modelName: 'orders_payment',
  }
)

export default OrderPayment
