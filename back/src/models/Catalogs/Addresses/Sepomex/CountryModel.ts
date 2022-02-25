import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface CountryAttributes {
  id: number
  name: string
  is_active: boolean
}

interface CountryCreationAttributes extends Optional<CountryAttributes, 'id'> {}

class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Country.init(
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
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_countries',
  }
)

export default Country
