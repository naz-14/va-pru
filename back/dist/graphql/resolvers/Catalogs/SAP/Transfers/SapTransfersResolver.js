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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../../../../db/connection"));
const sequelize_1 = require("sequelize");
const SapInventoryTransfersRequestModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransfersRequestModel"));
const SapInventoryTransferLineModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransferLineModel"));
const SapWarehousesModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Warehouses/SapWarehousesModel"));
const moment_1 = __importDefault(require("moment"));
const SapItemsModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Items/SapItemsModel"));
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
        createTransferRequest: (_, { inputTransferRequest, inputProducts }) => { var inputProducts_1, inputProducts_1_1; return __awaiter(void 0, void 0, void 0, function* () {
            var e_1, _a;
            const transaction = yield connection_1.default.transaction();
            try {
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
                try {
                    for (inputProducts_1 = __asyncValues(inputProducts); inputProducts_1_1 = yield inputProducts_1.next(), !inputProducts_1_1.done;) {
                        let product = inputProducts_1_1.value;
                        const { item_code, quantity, open_quantity } = product;
                        yield SapInventoryTransferLineModel_1.default.create({
                            inventory_transfer_id: newTransferRequest.id,
                            item_code,
                            quantity,
                            open_quantity,
                        }, { transaction });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (inputProducts_1_1 && !inputProducts_1_1.done && (_a = inputProducts_1.return)) yield _a.call(inputProducts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // const requestTransferSAP = await ApiSapReceiver([
                //   {
                //     key: newTransferRequest.id,
                //     name: 'createInventoryTransferRequest',
                //     values: { id: newTransferRequest.id },
                //   },
                // ])
                // if (requestTransferSAP) {
                //   await transaction.rollback()
                //   return Promise.reject(Error(requestTransferSAP))
                // }
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }); },
    },
    transfersRequestCatalog: {
        warehouse_origin_name: ({ from_whs_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapWarehousesModel_1.default.findOne({
                where: { warehouse_code: from_whs_code },
            });
        }),
        warehouse_destiny_name: ({ to_whs_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapWarehousesModel_1.default.findOne({
                where: { warehouse_code: to_whs_code },
            });
        }),
    },
    returnTransferRequest: {
        products: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapInventoryTransferLineModel_1.default.findAll({
                where: { inventory_transfer_id: id },
            });
        }),
        warehouse_origin_name: ({ from_whs_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapWarehousesModel_1.default.findOne({
                where: { warehouse_code: from_whs_code },
            });
        }),
        warehouse_destiny_name: ({ to_whs_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapWarehousesModel_1.default.findOne({
                where: { warehouse_code: to_whs_code },
            });
        }),
    },
    transfersProducts: {
        name_product: ({ item_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapItemsModel_1.default.findOne({ where: { item_code } });
        }),
    },
};
exports.default = SapTransferRequestResolver;
