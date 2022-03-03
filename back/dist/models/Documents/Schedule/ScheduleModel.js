"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
class Schedule extends sequelize_1.Model {
}
Schedule.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    document_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    document_time_start: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    document_time_end: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    warehouse_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    document_status_id: {
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
    tableName: 'document_schedule',
});
exports.default = Schedule;
