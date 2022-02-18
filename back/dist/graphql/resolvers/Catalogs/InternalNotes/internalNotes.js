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
const InternalNotesModel_1 = __importDefault(require("../../../../models/Catalogs/InternalNotes/InternalNotesModel"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const FileModel_1 = __importDefault(require("../../../../models/Files/FileModel"));
const graphql_upload_1 = require("graphql-upload");
const UploadFile_1 = require("../../../../helpers/UploadFile");
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const internalNotesResolver = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {
        getInternalNotes: (_, { orderId }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: true,
                    order_id: orderId,
                },
                order: [['createdAt', 'ASC']],
            };
            return yield InternalNotesModel_1.default.findAll(clause);
        }),
    },
    Mutation: {
        createInternalNote: (_, { inputInternalNote }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { order_id, user_id, text, type, file } = inputInternalNote;
                let typeFile = type;
                if (type === 'jpg' || type === 'png' || type === 'jpeg')
                    typeFile = 'image';
                if (file) {
                    const documentInternal = yield (0, UploadFile_1.UploadDoc)({
                        file,
                        type,
                        userID: user_id,
                        transaction,
                    });
                    if (!documentInternal) {
                        yield transaction.rollback();
                        return Promise.reject(Error(defaultError));
                    }
                    yield InternalNotesModel_1.default.create({
                        user_id,
                        order_id,
                        text,
                        type: typeFile,
                        file_id: documentInternal.id,
                        is_active: true,
                    }, { transaction });
                    yield transaction.commit();
                    return true;
                }
                yield InternalNotesModel_1.default.create({
                    user_id,
                    order_id,
                    text,
                    type: typeFile,
                    file_id: null,
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
    },
    InternalNotes: {
        user: ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ where: { id: user_id } });
        }),
        fileInternal: ({ file_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield FileModel_1.default.findOne({ where: { id: file_id } });
        }),
    },
};
exports.default = internalNotesResolver;
