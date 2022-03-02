"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class InventoryTransferLine extends sequelize_1.Model {
}
InventoryTransferLine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    inventory_transfer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    line_num: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    item_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    target_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    doc_entry: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    target_entry: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    line_status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    open_quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    tax_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    disc_pront: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    line_total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    whs_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ieps: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    iva: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_inventory_transfer_lines',
});
exports.default = InventoryTransferLine;
