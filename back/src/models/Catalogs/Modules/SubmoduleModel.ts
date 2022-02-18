import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface SubmoduleAttributes {
  id: number
  module_id: number
  name: string
  front_label: string
  relative_link: string
  icon: string
  is_active: boolean
}

interface SubmoduleCreationAttributes
  extends Optional<SubmoduleAttributes, 'id'> {}

class Submodule
  extends Model<SubmoduleAttributes, SubmoduleCreationAttributes>
  implements SubmoduleAttributes
{
  public id!: number
  public module_id!: number
  public name!: string
  public front_label!: string
  public relative_link!: string
  public icon!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Submodule.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.STRING(50),
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
    tableName: 'catalog_submodules',
  }
)

export default Submodule
