"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
class SapItems extends sequelize_1.Model {
}
SapItems.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    item_code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    item_group_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    item_code_bar: {
        type: sequelize_1.DataTypes.STRING(254),
        allowNull: true,
    },
    purchase_pack_msr: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    purchase_pack_un: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    sal_pack_msr: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    sal_pack_un: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    indirect_tax: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'N',
    },
    card_code: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    tax_code_ar: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: true,
    },
    tax_code_ap: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: true,
    },
    inventory_item: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'Y',
    },
    sell_item: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'Y',
    },
    purchase_item: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'Y',
    },
    business_partner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'catalog_sap_items',
});
exports.default = SapItems;
