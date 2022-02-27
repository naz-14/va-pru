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
            const clausePendings = {
                status_id: 1,
                is_active: true,
            };
            const clauseProccesing = {
                status_id: 2,
                is_active: true,
            };
            const clauseBilling = {
                status_id: 3,
                is_active: true,
            };
            const clauseLocalShipping = {
                type_id: 2,
                is_active: true,
            };
            const clauseNationalShipping = {
                type_id: 1,
                is_active: true,
            };
            const clauseToSupply = {
                status_id: 6,
                is_active: true,
            };
            const clauseRoute = {
                status_id: 7,
                is_active: true,
            };
            const clauseCollect = {
                status_id: 8,
                is_active: true,
            };
            const clauseComplete = {
                status_id: 11,
                is_active: true,
            };
            const clauseRejected = {
                is_active: true,
                [sequelize_1.Op.or]: [{ status_id: 12 }, { status_id: 13 }],
            };
            if (context.storeId) {
                clausePendings.store_id = context.storeId;
                clauseProccesing.store_id = context.storeId;
                clauseBilling.store_id = context.storeId;
                clauseLocalShipping.store_id = context.storeId;
                clauseNationalShipping.store_id = context.storeId;
                clauseToSupply.store_id = context.storeId;
                clauseRoute.store_id = context.storeId;
                clauseCollect.store_id = context.storeId;
                clauseComplete.store_id = context.storeId;
                clauseRejected.store_id = context.storeId;
            }
            const pendings = yield OrderModel_1.default.count({ where: clausePendings });
            const processing = yield OrderModel_1.default.count({
                where: clauseProccesing,
            });
            const billing = yield OrderModel_1.default.count({
                where: clauseBilling,
            });
            const localShipping = yield OrderModel_1.default.count({
                where: clauseLocalShipping,
            });
            const nationalShipping = yield OrderModel_1.default.count({
                where: clauseNationalShipping,
            });
            const toSupply = yield OrderModel_1.default.count({
                where: clauseToSupply,
            });
            const route = yield OrderModel_1.default.count({
                where: clauseRoute,
            });
            const collect = yield OrderModel_1.default.count({
                where: clauseCollect,
            });
            const complete = yield OrderModel_1.default.count({
                where: clauseComplete,
            });
            const rejected = yield OrderModel_1.default.count({
                where: clauseRejected,
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
                rejected,
            };
        }),
    },
};
exports.default = countersResolver;
