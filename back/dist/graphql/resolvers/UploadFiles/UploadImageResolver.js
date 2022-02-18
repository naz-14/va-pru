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
const userPermissions_1 = __importDefault(require("../../../helpers/userPermissions"));
const graphql_upload_1 = require("graphql-upload");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const shortid_1 = __importDefault(require("shortid"));
const moment_1 = __importDefault(require("moment"));
const invalidPermissions = 'No tienes permiso para realizar esta acción';
const notLogged = 'No has iniciado sesión';
const invalidImageFormat = 'Solo se admiten imágenes';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const UploadImageResolver = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {},
    Mutation: {
        uploadImage: (_, { file }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { createReadStream, mimetype } = yield file;
                if (!mimetype.includes('image')) {
                    return Promise.reject(Error(invalidImageFormat));
                }
                const imageName = `img${(0, shortid_1.default)()}-${(0, moment_1.default)().format('YYYYMMDDhmmss')}.jpg`;
                const stream = createReadStream();
                const pathName = path_1.default.join(__dirname, `./../../../../public/files/${imageName}`);
                yield stream.pipe(fs_1.default.createWriteStream(pathName));
                return { url: `http://localhost:4000/files/${imageName}` };
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
        uploadFile: (_, { file }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.isAuth) {
                    return Promise.reject(Error(notLogged));
                }
                const havePermissions = yield (0, userPermissions_1.default)({
                    _path: context.path,
                    _userId: context.userId,
                    _permissionType: 'retrieve',
                });
                if (!havePermissions) {
                    return Promise.reject(Error(invalidPermissions));
                }
                const { createReadStream, mimetype } = yield file;
                const imageName = `doc${(0, shortid_1.default)()}-${(0, moment_1.default)().format('YYYYMMDDhmmss')}.jpg`;
                const stream = createReadStream();
                const pathName = path_1.default.join(__dirname, `./../../../../public/files/${imageName}`);
                yield stream.pipe(fs_1.default.createWriteStream(pathName));
                return { url: `http://localhost:4000/files/${imageName}` };
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = UploadImageResolver;
