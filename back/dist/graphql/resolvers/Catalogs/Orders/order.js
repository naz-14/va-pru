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
const PlatformsModel_1 = __importDefault(require("../../../../models/Platforms/PlatformsModel"));
const StoreModel_1 = __importDefault(require("../../../../models/Catalogs/Stores/StoreModel"));
const WarehouseModel_1 = __importDefault(require("../../../../models/Catalogs/Warehouses/WarehouseModel"));
const OrderShippingModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderShippingModel"));
const OrderPaymentModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderPaymentModel"));
const OrderStatusModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderStatusModel"));
const OrderTypesModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderTypesModel"));
const NationalShippingMethodsModel_1 = __importDefault(require("../../../../models/Catalogs/ShippingMethods/NationalShippingMethodsModel"));
const LocalShippingMethodsModel_1 = __importDefault(require("../../../../models/Catalogs/ShippingMethods/LocalShippingMethodsModel"));
const OrderProductModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderProductModel"));
const IssussesModel_1 = __importDefault(require("../../../../models/Catalogs/Issusses/IssussesModel"));
const ReasonModel_1 = __importDefault(require("../../../../models/Catalogs/Reason/ReasonModel"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const woocommerceResolver = {
    Query: {
        getPendingOrders: (_, { limit, offset, searchQuery, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('getPendingOrders');
            try {
                const clause = {
                    where: {
                        status_id: 1,
                    },
                };
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
                return Promise.resolve(yield OrderModel_1.default.findAndCountAll(clause));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getOrderById: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderModel_1.default.findOne({ where: { id } });
        }),
        getAllStatusesOrders: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            return yield OrderStatusModel_1.default.findAll(clause);
        }),
    },
    Mutation: {
        getAllPendingExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 1,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
    },
    Order: {
        platform: ({ platform_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield PlatformsModel_1.default.findOne({ where: { id: platform_id } });
        }),
        status: ({ status_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderStatusModel_1.default.findOne({ where: { id: status_id } });
        }),
        reason: ({ order_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ReasonModel_1.default.findOne({ where: { order_id } });
        }),
        user: ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ where: { id: user_id } });
        }),
        type: ({ type_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderTypesModel_1.default.findOne({ where: { id: type_id } });
        }),
        store: ({ store_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield StoreModel_1.default.findOne({ where: { id: store_id } });
        }),
        warehouse: ({ warehouse_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield WarehouseModel_1.default.findOne({ where: { id: warehouse_id } });
        }),
        method: ({ method_id, type_id }) => __awaiter(void 0, void 0, void 0, function* () {
            if (type_id === 1) {
                return yield NationalShippingMethodsModel_1.default.findOne({ where: { id: method_id } });
            }
            return yield LocalShippingMethodsModel_1.default.findOne({ where: { id: method_id } });
        }),
        shipping: ({ shipping_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderShippingModel_1.default.findOne({ where: { id: shipping_id } });
        }),
        payment: ({ payment_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderPaymentModel_1.default.findOne({ where: { id: payment_id } });
        }),
        products: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderProductModel_1.default.findAll({ where: { order_id: id } });
        }),
    },
    Reason: {
        userDetails: ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ where: { id: user_id } });
        }),
        issusesDetails: ({ issusse_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield IssussesModel_1.default.findOne({ where: { id: issusse_id } });
        }),
    },
};
exports.default = woocommerceResolver;
