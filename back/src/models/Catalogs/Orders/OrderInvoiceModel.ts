import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderInvoiceAttributes {
  id: number
  order_id: number
  invoice_doc_num: number
  num_at_card: string
  invoice_url: string
  is_active: boolean
}

interface OrderInvoiceCreationAttributes
  extends Optional<
    OrderInvoiceAttributes,
    'id' | 'invoice_doc_num' | 'num_at_card' | 'invoice_url'
  > {}

class OrderInvoice
  extends Model<OrderInvoiceAttributes, OrderInvoiceCreationAttributes>
  implements OrderInvoiceAttributes
{
  public id!: number
  public order_id!: number
  public invoice_doc_num!: number
  public num_at_card!: string
  public invoice_url!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderInvoice.init(
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
    invoice_doc_num: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    num_at_card: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    invoice_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'orders_invoice',
  }
)

export default OrderInvoice
