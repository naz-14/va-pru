import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface CommodityReceiptAttributes {
    id: number
    schedule_id: number
    sap_purchases_orders_id: number
    sap_purchases_orders_lines_id: number
    receipt_quantity?: number 
    id_user?: number | null
    is_active: boolean
}

interface CommodityReceiptCreationAttributes extends Optional<CommodityReceiptAttributes, 'id'> {}

class CommodityReceipt
extends Model<CommodityReceiptAttributes, CommodityReceiptCreationAttributes>
implements CommodityReceiptAttributes
{
    public id!: number
    public schedule_id!: number
    public sap_purchases_orders_id!: number
    public sap_purchases_orders_lines_id!: number
    public receipt_quantity!: number
    public id_user!: number
    public is_active!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

CommodityReceipt.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        schedule_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        sap_purchases_orders_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        sap_purchases_orders_lines_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        receipt_quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'documents_commodity_receipt',
    }
)

export default CommodityReceipt
