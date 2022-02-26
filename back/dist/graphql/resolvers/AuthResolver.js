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
const UserModel_1 = __importDefault(require("../../models/Users/UserModel"));
const FileModel_1 = __importDefault(require("../../models/Files/FileModel"));
const StoreModel_1 = __importDefault(require("../../models/Catalogs/Stores/StoreModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const userNotFound = 'No se encontro este usuario';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const wrongPassword = 'Usuario o contraseña incorrecta';
const AuthResolver = {
    Mutation: {
        authUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { password, userName } = input;
                const userFound = yield UserModel_1.default.findOne({ where: { user_name: userName } });
                if (!userFound) {
                    return Promise.reject(Error(userNotFound));
                }
                const storeFound = yield StoreModel_1.default.findOne({
                    where: { id: userFound.id_store },
                });
                const avatar = yield FileModel_1.default.findOne({
                    where: { id: userFound.id_avatar_file },
                });
                const validPass = yield bcrypt_1.default.compareSync(password, userFound.password);
                if (!validPass) {
                    return Promise.reject(Error(wrongPassword));
                }
                const token = jsonwebtoken_1.default.sign({
                    user_name: userName,
                    id: userFound.id,
                    name: userFound.name,
                    first_name: userFound.first_name,
                    last_name: userFound.last_name,
                    email: userFound.email,
                    role: userFound.id_role,
                    id_store: storeFound === null || storeFound === void 0 ? void 0 : storeFound.id,
                    store: storeFound === null || storeFound === void 0 ? void 0 : storeFound.name,
                    avatar: avatar === null || avatar === void 0 ? void 0 : avatar.url,
                }, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
                return {
                    token,
                };
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        decryptToken: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        }),
        decryptTokenApp: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        }),
    },
};
exports.default = AuthResolver;
