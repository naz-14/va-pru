import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface NationalShippingAttributes {
  id: number
  name: string
  is_active: boolean
}

interface NationalShippingCreationAttributes
  extends Optional<NationalShippingAttributes, 'id'> {}

class NationalShipping
  extends Model<NationalShippingAttributes, NationalShippingCreationAttributes>
  implements NationalShippingAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

NationalShipping.init(
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
    tableName: 'national_shipping_methods',
  }
)

export default NationalShipping
