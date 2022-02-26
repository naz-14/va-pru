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
exports.TimeLineAdd = void 0;
const moment_1 = __importDefault(require("moment"));
const TimelineModel_1 = __importDefault(require("../models/Catalogs/Timeline/TimelineModel"));
const TimeLineAdd = ({ transaction, orderId, userId, statusId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield TimelineModel_1.default.create({
            order_id: orderId,
            status_id: statusId,
            user_id: userId,
            dateStatus: (0, moment_1.default)().format(),
            is_active: true,
        }, { transaction });
    }
    catch (e) {
        yield transaction.rollback();
        return false;
    }
});
exports.TimeLineAdd = TimeLineAdd;
