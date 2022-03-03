import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface ScheduleDocksAttributes {
  id: number
  schedule_id: number
  dock_id: number
  is_active: boolean
}

interface ScheduleDocksCreationAttributes
  extends Optional<
    ScheduleDocksAttributes,
    | 'id'
  > {}

class ScheduleDocks
  extends Model<ScheduleDocksAttributes, ScheduleDocksCreationAttributes>
  implements ScheduleDocksAttributes
{
  public id!: number
  public schedule_id!: number
  public dock_id!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ScheduleDocks.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dock_id: {
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
    tableName: 'document_schedule_docks',
  }
)

export default ScheduleDocks
