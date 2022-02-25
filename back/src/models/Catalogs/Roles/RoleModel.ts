import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface RoleAttributes {
  id: number
  role_name: string
  description: string
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  is_active: boolean
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number
  public role_name!: string
  public description!: string
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    description: {
      type: DataTypes.STRING,
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
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_roles',
  }
)

export default Role
