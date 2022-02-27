import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface LocalShippingAttributes {
  id: number
  name: string
  is_active: boolean
}

interface LocalShippingCreationAttributes
  extends Optional<LocalShippingAttributes, 'id'> {}

class LocalShipping
  extends Model<LocalShippingAttributes, LocalShippingCreationAttributes>
  implements LocalShippingAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

LocalShipping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    tableName: 'local_shipping_methods',
  }
)

export default LocalShipping
