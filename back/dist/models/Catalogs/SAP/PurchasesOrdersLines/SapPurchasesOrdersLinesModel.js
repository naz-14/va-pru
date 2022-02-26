"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapPurchasesOrdersLines extends sequelize_1.Model {
}
SapPurchasesOrdersLines.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    purcharse_order_id: {
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
    trget_entry: {
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
    open_qty: {
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
    disc_prcnt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    line_total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    whs_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ieps: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    iva: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_purchases_orders_lines',
});
exports.default = SapPurchasesOrdersLines;
