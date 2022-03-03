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
const SapPurchasesOrdersLinesModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel"));
const ScheduleOrdersLinesModel_1 = __importDefault(require("../../../../models/Documents/ScheduleOrdersLines/ScheduleOrdersLinesModel"));
const SapBusinessPartnerModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel"));
const SapPurchasesOrdersModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel"));
const ScheduleModel_1 = __importDefault(require("../../../../models/Documents/Schedule/ScheduleModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus';
const ScheduleOrdersLinesResolver = {
    Query: {
        getQuotesOrdersLines: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            // if (limit !== null && offset !== null) {
            //   clause.offset = offset
            //   clause.limit = limit
            // }
            return yield ScheduleOrdersLinesModel_1.default.findAll(clause);
        }),
        getScheduleOrdersLinesByScheduleId: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            // if (limit !== null && offset !== null) {
            //   clause.offset = offset
            //   clause.limit = limit
            // }
            return yield ScheduleOrdersLinesModel_1.default.findAll(clause);
        }),
    },
    Mutation: {
        getScheduleOrdersLinesByScheduleId: (_, { scheduleId }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    schedule_id: scheduleId,
                    is_active: 1,
                },
            };
            return yield ScheduleOrdersLinesModel_1.default.findAll(clause);
        }),
    },
    QuotesOrdersLines: {
        business_partner: ({ business_partner_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapBusinessPartnerModel_1.default.findOne({
                where: {
                    id: business_partner_id,
                    is_active: 1,
                },
            });
        }),
        purchases_orders: ({ sap_purchases_orders_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapPurchasesOrdersModel_1.default.findOne({
                where: {
                    id: sap_purchases_orders_id,
                    is_active: 1,
                },
            });
        }),
        purchases_orders_lines: ({ sap_purchases_orders_lines_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapPurchasesOrdersLinesModel_1.default.findOne({
                where: {
                    id: sap_purchases_orders_lines_id,
                    is_active: 1,
                },
            });
        }),
        schedule: ({ schedule_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield ScheduleModel_1.default.findOne({
                where: {
                    id: schedule_id,
                    is_active: 1,
                },
            });
            if (res)
                return res;
            else
                return null;
        }),
    },
};
exports.default = ScheduleOrdersLinesResolver;
