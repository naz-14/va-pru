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
const IssussesModel_1 = __importDefault(require("../../../../models/Catalogs/Issusses/IssussesModel"));
const OrderModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderModel"));
const orderNotFound = 'No se encontro el pedido';
const reasonNotFound = 'No se encontro el motivo de cancelacion';
const defaultError = 'Algo salio mal, vuelve a intentar';
const rejectedOrders = {
    Query: {
        getRejectedOrders: (_, { searchQuery, limit, offset, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    [sequelize_1.Op.or]: [{ status_id: 12 }, { status_id: 13 }],
                },
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
        changeToRejected: (_, { order_id, id_reason }, context) => __awaiter(void 0, void 0, void 0, function* () {
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
                const reason = yield IssussesModel_1.default.findOne({
                    where: {
                        id: id_reason,
                    },
                });
                if (!reason) {
                    yield transaction.rollback();
                    return Promise.reject(Error(reasonNotFound));
                }
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                    orderId: order.order_id,
                    statusId: 12,
                    userId: userId,
                    transaction,
                });
                if (!timeLineCreate)
                    return Promise.reject(Error(defaultError));
                yield order.update({
                    status_id: 12,
                    user_id: userId,
                }, { transaction });
                // await transaction.commit()
                return order;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        changeToReturned: (_, { order_id }, context) => __awaiter(void 0, void 0, void 0, function* () {
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
                const reason = yield IssussesModel_1.default.findOne({
                    where: {
                        id: 5,
                    },
                });
                if (!reason) {
                    yield transaction.rollback();
                    return Promise.reject(Error(reasonNotFound));
                }
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                    orderId: order.order_id,
                    statusId: 13,
                    userId: userId,
                    transaction,
                });
                if (!timeLineCreate)
                    return Promise.reject(Error(defaultError));
                yield order.update({
                    status_id: 13,
                    user_id: userId,
                }, { transaction });
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
exports.default = rejectedOrders;
