import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface ColonyAttributes {
  id: number
  name: string
  id_municipality: number
  zip_code: number
  is_active: boolean
}

interface ColonyCreationAttributes extends Optional<ColonyAttributes, 'id'> {}

class Colony
  extends Model<ColonyAttributes, ColonyCreationAttributes>
  implements ColonyAttributes
{
  public id!: number
  public name!: string
  public id_municipality!: number
  public zip_code!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Colony.init(
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
    id_municipality: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    zip_code: {
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
    tableName: 'catalog_colonies',
  }
)

export default Colony
