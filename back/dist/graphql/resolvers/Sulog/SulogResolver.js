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
const connection_1 = __importDefault(require("../../../db/connection"));
const ApiSapReceiver_1 = __importDefault(require("../../../helpers/ApiSapReceiver"));
const documentNotFound = 'El numero de documento no existe';
const documentWasNotCreated = 'No se puedo crear el documento';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const SulogResolver = {
    Query: {
    // getAllSulogDocs: async (_, {}) => {
    //   return Sulog.findAll()
    // },
    // getOneSulogDoc: async (_, { id }) => {
    //   return Sulog.findOne({ where: { id } })
    // },
    },
    Mutation: {
        createSulogDoc: (_, { ordersId }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const data = ordersId.map((order) => {
                    return {
                        order_id: order,
                        key: order.toString(),
                        name: 'createOrder',
                        values: {
                            order_id: order,
                        },
                    };
                });
                const sulogCreate = yield (0, ApiSapReceiver_1.default)(data);
                if (!sulogCreate) {
                    yield transaction.rollback();
                    return Promise.reject(Error(documentWasNotCreated));
                }
                // const { cardCode, cardName, docDate, comments, numAtCard } = sulogCreate
                // const newDoc = await Sulog.create(
                //   {
                //     cardCode,
                //     cardName,
                //     docDate,
                //     comments,
                //     numAtCard,
                //   },
                //   { transaction }
                // )
                yield transaction.commit();
                return sulogCreate;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(error.message));
            }
        }),
    },
};
exports.default = SulogResolver;
