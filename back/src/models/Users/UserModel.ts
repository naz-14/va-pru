import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface UserAttributes {
  id: number
  name: string
  first_name: string
  last_name?: string | null
  user_name: string
  email: string
  id_avatar_file: number
  id_role: number
  id_store?: number | null
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  password: string
  id_address: number
  is_active: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public name!: string
  public first_name!: string
  public last_name?: string | null
  public email!: string
  public id_avatar_file!: number
  public user_name!: string
  public password!: string
  public id_role!: number
  public id_store?: number | null
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public id_address!: number
  public is_active!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: 'name',
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'email',
    },
    id_avatar_file: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_role: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_store: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_user_register: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_user_update: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_user_delete: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_address: {
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
    tableName: 'catalog_users',
  }
)

export default User
