import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../../db/connection'

interface WarehousePackingAttributes {
    id: number
    order_id: number
    box_id: number | null
    quantity: number | null
    is_active: Boolean
}

interface WarehousePackingCreationAttributes
    extends Optional<
        WarehousePackingAttributes,
        'id'
    > {}

class WarehousePacking
    extends Model<WarehousePackingAttributes, WarehousePackingCreationAttributes>
    implements WarehousePackingAttributes
{
    public id!: number
    public order_id!: number
    public box_id!: number
    public quantity!: number
    public is_active!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

WarehousePacking.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        box_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'warehouse_packing',
    }
)

export default WarehousePacking
