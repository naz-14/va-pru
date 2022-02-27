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
const SapItemsModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/Items/SapItemsModel"));
const SapBusinessPartnerModel_1 = __importDefault(require("../../../../../models/Catalogs/SAP/BusinessPartner/SapBusinessPartnerModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const SapItemsResolver = {
    Query: {
        getSapItems: (_, { limit, offset }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: 1,
                },
            };
            if (limit !== null && offset !== null) {
                clause.offset = offset;
                clause.limit = limit;
            }
            return yield SapItemsModel_1.default.findAll(clause);
        }),
    },
    SapItems: {
        business_partner: ({ business_partner_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield SapBusinessPartnerModel_1.default.findOne({
                where: {
                    id: business_partner_id,
                },
            });
        }),
    },
};
exports.default = SapItemsResolver;
