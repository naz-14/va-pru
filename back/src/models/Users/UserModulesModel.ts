import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface UserModulesAttributes {
  id: number
  id_user: number
  id_module: number
  id_submodule?: number | null
  is_active: boolean
  access_retrieve: boolean
  access_read: boolean
  access_edit: boolean
  access_delete: boolean
  access_export: boolean
}

interface UserModulesCreationAttributes
  extends Optional<UserModulesAttributes, 'id'> {}

class UserModules
  extends Model<UserModulesAttributes, UserModulesCreationAttributes>
  implements UserModulesAttributes
{
  public id!: number
  public id_user!: number
  public id_module!: number
  public id_submodule?: number | null
  public is_active!: boolean
  public access_retrieve!: boolean
  public access_read!: boolean
  public access_edit!: boolean
  public access_delete!: boolean
  public access_export!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserModules.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_module: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_submodule: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    access_retrieve: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    access_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    access_edit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    access_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    access_export: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'catalog_user_modules',
  }
)

export default UserModules
