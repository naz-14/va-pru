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
exports.DeletePreviousFile = exports.getFile = exports.UploadDocument = void 0;
const FileModel_1 = __importDefault(require("../models/Files/FileModel"));
const shortid_1 = __importDefault(require("shortid"));
const moment_1 = __importDefault(require("moment"));
require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});
const s3Client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
});
const UploadDocument = ({ file, userID, transaction, type, idFile = null, name = (0, shortid_1.default)(), }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { createReadStream, filename } = yield file;
        let folder = type.toLowerCase();
        if (type === 'jpg' || type === 'png' || type === 'jpeg' || type === 'img')
            folder = 'img';
        if (type === 'invoice')
            folder = 'invoice';
        const extension = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
        const fileName = `${folder}/${name}_${(0, moment_1.default)().format('YYYYMMDDhmmss')}.${extension === '' ? 'jpg' : extension}`;
        const filesStream = createReadStream(fileName);
        const uploadParams = {
            Bucket: bucketName,
            Body: filesStream,
            Key: fileName,
        };
        const upload = yield s3.upload(uploadParams).promise();
        if (idFile) {
            const fileCreated = yield FileModel_1.default.update({
                url: upload.key,
            }, { where: { id: idFile } });
            return fileCreated;
        }
        const fileCreated = yield FileModel_1.default.create({
            url: upload.key,
            id_user_register: userID,
            is_active: true,
        }, { transaction });
        return fileCreated;
    }
    catch (e) {
        yield transaction.rollback();
        return false;
    }
});
exports.UploadDocument = UploadDocument;
const getFile = (Key) => __awaiter(void 0, void 0, void 0, function* () {
    const downloadParams = {
        Key: Key,
        Bucket: bucketName,
    };
    try {
        const command = new GetObjectCommand(downloadParams);
        const urlPresigned = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
            expiresIn: 3600,
        });
        return urlPresigned;
    }
    catch (e) {
        return false;
    }
});
exports.getFile = getFile;
const DeletePreviousFile = ({ previous }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteParams = {
            Key: previous,
            Bucket: bucketName,
        };
        if (previous === 'IMG/default.svg') {
            return true;
        }
        yield s3.deleteObject(deleteParams).promise();
        return true;
    }
    catch (e) {
        return e;
    }
});
exports.DeletePreviousFile = DeletePreviousFile;
