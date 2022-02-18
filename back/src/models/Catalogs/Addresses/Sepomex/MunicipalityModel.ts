import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface MunicipalityAttributes {
  id: number
  name: string
  id_city: number
  is_active: boolean
}

interface MunicipalityCreationAttributes
  extends Optional<MunicipalityAttributes, 'id'> {}

class Municipality
  extends Model<MunicipalityAttributes, MunicipalityCreationAttributes>
  implements MunicipalityAttributes
{
  public id!: number
  public name!: string
  public id_city!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Municipality.init(
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
    id_city: {
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
    tableName: 'catalog_municipalities',
  }
)

export default Municipality
