"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapBusinessPartner extends sequelize_1.Model {
}
SapBusinessPartner.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    card_code: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    card_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    card_type: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    group_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    list_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    group_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    credit_line: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    debit_line: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    phone1: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    phone2: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(254),
        allowNull: true,
    },
    lic_trad_number: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_business_partner',
});
exports.default = SapBusinessPartner;
