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
const ModuleModel_1 = __importDefault(require("../models/Catalogs/Modules/ModuleModel"));
const SubmoduleModel_1 = __importDefault(require("../models/Catalogs/Modules/SubmoduleModel"));
const UserModulesModel_1 = __importDefault(require("../models/Users/UserModulesModel"));
const runHttpQuery_1 = require("apollo-server-core/dist/runHttpQuery");
const userPermissions = ({ _path, _userId, _permissionType, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_path.includes('permissions')) {
        if (_path.includes('/new')) {
            _path = _path.replace('/new', '');
        }
        if (_path.includes('/edit')) {
            let pathArray = _path.split('/');
            pathArray.pop();
            pathArray.pop();
            _path = pathArray.join('/');
        }
    }
    if (_path.includes('/edit') && _path.includes('permissions')) {
        let pathArray = _path.split(/([0-9]+)/);
        pathArray.pop();
        pathArray.pop();
        _path = pathArray.join('/') + ':id?';
    }
    const moduleFound = yield ModuleModel_1.default.findOne({
        where: { relative_link: _path },
    });
    if (!moduleFound) {
        const requestPathSplit = _path.split('/');
        const submodulePath = '/' + requestPathSplit[requestPathSplit.length - 1];
        const submoduleFound = yield SubmoduleModel_1.default.findOne({
            where: { relative_link: submodulePath },
        });
        if (!submoduleFound)
            (0, runHttpQuery_1.throwHttpGraphQLError)(400, [Error('not found')]);
        const submoduleId = submoduleFound.id;
        const permission = yield findSubmodulePermissionsByType(_permissionType, _userId, submoduleId);
        if (!permission)
            return false;
        return true;
    }
    const moduleId = moduleFound.id;
    const permission = yield findModulePermissionsByType(_permissionType, _userId, moduleId);
    if (permission) {
        return true;
    }
});
const findSubmodulePermissionsByType = (type, _userId, submoduleId) => __awaiter(void 0, void 0, void 0, function* () {
    if (type === 'read') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_submodule: submoduleId,
                access_read: true,
            },
        });
    }
    if (type === 'edit') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_submodule: submoduleId,
                access_edit: true,
            },
        });
    }
    if (type === 'delete') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_submodule: submoduleId,
                access_delete: true,
            },
        });
    }
    if (type === 'retrieve') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_submodule: submoduleId,
                access_retrieve: true,
            },
        });
    }
});
const findModulePermissionsByType = (type, _userId, moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    if (type === 'read') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_module: moduleId,
                id_submodule: null,
                access_read: true,
            },
        });
    }
    if (type === 'edit') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_module: moduleId,
                id_submodule: null,
                access_edit: true,
            },
        });
    }
    if (type === 'delete') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_module: moduleId,
                id_submodule: null,
                access_delete: true,
            },
        });
    }
    if (type === 'retrieve') {
        return yield UserModulesModel_1.default.findOne({
            where: {
                id_user: _userId,
                id_module: moduleId,
                id_submodule: null,
                access_retrieve: true,
            },
        });
    }
});
exports.default = userPermissions;
