import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db/connection'
interface ConfigSysAttributes {
  id: number
  project_name: string
  project_logo: string
  project_mini_logo: string
  project_favicon: string
}
interface ConfigSysCreationAttributes
  extends Optional<ConfigSysAttributes, 'id'> {}

class ConfigSys
  extends Model<ConfigSysAttributes, ConfigSysCreationAttributes>
  implements ConfigSysAttributes
{
  public id!: number
  public project_name!: string
  public project_logo!: string
  public project_mini_logo!: string
  public project_favicon!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ConfigSys.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: false,
    },
    project_logo: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
    },
    project_mini_logo: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
    },
    project_favicon: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    tableName: 'config_system',
  }
)

export default ConfigSys
