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
const OrdersWarehouseModel_1 = __importDefault(require("../../../../../models/App/Catalogs/Orders/OrdersWarehouse/OrdersWarehouseModel"));
const OrderModel_1 = __importDefault(require("../../../../../models/Catalogs/Orders/OrderModel"));
const sequelize_1 = require("sequelize");
const OrderProductModel_1 = __importDefault(require("../../../../../models/Catalogs/Orders/OrderProductModel"));
const WarehouseOrderBoxes_1 = __importDefault(require("../../../../../models/Catalogs/Warehouses/WarehouseOrderBoxes"));
const connection_1 = __importDefault(require("../../../../../db/connection"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const SapItemsModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Items/SapItemsModel"));
const TimelineModel_1 = __importDefault(require("../../../../../models/Catalogs/Timeline/TimelineModel"));
const moment_1 = __importDefault(require("moment"));
const pubsub = new graphql_subscriptions_1.PubSub();
const OrdersWarehouseResolver = {
    Subscription: {
        pickingOrderChanged: {
            subscribe: (_, __) => {
                return pubsub.asyncIterator('pickingOrderChanged');
            },
        },
        pickingOrderCompleted: {
            subscribe: (_, __) => {
                return pubsub.asyncIterator('pickingOrderCompleted');
            },
        },
        pickingOrderUncompleted: {
            subscribe: (_, __) => {
                return pubsub.asyncIterator('pickingOrderUncompleted');
            },
        },
        packingOrderChanged: {
            subscribe: (_, __) => {
                return pubsub.asyncIterator('packingOrderChanged');
            },
        },
        packingOrderCompleted: {
            subscribe: (_, __) => {
                return pubsub.asyncIterator('packingOrderCompleted');
            },
        },
    },
    Query: {
        getAllAppOrderWarehouses: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrdersWarehouseModel_1.default.findAll({
                where: {
                    open: true,
                    picking_user_id: {
                        [sequelize_1.Op.eq]: null,
                    },
                },
            });
        }),
        getAllAppOrderWarehousesPacking: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrdersWarehouseModel_1.default.findAll({
                where: {
                    picking_user_id: {
                        [sequelize_1.Op.ne]: null,
                    },
                    packing_user_id: {
                        [sequelize_1.Op.eq]: null,
                    },
                    rack_id: {
                        [sequelize_1.Op.ne]: null,
                    },
                    open: true,
                },
            });
        }),
        getAppOrderWarehouseById: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const order = yield OrdersWarehouseModel_1.default.findOne({ where: { id } });
                console.log('AAAAAAAAAAAAa');
                if (!order) {
                    throw new Error('Order not found');
                }
                const products = yield OrderProductModel_1.default.findAll({
                    where: { order_id: order.order_id },
                    raw: true,
                });
                console.log(products);
                const productArray = [];
                // forEach product shuild get the rack and append it to the product
                products.forEach((product) => {
                    const rack = 'A220';
                    // await Order.findOne({
                    //   where: { id: product.order_id },
                    // })
                    productArray.push(Object.assign(Object.assign({}, product), { rack }));
                });
                return {
                    details: order,
                    products: productArray,
                };
            }
            catch (error) {
                console.log(error);
                throw new Error("Can't get order");
            }
        }),
        getAppOderWarehouseByMultiIds: (_, { ids }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orders = yield OrdersWarehouseModel_1.default.findAll({ where: { id: ids } });
                if (!orders) {
                    throw new Error('Order not found');
                }
                const productArray = [];
                for (const order of orders) {
                    const products = yield OrderProductModel_1.default.findAll({
                        where: { order_id: order.id },
                        raw: true,
                    });
                    // forEach product shuild get the rack and append it to the product
                    products.forEach((product) => {
                        const rack = 'A220';
                        // await Order.findOne({
                        //   where: { id: product.order_id },
                        // })
                        productArray.push(Object.assign(Object.assign({}, product), { rack }));
                    });
                }
                return {
                    details: orders,
                    products: productArray,
                };
            }
            catch (error) {
                console.log(error);
                throw new Error("Can't get order");
            }
        }),
        getAppWarehouseOrderBoxes: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield WarehouseOrderBoxes_1.default.findAll({
                where: { warehouse_order_id: id },
            });
        }),
        getAppUserWarehouseOrders(_, { id }, context) {
            return OrdersWarehouseModel_1.default.findAll({
                where: {
                    picking_user_id: id,
                    open: false,
                    packing_user_id: {
                        [sequelize_1.Op.eq]: null,
                    },
                },
            });
        },
        getAppUserWarehouseOrdersPacking(_, {}, context) {
            console.log(context);
            return OrdersWarehouseModel_1.default.findAll({
                where: {
                    packing_user_id: context.userId,
                    open: false,
                },
            });
        },
    },
    AppOrderWarehouse: {
        order: ({ order_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderModel_1.default.findOne({ where: { id: order_id } });
        }),
    },
    Mutation: {
        isOrderOpen: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield OrdersWarehouseModel_1.default.findOne({ where: { id } });
            if (order) {
                return order.open;
            }
            else {
                return false;
            }
        }),
        changeOrderToClose: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield OrdersWarehouseModel_1.default.findOne({ where: { id } });
            if (order) {
                order.open = false;
                order.picking_user_id = context.userId;
                yield order.save();
                pubsub.publish('pickingOrderChanged', {
                    pickingOrderChanged: order,
                });
                return true;
            }
            else {
                return false;
            }
        }),
        changeOrderPackingToClose: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield OrdersWarehouseModel_1.default.findOne({ where: { id } });
            if (order) {
                order.open = false;
                order.packing_user_id = context.userId;
                yield order.save();
                pubsub.publish('packingOrderChanged', {
                    packingOrderChanged: order,
                });
                return true;
            }
            else {
                return false;
            }
        }),
        changeMultipleOrdersToClose: (_, { ids }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const orders = yield OrdersWarehouseModel_1.default.findAll({
                where: { id: ids },
            });
            if (orders.length === ids.length) {
                for (const order of orders) {
                    yield order.update({
                        open: false,
                        picking_user_id: context.userId,
                    }, {
                        where: {
                            id: order.id,
                        },
                        transaction,
                    });
                }
                yield transaction.commit();
                orders.forEach((order) => {
                    pubsub.publish('pickingOrderChanged', {
                        pickingOrderChanged: order.toJSON(),
                    });
                });
                return true;
            }
            else {
                yield transaction.rollback();
                return false;
            }
        }),
        validateProduct: (_, { productSku, productBarcode, orderProductId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orderProduct = yield OrderProductModel_1.default.findOne({
                    where: { id: orderProductId },
                });
                if (orderProduct) {
                    const productValid = yield SapItemsModel_1.default.findOne({
                        where: {
                            item_code: productSku,
                            item_code_bar: productBarcode,
                        },
                    });
                    if (productValid) {
                        orderProduct.picked = true;
                        yield orderProduct.save();
                        return true;
                    }
                    return false;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        unavailableProduct: (_, { orderProductId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orderProduct = yield OrderProductModel_1.default.findOne({
                    where: { id: orderProductId },
                });
                if (orderProduct) {
                    orderProduct.unavailable = true;
                    yield orderProduct.save();
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        changeOrderToUncompleted: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const order = yield OrdersWarehouseModel_1.default.findOne({
                    where: { id },
                });
                if (order) {
                    order.uncompleted = true;
                    yield order.save();
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        validateRack: (_, { warehouseOrderId, rackCode }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                let order = yield OrdersWarehouseModel_1.default.findOne({
                    where: { id: warehouseOrderId },
                    raw: true,
                });
                if (order) {
                    yield OrdersWarehouseModel_1.default.update({
                        open: true,
                        rack_id: rackCode,
                    }, { where: { id: warehouseOrderId }, transaction });
                    const principalOrder = yield OrderModel_1.default.findOne({
                        where: { id: order.order_id },
                    });
                    yield OrderModel_1.default.update({
                        status_id: 10,
                        user_id: context.user_id,
                    }, {
                        where: {
                            id: order.order_id,
                        },
                        transaction,
                    });
                    yield TimelineModel_1.default.create({
                        user_id: context.userId,
                        order_id: principalOrder.order_id,
                        status_id: 10,
                        dateStatus: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                        is_active: true,
                    }, { transaction });
                    yield transaction.commit();
                    const orderUpdated = yield OrdersWarehouseModel_1.default.findOne({
                        where: { id: warehouseOrderId },
                    });
                    yield pubsub.publish('pickingOrderCompleted', {
                        pickingOrderCompleted: orderUpdated,
                    });
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        validateRackUncompleted: (_, { rackCode, warehouseOrderId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let order = yield OrdersWarehouseModel_1.default.findOne({
                    where: { id: warehouseOrderId },
                    raw: true,
                });
                if (order) {
                    yield OrdersWarehouseModel_1.default.update({
                        open: true,
                        rack_id: rackCode,
                        picking_user_id: null,
                    }, { where: { id: warehouseOrderId } });
                    yield pubsub.publish('pickingOrderUncompleted', {
                        pickingOrderUncompleted: order,
                    });
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        validateRackMultiOrder: (_, { warehouseOrderId, rackCode }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                let orders = yield OrdersWarehouseModel_1.default.findAll({
                    where: { id: warehouseOrderId },
                });
                for (const order of warehouseOrderId) {
                    yield OrdersWarehouseModel_1.default.update({
                        open: true,
                        rack_id: rackCode,
                    }, {
                        where: { id: order },
                        transaction,
                    });
                }
                yield transaction.commit();
                orders.forEach((order) => {
                    pubsub.publish('pickingOrderCompleted', {
                        pickingOrderCompleted: order.toJSON(),
                    });
                });
                return true;
            }
            catch (e) {
                yield transaction.rollback();
                return false;
            }
        }),
        validateProductPacking: (_, { productSku, productBarcode, orderProductId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orderProduct = yield OrderProductModel_1.default.findOne({
                    where: { id: orderProductId },
                });
                if (orderProduct) {
                    const productValid = yield SapItemsModel_1.default.findOne({
                        where: {
                            item_code: productSku,
                            item_code_bar: productBarcode,
                        },
                    });
                    if (productValid) {
                        orderProduct.packed = true;
                        yield orderProduct.save();
                        return true;
                    }
                    return false;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        createOrderWarehouseBoxes: (_, { orderId, boxes }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                for (const box of boxes) {
                    yield WarehouseOrderBoxes_1.default.create({
                        warehouse_order_id: orderId,
                        box_id: box.box_id,
                        quantity: box.quantity,
                        is_active: true,
                    }, { transaction });
                }
                yield transaction.commit();
                return true;
            }
            catch (e) {
                yield transaction.rollback();
                return false;
            }
        }),
        changeOrderPackingToCompleted: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const orderWarehouse = yield OrdersWarehouseModel_1.default.findOne({
                    where: { id },
                });
                if (orderWarehouse) {
                    yield OrdersWarehouseModel_1.default.update({
                        open: true,
                        packing_user_id: context.userId,
                    }, { where: { id }, transaction });
                    yield OrderModel_1.default.update({
                        status_id: 8,
                        user_id: context.userId,
                    }, {
                        where: { id: orderWarehouse.order_id },
                        transaction,
                    });
                    const principalOrder = yield OrderModel_1.default.findOne({
                        where: { id: orderWarehouse.order_id },
                    });
                    // timeline
                    yield TimelineModel_1.default.create({
                        user_id: context.userId,
                        order_id: principalOrder.order_id,
                        status_id: 8,
                        dateStatus: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                        is_active: true,
                    }, { transaction });
                    yield transaction.commit();
                    pubsub.publish('packingOrderCompleted', {
                        packingOrderCompleted: orderWarehouse.toJSON(),
                    });
                    return true;
                }
                yield transaction.rollback();
                return false;
            }
            catch (e) {
                yield transaction.rollback();
                return false;
            }
        }),
    },
};
exports.default = OrdersWarehouseResolver;
