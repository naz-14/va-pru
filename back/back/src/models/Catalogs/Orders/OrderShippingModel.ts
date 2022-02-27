import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderShippingAttributes {
  id: number
  order_id: number
  first_name: string
  last_name: string
  company: string
  id_file_receipt: number | null
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string
  is_active: boolean
}
interface OrderShippingCreationAttributes
  extends Optional<OrderShippingAttributes, 'id' | 'id_file_receipt'> {}

class OrderShipping
  extends Model<OrderShippingAttributes, OrderShippingCreationAttributes>
  implements OrderShippingAttributes
{
  public id!: number
  public order_id!: number
  public first_name!: string
  public last_name!: string
  public company!: string
  public id_file_receipt!: number
  public address_1!: string
  public address_2!: string
  public city!: string
  public state!: string
  public postcode!: string
  public country!: string
  public email!: string
  public phone!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
OrderShipping.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_file_receipt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    address_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
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
    modelName: 'orders_shipping',
  }
)

export default OrderShipping
