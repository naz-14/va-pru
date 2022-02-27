import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface CitieAttributes {
  id: number
  name: string
  id_state: number
  is_active: boolean
}

interface CitieCreationAttributes extends Optional<CitieAttributes, 'id'> {}

class Citie
  extends Model<CitieAttributes, CitieCreationAttributes>
  implements CitieAttributes
{
  public id!: number
  public name!: string
  public id_state!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Citie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    id_state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_cities',
  }
)

export default Citie
