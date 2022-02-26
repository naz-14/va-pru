"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
class Submodule extends sequelize_1.Model {
}
Submodule.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    module_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: false,
    },
    front_label: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: false,
    },
    relative_link: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: false,
    },
    icon: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_submodules',
});
exports.default = Submodule;
