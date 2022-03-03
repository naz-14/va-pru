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
const connection_1 = __importDefault(require("../../../../db/connection"));
const OrderStatusModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderStatusModel"));
const SapPurchasesOrdersModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel"));
const SapBusinessPartnerModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel"));
const SapPurchasesOrdersLinesModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel"));
const SapWarehousesModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/Warehouses/SapWarehousesModel"));
const ScheduleModel_1 = __importDefault(require("../../../../models/Documents/Schedule/ScheduleModel"));
const ScheduleOrdersLinesModel_1 = __importDefault(require("../../../../models/Documents/ScheduleOrdersLines/ScheduleOrdersLinesModel"));
const ScheduleDocksModel_1 = __importDefault(require("../../../../models/Documents/ScheduleDocks/ScheduleDocksModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus';
const schedulNotFound = 'No se encontro esta cita o ha cambiado de estatus';
const ScheduleResolver = {
    Query: {
        getSchedule: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            return yield ScheduleModel_1.default.findAll(clause);
        }),
        getSapPurchasesOrdersQuotes: (_, { limit, offset }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            if (limit !== null && offset !== null) {
                clause.offset = offset;
                clause.limit = limit;
            }
            return yield SapPurchasesOrdersModel_1.default.findAndCountAll(clause);
        }),
        getSapPurchasesOrdersQuotesById: (_, { idPurcharseOrder }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                    id: idPurcharseOrder,
                },
            };
            const order = yield SapPurchasesOrdersModel_1.default.findOne(clause);
            if (!order)
                return Promise.reject(Error(orderNotFound));
            else
                return order;
        }),
    },
    Mutation: {
        createSchedule: (_, { inputSchedule }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const { dock_ids, document_date, document_time_start, document_time_end, comments, warehouse_code, document_status_id, ordersReceived, provider_id, } = inputSchedule;
            try {
                /* CREATE NEW SCHEDULE */
                const scheduleCreated = yield ScheduleModel_1.default.create({
                    document_date,
                    document_time_start,
                    document_time_end,
                    comments,
                    warehouse_code,
                    document_status_id,
                    is_active: true,
                }, { transaction });
                /* CREATE DOCUMENT SCHEDULE ORDERS LINE */
                for (const order of ordersReceived) {
                    yield ScheduleOrdersLinesModel_1.default.create({
                        business_partner_id: provider_id,
                        schedule_id: scheduleCreated.id,
                        sap_purchases_orders_id: order.purcharse_order_id,
                        sap_purchases_orders_lines_id: order.id_order,
                        is_active: true,
                    }, { transaction });
                }
                /* CREATE DOCUMENT SCHEDULS DOCKS */
                for (const dock of dock_ids) {
                    yield ScheduleDocksModel_1.default.create({
                        schedule_id: scheduleCreated.id,
                        dock_id: dock.value,
                        is_active: true,
                    }, { transaction });
                }
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Schedule: {
        status: ({ document_status_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderStatusModel_1.default.findOne({ where: { id: document_status_id } });
        }),
        warehouse: ({ warehouse_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapWarehousesModel_1.default.findOne({ where: { warehouse_code: warehouse_code } });
        }),
        scheduleLines: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ScheduleOrdersLinesModel_1.default.findAll({ where: { schedule_id: id } });
        }),
    },
    SapPurchasesOrdersQuotes: {
        business_partner: ({ business_partner_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapBusinessPartnerModel_1.default.findOne({
                where: {
                    id: business_partner_id,
                },
            });
        }),
    },
    SapPurchasesOrdersQuotesById: {
        business_partner: ({ business_partner_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapBusinessPartnerModel_1.default.findOne({
                where: {
                    id: business_partner_id,
                },
            });
        }),
        purchases_orders_lines: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapPurchasesOrdersLinesModel_1.default.findAll({
                where: {
                    purchases_order_id: id,
                },
            });
        }),
    },
};
exports.default = ScheduleResolver;
