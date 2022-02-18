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
exports.CleanPreviousFile = exports.UploadDoc = exports.UploadFile = void 0;
const FileModel_1 = __importDefault(require("../models/Files/FileModel"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const shortid_1 = __importDefault(require("shortid"));
const moment_1 = __importDefault(require("moment"));
const UploadFile = ({ file, type, userID, transaction, typeRequest, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { createReadStream, mimetype, filename } = yield file;
        if (!mimetype.includes('image')) {
            return false;
        }
        const extension = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
        const fileName = `${type}_${(0, shortid_1.default)()}_${(0, moment_1.default)().format('YYYYMMDDhmmss')}.${extension}`;
        const stream = createReadStream();
        const pathName = path_1.default.join(__dirname, `./../../public/files/${fileName}${mimetype.includes('image') ? 'jpg' : null}`);
        yield stream.pipe(fs_1.default.createWriteStream(pathName));
        const upload = yield FileModel_1.default.create({
            url: `http://localhost:4000/files/${fileName}${mimetype.includes('image') ? 'jpg' : null}`,
            id_user_register: userID,
            is_active: true,
        }, { transaction });
        return upload;
    }
    catch (e) {
        return false;
    }
});
exports.UploadFile = UploadFile;
const UploadDoc = ({ file, type, userID, transaction }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { createReadStream, mimetype, filename } = yield file;
        let folder = type.toUpperCase();
        if (type === 'jpg' || type === 'png' || type === 'jpeg')
            folder = 'IMG';
        const extension = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
        const fileName = `${(0, shortid_1.default)()}_${(0, moment_1.default)().format('YYYYMMDDhmmss')}.${extension}`;
        const stream = createReadStream();
        const pathName = path_1.default.join(__dirname, `./../../public/files/${folder}/${fileName}`);
        yield stream.pipe(fs_1.default.createWriteStream(pathName));
        const upload = yield FileModel_1.default.create({
            url: `http://localhost:4000/files/${folder}/${fileName}`,
            id_user_register: userID,
            is_active: true,
        }, { transaction });
        return upload;
    }
    catch (e) {
        return false;
    }
});
exports.UploadDoc = UploadDoc;
const CleanPreviousFile = ({ previous }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (previous === 'default.svg') {
            return;
        }
        const indexRename = previous.indexOf('/files/');
        const rename = previous.slice(indexRename + 7);
        const pathName = path_1.default.join(__dirname, `./../../public/files/${rename}`);
        fs_1.default.unlinkSync(pathName);
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.CleanPreviousFile = CleanPreviousFile;
