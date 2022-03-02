"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const UserResolver_1 = __importDefault(require("./resolvers/Catalogs/Users/UserResolver"));
const AuthResolver_1 = __importDefault(require("./resolvers/AuthResolver"));
const ModuleResolver_1 = __importDefault(require("./resolvers/Catalogs/Modules/ModuleResolver"));
const UserModulesResolver_1 = __importDefault(require("./resolvers/Catalogs/Users/UserModulesResolver"));
const ConfigSysResolver_1 = __importDefault(require("./resolvers/ConfigSysResolver"));
const SepomexResolver_1 = __importDefault(require("./resolvers/Catalogs/Sepomex/SepomexResolver"));
const RecoveryPasswordResolver_1 = __importDefault(require("./resolvers/Catalogs/Users/RecoveryPasswordResolver"));
const RoleResolver_1 = __importDefault(require("./resolvers/Catalogs/Roles/RoleResolver"));
const UploadImageResolver_1 = __importDefault(require("./resolvers/UploadFiles/UploadImageResolver"));
const order_1 = __importDefault(require("./resolvers/Catalogs/Orders/order"));
const counters_1 = __importDefault(require("./resolvers/Catalogs/Orders/counters"));
const PlatfromsResolver_1 = __importDefault(require("./resolvers/Platforms/PlatfromsResolver"));
const localOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/localOrders"));
const nationalOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/nationalOrders"));
const shippedOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/shippedOrders"));
const toStockOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/toStockOrders"));
const billingOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/billingOrders"));
const inProcessOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/inProcessOrders"));
const SulogResolver_1 = __importDefault(require("./resolvers/Sulog/SulogResolver"));
const StoresResolver_1 = __importDefault(require("./resolvers/Catalogs/Stores/StoresResolver"));
const timeline_1 = __importDefault(require("./resolvers/Catalogs/Timeline/timeline"));
const ShippingCompaniesResolver_1 = __importDefault(require("./resolvers/Catalogs/ShippingCompanies/ShippingCompaniesResolver"));
const rejectedOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/rejectedOrders"));
const collectOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/collectOrders"));
const inRouteOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/inRouteOrders"));
const internalNotes_1 = __importDefault(require("./resolvers/Catalogs/InternalNotes/internalNotes"));
const IssussesResolver_1 = __importDefault(require("./resolvers/Catalogs/Issusses/IssussesResolver"));
const AppUserResolver_1 = __importDefault(require("./resolvers/Catalogs/Users/AppUserResolver"));
const pickingOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/pickingOrders"));
const packingOrders_1 = __importDefault(require("./resolvers/Catalogs/Orders/packingOrders"));
const OrdersWarehouse_1 = __importDefault(require("./resolvers/App/Catalogs/OrdersWarehouse/OrdersWarehouse"));
const ReasonsResolver_1 = __importDefault(require("./resolvers/Catalogs/Reasons/ReasonsResolver"));
const DocumentStatusResolver_1 = __importDefault(require("./resolvers/Catalogs/Documents/DocumentStatusResolver"));
const SapListPricesItemsResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/ListPricesItems/SapListPricesItemsResolver"));
const SapListPricesResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/ListPrices/SapListPricesResolver"));
const SapItemsResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/Items/SapItemsResolver"));
const BusinessPartnerResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/BusinessPartner/BusinessPartnerResolver"));
const SapNumberGroupsResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/NumberGroups/SapNumberGroupsResolver"));
const SapPartnerGroupResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/PartnerGroup/SapPartnerGroupResolver"));
const SapPurchasesOrdersResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersResolver"));
const SapPurchasesOrdersLinesResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/PurchasesOrdersLine/SapPurchasesOrdersLinesResolver"));
const SapWarehousesResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/Warehouses/SapWarehousesResolver"));
const Boxes_1 = __importDefault(require("./resolvers/Catalogs/Boxes/Boxes"));
const SapTransfersResolver_1 = __importDefault(require("./resolvers/Catalogs/SAP/Transfers/SapTransfersResolver"));
const SapProducts_1 = __importDefault(require("./resolvers/Catalogs/SAP/Products/SapProducts"));
const ScheduleOrdersLinesResolver_1 = __importDefault(require("./resolvers/Documents/ScheduleOrdersLines/ScheduleOrdersLinesResolver"));
const ScheduleResolver_1 = __importDefault(require("./resolvers/Documents/Schedule/ScheduleResolver"));
const DocksResolver_1 = __importDefault(require("./resolvers/Catalogs/Docks/DocksResolver"));
const CommodityReceipt_1 = __importDefault(require("./resolvers/Documents/CommodityReceipt/CommodityReceipt"));
const resolversMap = (0, lodash_1.merge)([
    UserResolver_1.default,
    AuthResolver_1.default,
    ModuleResolver_1.default,
    UserModulesResolver_1.default,
    ConfigSysResolver_1.default,
    SepomexResolver_1.default,
    RecoveryPasswordResolver_1.default,
    RoleResolver_1.default,
    UploadImageResolver_1.default,
    order_1.default,
    counters_1.default,
    PlatfromsResolver_1.default,
    localOrders_1.default,
    nationalOrders_1.default,
    shippedOrders_1.default,
    toStockOrders_1.default,
    billingOrders_1.default,
    inProcessOrders_1.default,
    SulogResolver_1.default,
    StoresResolver_1.default,
    timeline_1.default,
    ShippingCompaniesResolver_1.default,
    internalNotes_1.default,
    rejectedOrders_1.default,
    collectOrders_1.default,
    inRouteOrders_1.default,
    IssussesResolver_1.default,
    AppUserResolver_1.default,
    pickingOrders_1.default,
    packingOrders_1.default,
    OrdersWarehouse_1.default,
    ReasonsResolver_1.default,
    DocumentStatusResolver_1.default,
    SapListPricesItemsResolver_1.default,
    SapListPricesResolver_1.default,
    SapItemsResolver_1.default,
    BusinessPartnerResolver_1.default,
    SapNumberGroupsResolver_1.default,
    SapPartnerGroupResolver_1.default,
    SapPurchasesOrdersResolver_1.default,
    SapPurchasesOrdersLinesResolver_1.default,
    SapWarehousesResolver_1.default,
    Boxes_1.default,
    SapTransfersResolver_1.default,
    SapProducts_1.default,
    ScheduleResolver_1.default,
    ScheduleOrdersLinesResolver_1.default,
    DocksResolver_1.default,
    CommodityReceipt_1.default,
]);
exports.default = resolversMap;
