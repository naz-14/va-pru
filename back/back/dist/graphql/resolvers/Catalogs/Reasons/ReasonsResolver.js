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
const OrderModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderModel"));
const ReasonModel_1 = __importDefault(require("../../../../models/Catalogs/Reason/ReasonModel"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const moment_1 = __importDefault(require("moment"));
const TimeLineAdd_1 = require("../../../../helpers/TimeLineAdd");
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const orderAlreadyRejected = 'La orden ya ha sido rechazada';
const orderNotFound = 'No se encontro el pedido';
const ReasonsResolver = {
    Query: {
        getReason: (_, { orderId }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    order_id: orderId,
                },
            };
            return yield ReasonModel_1.default.findAll(clause);
        }),
    },
    Mutation: {
        createReason: (_, { inputReason }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const { order_id, issusse_id, user_id, reason } = inputReason;
            try {
                /* CHECK IF REASON ALREADY EXISTS */
                const resReasons = yield ReasonModel_1.default.findOne({ where: { order_id } });
                if (resReasons) {
                    yield transaction.rollback();
                    return Promise.reject(Error(orderAlreadyRejected));
                }
                /* CHECK IF ORDER ALREADY EXISTS */
                const resOrders = yield OrderModel_1.default.findOne({ where: { order_id } });
                if (!resOrders) {
                    yield transaction.rollback();
                    return Promise.reject(Error(orderNotFound));
                }
                /* CREATE NEW REASON */
                yield ReasonModel_1.default.create({
                    order_id,
                    reason,
                    issusse_id,
                    user_id,
                    is_active: true,
                    createdAt: (0, moment_1.default)().format(),
                }, { transaction });
                yield OrderModel_1.default.update({
                    status_id: 12,
                }, { where: { order_id }, transaction });
                const timeLineCreate = yield (0, TimeLineAdd_1.TimeLineAdd)({
                    orderId: order_id,
                    statusId: 12,
                    userId: context.userId,
                    transaction,
                });
                if (!timeLineCreate)
                    return Promise.reject(Error(defaultError));
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    reasonsData: {
        userDetails: ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ where: { id: user_id } });
        }),
    },
};
exports.default = ReasonsResolver;
