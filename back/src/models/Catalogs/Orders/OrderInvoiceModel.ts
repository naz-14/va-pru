import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface OrderInvoiceAttributes {
  id: number
  invoice_id: number
  reference: string
  type: string
  is_active: boolean
}
interface OrderInvoiceCreationAttributes
  extends Optional<OrderInvoiceAttributes, 'id'> {}

class OrderInvoice
  extends Model<OrderInvoiceAttributes, OrderInvoiceCreationAttributes>
  implements OrderInvoiceAttributes
{
  public id!: number
  public invoice_id!: number
  public reference!: string
  public type!: string
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
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
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
    modelName: 'orders_invoice',
  }
)

export default OrderInvoice
