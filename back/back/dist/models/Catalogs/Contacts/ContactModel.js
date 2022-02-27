"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
class Contact extends sequelize_1.Model {
}
Contact.init({
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
    lastname: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    second_lastname: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    ext: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    id_user_register: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    id_user_update: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    id_user_delete: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_contacts',
});
exports.default = Contact;
