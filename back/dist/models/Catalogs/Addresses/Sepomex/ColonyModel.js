"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class Colony extends sequelize_1.Model {
}
Colony.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    id_municipality: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: false,
    },
    zip_code: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_colonies',
});
exports.default = Colony;
