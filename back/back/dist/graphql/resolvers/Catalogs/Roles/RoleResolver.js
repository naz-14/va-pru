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
const sequelize_1 = require("sequelize");
const userPermissions_1 = __importDefault(require("../../../../helpers/userPermissions"));
const RoleModel_1 = __importDefault(require("./../../../../models/Catalogs/Roles/RoleModel"));
const invalidPermissions = 'No tienes permiso para realizar esta acción';
const roleExist = 'Ya existe un rol con ese nombre';
const roleNotExist = 'El rol no existe';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const RoleResolver = {
    Query: {
        getAllRoles: (_, { limit, offset, searchQuery }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.roleId === 1) {
                    if (limit !== null && offset !== null) {
                        if (searchQuery) {
                            return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                                offset: offset,
                                limit: limit,
                                where: {
                                    is_active: true,
                                    [sequelize_1.Op.or]: [
                                        {
                                            role_name: { [sequelize_1.Op.like]: `%${searchQuery}%` },
                                        },
                                        { description: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    ],
                                },
                            }));
                        }
                        return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: { is_active: true },
                        }));
                    }
                    return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                        where: { is_active: true },
                    }));
                }
                else {
                    if (limit !== null && offset !== null) {
                        if (searchQuery) {
                            return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                                offset: offset,
                                limit: limit,
                                where: {
                                    is_active: true,
                                    [sequelize_1.Op.or]: [
                                        {
                                            role_name: { [sequelize_1.Op.like]: `%${searchQuery}%` },
                                        },
                                        { description: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    ],
                                },
                            }));
                        }
                        return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: {
                                is_active: true,
                                id: {
                                    [sequelize_1.Op.ne]: 1,
                                },
                            },
                        }));
                    }
                    return Promise.resolve(yield RoleModel_1.default.findAndCountAll({
                        where: {
                            is_active: true,
                            id: {
                                [sequelize_1.Op.ne]: 1,
                            },
                        },
                    }));
                }
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        getOneRole: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const havePermissions = yield (0, userPermissions_1.default)({
                    _path: context.path,
                    _userId: context.userId,
                    _permissionType: 'read',
                });
                if (!havePermissions) {
                    return Promise.reject(Error(invalidPermissions));
                }
                if (context.roleId !== 1) {
                    if (id === 1) {
                        return Promise.reject(Error(roleNotExist));
                    }
                }
                const roleExist = yield RoleModel_1.default.findOne({
                    where: { id, is_active: true },
                });
                if (!roleExist) {
                    return Promise.reject(Error(roleNotExist));
                }
                return yield RoleModel_1.default.findByPk(id);
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Mutation: {
        getAllRolesExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield RoleModel_1.default.findAll({
                    where: {
                        is_active: true,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        createRole: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { role_name, description, id_user_register } = input;
                const findRole = yield RoleModel_1.default.findOne({
                    where: { role_name, is_active: true },
                    transaction,
                });
                if (findRole) {
                    yield transaction.rollback();
                    return Promise.reject(Error(roleExist));
                }
                const newRole = yield RoleModel_1.default.create({
                    role_name,
                    description,
                    id_user_register,
                    is_active: true,
                }, { transaction });
                yield transaction.commit();
                return newRole;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        updateRole: (_, { roleId, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                if (context.roleId !== 1) {
                    if (roleId === 1) {
                        return Promise.reject(Error(roleNotExist));
                    }
                }
                const roleFound = yield RoleModel_1.default.findOne({ where: { id: roleId } });
                if (!roleFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(roleNotExist));
                }
                const { role_name, description, id_user_update } = input;
                const findRole = yield RoleModel_1.default.findOne({
                    where: { role_name, id: { [sequelize_1.Op.not]: roleId }, is_active: true },
                    transaction,
                });
                if (findRole) {
                    yield transaction.rollback();
                    return Promise.reject(Error(roleExist));
                }
                yield RoleModel_1.default.update({
                    role_name,
                    description,
                    id_user_update,
                    is_active: true,
                }, { where: { id: roleId }, transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        deleteRole: (_, { id, userId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                if (context.roleId !== 1) {
                    if (id === 1) {
                        yield transaction.rollback();
                        return Promise.reject(Error(roleNotExist));
                    }
                }
                const roleFound = yield RoleModel_1.default.findOne({ where: { id: id } });
                if (!roleFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(roleNotExist));
                }
                yield RoleModel_1.default.update({ is_active: false, id_user_delete: userId }, { where: { id } });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = RoleResolver;
