import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface ProductStockAttributes {
  id: number
  id_warehouse: number | null
  id_product_sap: number | null
  on_hand: number | null
  is_commit: number | null
  on_order: number | null
  consignation: number | null
  counter: number | null
  was_counter: string | null
  min_stock: number | null
  max_stock: number | null
  locked: boolean
  is_active: boolean
}
interface ProductStockCreationAttributes
  extends Optional<
    ProductStockAttributes,
    | 'id'
    | 'id_warehouse'
    | 'id_product_sap'
    | 'on_hand'
    | 'is_commit'
    | 'on_order'
    | 'consignation'
    | 'counter'
    | 'was_counter'
    | 'min_stock'
    | 'max_stock'
    | 'locked'
  > {}
class ProductStock
  extends Model<ProductStockAttributes, ProductStockCreationAttributes>
  implements ProductStockAttributes
{
  public id!: number
  public id_warehouse!: number | null
  public id_product_sap!: number | null
  public on_hand!: number | null
  public is_commit!: number | null
  public on_order!: number | null
  public consignation!: number | null
  public counter!: number | null
  public was_counter!: string | null
  public min_stock!: number | null
  public max_stock!: number | null
  public locked!: boolean
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
ProductStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_product_sap: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    on_hand: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    is_commit: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    on_order: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    consignation: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    counter: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    was_counter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_stock: {
      type: DataTypes.DOUBLE,
    },
    max_stock: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_products_stock',
  }
)

export default ProductStock
