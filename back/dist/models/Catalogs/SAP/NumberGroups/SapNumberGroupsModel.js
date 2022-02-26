"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapNumberGroups extends sequelize_1.Model {
}
SapNumberGroups.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    group_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    payment_group: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    pay_due_month: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'N'
    },
    extra_month: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    extra_days: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    payments_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    installments_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    open_reception: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'N'
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_number_groups',
});
exports.default = SapNumberGroups;
