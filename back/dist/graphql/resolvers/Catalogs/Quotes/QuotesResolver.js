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
const QuoteModel_1 = __importDefault(require("../../../../models/Catalogs/Quotes/QuoteModel"));
const OrderStatusModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderStatusModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const QuoteResolver = {
    Query: {
        getQuotes: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                }
            };
            return yield QuoteModel_1.default.findAll(clause);
        })
    },
    Mutation: {
        createQuote: (_, { inputQuote }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const { cardCode, cardName, docDate, docTime, docStatus, comments, whsCode } = inputQuote;
            try {
                /* CREATE NEW QUOTE */
                yield QuoteModel_1.default.create({
                    cardCode,
                    cardName,
                    docDate,
                    docTime,
                    docStatus,
                    comments,
                    whsCode,
                    is_active: true,
                }, { transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        getInfoProvider: (_, { inputProvider }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const { cardCode, cardName } = inputProvider;
            try {
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    quotesData: {
        status: ({ docStatus }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderStatusModel_1.default.findOne({ where: { id: docStatus } });
        }),
    }
};
exports.default = QuoteResolver;
