import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface ShippingCompaniesAttributes {
  id: number
  name: string
  is_active: boolean
}

interface ShippingCompaniesCreationAttributes
  extends Optional<
    ShippingCompaniesAttributes,
     'id'
  > {}

class ShippingCompanies
  extends Model<ShippingCompaniesAttributes, ShippingCompaniesCreationAttributes>
  implements ShippingCompaniesAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ShippingCompanies.init(
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
    tableName: 'catalog_shipping_companies',
  }
)

export default ShippingCompanies
