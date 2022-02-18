import { Resolvers } from './generated'
import { merge } from 'lodash'
import UserResolver from './resolvers/Catalogs/Users/UserResolver'
import AuthResolver from './resolvers/AuthResolver'
import ModuleResolver from './resolvers/Catalogs/Modules/ModuleResolver'
import UserModulesResolver from './resolvers/Catalogs/Users/UserModulesResolver'
import configSysResolver from './resolvers/ConfigSysResolver'
import SepomexResolver from './resolvers/Catalogs/Sepomex/SepomexResolver'
import RecoveryPasswordResolver from './resolvers/Catalogs/Users/RecoveryPasswordResolver'
import RoleResolver from './resolvers/Catalogs/Roles/RoleResolver'
import UploadImageResolver from './resolvers/UploadFiles/UploadImageResolver'
import woocommerceResolver from './resolvers/Catalogs/Orders/order'
import CountersResolver from './resolvers/Catalogs/Orders/counters'
import platfromsResolver from './resolvers/Platforms/PlatfromsResolver'
import localOrdersResolver from './resolvers/Catalogs/Orders/localOrders'
import nationalOrdersResolver from './resolvers/Catalogs/Orders/nationalOrders'
import shippedOrdersResolver from './resolvers/Catalogs/Orders/shippedOrders'
import toStockOrdersResolver from './resolvers/Catalogs/Orders/toStockOrders'
import billingOrdersResolver from './resolvers/Catalogs/Orders/billingOrders'
import inProcessOrdersResolver from './resolvers/Catalogs/Orders/inProcessOrders'
import SulogResolver from './resolvers/Sulog/SulogResolver'
import StoresResolver from './resolvers/Catalogs/Stores/StoresResolver'
import timelineResolver from './resolvers/Catalogs/Timeline/timeline'
import ShippingCompanies from './resolvers/Catalogs/ShippingCompanies/ShippingCompaniesResolver'
import rejectedOrders from './resolvers/Catalogs/Orders/rejectedOrders'
import collectOrders from './resolvers/Catalogs/Orders/collectOrders'
import inRouteOrders from './resolvers/Catalogs/Orders/inRouteOrders'
import internalNotesResolver from './resolvers/Catalogs/InternalNotes/internalNotes'
import IssussesResolver from './resolvers/Catalogs/Issusses/IssussesResolver'
import AppUserResolver from './resolvers/Catalogs/Users/AppUserResolver'
import PickingOrdersResolver from './resolvers/Catalogs/Orders/pickingOrders'
import PackingOrdersResolver from './resolvers/Catalogs/Orders/packingOrders'
import OrdersWarehouseResolver from './resolvers/App/Catalogs/OrdersWarehouse/OrdersWarehouse'
import ReasonsResolver from './resolvers/Catalogs/Reasons/ReasonsResolver'
import QuoteResolver from './resolvers/Catalogs/Quotes/QuotesResolver'
import DocumentStatusResolver from './resolvers/Catalogs/Documents/DocumentStatusResolver'

const resolversMap: Resolvers = merge([
  UserResolver,
  AuthResolver,
  ModuleResolver,
  UserModulesResolver,
  configSysResolver,
  SepomexResolver,
  RecoveryPasswordResolver,
  RoleResolver,
  UploadImageResolver,
  woocommerceResolver,
  CountersResolver,
  platfromsResolver,
  localOrdersResolver,
  nationalOrdersResolver,
  shippedOrdersResolver,
  toStockOrdersResolver,
  billingOrdersResolver,
  inProcessOrdersResolver,
  SulogResolver,
  StoresResolver,
  timelineResolver,
  ShippingCompanies,
  internalNotesResolver,
  rejectedOrders,
  collectOrders,
  inRouteOrders,
  IssussesResolver,
  AppUserResolver,
  PickingOrdersResolver,
  PackingOrdersResolver,
  OrdersWarehouseResolver,
  ReasonsResolver,
  QuoteResolver,
  DocumentStatusResolver,
])

export default resolversMap
