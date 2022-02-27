import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface AppUserAttributes {
  id: number
  name: string
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  username: string
  id_type: number
  id_user_update?: number | null
  is_active: boolean
}

interface AppUserCreationAttributes extends Optional<AppUserAttributes, 'id'> {}

class AppUser
  extends Model<AppUserAttributes, AppUserCreationAttributes>
  implements AppUserAttributes
{
  id!: number
  name!: string
  first_name!: string
  last_name!: string
  phone!: string
  email!: string
  password!: string
  username!: string
  id_type!: number
  id_user_update!: number | null
  is_active!: boolean
  readonly createdAt!: Date
  readonly updatedAt!: Date
}

AppUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_update: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'catalog_app_users',
  }
)

export default AppUser
