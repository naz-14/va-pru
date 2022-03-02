import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'


interface ScheduleOrdersLinesAttributes {
  id: number
  business_partner_id: number
  schedule_id: number
  sap_purchases_orders_id: number
  sap_purchases_orders_lines_id: number
  is_active: boolean
}

interface ScheduleOrdersLinesCreationAttributes
  extends Optional<
    ScheduleOrdersLinesAttributes,
    | 'id'
  > {}

class ScheduleOrdersLines
  extends Model<ScheduleOrdersLinesAttributes, ScheduleOrdersLinesCreationAttributes>
  implements ScheduleOrdersLinesAttributes
{
  public id!: number
  public business_partner_id!: number
  public schedule_id!: number
  public sap_purchases_orders_id!: number
  public sap_purchases_orders_lines_id!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ScheduleOrdersLines.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    business_partner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sap_purchases_orders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sap_purchases_orders_lines_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'document_schedule_orders_lines',
  }
)

export default ScheduleOrdersLines
