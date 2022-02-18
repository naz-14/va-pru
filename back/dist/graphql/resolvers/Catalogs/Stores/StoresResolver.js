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
const sequelize_1 = require("sequelize");
const StoreModel_1 = __importDefault(require("./../../../../models/Catalogs/Stores/StoreModel"));
const StoreResolver = {
    Query: {
        getAllStores: (_, { limit, offset, searchQuery }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {},
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
            return Promise.resolve(yield StoreModel_1.default.findAndCountAll(clause));
        }),
        getOneStore: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    id,
                    is_active: true
                },
            };
            return Promise.resolve(yield StoreModel_1.default.findOne(clause));
        }),
    }
};
exports.default = StoreResolver;
