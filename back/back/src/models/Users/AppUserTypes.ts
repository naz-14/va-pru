import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface AppUserTypesAttributes {
  id: number
  name: string
  is_active: boolean
}

interface AppUserTypesCreationAttributes
  extends Optional<AppUserTypesAttributes, 'id'> {}

class AppUserTypes
  extends Model<AppUserTypesAttributes, AppUserTypesCreationAttributes>
  implements AppUserTypesAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

AppUserTypes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'app_user_types',
  }
)

export default AppUserTypes
