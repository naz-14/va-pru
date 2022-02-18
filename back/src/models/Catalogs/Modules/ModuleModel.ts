import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface ModuleAttributes {
  id: number
  name: string
  front_label: string
  relative_link: string
  icon: string
  is_active: boolean
}

interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'id'> {}

class Module
  extends Model<ModuleAttributes, ModuleCreationAttributes>
  implements ModuleAttributes
{
  public id!: number
  public name!: string
  public front_label!: string
  public relative_link!: string
  public icon!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Module.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: false,
    },
    front_label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: false,
    },
    relative_link: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
    },
    icon: {
      type: DataTypes.STRING(250),
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
    tableName: 'catalog_modules',
  }
)

export default Module
