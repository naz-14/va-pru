import 'graphql-import-node'
import * as userTypeDefs from './schemas/Catalogs/Users/user.graphql'
import * as moduleTypeDefs from './schemas/Catalogs/Modules/modules.graphql'
import * as authTypeDefs from './schemas/auth.graphql'
import * as emptyTypeDefs from './schemas/empty.graphql'
import * as userModulesTypeDefs from './schemas/Catalogs/Users/userModules.graphql'
import * as configSysTypeDefs from './schemas/configSys.graphql'
import * as sepomexTypeDefs from './schemas/Catalogs/Sepomex/Sepomex.graphql'
import * as addressesTypeDefs from './schemas/Catalogs/Addresses/Address.graphql'
import * as countryTypeDefs from './schemas/Catalogs/Addresses/Country.graphql'
import * as stateTypeDefs from './schemas/Catalogs/Addresses/State.graphql'
import * as cityTypeDefs from './schemas/Catalogs/Addresses/City.graphql'
import * as municipalityTypeDefs from './schemas/Catalogs/Addresses/Municipality.graphql'
import * as colonyTypeDefs from './schemas/Catalogs/Addresses/Colony.graphql'
import * as contactsTypeDefs from './schemas/Catalogs/Contacts/contact.graphql'
import * as userContacts from './schemas/Catalogs/Users/userContact.graphql'
import * as PasswordRecoveryTypeDefs from './schemas/Catalogs/Users/userPasswordRecovery.graphql'
import * as RolesTypeDefs from './schemas/Catalogs/Roles/roles.graphql'
import * as UploadFileTypeDefs from './schemas/UploadFiles/uploadFile.graphql'
import * as WoocommerceTypeDefs from './schemas/Catalogs/Orders/orders.graphql'
import * as PlatformTypeDefs from './schemas/Platforms/platforms.graphql'
import * as CounterOrdersTypeDefs from './schemas/Catalogs/Orders/countOrders.graphql'
import * as LocalOrdersTypeDefs from './schemas/Catalogs/Orders/localOrders.graphql'
import * as NationalOrdersTypeDefs from './schemas/Catalogs/Orders/nationalOrders.graphql'
import * as ShippedOrdersTypeDefs from './schemas/Catalogs/Orders/shippedOrders.graphql'
import * as ToStockOrdersTypeDefs from './schemas/Catalogs/Orders/toStockOrders.graphql'
import * as BillingOrdersTypeDefs from './schemas/Catalogs/Orders/billingOrders.graphql'
import * as InProcessOrdersTypeDefs from './schemas/Catalogs/Orders/inProcessOrders.graphql'
import * as SulogTypeDefs from './schemas/Sulog/sulog.graphql'
import * as storeTypeDefs from './schemas/Catalogs/Stores/stores.graphql'
import * as TimelineTypeDefs from './schemas/Catalogs/Timeline/timeline.graphql'
import * as ShippingCompaniesTypeDefs from './schemas/Catalogs/ShippingCompanies/shippingCompanies.graphql'
import * as RejectedOrdersTypeDefs from './schemas/Catalogs/Orders/rejectedOrders.graphql'
import * as CollectOrdersTypeDefs from './schemas/Catalogs/Orders/collectOrders.graphql'
import * as InRouteOrdersTypeDefs from './schemas/Catalogs/Orders/inRouteOrders.graphql'
import * as InternalNotesTypeDefs from './schemas/Catalogs/InternalNotes/internalNotes.graphql'
import * as IssussesTypeDefs from './schemas/Catalogs/Issusses/issusses.graphql'
import * as AppUsersTypeDefs from './schemas/Catalogs/Users/appUser.graphql'
import * as PickingOrdersTypeDefs from './schemas/Catalogs/Orders/pickingOrders.graphql'
import * as PackingOrdersTypeDefs from './schemas/Catalogs/Orders/packingOrders.graphql'
import * as AppOrdersWarehouseTypeDefs from './schemas/App/Catalogs/OrdersWarehouse/OrdersWarehouse.graphql'
import * as ReasonsTypeDefs from './schemas/Catalogs/Reasons/reasons.graphql'
import * as DocumentStatusTypeDefs from './schemas/Documents/Status/status.graphql'
import * as SapListPricesItemsTypeDefs from './schemas/Catalogs/SAP/ListPricesItems/sapListPricesItems.graphql'
import * as SapListPricesTypeDefs from './schemas/Catalogs/SAP/ListPrices/sapListPrices.graphql'
import * as SapItemsTypeDefs from './schemas/Catalogs/SAP/Items/sapItems.graphql'
import * as SapBussinessPartnerTypeDefs from './schemas/Catalogs/SAP/BussinessPartner/sapBussinessPartner.graphql'
import * as SapNumGroupTypeDefs from './schemas/Catalogs/SAP/NumGroup/sapNumGroup.graphql'
import * as SapPartnerGroupTypeDefs from './schemas/Catalogs/SAP/PartnerGroup/sapPartnerGroup.graphql'
import * as SapPurchasesOrdersTypeDefs from './schemas/Catalogs/SAP/PurchasesOrders/sapPurchasesOrders.graphql'
import * as SapPurchasesOrdersLinesTypeDefs from './schemas/Catalogs/SAP/PurchasesOrdersLines/sapPurchasesOrdersLines.graphql'
import * as SapWarehousesTypeDefs from './schemas/Catalogs/SAP/Warehouses/sapWarehouses.graphql'
import * as BoxesTypeDefs from './schemas/Catalogs/Boxes/boxes.graphql'
import * as SapTransfersTypeDefs from './schemas/Catalogs/SAP/Transfers/sapTransfers.graphql'
import * as SapProductsTypeDefs from './schemas/Catalogs/SAP/Products/sapProducts.graphql'
import * as ScheduleTypeDefs from './schemas/Documents/Schedule/schedule.graphql'
import * as ScheduleOrdersLinesTypeDefs from './schemas/Documents/ScheduleOrdersLines/scheduleOrdersLines.graphql'
import * as DocksTypeDefs from './schemas/Catalogs/Docks/docks.graphql'
import * as CommodityReceiptTypeDefs from './schemas/Documents/CommodityReceipt/commodityReceipt.graphql'
import * as ScheduleDocksTypeDefs from './schemas/Documents/ScheduleDocks/scheduleDocks.graphql'

import { makeExecutableSchema } from 'graphql-tools'
import resolversMap from './resolversMap'
import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
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
    ScheduleTypeDefs,
    DocumentStatusTypeDefs,
    SapListPricesItemsTypeDefs,
    SapListPricesTypeDefs,
    SapItemsTypeDefs,
    SapBussinessPartnerTypeDefs,
    SapNumGroupTypeDefs,
    SapPartnerGroupTypeDefs,
    SapPurchasesOrdersTypeDefs,
    SapPurchasesOrdersLinesTypeDefs,
    SapWarehousesTypeDefs,
    BoxesTypeDefs,
    SapTransfersTypeDefs,
    SapProductsTypeDefs,
    ScheduleOrdersLinesTypeDefs,
    DocksTypeDefs,
    CommodityReceiptTypeDefs,
    ScheduleDocksTypeDefs,
  ],
  resolvers: resolversMap,
})
export default schema
