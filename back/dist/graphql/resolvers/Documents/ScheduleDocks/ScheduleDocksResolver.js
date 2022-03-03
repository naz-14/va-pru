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
const ScheduleDocksModel_1 = __importDefault(require("../../../../models/Documents/ScheduleDocks/ScheduleDocksModel"));
const DocksModel_1 = __importDefault(require("../../../../models/Catalogs/Docks/DocksModel"));
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const ScheduleDocksResolver = {
    Query: {},
    Mutation: {
        getScheduleDocksByScheduleId: (_, { scheduleId }) => __awaiter(void 0, void 0, void 0, function* () {
            const clause = {
                where: {
                    schedule_id: scheduleId,
                    is_active: 1,
                },
            };
            return yield ScheduleDocksModel_1.default.findAll(clause);
        }),
    },
    ScheduleDocks: {
        dock: ({ dock_id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield DocksModel_1.default.findOne({ where: { id: dock_id } });
        }),
    },
};
exports.default = ScheduleDocksResolver;
