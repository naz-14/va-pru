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
function validatePermissions({ id_user, path }) {
    return __awaiter(this, void 0, void 0, function* () {
        const relativePath = getRelativepath(path);
        if (path.includes('users/permissions/edit')) {
            const module = yield ModuleModel_1.default.findOne({
                where: { relative_link: '/catalog/users/permissions/edit/:id?' },
            });
            const permission = UserModulesModel_1.default.findOne({
                where: { id_user, id_module: module === null || module === void 0 ? void 0 : module.id },
            });
            const havePermission = !!permission;
            return { havePermissions: havePermission, path: relativePath };
        }
        const permissions = yield UserModulesModel_1.default.findAll({
            where: { id_user: id_user },
        });
        let havePermission = false;
        const module = yield ModuleModel_1.default.findOne({
            where: { relative_link: relativePath },
        });
        if (module) {
            const moduleCount = yield (yield UserModulesModel_1.default.findAndCountAll({
                where: { id_module: module.id, id_submodule: null },
            })).count;
            if (moduleCount != 0 && permissions) {
                havePermission = getPermission(permissions, module, null, path);
            }
        }
        else {
            const submoduleSplit = relativePath.split('/');
            const submodulePath = submoduleSplit[submoduleSplit.length - 1];
            const submodule = yield SubmoduleModel_1.default.findOne({
                where: { relative_link: `/${submodulePath}` },
            });
            if (submodule) {
                havePermission = getPermission(permissions, null, submodule, path);
            }
        }
        return { havePermissions: havePermission, path: relativePath };
    });
}
const getRelativepath = (path) => {
    if (path.includes('new')) {
        return path.split('new')[0].replace(/.$/, '');
    }
    else if (path.includes('edit')) {
        return path.split('edit')[0].replace(/.$/, '');
    }
    else if (path.includes('details')) {
        return path.split('details')[0].replace(/.$/, '');
    }
    else {
        return path;
    }
};
const getPermission = (permissions, module, submodule, path) => {
    const permissionType = module ? 'id_module' : 'id_submodule';
    const object = module ? module : submodule;
    let havePermission = false;
    permissions.forEach((permission) => {
        if (permission[permissionType] === (object === null || object === void 0 ? void 0 : object.id)) {
            if (path.includes('new')) {
                havePermission = permission.access_retrieve;
                return;
            }
            if (path.includes('edit')) {
                havePermission = permission.access_edit;
                return;
            }
            if (path.includes('details')) {
                havePermission = permission.access_read;
                return;
            }
            havePermission = true;
        }
    });
    return havePermission;
};
exports.default = validatePermissions;
