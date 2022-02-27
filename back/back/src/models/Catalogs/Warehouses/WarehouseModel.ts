import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface WarehouseAttributes {
  id: number
  name: string
  phone: string
  address: string
  is_active: boolean
}

interface WarehouseCreationAttributes
  extends Optional<WarehouseAttributes, 'id'> {}

class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number
  public name!: string
  public phone!: string
  public address!: string
  public is_active!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Warehouse.init(
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
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
    tableName: 'catalog_warehouses',
  }
)

export default Warehouse
