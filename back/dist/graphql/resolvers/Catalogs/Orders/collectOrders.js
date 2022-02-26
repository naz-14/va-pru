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
const connection_1 = __importDefault(require("../../../../db/connection"));
const TimeLineAdd_1 = require("../../../../helpers/TimeLineAdd");
const OrderModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderModel"));
const ShippingCompanies_1 = __importDefault(require("../../../../models/Catalogs/ShippingCompanies/ShippingCompanies"));
const orderNotFound = 'No se encontro el pedido';
const logisticNotFound = 'No se encontro el empresa de logística';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const collectOrders = {
    Query: {
        getCollectOrders: (_, { searchQuery, limit, offset, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: { status_id: 8 },
            };
            if (context.storeId) {
                clause.where.store_id = context.storeId;
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
        changeToCollect: (_, { order_id, shipping_company_id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { userId } = context;
                const order = yield OrderModel_1.default.findOne({
                    where: {
                        id: order_id,
                    },
                });
                if (!order) {
                    yield transaction.rollback();
                    return Promise.reject(Error(orderNotFound));
                }
                if (shipping_company_id) {
                    const shippingCompany = yield ShippingCompanies_1.default.findOne({
                        where: {
                            id: shipping_company_id,
                        },
                    });
                    if (!shippingCompany) {
                        yield transaction.rollback();
                        return Promise.reject(Error(logisticNotFound));
                    }
                    const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                        orderId: order.order_id,
                        statusId: 8,
                        userId: userId,
                        transaction,
                    });
                    if (!timeLineCreate) {
                        yield transaction.rollback();
                        return Promise.reject(Error(defaultError));
                    }
                    yield order.update({
                        status_id: 8,
                        user_id: userId,
                        shipping_company_id,
                    }, { transaction });
                }
                else {
                    yield order.update({
                        status_id: 8,
                        user_id: userId,
                    }, { transaction });
                }
                yield transaction.commit();
                return order;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = collectOrders;
