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
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
const ModuleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/ModuleModel"));
const SubmoduleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/SubmoduleModel"));
const UserModulesModel_1 = __importDefault(require("../../../../models/Users/UserModulesModel"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const UserModel_2 = __importDefault(require("../../../../models/Users/UserModel"));
const invalidPermissions = 'No tienes permiso para realizar esta acción';
const moduleExist = 'Ya existe un módulo con ese nombre';
const moduleNotFound = 'El módulo no existe';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const ModuleResolver = {
    Query: {
        getAllModules: (_, { limit, offset, searchQuery }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.roleId !== 1) {
                    if (limit !== null && offset !== null) {
                        if (searchQuery) {
                            return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                                offset: offset,
                                limit: limit,
                                where: {
                                    is_active: true,
                                    [sequelize_1.Op.or]: [
                                        {
                                            name: { [sequelize_1.Op.like]: `%${searchQuery}%` },
                                        },
                                        { relative_link: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                        { front_label: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    ],
                                },
                            }));
                        }
                        return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: {
                                is_active: true,
                                [sequelize_1.Op.and]: [
                                    { name: { [sequelize_1.Op.notLike]: 'UserProfileMain' } },
                                    { name: { [sequelize_1.Op.notLike]: 'Modules' } },
                                    { name: { [sequelize_1.Op.notLike]: 'Users' } },
                                    { name: { [sequelize_1.Op.notLike]: 'UsersPermissions' } },
                                ],
                            },
                        }));
                    }
                    return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                        where: {
                            is_active: true,
                            [sequelize_1.Op.and]: [
                                { name: { [sequelize_1.Op.notLike]: 'UserProfileMain' } },
                                { name: { [sequelize_1.Op.notLike]: 'Modules' } },
                                { name: { [sequelize_1.Op.notLike]: 'Users' } },
                                { name: { [sequelize_1.Op.notLike]: 'UsersPermissions' } },
                            ],
                        },
                    }));
                }
                if (limit !== null && offset !== null) {
                    if (searchQuery) {
                        return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: {
                                is_active: true,
                                [sequelize_1.Op.or]: [
                                    {
                                        name: { [sequelize_1.Op.like]: `%${searchQuery}%` },
                                    },
                                    { relative_link: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    { front_label: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                ],
                            },
                        }));
                    }
                    return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                        offset: offset,
                        limit: limit,
                        where: {
                            is_active: true,
                            [sequelize_1.Op.and]: [{ name: { [sequelize_1.Op.notLike]: 'UserProfileMain' } }],
                        },
                    }));
                }
                return Promise.resolve(yield ModuleModel_1.default.findAndCountAll({
                    where: {
                        is_active: true,
                        [sequelize_1.Op.and]: [{ name: { [sequelize_1.Op.notLike]: 'UserProfileMain' } }],
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        getOneModule: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.roleId !== 1) {
                    return Promise.reject(Error(invalidPermissions));
                }
                const moduleFound = yield ModuleModel_1.default.findOne({
                    where: { id, is_active: true },
                });
                if (!moduleFound) {
                    return Promise.reject(Error(moduleNotFound));
                }
                return moduleFound;
            }
            catch (e) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Mutation: {
        getAllModulesExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield ModuleModel_1.default.findAll({
                    where: {
                        is_active: true,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        createModule: (_, { moduleInput, submoduleInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            const { name, relative_link, icon, front_label } = moduleInput;
            try {
                if (context.roleId !== 1) {
                    yield transaction.rollback();
                    return Promise.reject(Error(invalidPermissions));
                }
                const findModule = yield ModuleModel_1.default.findOne({
                    where: { name, is_active: true },
                    transaction,
                });
                if (findModule) {
                    yield transaction.rollback();
                    return Promise.reject(Error(moduleExist));
                }
                let moduleCreated = yield ModuleModel_1.default.create({
                    name,
                    relative_link,
                    icon,
                    front_label,
                    is_active: true,
                }, { transaction });
                const Users = yield UserModel_1.default.findAll({
                    where: { id_role: 1 },
                    transaction,
                });
                if (submoduleInput.length < 1) {
                    for (const user of Users) {
                        yield UserModulesModel_1.default.create({
                            id_module: moduleCreated.id,
                            id_user: user.id,
                            id_submodule: null,
                            access_delete: true,
                            access_edit: true,
                            access_read: true,
                            access_retrieve: true,
                            access_export: true,
                            is_active: true,
                        }, { transaction });
                    }
                }
                const submoduleArray = [];
                for (const submodule of submoduleInput) {
                    if (!submodule) {
                        return {
                            id: moduleCreated.id,
                            name: moduleCreated.name,
                            front_label: moduleCreated.front_label,
                            relative_link: moduleCreated.relative_link,
                            icon: moduleCreated.icon,
                        };
                    }
                    const submoduleCreated = yield SubmoduleModel_1.default.create({
                        module_id: moduleCreated.id,
                        name: submodule.name,
                        front_label: submodule.front_label,
                        relative_link: submodule.relative_link,
                        icon: submodule.icon,
                        is_active: true,
                    }, { transaction });
                    const submoduleObject = {
                        id: submoduleCreated.id,
                        module_id: moduleCreated.id,
                        name: submoduleCreated.name,
                        front_label: submoduleCreated.front_label,
                        relative_link: submoduleCreated.relative_link,
                        icon: submoduleCreated.icon,
                    };
                    submoduleArray.push(submoduleObject);
                    for (const user of Users) {
                        yield UserModulesModel_1.default.create({
                            id_module: moduleCreated.id,
                            id_user: user.id,
                            id_submodule: submoduleCreated.id,
                            access_delete: true,
                            access_edit: true,
                            access_read: true,
                            access_retrieve: true,
                            access_export: true,
                            is_active: true,
                        }, { transaction });
                    }
                }
                yield transaction.commit();
                return {
                    id: moduleCreated.id,
                    name: moduleCreated.name,
                    front_label: moduleCreated.front_label,
                    relative_link: moduleCreated.relative_link,
                    icon: moduleCreated.icon,
                    submodules: submoduleArray,
                };
            }
            catch (e) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        updateModule: (_, { moduleId, moduleInput, submoduleInput, submodulesIdsTodelete }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { name, relative_link, icon, front_label } = moduleInput;
                if (context.roleId !== 1) {
                    yield transaction.rollback();
                    return Promise.reject(Error(invalidPermissions));
                }
                const findModule = yield ModuleModel_1.default.findOne({
                    where: { name, id: { [sequelize_1.Op.not]: moduleId }, is_active: true },
                    transaction,
                });
                if (findModule) {
                    yield transaction.rollback();
                    return Promise.reject(Error(moduleExist));
                }
                yield ModuleModel_1.default.update({ name, relative_link, icon, front_label }, { where: { id: moduleId }, transaction });
                for (const submoduleToDelete of submodulesIdsTodelete) {
                    yield SubmoduleModel_1.default.destroy({
                        where: { id: submoduleToDelete, is_active: true },
                        transaction,
                    });
                    //DELETE PERMISSIONS OF SUBMODULES
                    yield UserModulesModel_1.default.destroy({
                        where: { id_submodule: submoduleToDelete, is_active: true },
                        transaction,
                    });
                }
                const submoduleArray = [];
                for (const submodule of submoduleInput) {
                    if (!submodule) {
                        return {
                            id: moduleId,
                            name: name,
                            front_label: front_label,
                            relative_link: relative_link,
                            icon: icon,
                        };
                    }
                    let submoduleCreated = {};
                    if (submodule.id !== 0) {
                        submoduleCreated = yield SubmoduleModel_1.default.update({
                            module_id: moduleId,
                            name: submodule.name,
                            front_label: submodule.front_label,
                            relative_link: submodule.relative_link,
                            icon: submodule.icon,
                            is_active: true,
                        }, { where: { id: submodule.id }, transaction });
                    }
                    else {
                        submoduleCreated = yield SubmoduleModel_1.default.create({
                            module_id: moduleId,
                            name: submodule.name,
                            front_label: submodule.front_label,
                            relative_link: submodule.relative_link,
                            icon: submodule.icon,
                            is_active: true,
                        }, { transaction });
                        //CREATE PERMISSIONS FOR MASTERS FOR NEW MODULE
                        const Users = yield UserModel_2.default.findAll({ where: { id_role: 1 } });
                        for (const user of Users) {
                            yield UserModulesModel_1.default.create({
                                id_module: moduleId,
                                id_user: user.id,
                                id_submodule: submoduleCreated.id,
                                access_delete: true,
                                access_edit: true,
                                access_read: true,
                                access_retrieve: true,
                                access_export: true,
                                is_active: true,
                            }, { transaction });
                        }
                    }
                    const submoduleObject = {
                        id: submoduleCreated.id,
                        module_id: moduleId,
                        name: submoduleCreated.name,
                        front_label: submoduleCreated.front_label,
                        relative_link: submoduleCreated.relative_link,
                        icon: submoduleCreated.icon,
                    };
                    submoduleArray.push(submoduleObject);
                }
                yield transaction.commit();
                return {
                    id: moduleId,
                    name: name,
                    front_label: front_label,
                    relative_link: relative_link,
                    icon: icon,
                    submodules: submoduleArray,
                };
            }
            catch (e) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        deleteModule: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                if (context.roleId !== 1) {
                    yield transaction.rollback();
                    return Promise.reject(Error(invalidPermissions));
                }
                yield UserModulesModel_1.default.destroy({
                    where: { id_module: id },
                    transaction,
                });
                yield ModuleModel_1.default.destroy({
                    where: { id, is_active: true },
                    transaction,
                });
                yield SubmoduleModel_1.default.destroy({
                    where: { module_id: id, is_active: true },
                    transaction,
                });
                yield transaction.commit();
                return true;
            }
            catch (e) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Module: {
        submodules: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SubmoduleModel_1.default.findAll({ where: { module_id: id } });
        }),
    },
};
exports.default = ModuleResolver;
