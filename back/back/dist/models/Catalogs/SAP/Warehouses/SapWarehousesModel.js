"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapWarehouses extends sequelize_1.Model {
}
SapWarehouses.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    warehouse_code: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: true,
    },
    warehouse_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_warehouses',
});
exports.default = SapWarehouses;
