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
const PickingOrdersResolver = {
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
                const order = yield OrderModel_1.default.findOne({
                    where: {
                        id: order_id,
                    },
                });
                if (!order) {
                    return Promise.reject(Error('No se encontro el pedido'));
                }
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                    orderId: order_id,
                    userId,
                    transaction,
                });
                if (!timeLineCreate)
                    return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
                yield order.update({
                    status_id: 9,
                    user_id: userId,
                });
                let parts = Math.ceil(order.product_quantity / 10);
                for (let i = 0; i <= parts - 1; i++) {
                    yield OrdersWarehouseModel_1.default.create({
                        order_id: order.id,
                        part: i + 1,
                        total_parts: parts,
                        open: true,
                        is_active: true,
                    });
                }
                return order;
            }
            catch (error) {
                console.log(error);
                yield transaction.rollback();
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
    },
};
exports.default = PickingOrdersResolver;
