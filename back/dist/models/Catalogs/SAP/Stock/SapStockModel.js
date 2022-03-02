"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class Stocks extends sequelize_1.Model {
}
Stocks.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    warehouse_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    on_hand: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    is_commit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    on_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    consignation: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    counted: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    was_counted: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    min_stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    max_stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    locked: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_stocks',
});
exports.default = Stocks;
