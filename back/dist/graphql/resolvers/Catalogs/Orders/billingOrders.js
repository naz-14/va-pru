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
const ApiSapReceiver_1 = __importDefault(require("../../../../helpers/ApiSapReceiver"));
const moment_1 = __importDefault(require("moment"));
const PlatformOrderCounter_1 = __importDefault(require("../../../../models/Catalogs/Orders/PlatformOrderCounter"));
const orderNotFound = 'No se encontro el pedido';
const logisticNotFound = 'No se encontro el empresa de logística';
const defaultError = 'Algo salio mal, vuelve a intentar';
const billingOrdersResolver = {
    Query: {
        getBillingOrders: (_, { searchQuery, limit, offset, platform }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: { status_id: 3 },
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
        changeToBilling: (_, { order_id, shipping_company_id, uploadReceipt }, context) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield transaction.rollback();
                    return Promise.reject(Error(orderNotFound));
                }
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
                    statusId: 3,
                    userId: context.userId,
                    transaction,
                });
                if (!timeLineCreate) {
                    return Promise.reject(Error(defaultError));
                }
                yield order.update({
                    status_id: 3,
                    user_id: userId,
                    shipping_company_id,
                }, { where: { order_id }, transaction });
                // const uploadedReceipt = await UploadDocument({
                //   file: uploadReceipt,
                //   type: 'pdf',
                //   userID: userId,
                //   transaction,
                // })
                //
                // if (!uploadedReceipt) {
                //   return Promise.reject(Error(defaultError))
                // }
                // await ShippingOrders.update(
                //   {
                //     id_file_receipt: uploadedReceipt.id,
                //   },
                //   { where: { order_id }, transaction }
                // )
                yield transaction.commit();
                return order;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        billingProcess: (_, { order_id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const PrincipalOrder = yield OrderModel_1.default.findOne({
                    where: { id: order_id },
                });
                const counter = yield PlatformOrderCounter_1.default.findOne({
                    where: {
                        id: 1,
                    },
                });
                const actualOrder = counter.count || 0;
                const newOrder = `${actualOrder + 1}`;
                const code = `${(0, moment_1.default)().format('YYYYMMDD')}PO${newOrder.padStart(6, '0')}`; // PO means Platform Order
                const resp = yield (0, ApiSapReceiver_1.default)([
                    {
                        key: code,
                        name: 'createOrder',
                        values: { order_id },
                    },
                ]);
                counter.count = actualOrder + 1;
                yield counter.save();
                // const data = resp.result
                return resp[0].result.statusCode === 200;
                // return data.statusCode === 200
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
    },
};
exports.default = billingOrdersResolver;
