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
const AppUser_1 = __importDefault(require("../../../../models/Users/AppUser"));
const AppUserTypes_1 = __importDefault(require("../../../../models/Users/AppUserTypes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../../db/connection"));
const AppUserResolver = {
    Query: {
        getAllAppUsers: (_, { searchQuery, limit, offset }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: { is_active: true },
            };
            if (limit !== null && offset !== null) {
                clause.offset = offset;
                clause.limit = limit;
            }
            if (searchQuery) {
                clause.where[sequelize_1.Op.or] = [
                // { status_id: { [Op.like]: `%${searchQuery}%` } },
                // { method_id: { [Op.like]: `%${searchQuery}%` } },
                ];
            }
            return Promise.resolve(yield AppUser_1.default.findAndCountAll(clause));
        }),
        getAppUser: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return Promise.resolve(yield AppUser_1.default.findByPk(id));
        }),
    },
    Mutation: {
        createAppUser: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let { password } = input;
                const salt = yield bcrypt_1.default.genSalt(10);
                password = yield bcrypt_1.default.hash(password, salt);
                yield AppUser_1.default.create(Object.assign(Object.assign({}, input), { password, id_user_update: context.userId, is_active: true }));
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        updateAppUser: (_, { id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let { password } = input;
                if (password) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    password = yield bcrypt_1.default.hash(password, salt);
                }
                const user = yield AppUser_1.default.findByPk(id);
                yield (user === null || user === void 0 ? void 0 : user.update(Object.assign(Object.assign({}, input), { id_user_update: context.userId, password: password || user.password })));
                yield (user === null || user === void 0 ? void 0 : user.save());
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        authAppUser: (_, { username, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield AppUser_1.default.findOne({
                    where: { [sequelize_1.Op.or]: [{ username }, { email: username }] },
                });
                if (user) {
                    const validPass = bcrypt_1.default.compareSync(password, user.password);
                    if (!validPass) {
                        return Promise.reject(Error('Invalid Password'));
                    }
                    return jsonwebtoken_1.default.sign({
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        id_type: user.id_type,
                    }, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
                }
                return Promise.reject(Error('Invalid Username or Password'));
            }
            catch (e) {
                return Promise.reject(Error('Invalid Username or Password'));
            }
        }),
        deleteAppUser: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const userFound = yield AppUser_1.default.findOne({ where: { id: id } });
                const userId = context.userId;
                if (!userFound) {
                    yield transaction.rollback();
                    return Promise.reject(Error('Usuario no encontrado'));
                }
                yield AppUser_1.default.update({
                    is_active: false,
                    id_user_update: userId,
                }, { where: { id: id, is_active: true }, transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error('Algo salio mal'));
            }
        }),
    },
    AppUser: {
        userType: ({ id_type }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield AppUserTypes_1.default.findOne({ where: { id: id_type } });
        }),
    },
};
exports.default = AppUserResolver;
