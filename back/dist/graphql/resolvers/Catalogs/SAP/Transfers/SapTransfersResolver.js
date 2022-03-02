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
const connection_1 = __importDefault(require("../../../../../db/connection"));
const sequelize_1 = require("sequelize");
const SapInventoryTransfersRequestModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransfersRequestModel"));
const SapInventoryTransferLineModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransferLineModel"));
const moment_1 = __importDefault(require("moment"));
const ApiSapReceiver_1 = __importDefault(require("../../../../../helpers/ApiSapReceiver"));
const TransferRequestExist = 'Ya existe un registro con este nombre';
const TransferRequestNotExist = 'El registro no existe';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const SapTransferRequestResolver = {
    Query: {
        getAllTransferRequest: (_, { searchQuery, limit, offset }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const clause = {
                    where: {
                        is_active: true,
                    },
                };
                if (limit !== null && offset !== null) {
                    clause.offset = offset;
                    clause.limit = limit;
                }
                if (searchQuery) {
                    clause.where[sequelize_1.Op.or] = [
                    // { document_date_sap: { [Op.like]: `%${searchQuery}%` } },
                    // { warehouse_code_sap: { [Op.like]: `%${searchQuery}%` } },
                    ];
                }
                return Promise.resolve(yield SapInventoryTransfersRequestModel_1.default.findAndCountAll(clause));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        getOneTransferRequest: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const TransferRequestExist = yield SapInventoryTransfersRequestModel_1.default.findOne({
                    where: { id, is_active: true },
                });
                if (!TransferRequestExist) {
                    return Promise.reject(Error(TransferRequestNotExist));
                }
                return yield SapInventoryTransfersRequestModel_1.default.findByPk(id);
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Mutation: {
        createTransferRequest: (_, { inputTransferRequest, inputProducts }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction(); //START TRANSACTION
            try {
                //HERE GOES THE SAP REQUEST FOR THE TRANSFER
                // const requestTransferSAP = true
                const { doc_date, comments, from_whs_code, to_whs_code } = inputTransferRequest;
                const newTransferRequest = yield SapInventoryTransfersRequestModel_1.default.create({
                    doc_date,
                    doc_due_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    comments,
                    from_whs_code,
                    status: 1,
                    to_whs_code,
                    is_active: true,
                }, { transaction });
                inputProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                    const { item_code, quantity, open_quantity } = product;
                    yield SapInventoryTransferLineModel_1.default.create({
                        inventory_transfer_id: newTransferRequest.id,
                        item_code,
                        quantity,
                        open_quantity,
                    }, { transaction });
                }));
                const requestTransferSAP = yield (0, ApiSapReceiver_1.default)([
                    {
                        key: newTransferRequest.id,
                        name: 'createInventoryTransferRequest',
                        values: { id: newTransferRequest.id },
                    },
                ]);
                if (requestTransferSAP) {
                    yield transaction.rollback();
                    return Promise.reject(Error(requestTransferSAP));
                }
                yield transaction.commit();
                return newTransferRequest;
            }
            catch (error) {
                yield transaction.rollback();
                console.log(error);
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = SapTransferRequestResolver;
