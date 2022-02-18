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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SulogReceiver = void 0;
const axios = require('axios');
require('dotenv').config();
//Data must be an array:
//EXAMPLE
//[
// {
//    order_id: 49844,
//    key: '49844',
//    name: 'createOrder',
//    values: { order_id: 49844 },
// },
// {
//    order_id: 49829,
//    key: '49829',
//    name: 'createOrder',
//    values: { order_id: 49829 },
// },
//]
const documentWasNotCreated = 'No se puedo crear el documento';
const SulogReceiver = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: process.env.VA_RECEIVER,
            data: data,
        });
        return request.data;
    }
    catch (error) {
        return Promise.reject(Error(documentWasNotCreated));
    }
});
exports.SulogReceiver = SulogReceiver;
exports.default = exports.SulogReceiver;
