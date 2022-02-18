"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const userTypeDefs = __importStar(require("./schemas/Catalogs/Users/user.graphql"));
const moduleTypeDefs = __importStar(require("./schemas/Catalogs/Modules/modules.graphql"));
const authTypeDefs = __importStar(require("./schemas/auth.graphql"));
const emptyTypeDefs = __importStar(require("./schemas/empty.graphql"));
const userModulesTypeDefs = __importStar(require("./schemas/Catalogs/Users/userModules.graphql"));
const configSysTypeDefs = __importStar(require("./schemas/configSys.graphql"));
const sepomexTypeDefs = __importStar(require("./schemas/Catalogs/Sepomex/Sepomex.graphql"));
const addressesTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/Address.graphql"));
const countryTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/Country.graphql"));
const stateTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/State.graphql"));
const cityTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/City.graphql"));
const municipalityTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/Municipality.graphql"));
const colonyTypeDefs = __importStar(require("./schemas/Catalogs/Addresses/Colony.graphql"));
const contactsTypeDefs = __importStar(require("./schemas/Catalogs/Contacts/contact.graphql"));
const userContacts = __importStar(require("./schemas/Catalogs/Users/userContact.graphql"));
const PasswordRecoveryTypeDefs = __importStar(require("./schemas/Catalogs/Users/userPasswordRecovery.graphql"));
const RolesTypeDefs = __importStar(require("./schemas/Catalogs/Roles/roles.graphql"));
const UploadFileTypeDefs = __importStar(require("./schemas/UploadFiles/uploadFile.graphql"));
const WoocommerceTypeDefs = __importStar(require("./schemas/Catalogs/Orders/orders.graphql"));
const PlatformTypeDefs = __importStar(require("./schemas/Platforms/platforms.graphql"));
const CounterOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/countOrders.graphql"));
const LocalOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/localOrders.graphql"));
const NationalOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/nationalOrders.graphql"));
const ShippedOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/shippedOrders.graphql"));
const ToStockOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/toStockOrders.graphql"));
const BillingOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/billingOrders.graphql"));
const InProcessOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/inProcessOrders.graphql"));
const SulogTypeDefs = __importStar(require("./schemas/Sulog/sulog.graphql"));
const storeTypeDefs = __importStar(require("./schemas/Catalogs/Stores/stores.graphql"));
const TimelineTypeDefs = __importStar(require("./schemas/Catalogs/Timeline/timeline.graphql"));
const ShippingCompaniesTypeDefs = __importStar(require("./schemas/Catalogs/ShippingCompanies/shippingCompanies.graphql"));
const RejectedOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/rejectedOrders.graphql"));
const CollectOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/collectOrders.graphql"));
const InRouteOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/inRouteOrders.graphql"));
const InternalNotesTypeDefs = __importStar(require("./schemas/Catalogs/InternalNotes/internalNotes.graphql"));
const IssussesTypeDefs = __importStar(require("./schemas/Catalogs/Issusses/issusses.graphql"));
const AppUsersTypeDefs = __importStar(require("./schemas/Catalogs/Users/appUser.graphql"));
const PickingOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/pickingOrders.graphql"));
const PackingOrdersTypeDefs = __importStar(require("./schemas/Catalogs/Orders/packingOrders.graphql"));
const AppOrdersWarehouseTypeDefs = __importStar(require("./schemas/App/Catalogs/OrdersWarehouse/OrdersWarehouse.graphql"));
const ReasonsTypeDefs = __importStar(require("./schemas/Catalogs/Reasons/reasons.graphql"));
const QuotesTypeDefs = __importStar(require("./schemas/Catalogs/Quotes/quotes.graphql"));
const DocumentStatusTypeDefs = __importStar(require("./schemas/Catalogs/Documents/documentStatus.graphql"));
const graphql_tools_1 = require("graphql-tools");
const resolversMap_1 = __importDefault(require("./resolversMap"));
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: [
        emptyTypeDefs,
        userTypeDefs,
        authTypeDefs,
        moduleTypeDefs,
        userModulesTypeDefs,
        configSysTypeDefs,
        sepomexTypeDefs,
        addressesTypeDefs,
        countryTypeDefs,
        stateTypeDefs,
        cityTypeDefs,
        municipalityTypeDefs,
        colonyTypeDefs,
        contactsTypeDefs,
        userContacts,
        PasswordRecoveryTypeDefs,
        RolesTypeDefs,
        UploadFileTypeDefs,
        WoocommerceTypeDefs,
        PlatformTypeDefs,
        CounterOrdersTypeDefs,
        LocalOrdersTypeDefs,
        NationalOrdersTypeDefs,
        ShippedOrdersTypeDefs,
        ToStockOrdersTypeDefs,
        BillingOrdersTypeDefs,
        InProcessOrdersTypeDefs,
        SulogTypeDefs,
        storeTypeDefs,
        TimelineTypeDefs,
        ShippingCompaniesTypeDefs,
        RejectedOrdersTypeDefs,
        CollectOrdersTypeDefs,
        InRouteOrdersTypeDefs,
        InternalNotesTypeDefs,
        IssussesTypeDefs,
        AppUsersTypeDefs,
        PickingOrdersTypeDefs,
        PackingOrdersTypeDefs,
        AppOrdersWarehouseTypeDefs,
        ReasonsTypeDefs,
        QuotesTypeDefs,
        DocumentStatusTypeDefs,
    ],
    resolvers: resolversMap_1.default,
});
exports.default = schema;
