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
const UserModulesModel_1 = __importDefault(require("../../../../models/Users/UserModulesModel"));
const ModuleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/ModuleModel"));
const SubmoduleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/SubmoduleModel"));
const connection_1 = __importDefault(require("../../../../db/connection"));
const userPermissionsNotFound = 'No se encontrarón permisos para el usuario';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const UserModulesResolver = {
    Mutation: {
        getAllUserPermissions: (_, { userID }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const UserModulesFound = yield UserModulesModel_1.default.findAll({
                    where: { id_user: userID },
                });
                return UserModulesFound;
            }
            catch (e) {
                return Promise.reject(Error(defaultError));
            }
        }),
        updateUserPermission: (_, { userID, modules }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction(); //START TRANSACTION
            try {
                const userModulesFound = yield UserModulesModel_1.default.findAll({
                    where: { id_user: userID, is_active: true },
                    transaction,
                });
                if (!userModulesFound)
                    return Promise.reject(Error(userPermissionsNotFound));
                yield UserModulesModel_1.default.destroy({
                    where: { id_user: userID, is_active: true },
                });
                const existsProfileModule = yield ModuleModel_1.default.findOne({
                    where: { name: 'UserProfileMain' },
                });
                if (existsProfileModule) {
                    yield UserModulesModel_1.default.create({
                        id_user: userID,
                        id_module: existsProfileModule.id,
                        id_submodule: null,
                        access_retrieve: true,
                        access_read: true,
                        access_edit: true,
                        access_delete: true,
                        access_export: true,
                        is_active: true,
                    }, { transaction });
                }
                for (const module of modules) {
                    yield UserModulesModel_1.default.create({
                        id_user: userID,
                        id_module: module.id_module,
                        id_submodule: module.id_submodule || null,
                        access_retrieve: module.access_retrieve,
                        access_read: module.access_read,
                        access_edit: module.access_edit,
                        access_delete: module.access_delete,
                        access_export: module.access_export,
                        is_active: true,
                    }, { transaction });
                }
                yield transaction.commit();
                return true;
            }
            catch (e) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    userModule: {
        module_info: ({ id_module }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ModuleModel_1.default.findOne({
                where: { id: id_module },
            });
        }),
        submodule_info: ({ id_submodule }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SubmoduleModel_1.default.findOne({
                where: { id: id_submodule },
            });
        }),
    },
};
exports.default = UserModulesResolver;
