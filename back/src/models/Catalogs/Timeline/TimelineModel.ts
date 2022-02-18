import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface TimelineAttributes {
  id: number
  order_id: number
  status_id: number
  user_id: number
  dateStatus: string
  is_active: Boolean
}

interface TimelineCreationAttributes
  extends Optional<
    TimelineAttributes,
     'id'
  > {}

class Timeline
  extends Model<TimelineAttributes, TimelineCreationAttributes>
  implements TimelineAttributes
{
  public id!: number
  public order_id!:number
  public status_id!:number
  public user_id!:number
  public dateStatus!:string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Timeline.init(
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
    status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    dateStatus: {
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
    tableName: 'catalog_timeline',
  }
)

export default Timeline
