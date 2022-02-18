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
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
const graphql_upload_1 = require("graphql-upload");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const AddressModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/AddressModel"));
const UserContacModel_1 = __importDefault(require("../../../../models/Users/UserContacModel"));
const ContactModel_1 = __importDefault(require("../../../../models/Catalogs/Contacts/ContactModel"));
const UserModulesModel_1 = __importDefault(require("../../../../models/Users/UserModulesModel"));
const ModuleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/ModuleModel"));
const SubmoduleModel_1 = __importDefault(require("../../../../models/Catalogs/Modules/SubmoduleModel"));
const FileModel_1 = __importDefault(require("../../../../models/Files/FileModel"));
const CountryModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/CountryModel"));
const StateModel_1 = __importDefault(require("./../../../../models/Catalogs/Addresses/Sepomex/StateModel"));
const CitieModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/CitieModel"));
const MunicipalityModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/MunicipalityModel"));
const ColonyModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/ColonyModel"));
const UploadFile_1 = require("../../../../helpers/UploadFile");
const invalidPermissions = 'No tienes permiso para realizar esta acción';
const userEmailExists = 'Ya existe un perfil con ese nombre de usuario o email';
const userNotFound = 'El usuario no existe';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const invalidPassword = 'La contraseña es invalida verifica que sea la correcta';
const UserResolver = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {
        Users: (_, { limit, offset, searchQuery }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (limit !== null && offset !== null) {
                    if (searchQuery) {
                        return Promise.resolve(yield UserModel_1.default.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: {
                                is_active: true,
                                [sequelize_1.Op.or]: [
                                    {
                                        name: { [sequelize_1.Op.like]: `%${searchQuery}%` },
                                    },
                                    { first_name: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    { last_name: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                    { user_name: { [sequelize_1.Op.like]: `%${searchQuery}%` } },
                                ],
                                id_role: {
                                    [sequelize_1.Op.not]: 1,
                                },
                            },
                        }));
                    }
                    return Promise.resolve(yield UserModel_1.default.findAndCountAll({
                        offset: offset,
                        limit: limit,
                        where: {
                            is_active: true,
                            id_role: {
                                [sequelize_1.Op.not]: 1,
                            },
                            id: {
                                [sequelize_1.Op.not]: context.userId,
                            },
                        },
                    }));
                }
                else {
                    return Promise.resolve(yield UserModel_1.default.findAndCountAll({
                        where: {
                            is_active: true,
                            id_role: {
                                [sequelize_1.Op.not]: 1,
                            },
                            id: {
                                [sequelize_1.Op.not]: context.userId,
                            },
                        },
                    }));
                }
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        GetUserById: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.roleId !== 1) {
                    const isMaster = yield UserModel_1.default.findOne({
                        where: { id, id_role: 1, is_active: true },
                    });
                    if (isMaster) {
                        return Promise.reject(Error(userNotFound));
                    }
                }
                const userExist = yield UserModel_1.default.findOne({
                    where: { id, is_active: true },
                });
                if (!userExist) {
                    return Promise.reject(Error(userNotFound));
                }
                return yield UserModel_1.default.findOne({
                    where: { id: id, is_active: true },
                });
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    Mutation: {
        getAllUsersExport: (_, {}) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield UserModel_1.default.findAll({
                    where: {
                        is_active: true,
                    },
                }));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        getUser: (_, { userID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.roleId !== 1) {
                    const isMaster = yield UserModel_1.default.findOne({
                        where: { id: userID, id_role: 1, is_active: true },
                    });
                    if (isMaster) {
                        return Promise.reject(Error(userNotFound));
                    }
                }
                const userExist = yield UserModel_1.default.findOne({
                    where: { id: userID, is_active: true },
                });
                if (!userExist) {
                    return Promise.reject(Error(userNotFound));
                }
                return (yield UserModel_1.default.findOne({
                    where: { id: userID, is_active: true },
                }));
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        registerUser: (_, { input, inputAvatar, inputAddress, inputContact }, context) => __awaiter(void 0, void 0, void 0, function* () {
            var e_1, _a;
            const transaction = yield connection_1.default.transaction(); //START TRANSACTION
            try {
                let { password, user_name, name, id_role, id_store, first_name, last_name, email: email_input, id_user_register: id_user_register_input, } = input;
                //MASTER VALIDATION
                if (context.roleId !== 1) {
                    if (id_role === 1) {
                        yield transaction.rollback();
                        return Promise.reject(Error(invalidPermissions));
                    }
                }
                const userExists = yield UserModel_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: {
                            email: email_input,
                            user_name,
                        },
                        is_active: true,
                    },
                    transaction,
                });
                if (userExists) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userEmailExists));
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                password = yield bcrypt_1.default.hash(password, salt);
                const { street, external_number, internal_number, id_country, id_state, id_city, id_municipality, id_colony, zip_code, id_user_register: id_user_register_address, } = inputAddress;
                const address = yield AddressModel_1.default.create({
                    street,
                    external_number,
                    internal_number: internal_number || '',
                    id_country,
                    id_state,
                    id_city,
                    id_municipality,
                    id_colony,
                    zip_code,
                    id_user_register: id_user_register_address,
                    is_active: true,
                }, { transaction });
                const idContacts = inputContact.map((contact) => __awaiter(void 0, void 0, void 0, function* () {
                    const { name, lastname, second_lastname, phone, ext, mobile, email, id_user_register, } = contact;
                    const createdContact = yield ContactModel_1.default.create({
                        name,
                        lastname,
                        second_lastname,
                        phone,
                        ext,
                        mobile,
                        email,
                        id_user_register,
                        is_active: true,
                    }, { transaction });
                    return createdContact.id;
                }));
                const userAvatar = yield (0, UploadFile_1.UploadFile)({
                    file: inputAvatar,
                    type: 'img',
                    userID: context.userId,
                    transaction: transaction,
                });
                if (!userAvatar) {
                    return Promise.reject(Error(defaultError));
                }
                const user = yield UserModel_1.default.create({
                    password,
                    user_name,
                    name,
                    first_name,
                    last_name,
                    id_role,
                    id_store,
                    id_avatar_file: userAvatar.id,
                    id_address: address.id,
                    email: email_input,
                    id_user_register: id_user_register_input,
                    is_active: true,
                }, { transaction });
                //CREATE MASTER PERMISSIONS
                if (id_role === 1) {
                    const permissions = [];
                    const modules = yield ModuleModel_1.default.findAll();
                    const submodules = yield SubmoduleModel_1.default.findAll();
                    for (const submodule of submodules) {
                        const submoduleObject = {
                            id_module: submodule.module_id,
                            id_user: user.id,
                            id_submodule: submodule.id,
                        };
                        permissions.push(submoduleObject);
                    }
                    for (const module of modules) {
                        const exists = permissions.some((permission) => {
                            if (permission.id_module === module.id) {
                                return true;
                            }
                        });
                        if (!exists) {
                            const submoduleObject = {
                                id_module: module.id,
                                id_user: user.id,
                                id_submodule: null,
                            };
                            permissions.push(submoduleObject);
                        }
                    }
                    const permissionsUniques = [...new Set(permissions)];
                    for (const permission of permissionsUniques) {
                        yield UserModulesModel_1.default.create({
                            id_module: permission.id_module,
                            id_user: permission.id_user,
                            id_submodule: permission.id_submodule,
                            access_delete: true,
                            access_edit: true,
                            access_read: true,
                            access_retrieve: true,
                            access_export: true,
                            is_active: true,
                        }, { transaction });
                    }
                }
                else {
                    //CREATE PERMISSIONS FOR COMMON MODULES
                    const existsProfileModule = yield ModuleModel_1.default.findOne({
                        where: { name: 'UserProfileMain' },
                    });
                    if (existsProfileModule) {
                        yield UserModulesModel_1.default.create({
                            id_user: user.id,
                            id_module: existsProfileModule.id,
                            id_submodule: null,
                            access_retrieve: true,
                            access_read: true,
                            access_edit: true,
                            access_delete: true,
                            access_export: true,
                            is_active: true,
                        });
                    }
                }
                try {
                    for (var idContacts_1 = __asyncValues(idContacts), idContacts_1_1; idContacts_1_1 = yield idContacts_1.next(), !idContacts_1_1.done;) {
                        let idContact = idContacts_1_1.value;
                        yield UserContacModel_1.default.create({
                            id_contact: idContact,
                            id_user: user.id,
                            is_active: true,
                        }, { transaction });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (idContacts_1_1 && !idContacts_1_1.done && (_a = idContacts_1.return)) yield _a.call(idContacts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                yield transaction.commit();
                return user;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        updateUser: (_, { userID, input, addressId, inputAvatar, inputAddress, inputContact }, context) => __awaiter(void 0, void 0, void 0, function* () {
            var e_2, _b, e_3, _c;
            const transaction = yield connection_1.default.transaction();
            try {
                if (context.roleId !== 1) {
                    const isMaster = yield UserModel_1.default.findOne({
                        where: { id: userID, id_role: 1, is_active: true },
                    });
                    if (isMaster) {
                        yield transaction.rollback();
                        return Promise.reject(Error(userNotFound));
                    }
                }
                const userFound = yield UserModel_1.default.findOne({ where: { id: userID } });
                if (!userFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userNotFound));
                }
                let { password, user_name, name, first_name, last_name, email: email_input, id_role, id_store, id_user_update: id_user_update_input, } = input;
                let checkPass = password;
                if (password === '1') {
                    checkPass = userFound.password;
                }
                else {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    checkPass = yield bcrypt_1.default.hash(password, salt);
                }
                const checkUserUnique = yield UserModel_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: {
                            email: email_input,
                            user_name,
                        },
                        id: { [sequelize_1.Op.not]: userID },
                        is_active: true,
                    },
                    transaction,
                });
                if (checkUserUnique) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userEmailExists));
                }
                yield UserModel_1.default.update({
                    name,
                    first_name,
                    last_name,
                    email: email_input,
                    password: checkPass,
                    user_name,
                    id_role,
                    id_store,
                    id_user_update: id_user_update_input,
                    is_active: true,
                }, { where: { id: userID, is_active: true } });
                const { street, external_number, internal_number, id_country, id_state, id_city, id_municipality, id_colony, zip_code, id_user_update: id_user_update_address, } = inputAddress;
                yield AddressModel_1.default.update({
                    street,
                    external_number,
                    internal_number: internal_number || '',
                    id_country,
                    id_state,
                    id_city,
                    id_municipality,
                    id_colony,
                    zip_code,
                    id_user_update: id_user_update_address,
                    is_active: true,
                }, { where: { id: addressId, is_active: true }, transaction });
                const idContactsDestroy = yield UserContacModel_1.default.findAll({
                    where: { id_user: userID },
                    attributes: ['id_contact'],
                });
                try {
                    for (var idContactsDestroy_1 = __asyncValues(idContactsDestroy), idContactsDestroy_1_1; idContactsDestroy_1_1 = yield idContactsDestroy_1.next(), !idContactsDestroy_1_1.done;) {
                        let idContactDestroy = idContactsDestroy_1_1.value;
                        yield ContactModel_1.default.destroy({
                            where: { id: idContactDestroy.getDataValue('id_contact') },
                            transaction,
                        });
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (idContactsDestroy_1_1 && !idContactsDestroy_1_1.done && (_b = idContactsDestroy_1.return)) yield _b.call(idContactsDestroy_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                yield UserContacModel_1.default.destroy({
                    where: { id_user: userID },
                    transaction,
                });
                const idContacts = inputContact.map((contact) => __awaiter(void 0, void 0, void 0, function* () {
                    const { name, lastname, second_lastname, phone, ext, mobile, email, id_user_update, } = contact;
                    const createdContact = yield ContactModel_1.default.create({
                        name,
                        lastname,
                        second_lastname,
                        phone,
                        ext,
                        mobile,
                        email,
                        id_user_update,
                        is_active: true,
                    }, { transaction });
                    return createdContact.id;
                }));
                try {
                    for (var idContacts_2 = __asyncValues(idContacts), idContacts_2_1; idContacts_2_1 = yield idContacts_2.next(), !idContacts_2_1.done;) {
                        let idContact = idContacts_2_1.value;
                        yield UserContacModel_1.default.create({
                            id_contact: idContact,
                            id_user: userID,
                            is_active: true,
                        }, { transaction });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (idContacts_2_1 && !idContacts_2_1.done && (_c = idContacts_2.return)) yield _c.call(idContacts_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (inputAvatar) {
                    const userAvatar = yield (0, UploadFile_1.UploadFile)({
                        file: inputAvatar,
                        type: 'img',
                        userID: context.userId,
                        transaction: transaction,
                    });
                    if (!userAvatar) {
                        return Promise.reject(Error(defaultError));
                    }
                    yield UserModel_1.default.update({
                        id_avatar_file: userAvatar.id,
                    }, { where: { id: userID, is_active: true } });
                    const fileName = yield FileModel_1.default.findOne({
                        where: { is_active: true, id: userFound.id_avatar_file },
                    });
                    if (fileName) {
                        const cleanStatus = yield (0, UploadFile_1.CleanPreviousFile)({
                            previous: fileName.url,
                        });
                        if (!cleanStatus) {
                            yield transaction.rollback();
                            return Promise.reject(Error(defaultError));
                        }
                    }
                    else {
                        yield transaction.rollback();
                        return Promise.reject(Error(defaultError));
                    }
                }
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        deleteUser: (_, { id, userId }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const userFound = yield UserModel_1.default.findOne({ where: { id: id } });
                if (!userFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userNotFound));
                }
                yield UserModel_1.default.update({
                    is_active: false,
                    id_user_delete: userId,
                }, { where: { id: id, is_active: true }, transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        passwordUpdate: (_, { id_user, currentPassword, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const userFound = yield UserModel_1.default.findOne({ where: { id: id_user } });
                if (!userFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userNotFound));
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const validatePassword = yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
                    const validate = yield bcrypt_1.default.compare(currentPassword, userFound.password);
                    resolve(validate);
                }));
                if (!validatePassword) {
                    yield transaction.rollback();
                    return Promise.reject(Error(invalidPassword));
                }
                const checkPass = yield bcrypt_1.default.hash(password, salt);
                yield UserModel_1.default.update({
                    password: checkPass,
                }, { where: { id: id_user, is_active: true }, transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
        avatarUpdate: (_, { id_user, avatar }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const userFound = yield UserModel_1.default.findOne({ where: { id: id_user } });
                if (!userFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error(userNotFound));
                }
                const avatarFound = yield FileModel_1.default.findOne({
                    where: { id: userFound.id_avatar_file, is_active: true },
                });
                if (avatarFound) {
                    const userAvatar = yield (0, UploadFile_1.UploadFile)({
                        file: avatar,
                        type: 'img',
                        userID: context.userId,
                        transaction: transaction,
                    });
                    if (!userAvatar) {
                        yield transaction.rollback();
                        return Promise.reject(Error(defaultError));
                    }
                    yield UserModel_1.default.update({ id_avatar_file: userAvatar.id }, { where: { id: id_user, is_active: true }, transaction });
                }
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(defaultError));
            }
        }),
    },
    addressesCatalog: {
        country: ({ id_country }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield CountryModel_1.default.findOne({
                where: { id: id_country, is_active: true },
            });
        }),
        state: ({ id_state }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield StateModel_1.default.findOne({
                where: { id: id_state, is_active: true },
            });
        }),
        city: ({ id_city }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield CitieModel_1.default.findOne({
                where: { id: id_city, is_active: true },
            });
        }),
        colony: ({ id_colony }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ColonyModel_1.default.findOne({
                where: { id: id_colony, is_active: true },
            });
        }),
        municipality: ({ id_municipality }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield MunicipalityModel_1.default.findOne({
                where: { id: id_municipality, is_active: true },
            });
        }),
    },
    User: {
        address: ({ id_address }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield AddressModel_1.default.findOne({
                where: { id: id_address, is_active: true },
            });
        }),
        contacts: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserContacModel_1.default.findAll({
                where: { id_user: id, is_active: true },
            });
        }),
        avatar: ({ id_avatar_file }) => __awaiter(void 0, void 0, void 0, function* () {
            return (yield FileModel_1.default.findOne({
                where: { id: id_avatar_file, is_active: true },
            }));
        }),
    },
    userContacts: {
        contact_data: ({ id_contact }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ContactModel_1.default.findOne({ where: { id: id_contact } });
        }),
    },
};
exports.default = UserResolver;
