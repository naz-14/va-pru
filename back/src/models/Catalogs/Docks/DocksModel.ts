import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface DocksAttributes {
  id: number
  name: string
  is_active: boolean
}

interface DocksCreationAttributes
  extends Optional<
    DocksAttributes,
    | 'id'
  > {}

class Docks
  extends Model<DocksAttributes, DocksCreationAttributes>
  implements DocksAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Docks.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    tableName: 'catalog_dock',
  }
)

export default Docks