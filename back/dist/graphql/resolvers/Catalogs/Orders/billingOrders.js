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
const OrderModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderModel"));
const ShippingCompanies_1 = __importDefault(require("../../../../models/Catalogs/ShippingCompanies/ShippingCompanies"));
const TimeLineAdd_1 = require("../../../../helpers/TimeLineAdd");
const connection_1 = __importDefault(require("../../../../db/connection"));
const billingOrdersResolver = {
    Query: {
        getBillingOrders: (_, { searchQuery, limit, offset, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {},
            };
            if (context.roleId === 4) {
                clause.where[sequelize_1.Op.and] = [
                    { status_id: 3 },
                    { store_id: context.storeId }
                ];
            }
            else {
                clause.where = { status_id: 3 };
            }
            if (limit !== null && offset !== null) {
                clause.offset = offset;
                clause.limit = limit;
            }
            if (platform !== null) {
                clause.where.platform_id = platform;
            }
            if (searchQuery) {
                clause.where[sequelize_1.Op.or] = [
                // { status_id: { [Op.like]: `%${searchQuery}%` } },
                // { method_id: { [Op.like]: `%${searchQuery}%` } },
                ];
            }
            return yield OrderModel_1.default.findAndCountAll(clause);
        }),
    },
    Mutation: {
        changeToBilling: (_, { order_id, shipping_compay_id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { userId } = context;
                const order = yield OrderModel_1.default.findOne({
                    where: {
                        id: order_id,
                        status_id: 1,
                    },
                });
                if (!order) {
                    return Promise.reject(Error('No se encontro el pedido'));
                }
                const shippingCompany = yield ShippingCompanies_1.default.findOne({
                    where: {
                        id: shipping_compay_id,
                    },
                });
                if (!shippingCompany) {
                    return Promise.reject(Error('No se encontro el empresa de logistica'));
                }
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({ orderId: order_id, userId, transaction });
                if (!timeLineCreate)
                    return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
                yield order.update({
                    status_id: 3,
                    user_id: userId,
                    shipping_compay_id
                });
                return order;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
    },
};
exports.default = billingOrdersResolver;
