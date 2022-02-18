import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface IssussesAttributes {
  id: number
  name: string
  is_active: boolean
}

interface IssussesCreationAttributes
  extends Optional<
    IssussesAttributes,
    | 'id'
    | 'name'
  > {}

class Issusses
  extends Model<IssussesAttributes, IssussesCreationAttributes>
  implements IssussesAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Issusses.init(
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
    tableName: 'catalog_issusses',
  }
)

export default Issusses
