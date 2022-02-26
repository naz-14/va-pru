"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapListPrices extends sequelize_1.Model {
}
SapListPrices.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    list_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    list_name: {
        type: sequelize_1.DataTypes.STRING(32),
        allowNull: true,
    },
    base_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
    },
    round_system: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_list_prices',
});
exports.default = SapListPrices;
