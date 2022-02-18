import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface PlatformAttributes {
  id: number
  name: string
  is_active: boolean
}
interface PlatformCreationAttributes
  extends Optional<PlatformAttributes, 'id'> {}

class Platform
  extends Model<PlatformAttributes, PlatformCreationAttributes>
  implements PlatformAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Platform.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'name',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'catalog_platforms',
  }
)

export default Platform
