import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface ScheduleAttributes {
  id: number
  dock_id: number
  document_date: string // Fecha de cita
  document_time_start: string // Hora de cita inicio
  document_time_end: string //Hora de cita fin
  comments: string | null  // Observaciones  
  warehouse_code: string  // codigo de almacen o tienda (SAP)
  document_status_id: number
  is_active: boolean
}

interface ScheduleCreationAttributes
  extends Optional<
    ScheduleAttributes,
    | 'id'
    | 'comments'
  > {}

class Schedule
  extends Model<ScheduleAttributes, ScheduleCreationAttributes>
  implements ScheduleAttributes
{
  public id!: number
  public dock_id!: number
  public document_date!: string
  public document_time_start!: string
  public document_time_end!: string
  public comments!: string
  public warehouse_code!: string
  public document_status_id!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    document_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_time_start: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_time_end: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    warehouse_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_status_id: {
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
    tableName: 'document_schedule',
  }
)

export default Schedule
