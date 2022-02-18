"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
exports.default = (request) => {
    const header = request.req.headers.authorization;
    if (!header) {
        return { isAuth: false };
    }
    const token = header.split(' ');
    if (!token) {
        return { isAuth: false };
    }
    let decodeToken;
    try {
        decodeToken = jsonwebtoken_1.default.verify(token[1], `${process.env.SECRET_KEY}`);
    }
    catch (e) {
        return { isAuth: false };
    }
    if (!!!decodeToken) {
        return { isAuth: false };
    }
    if (decodeToken.id_type) {
        console.log('decodeToken.id_type', decodeToken.id_type);
        return {
            isAuth: true,
            userId: decodeToken.id,
            typeId: decodeToken.id_type,
            name: decodeToken.name,
            email: decodeToken.email,
        };
    }
    console.log('decodeToken.id_type', decodeToken.id_type);
    return {
        isAuth: true,
        userId: decodeToken.id,
        roleId: decodeToken.role,
        storeId: decodeToken.id_store,
    };
};
