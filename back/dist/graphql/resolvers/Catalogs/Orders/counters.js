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
const OrderModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderModel"));
const sequelize_1 = require("sequelize");
const countersResolver = {
    Query: {
        getAllCounters: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            const pendings = yield OrderModel_1.default.count({
                where: {
                    status_id: 1,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const processing = yield OrderModel_1.default.count({
                where: {
                    status_id: 2,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const billing = yield OrderModel_1.default.count({
                where: {
                    status_id: 3,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const localShipping = yield OrderModel_1.default.count({
                where: {
                    status_id: 4,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const nationalShipping = yield OrderModel_1.default.count({
                where: {
                    status_id: 5,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const toSupply = yield OrderModel_1.default.count({
                where: {
                    status_id: 6,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const route = yield OrderModel_1.default.count({
                where: {
                    status_id: 7,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const collect = yield OrderModel_1.default.count({
                where: {
                    status_id: 8,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const complete = yield OrderModel_1.default.count({
                where: {
                    status_id: 11,
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            const rejected = yield OrderModel_1.default.count({
                where: {
                    [sequelize_1.Op.or]: [
                        { status_id: 12 },
                        { status_id: 13 }
                    ],
                    store_id: context.storeId || null,
                    is_active: true
                }
            });
            return {
                pendings,
                processing,
                billing,
                toSupply,
                collect,
                route,
                localShipping,
                nationalShipping,
                complete,
                rejected
            };
        }),
    },
};
exports.default = countersResolver;
