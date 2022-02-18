"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
class Quote extends sequelize_1.Model {
}
Quote.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cardCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    cardName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    docDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    docTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    docStatus: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    whsCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_quotes',
});
exports.default = Quote;
