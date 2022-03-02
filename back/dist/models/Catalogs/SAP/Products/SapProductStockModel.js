"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class ProductStock extends sequelize_1.Model {
}
ProductStock.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_warehouse: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_product_sap: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    on_hand: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    is_commit: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    on_order: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    consignation: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    counter: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    was_counter: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    min_stock: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    max_stock: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    locked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_products_stock',
});
exports.default = ProductStock;
