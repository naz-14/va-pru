"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
class ScheduleDocks extends sequelize_1.Model {
}
ScheduleDocks.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    schedule_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dock_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'document_schedule_docks',
});
exports.default = ScheduleDocks;
