import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapListPricesItemsAttributes {
  id: number
  item_code: string | null
  price_list: number | null
  price: number | null
  factor: number | null
  base_num: number | null
  is_active: boolean
}

interface SapListPricesItemsCreationAttributes
  extends Optional<
    SapListPricesItemsAttributes,
    | 'id'
    | 'item_code'
    | 'price_list'
    | 'price'
    | 'factor'
    | 'base_num'
  > {}

class SapListPricesItems
  extends Model<SapListPricesItemsAttributes, SapListPricesItemsCreationAttributes>
  implements SapListPricesItemsAttributes
{
  public id!: number
  public item_code!: string
  public price_list!: number
  public price!: number
  public factor!: number
  public base_num!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapListPricesItems.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    item_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    price_list: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    factor: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    base_num: {
      type: DataTypes.INTEGER,
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
    tableName: 'catalog_sap_list_prices_items',
  }
)

export default SapListPricesItems