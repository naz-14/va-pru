import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface InternalNotesAttributes {
  id: number
  order_id:number
  user_id:number
  text: string | null
  file_id: number | null
  type: string | null
  is_active: Boolean
}

interface InternalNotesCreationAttributes
  extends Optional<
    InternalNotesAttributes,
     'id' |
     'text' |
     'type' |
     'file_id'
  > {}

class InternalNotes
  extends Model<InternalNotesAttributes, InternalNotesCreationAttributes>
  implements InternalNotesAttributes
{
  public id!: number
  public order_id!: number
  public user_id!: number
  public text!: string | null
  public file_id!: number | null
  public type!: string | null
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

InternalNotes.init(
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    type: {
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
    tableName: 'catalog_internal_notes',
  }
)

export default InternalNotes
