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
const SapPurchasesOrdersModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel"));
const SapPurchasesOrdersLinesModel_1 = __importDefault(require("../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel"));
const CommodityReceipt_1 = __importDefault(require("../../../../models/Documents/CommodityReceipt/CommodityReceipt"));
const ScheduleModel_1 = __importDefault(require("../../../../models/Documents/Schedule/ScheduleModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const CommodityReceiptResolver = {
    Query: {
        getAllCommodityReceipt: (_, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1
                },
            };
            return yield CommodityReceipt_1.default.findAll(clause);
        }),
    },
    Mutation: {
        createCommodityReceipt: (_, { commodityReceiptInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                for (const item of commodityReceiptInput) {
                    const scheduleExists = yield ScheduleModel_1.default.findOne({
                        where: {
                            id: item.scheduleId,
                            is_active: true,
                        },
                        transaction
                    });
                    if (!scheduleExists) {
                        yield transaction.rollback();
                        return Promise.reject(Error('scheduleId no existe'));
                    }
                    if (scheduleExists.document_status_id !== 1) {
                        yield transaction.rollback();
                        return Promise.reject(Error('Cita no disponible'));
                    }
                    const purchasesOrdersExists = yield SapPurchasesOrdersModel_1.default.findOne({
                        where: {
                            id: item.purchasesOrdersId,
                            is_active: true,
                        },
                        transaction,
                    });
                    if (!purchasesOrdersExists) {
                        yield transaction.rollback();
                        return Promise.reject(Error('purchasesOrdersId no existe'));
                    }
                    const ordersLinesExists = yield SapPurchasesOrdersLinesModel_1.default.findOne({
                        where: {
                            id: item.purchasesOrdersLinesId,
                            is_active: true,
                        },
                        transaction,
                    });
                    if (!ordersLinesExists) {
                        yield transaction.rollback();
                        return Promise.reject(Error('purchasesOrdersLinesId no existe'));
                    }
                    scheduleExists.document_status_id = 2;
                    yield scheduleExists.save();
                    yield CommodityReceipt_1.default.create({
                        schedule_id: item.scheduleId,
                        sap_purchases_orders_id: item.purchasesOrdersId,
                        sap_purchases_orders_lines_id: item.purchasesOrdersLinesId,
                        receipt_quantity: item.quantity,
                        id_user: context.userId,
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
        })
    },
    commodityReceipt: {
        schedules: ({ schedule_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ScheduleModel_1.default.findOne({
                where: {
                    id: schedule_id,
                },
            });
        }),
        // purchases_orders: async ({ purchases_orders_id }) => {
        //     return await SapPurchasesOrders.findOne({
        //         where: {
        //             id: purchases_orders_id,
        //         },
        //     })
        // },
        // purchases_orders_lines: async ({ purchases_orders_lines_id }) => {
        //     return await SapPurchasesOrdersLines.findOne({
        //         where: {
        //             id: purchases_orders_lines_id,
        //         },
        //     })
        // },
    }
};
exports.default = CommodityReceiptResolver;
