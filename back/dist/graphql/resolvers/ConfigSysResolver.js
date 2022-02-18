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
const ConfigSysModel_1 = __importDefault(require("../../models/ConfigSysModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const configNotExists = 'No existe configuración de sistema';
const configSysResolver = {
    Query: {
        getConfigSys: (_) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const config = yield ConfigSysModel_1.default.findOne();
                if (!config) {
                    return Promise.reject(Error(configNotExists));
                }
                return config;
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = configSysResolver;
