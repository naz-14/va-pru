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
    document_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    document_due_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    number_at_card: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    document_total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    document_status: {
        type: sequelize_1.DataTypes.STRING(1),
        allowNull: true,
    },
    document_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    document_entry: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    series: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    disc_prcnt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
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
