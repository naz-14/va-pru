"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapPartnerGroup extends sequelize_1.Model {
}
SapPartnerGroup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    group_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    group_name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    group_type: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'C'
    },
    price_list: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_partner_group',
});
exports.default = SapPartnerGroup;
