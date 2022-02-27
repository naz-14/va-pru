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
const TimeLineAdd_1 = require("../../../../helpers/TimeLineAdd");
const connection_1 = __importDefault(require("../../../../db/connection"));
const OrdersWarehouseModel_1 = __importDefault(require("../../../../models/App/Catalogs/Orders/OrdersWarehouse/OrdersWarehouseModel"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const orderNotFound = 'No se encontro el pedido';
const defaultError = 'Algo salio mal, vuelve a intentar';
const PickingOrdersResolver = {
    Subscription: {
        pickingOrderCreated: {
            subscribe: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                return pubsub.asyncIterator('pickingOrderCreated');
            }),
        },
    },
    Query: {
        getPickingOrders: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderModel_1.default.findAndCountAll({ where: { status_id: 9 } });
        }),
    },
    Mutation: {
        changeToPicking: (_, { order_id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { userId } = context;
                const clause = {
                    where: {
                        id: order_id,
                    },
                };
                if (context.store_id)
                    clause.where.store_id = context.store_id;
                const order = yield OrderModel_1.default.findOne(clause);
                if (!order) {
                    yield transaction.rollback();
                    return Promise.reject(Error(orderNotFound));
                }
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                    orderId: order.order_id,
                    statusId: 9,
                    userId: userId,
                    transaction,
                });
                if (!timeLineCreate)
                    return Promise.reject(Error(defaultError));
                yield order.update({
                    status_id: 9,
                    user_id: userId,
                }, { transaction });
                const warehouseOrder = yield OrdersWarehouseModel_1.default.create({
                    order_id: order.id,
                    open: true,
                    is_active: true,
                }, { transaction });
                yield transaction.commit();
                yield pubsub.publish('pickingOrderCreated', {
                    pickingOrderCreated: warehouseOrder,
                });
                return {
                    order,
                    warehouseOrder,
                };
            }
            catch (error) {
                console.log(error);
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = PickingOrdersResolver;
