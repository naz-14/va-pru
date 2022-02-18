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
const OrderStatusModel_1 = __importDefault(require("../../../../models/Catalogs/Orders/OrderStatusModel"));
const TimelineModel_1 = __importDefault(require("../../../../models/Catalogs/Timeline/TimelineModel"));
const UserModel_1 = __importDefault(require("../../../../models/Users/UserModel"));
const timelineResolver = {
    Query: {
        getTimeline: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    is_active: true,
                    order_id: id
                },
                order: [['dateStatus', 'ASC']]
            };
            return yield TimelineModel_1.default.findAll(clause);
        }),
    },
    Timeline: {
        status: ({ status_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield OrderStatusModel_1.default.findOne({ where: { id: status_id } });
        }),
        user: ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ where: { id: user_id } });
        }),
    }
};
exports.default = timelineResolver;
