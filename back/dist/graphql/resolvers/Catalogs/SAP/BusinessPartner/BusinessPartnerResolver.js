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
const SapBusinessPartnerModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel"));
const SapPartnerGroupModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/PartnerGroup/SapPartnerGroupModel"));
const SapListPricesModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/ListPrices/SapListPricesModel"));
const SapNumberGroupsModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/NumberGroups/SapNumberGroupsModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const SapBusinessPartnerResolver = {
    Query: {
        getSapBusinessPartner: (_, { limit, offset }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                    card_type: 'S'
                },
            };
            if (limit !== null && offset !== null) {
                clause.offset = offset;
                clause.limit = limit;
            }
            return yield SapBusinessPartnerModel_1.default.findAndCountAll(clause);
        }),
    },
    Mutation: {
        getSapBusinessPartnerSellerById: (_, { idBusinessPartner }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                    card_type: 'S',
                    id: idBusinessPartner
                },
            };
            return yield SapBusinessPartnerModel_1.default.findOne(clause);
        }),
    },
    SapBusinessPartner: {
        partner_group: ({ group_code }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapPartnerGroupModel_1.default.findOne({
                where: {
                    id: group_code,
                },
            });
        }),
        list: ({ list_number }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapListPricesModel_1.default.findOne({
                where: {
                    id: list_number,
                },
            });
        }),
        group: ({ group_number }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapNumberGroupsModel_1.default.findOne({
                where: {
                    id: group_number,
                },
            });
        }),
    },
};
exports.default = SapBusinessPartnerResolver;
