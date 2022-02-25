import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapListPricesAttributes {
  id: number
  list_number: number | null
  list_name: string | null
  base_number: number | null
  round_system: string | null
  is_active: boolean
}

interface SapListPricesCreationAttributes
  extends Optional<
    SapListPricesAttributes,
    | 'id'
    | 'list_number'
    | 'list_name'
    | 'base_number'
    | 'round_system'
  > {}

class SapListPrices
  extends Model<SapListPricesAttributes, SapListPricesCreationAttributes>
  implements SapListPricesAttributes
{
  public id!: number
  public list_number!: number
  public list_name!: string
  public base_number!: number
  public round_system!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapListPrices.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    list_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    list_name: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    base_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
    },
    round_system: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_list_prices',
  }
)

export default SapListPrices