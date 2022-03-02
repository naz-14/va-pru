import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderProductAttributes {
  id: number
  product_id: number
  sku: string
  name: string
  order_id: number
  quantity: number
  price: number
  total: number
  variation_id: number
  picked: boolean
  partial_picked: number
  unavailable: boolean
  packed: boolean
  is_active: boolean
}

interface OrderProductCreationAttributes
  extends Optional<
    OrderProductAttributes,
    'id' | 'picked' | 'packed' | 'partial_picked' | 'unavailable'
  > {}

class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public id!: number
  public product_id!: number
  public sku!: string
  public name!: string
  public order_id!: number
  public quantity!: number
  public price!: number
  public total!: number
  public variation_id!: number
  public picked!: boolean
  public partial_picked!: number
  public unavailable!: boolean
  public packed!: boolean
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderProduct.init(
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
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    variation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    picked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    partial_picked: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    packed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    unavailable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: 'orders_product',
  }
)

export default OrderProduct
