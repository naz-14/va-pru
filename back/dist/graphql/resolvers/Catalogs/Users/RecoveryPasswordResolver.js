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
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const UserPasswordResetModel_1 = __importDefault(require("../../../../models/Users/UserPasswordResetModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Mailer_1 = require("./../../../../helpers/Mailer");
require('dotenv').config();
const tokenLostOrExpired = 'El token de recuperación ha expirado o es inválido, vuelve a solicitar otro';
const userNotFound = 'El usuario no existe';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const UserResolver = {
    Query: {},
    Mutation: {
        createRecoveryToken: (_, { userName }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    where: { user_name: userName, is_active: true },
                });
                if (!user) {
                    return Promise.reject(Error(userNotFound));
                }
                const userToken = yield UserPasswordResetModel_1.default.findOne({
                    where: { id_user: user.id },
                });
                if (userToken) {
                    try {
                        const verify = jsonwebtoken_1.default.verify(userToken.token_recovery, `${process.env.SECRET_KEY}`);
                        if (verify) {
                            yield Mailer_1.transporter.sendMail({
                                from: '"Vinos América" <administracion@adminva.com>',
                                to: user.email,
                                subject: 'Recuperación contraseña',
                                html: `<div>
            <h2>Recuperación de contraseña</h2><br/>
            <section>
              <p>Se ha recibido una solicitud de restablecimiento de contraseña. Has click en el enlace de abajo para restablecerla.</p>
              <a href="http://localhost:3000/verificar/usuario/${userToken.token_recovery}"><h3>Restablecer contraseña</h3></a>
              <small>Este enlace es válido por 15 min.</small>
              <p>Si tu no solicitaste restablecer contraseña, ignora este correo</p>
            </section>
          </div>`,
                            });
                            return userToken;
                        }
                    }
                    catch (e) {
                        yield UserPasswordResetModel_1.default.destroy({ where: { id_user: user.id } });
                    }
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const token_hash = yield bcrypt_1.default.hash(user.user_name, salt);
                const token_recovery = jsonwebtoken_1.default.sign({ token: token_hash, id: user.id }, `${process.env.SECRET_KEY}`, { expiresIn: '15m' });
                const recoveryToken = yield UserPasswordResetModel_1.default.create({
                    id_user: user.id,
                    token_recovery: token_recovery,
                });
                yield Mailer_1.transporter.sendMail({
                    from: '"Vinos América" <administracion@adminva.com>',
                    to: user.email,
                    subject: 'Recuperación contraseña',
                    html: `<div>
            <h2>Recuperación de contraseña</h2><br/>
            <section>
              <p>Se ha recibido una solicitud de restablecimiento de contraseña. Has click en el enlace de abajo para restablecerla.</p>
              <a href="http://localhost:3000/verificar/usuario/${token_recovery}"><h3>Restablecer contraseña</h3></a>
              <small>Este enlace es válido por 15 min.</small>
              <p>Si tu no solicitaste restablecer contraseña, ignora este correo</p>
            </section>
          </div>`,
                });
                return recoveryToken;
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        checkTokenRecovery: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
                return true;
            }
            catch (error) {
                return Promise.reject(Error(tokenLostOrExpired));
            }
        }),
        recoveryUserPassword: (_, { inputRecovery }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction(); //START TRANSACTION
            try {
                let { token, password } = inputRecovery;
                const decoded = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
                const salt = yield bcrypt_1.default.genSalt(10);
                password = yield bcrypt_1.default.hash(password, salt);
                yield UserPasswordResetModel_1.default.destroy({
                    where: { id_user: decoded.id },
                    transaction,
                });
                yield UserModel_1.default.update({
                    password: password,
                }, { where: { id: decoded.id }, transaction });
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
exports.default = UserResolver;
