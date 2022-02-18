"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class UserModules extends sequelize_1.Model {
}
UserModules.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_module: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_submodule: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    access_retrieve: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    access_read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    access_edit: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    access_delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    access_export: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_user_modules',
});
exports.default = UserModules;
