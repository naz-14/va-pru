import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapWarehousesAttributes {
  id: number
  warehouse_code: string | null
  warehouse_name: string | null
  is_active: boolean
}

interface SapWarehousesCreationAttributes
  extends Optional<
    SapWarehousesAttributes,
    | 'id'
    | 'warehouse_code'
    | 'warehouse_name'
  > {}

class SapWarehouses
  extends Model<SapWarehousesAttributes, SapWarehousesCreationAttributes>
  implements SapWarehousesAttributes
{
  public id!: number
  public warehouse_code!: string
  public warehouse_name!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapWarehouses.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouse_code: {
        type: DataTypes.STRING(8),
        allowNull: true,
    },
    warehouse_name: {
        type: DataTypes.STRING(100),
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
    tableName: 'catalog_sap_warehouses',
  }
)

export default SapWarehouses