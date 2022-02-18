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
const OrdersWarehouseResolver = {
    Query: {
        getAllAppOrderWarehouses: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrdersWarehouseModel_1.default.findAll();
        }),
        getAllAppOrderWarehousesPacking: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrdersWarehouseModel_1.default.findAll({
                where: {
                    picking_user_id: {
                        [sequelize_1.Op.ne]: null,
                    },
                    rack_id: {
                        [sequelize_1.Op.ne]: null,
                    },
                },
            });
        }),
        getAppOrderWarehouseById: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const order = yield OrdersWarehouseModel_1.default.findOne({ where: { id } });
                if (!order) {
                    throw new Error('Order not found');
                }
                const products = yield OrderProductModel_1.default.findAll({
                    where: { order_id: order.id },
                    raw: true,
                });
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
                return true;
            }
            else {
                return false;
            }
        }),
        changeMultipleOrdersToClose: (_, { ids }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield OrdersWarehouseModel_1.default.findAll({ where: { id: ids } });
            if (orders.length === ids.length) {
                for (const order of orders) {
                    order.open = false;
                    order.picking_user_id = context.userId;
                    yield order.save();
                }
                return true;
            }
            else {
                return false;
            }
        }),
        validateProduct: (_, { productSku, productBarcode, orderProductId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(productSku, productBarcode, orderProductId);
            try {
                const orderProduct = yield OrderProductModel_1.default.findOne({
                    where: { id: orderProductId },
                });
                if (orderProduct) {
                    orderProduct.picked = true;
                    yield orderProduct.save();
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        }),
        validateRack: (_, { warehouseOrderId, rackCode }, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(warehouseOrderId, rackCode);
            return true;
        }),
        validateProductPacking: (_, { productSku, productBarcode, orderProductId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(productSku, productBarcode, orderProductId);
            try {
                const orderProduct = yield OrderProductModel_1.default.findOne({
                    where: { id: orderProductId },
                });
                if (orderProduct) {
                    orderProduct.packed = true;
                    yield orderProduct.save();
                    return true;
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
    },
};
exports.default = OrdersWarehouseResolver;
