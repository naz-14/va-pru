"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapPurchasesOrders extends sequelize_1.Model {
}
SapPurchasesOrders.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    business_partner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    doc_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    doc_due_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    num_at_card: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    doc_total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    doc_num: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    doc_entry: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    series: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    series_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    price_list: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    disc_prcnt: {
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
    tableName: 'catalog_sap_purchases_orders',
});
exports.default = SapPurchasesOrders;
