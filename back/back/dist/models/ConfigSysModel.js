"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class ConfigSys extends sequelize_1.Model {
}
ConfigSys.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    project_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: false,
    },
    project_logo: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: false,
    },
    project_mini_logo: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: false,
    },
    project_favicon: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'config_system',
});
exports.default = ConfigSys;
