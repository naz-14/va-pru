"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class UserPasswordReset extends sequelize_1.Model {
}
UserPasswordReset.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    token_recovery: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_users_passwords_recovey',
});
exports.default = UserPasswordReset;
