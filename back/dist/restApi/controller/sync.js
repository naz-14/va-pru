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
exports.syncGet = exports.syncBatchController = exports.syncController = void 0;
const woocommerceConnection_1 = __importDefault(require("../../services/woocommerceConnection"));
const OrderModel_1 = __importDefault(require("../../models/Catalogs/Orders/OrderModel"));
const dataTratament_1 = __importDefault(require("../woocommerce/dataTratament"));
const OrderShippingModel_1 = __importDefault(require("../../models/Catalogs/Orders/OrderShippingModel"));
const OrderPaymentModel_1 = __importDefault(require("../../models/Catalogs/Orders/OrderPaymentModel"));
const OrderProductModel_1 = __importDefault(require("../../models/Catalogs/Orders/OrderProductModel"));
const StoreModel_1 = __importDefault(require("../../models/Catalogs/Stores/StoreModel"));
const WarehouseModel_1 = __importDefault(require("../../models/Catalogs/Warehouses/WarehouseModel"));
const syncController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('=== req ===');
    console.log(req.body);
    if (req.body.status === 'processing') {
        yield WoocommerceWebHookSync(req.body);
    }
    // await WoocommerceSync()
    // Store.findAll({})
    // Warehouse.findAll({})
    // await WooTestSync()
    // await MercadoLibreSync()
    return res.status(200).json('Sync data sucessfull');
});
exports.syncController = syncController;
const syncBatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield WoocommerceSync();
    // await WooTestSync()
    // await MercadoLibreSync()
    return res.status(200).json('Sync data sucessfull');
});
exports.syncBatchController = syncBatchController;
const syncGet = (req, res) => {
    res.send('Sync data sucessfull');
};
exports.syncGet = syncGet;
const WoocommerceSync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastOrders = yield woocommerceConnection_1.default.get(`orders?status=${'processing'}&per_page=${20}&page=${1}`);
        if (lastOrders.status === 200) {
            if (lastOrders.data.length == 0) {
                return {
                    status: false,
                    message: 'no result',
                };
            }
            const ordersFromWoocommerce = lastOrders.data;
            console.log(ordersFromWoocommerce);
            ordersFromWoocommerce.forEach((order) => console.log(order.shipping_lines));
            for (const order of ordersFromWoocommerce) {
                const orderExist = yield OrderModel_1.default.findOne({
                    where: { order_id: order.id },
                });
                if (orderExist === null) {
                    const { order_id, order_date, status_id, type_id, method_id, total_price, store, shipping_price, shippingData, paymentData, productsData, uber_id, } = (0, dataTratament_1.default)(order);
                    let orderRelations = {
                        shipping_id: 0,
                        payment_id: 0,
                        innvoice_id: 0,
                        product_quantity: 0,
                        store_id: null,
                        warehouse_id: null,
                    };
                    const orderCreated = yield OrderModel_1.default.create({
                        platform_id: 1,
                        order_id,
                        order_date,
                        status_id,
                        type_id,
                        method_id,
                        uber_id,
                        total_price,
                        shipping_price,
                        is_active: true,
                    });
                    const orderCreatedId = orderCreated.id;
                    //create shipping details
                    const shippingCreated = yield OrderShippingModel_1.default.create(Object.assign(Object.assign({}, shippingData), { order_id: orderCreatedId }));
                    orderRelations.shipping_id = shippingCreated.id;
                    //create payment details
                    const paymentCreated = yield OrderPaymentModel_1.default.create(Object.assign(Object.assign({}, paymentData), { order_id: orderCreatedId, is_active: true }));
                    orderRelations.payment_id = paymentCreated.id;
                    //create innvoice details
                    //create products by order and count quantity
                    let productQuantity = 0;
                    for (let product of productsData) {
                        delete product.id;
                        productQuantity += product.quantity;
                        yield OrderProductModel_1.default.create(Object.assign(Object.assign({}, product), { order_id: orderCreatedId }));
                    }
                    orderRelations.product_quantity = productQuantity;
                    //find and update store for pickup
                    if (type_id === 2 && method_id === 1 && store) {
                        const foundedStore = yield StoreModel_1.default.findOne({ where: { name: store } });
                        if (foundedStore) {
                            orderRelations.store_id = foundedStore.id;
                        }
                    }
                    else if (type_id === 2 && method_id === 3 && store) {
                        const foundedStore = yield StoreModel_1.default.findOne({
                            where: { uber_id: store },
                        });
                        if (foundedStore) {
                            orderRelations.store_id = foundedStore.id;
                        }
                    }
                    else if (type_id === 1 && method_id === 1 && store) {
                        const foundedWarehouse = yield WarehouseModel_1.default.findOne({
                            where: { name: store },
                        });
                        if (foundedWarehouse) {
                            orderRelations.warehouse_id = foundedWarehouse.id;
                        }
                    }
                    const orderUpdated = OrderModel_1.default.update(Object.assign({}, orderRelations), { where: { id: orderCreatedId } });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            status: false,
            error: error,
        };
    }
});
const WoocommerceWebHookSync = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderExist = yield OrderModel_1.default.findOne({
            where: { order_id: order.id },
        });
        if (orderExist) {
            throw new Error('Order already exist');
        }
        const { order_id, order_date, status_id, type_id, method_id, total_price, store, shipping_price, shippingData, paymentData, productsData, uber_id, } = (0, dataTratament_1.default)(order);
        let orderRelations = {
            shipping_id: 0,
            payment_id: 0,
            innvoice_id: 0,
            product_quantity: 0,
            store_id: null,
            warehouse_id: null,
        };
        const orderCreated = yield OrderModel_1.default.create({
            platform_id: 1,
            order_id,
            order_date,
            status_id,
            type_id,
            method_id,
            uber_id,
            total_price,
            shipping_price,
            is_active: true,
        });
        const orderCreatedId = orderCreated.id;
        //create shipping details
        const shippingCreated = yield OrderShippingModel_1.default.create(Object.assign(Object.assign({}, shippingData), { order_id: orderCreatedId }));
        orderRelations.shipping_id = shippingCreated.id;
        //create payment details
        const paymentCreated = yield OrderPaymentModel_1.default.create(Object.assign(Object.assign({}, paymentData), { order_id: orderCreatedId, is_active: true }));
        orderRelations.payment_id = paymentCreated.id;
        //create products by order and count quantity
        let productQuantity = 0;
        for (let product of productsData) {
            delete product.id;
            productQuantity += product.quantity;
            yield OrderProductModel_1.default.create(Object.assign(Object.assign({}, product), { order_id: orderCreatedId }));
        }
        orderRelations.product_quantity = productQuantity;
        //find and update store for pickup
        if (type_id === 2 && method_id === 1 && store) {
            const foundedStore = yield StoreModel_1.default.findOne({ where: { name: store } });
            if (foundedStore) {
                orderRelations.store_id = foundedStore.id;
            }
        }
        else if (type_id === 2 && method_id === 3 && store) {
            const foundedStore = yield StoreModel_1.default.findOne({
                where: { uber_id: store },
            });
            if (foundedStore) {
                orderRelations.store_id = foundedStore.id;
            }
        }
        else if (type_id === 1 && method_id === 1 && store) {
            const foundedWarehouse = yield WarehouseModel_1.default.findOne({
                where: { name: store },
            });
            if (foundedWarehouse) {
                orderRelations.warehouse_id = foundedWarehouse.id;
            }
        }
        const orderUpdated = OrderModel_1.default.update(Object.assign({}, orderRelations), { where: { id: orderCreatedId } });
    }
    catch (error) {
        console.log(error);
        return {
            status: false,
            error: error,
        };
    }
});
