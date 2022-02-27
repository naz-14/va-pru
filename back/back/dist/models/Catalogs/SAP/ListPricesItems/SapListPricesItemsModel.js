"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapListPricesItems extends sequelize_1.Model {
}
SapListPricesItems.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    item_code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    price_list: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    factor: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    base_num: {
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
    tableName: 'catalog_sap_list_prices_items',
});
exports.default = SapListPricesItems;
