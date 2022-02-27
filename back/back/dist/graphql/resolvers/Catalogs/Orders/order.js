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
const ShippingCompanies_1 = __importDefault(require("../../../../models/Catalogs/ShippingCompanies/ShippingCompanies"));
const FileModel_1 = __importDefault(require("../../../../models/Files/FileModel"));
const UploadFile_1 = require("../../../../helpers/UploadFile");
const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus';
const woocommerceResolver = {
    Query: {
        getPendingOrders: (_, { limit, offset, searchQuery, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const clause = {
                    where: {
                        status_id: 1,
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
                return Promise.resolve(yield OrderModel_1.default.findAndCountAll(clause));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getOrderById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderModel_1.default.findOne({ where: { id } });
        }),
        getOrderByIdAndStatus: (_, { id, status_id, type_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    id,
                    is_active: true,
                },
            };
            if (status_id) {
                const ids = status_id.map((id) => {
                    return { status_id: id };
                });
                clause.where[sequelize_1.Op.or] = ids;
            }
            if (type_id) {
                clause.where.type_id = type_id;
            }
            const order = yield OrderModel_1.default.findOne(clause);
            if (!order)
                return Promise.reject(Error(orderNotFound));
            return order;
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
        getAllProcessExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 2,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllBillingExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 3,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllToStockExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 6,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllLocalExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 2 || 6 || 7 || 8,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllNationalExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 7 || 3 || 9 || 10 || 8,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllShippedExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 11,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllRejectedExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 12 || 13,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllInRouteExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 7,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error('Algo salio mal, vuelve a intentar'));
            }
        }),
        getAllCollectExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield OrderModel_1.default.findAll({
                    where: {
                        status_id: 8,
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
        shippingCompany: ({ shipping_company_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ShippingCompanies_1.default.findOne({
                where: { id: shipping_company_id },
            });
        }),
    },
    Shipping: {
        receipt: ({ id_file_receipt }) => __awaiter(void 0, void 0, void 0, function* () {
            const file = yield FileModel_1.default.findOne({
                where: { id: id_file_receipt },
            });
            if (file) {
                const url = yield (0, UploadFile_1.getFile)(file.url);
                return { id: file.id, url: url };
            }
            else {
                return null;
            }
        }),
    },
    OrderExport: {
        platform_name: ({ platform_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield PlatformsModel_1.default.findOne({ where: { id: platform_id } });
            if (query)
                return query.name;
            else
                return null;
        }),
        type_name: ({ type_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield OrderTypesModel_1.default.findOne({ where: { id: type_id } });
            if (query)
                return query.name;
            else
                return null;
        }),
        platform: ({ payment_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield OrderPaymentModel_1.default.findOne({ where: { id: payment_id } });
            if (query)
                return query.platform;
            else
                return null;
        }),
        id_payment: ({ payment_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield OrderPaymentModel_1.default.findOne({ where: { id: payment_id } });
            if (query)
                return query.payment_id;
            else
                return null;
        }),
        shipping_first_name: ({ shipping_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield OrderShippingModel_1.default.findOne({ where: { id: shipping_id } });
            if (query)
                return query.first_name;
            else
                return null;
        }),
        shipping_last_name: ({ shipping_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield OrderShippingModel_1.default.findOne({ where: { id: shipping_id } });
            if (query)
                return query.last_name;
            else
                return null;
        }),
        store_name: ({ store_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield StoreModel_1.default.findOne({ where: { id: store_id } });
            if (query)
                return query.name;
            else
                return null;
        }),
        warehouse_name: ({ warehouse_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield WarehouseModel_1.default.findOne({ where: { id: warehouse_id } });
            if (query)
                return query.name;
            else
                return null;
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
