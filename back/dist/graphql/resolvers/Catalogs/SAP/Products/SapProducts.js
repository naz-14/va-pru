"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SapItemsModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Items/SapItemsModel"));
const SapStockModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Stock/SapStockModel"));
SapStockModel_1.default.hasMany(SapItemsModel_1.default, { foreignKey: 'item_code', constraints: false });
const SapProducts = {
    Query: {},
    Mutation: {
        getProductSap: (_, { warehouseCode, searchQuery }) => __awaiter(void 0, void 0, void 0, function* () {
            let list = [];
            const clause = {
                where: { warehouse_code: warehouseCode, locked: 'N' },
                include: [
                    {
                        model: SapItemsModel_1.default,
                        on: {
                            item_code: { [sequelize_1.Op.col]: 'Stocks.item_code' },
                            [sequelize_1.Op.or]: [
                                { item_code: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                { item_name: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                { item_code_bar: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                            ],
                        },
                    },
                ],
            };
            const result = yield SapStockModel_1.default.findAll(clause);
            result.map((item) => {
                item.SapItems.map((product) => {
                    list.push({
                        id: item.dataValues.id,
                        item_code: item.dataValues.item_code,
                        warehouse_code: item.dataValues.warehouse_code,
                        on_hand: item.dataValues.on_hand,
                        is_commit: item.dataValues.is_commit,
                        on_order: item.dataValues.on_order,
                        consignation: item.dataValues.consignation,
                        counted: item.dataValues.counted,
                        min_stock: item.dataValues.min_stock,
                        was_counted: item.dataValues.was_counted,
                        max_stock: item.dataValues.max_stock,
                        locked: item.dataValues.locked,
                        SapItem_id: product.dataValues.id,
                        SapItem_item_code: product.dataValues.item_code,
                        SapItem_item_name: product.dataValues.item_name,
                        SapItem_item_code_bar: product.dataValues.item_code_bar,
                        SapItem_item_group_code: product.dataValues.item_group_code,
                        SapItem_purchase_pack_msr: product.dataValues.purchase_pack_msr,
                        SapItem_purchase_pack_un: product.dataValues.purchase_pack_un,
                        SapItem_sal_pack_msr: product.dataValues.sal_pack_msr,
                        SapItem_sal_pack_un: product.dataValues.sal_pack_un,
                        SapItem_indirect_tax: product.dataValues.indirect_tax,
                        SapItem_card_code: product.dataValues.card_code,
                        SapItem_tax_code_ar: product.dataValues.tax_code_ar,
                        SapItem_tax_code_ap: product.dataValues.tax_code_ap,
                        SapItem_inventory_item: product.dataValues.inventory_item,
                        SapItem_sell_item: product.dataValues.sell_item,
                        SapItem_purchase_item: product.dataValues.purchase_item,
                        SapItem_business_partner_id: product.dataValues.business_partner_id,
                    });
                });
            });
            return list;
        }),
    },
};
exports.default = SapProducts;
