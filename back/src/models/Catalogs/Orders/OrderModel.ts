import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderAttributes {
  id: number
  platform_id: number
  order_id: number // from platform
  order_date: string // from platform
  status_id: number
  user_id: number
  type_id: number
  warehouse_id: number | null
  store_id: number | null
  method_id: number
  shipping_id: number
  payment_id: number
  invoice_id: number
  shipping_company_id: number
  uber_id: string | null
  product_quantity: number
  shipping_price: number
  total_price: number
  order_doc_num: number
  num_at_card: string
  is_active: boolean
}

interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    | 'id'
    | 'user_id'
    | 'shipping_id'
    | 'payment_id'
    | 'invoice_id'
    | 'product_quantity'
    | 'warehouse_id'
    | 'store_id'
    | 'uber_id'
    | 'shipping_company_id'
    | 'order_doc_num'
    | 'num_at_card'
  > {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number
  public platform_id!: number
  public order_id!: number
  public order_date!: string
  public status_id!: number
  public user_id!: number
  public type_id!: number
  public warehouse_id!: number
  public store_id!: number
  public method_id!: number
  public shipping_id!: number
  public payment_id!: number
  public invoice_id!: number
  public shipping_company_id!: number
  public uber_id!: string
  public product_quantity!: number
  public total_price!: number
  public shipping_price!: number
  public order_doc_num!: number
  public num_at_card!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    platform_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    warehouse_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    method_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    shipping_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    payment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    shipping_company_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    uber_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    product_quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    total_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    order_doc_num: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    num_at_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_price: {
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
    tableName: 'catalog_orders',
  }
)

export default Order
