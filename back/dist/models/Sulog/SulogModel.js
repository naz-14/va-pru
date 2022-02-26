"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class Sulog extends sequelize_1.Model {
}
Sulog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cardCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    cardName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    docDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    docStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numAtCard: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    route: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: true,
    },
    whsCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_supply_logistics',
});
exports.default = Sulog;
