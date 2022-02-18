import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type AppOrderWarehouse = {
  __typename?: 'AppOrderWarehouse';
  id: Scalars['Int'];
  open: Scalars['Boolean'];
  order?: Maybe<Order>;
  order_id: Scalars['Int'];
  packing_user_id?: Maybe<Scalars['Int']>;
  part: Scalars['Int'];
  picking_user_id?: Maybe<Scalars['Int']>;
  rack_id?: Maybe<Scalars['Int']>;
  total_parts: Scalars['Int'];
};

export type AppUser = {
  __typename?: 'AppUser';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  id_type: Scalars['Int'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  userType?: Maybe<UserType>;
  username: Scalars['String'];
};

export type AppUserInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  id_type: Scalars['Int'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  username: Scalars['String'];
};

export type AppUserUpdateInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  id_type: Scalars['Int'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  username: Scalars['String'];
};

export type BusinessPartner = {
  __typename?: 'BusinessPartner';
  address?: Maybe<Scalars['String']>;
  cardCode?: Maybe<Scalars['String']>;
  cardName?: Maybe<Scalars['String']>;
  cardType?: Maybe<Scalars['String']>;
  mailAdress?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type DocumentsStatuses = {
  __typename?: 'DocumentsStatuses';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type FileUpload = {
  __typename?: 'FileUpload';
  url: Scalars['String'];
};

export type InternalNotes = {
  __typename?: 'InternalNotes';
  fileInternal?: Maybe<TypeFile>;
  file_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  order_id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<UserDetails>;
  user_id: Scalars['Int'];
};

export type IssusesDetails = {
  __typename?: 'IssusesDetails';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Method = {
  __typename?: 'Method';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Module = {
  __typename?: 'Module';
  front_label: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
  submodules?: Maybe<Array<Maybe<Submodule>>>;
};

export type ModuleRowsCount = {
  __typename?: 'ModuleRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows: Array<Module>;
};

export type MultiOrderDetails = {
  __typename?: 'MultiOrderDetails';
  details?: Maybe<Array<Maybe<AppOrderWarehouse>>>;
  products?: Maybe<Array<Maybe<ProductsOrderWarehouse>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  authAppUser?: Maybe<Scalars['String']>;
  authUser: UserAuth;
  avatarUpdate: Scalars['Boolean'];
  changeMultipleOrdersToClose: Scalars['Boolean'];
  changeOrderToClose: Scalars['Boolean'];
  changeToBilling?: Maybe<Order>;
  changeToCollect?: Maybe<Order>;
  changeToInRoute?: Maybe<Order>;
  changeToPacking?: Maybe<Order>;
  changeToPicking?: Maybe<Order>;
  changeToProcess?: Maybe<Order>;
  changeToRejected?: Maybe<Order>;
  changeToReturned?: Maybe<Order>;
  changeToShipped?: Maybe<Order>;
  changeToSupply?: Maybe<Order>;
  checkTokenRecovery: Scalars['Boolean'];
  createAppUser: Scalars['Boolean'];
  createInternalNote?: Maybe<Scalars['Boolean']>;
  createModule: Module;
  createOrderWarehouseBoxes: Scalars['Boolean'];
  createPlatform?: Maybe<PlatformCatalog>;
  createQuote?: Maybe<Scalars['Boolean']>;
  createReason?: Maybe<Scalars['Boolean']>;
  createRecoveryToken: Recovery;
  createRole: ReturnRole;
  createSulogDoc: Array<Maybe<SulogDoc>>;
  createUserPermission: Scalars['Boolean'];
  decryptToken: TokenDecrypted;
  decryptTokenApp: TokenDecryptedApp;
  deleteAppUser: Scalars['Boolean'];
  deleteModule: Scalars['Boolean'];
  deleteRole: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  getAllModulesExport?: Maybe<Array<Maybe<Module>>>;
  getAllPendingExport?: Maybe<Array<Maybe<Order>>>;
  getAllRolesExport?: Maybe<Array<Maybe<RolesCatalog>>>;
  getAllUserPermissions: Array<UserModule>;
  getAllUsersExport?: Maybe<Array<Maybe<User>>>;
  getFullAddressByZipcode: GetFullAddressCatalog;
  getInfoProvider?: Maybe<Scalars['Boolean']>;
  getUser: User;
  isOrderOpen: Scalars['Boolean'];
  passwordUpdate: Scalars['Boolean'];
  recoveryUserPassword: Scalars['Boolean'];
  registerUser: UserData;
  updateAppUser: Scalars['Boolean'];
  updateModule: Module;
  updateRole: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  updateUserPermission: Scalars['Boolean'];
  uploadFile: FileUpload;
  uploadImage: FileUpload;
  uploadMultipleFile: Array<Maybe<FileUpload>>;
  uploadMultipleImage: Array<Maybe<FileUpload>>;
  validateProduct: Scalars['Boolean'];
  validateProductPacking: Scalars['Boolean'];
  validateRack: Scalars['Boolean'];
};


export type MutationAuthAppUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationAuthUserArgs = {
  input: UserLoginInput;
};


export type MutationAvatarUpdateArgs = {
  avatar: Scalars['Upload'];
  id_user: Scalars['Int'];
};


export type MutationChangeMultipleOrdersToCloseArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationChangeOrderToCloseArgs = {
  id: Scalars['Int'];
};


export type MutationChangeToBillingArgs = {
  order_id: Scalars['Int'];
  shipping_compay_id: Scalars['Int'];
};


export type MutationChangeToCollectArgs = {
  order_id: Scalars['Int'];
  shipping_compay_id?: Maybe<Scalars['Int']>;
};


export type MutationChangeToInRouteArgs = {
  order_id: Scalars['Int'];
};


export type MutationChangeToPackingArgs = {
  order_id: Scalars['Int'];
  rack_code: Scalars['String'];
};


export type MutationChangeToPickingArgs = {
  order_id: Scalars['Int'];
};


export type MutationChangeToProcessArgs = {
  order_id: Scalars['Int'];
  store_id: Scalars['Int'];
};


export type MutationChangeToRejectedArgs = {
  id_reason: Scalars['Int'];
  order_id: Scalars['Int'];
};


export type MutationChangeToReturnedArgs = {
  order_id: Scalars['Int'];
};


export type MutationChangeToShippedArgs = {
  order_id: Scalars['Int'];
};


export type MutationChangeToSupplyArgs = {
  order_id: Scalars['Int'];
};


export type MutationCheckTokenRecoveryArgs = {
  token: Scalars['String'];
};


export type MutationCreateAppUserArgs = {
  input: AppUserInput;
};


export type MutationCreateInternalNoteArgs = {
  inputInternalNote: InternalNote;
};


export type MutationCreateModuleArgs = {
  moduleInput: ModuleInput;
  submoduleInput: Array<Maybe<SubmoduleInput>>;
};


export type MutationCreateOrderWarehouseBoxesArgs = {
  boxes: Array<BoxInput>;
  orderId: Scalars['Int'];
};


export type MutationCreatePlatformArgs = {
  name: Scalars['String'];
};


export type MutationCreateQuoteArgs = {
  inputQuote: QuoteData;
};


export type MutationCreateReasonArgs = {
  inputReason: ReasonData;
};


export type MutationCreateRecoveryTokenArgs = {
  userName: Scalars['String'];
};


export type MutationCreateRoleArgs = {
  input: RoleInput;
};


export type MutationCreateSulogDocArgs = {
  ordersId: Array<Scalars['Int']>;
};


export type MutationCreateUserPermissionArgs = {
  modules: Array<UserModuleInput>;
  userID: Scalars['Int'];
};


export type MutationDecryptTokenArgs = {
  token: Scalars['String'];
};


export type MutationDecryptTokenAppArgs = {
  token: Scalars['String'];
};


export type MutationDeleteAppUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteModuleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationGetAllUserPermissionsArgs = {
  userID: Scalars['Int'];
};


export type MutationGetFullAddressByZipcodeArgs = {
  zipCode: Scalars['Int'];
};


export type MutationGetInfoProviderArgs = {
  inputProvider: ProviderData;
};


export type MutationGetUserArgs = {
  userID: Scalars['Int'];
};


export type MutationIsOrderOpenArgs = {
  id: Scalars['Int'];
};


export type MutationPasswordUpdateArgs = {
  currentPassword: Scalars['String'];
  id_user: Scalars['Int'];
  password: Scalars['String'];
};


export type MutationRecoveryUserPasswordArgs = {
  inputRecovery: PasswordRecoveryInput;
};


export type MutationRegisterUserArgs = {
  input: UserRegisterInput;
  inputAddress: AddressInput;
  inputAvatar: Scalars['Upload'];
  inputContact: Array<ContactInput>;
};


export type MutationUpdateAppUserArgs = {
  id: Scalars['Int'];
  input: AppUserUpdateInput;
};


export type MutationUpdateModuleArgs = {
  moduleId: Scalars['Int'];
  moduleInput: ModuleInput;
  submoduleInput: Array<Maybe<SubmoduleInput>>;
  submodulesIdsTodelete: Array<Maybe<Scalars['Int']>>;
};


export type MutationUpdateRoleArgs = {
  input: RoleInput;
  roleId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  addressId: Scalars['Int'];
  input: UserRegisterInput;
  inputAddress: AddressInput;
  inputAvatar?: Maybe<Scalars['Upload']>;
  inputContact: Array<ContactInput>;
  userID: Scalars['Int'];
};


export type MutationUpdateUserPermissionArgs = {
  modules: Array<UserModuleInput>;
  userID: Scalars['Int'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadMultipleFileArgs = {
  file: Array<Scalars['Upload']>;
};


export type MutationUploadMultipleImageArgs = {
  file: Array<Scalars['Upload']>;
};


export type MutationValidateProductArgs = {
  orderProductId: Scalars['Int'];
  productBarcode: Scalars['String'];
  productSku: Scalars['Int'];
};


export type MutationValidateProductPackingArgs = {
  orderProductId: Scalars['Int'];
  productBarcode: Scalars['String'];
  productSku: Scalars['Int'];
};


export type MutationValidateRackArgs = {
  rackCode: Scalars['Int'];
  warehouseOrderId: Scalars['Int'];
};

export type OpenOrders = {
  __typename?: 'OpenOrders';
  cardCode?: Maybe<Scalars['String']>;
  cardName?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  docDate?: Maybe<Scalars['String']>;
  docEntry?: Maybe<Scalars['Int']>;
  docNum?: Maybe<Scalars['Int']>;
  docStatus?: Maybe<Scalars['String']>;
  docTotal?: Maybe<Scalars['Int']>;
  numAtCard?: Maybe<Scalars['Int']>;
  objType?: Maybe<Scalars['String']>;
  series?: Maybe<Scalars['Int']>;
  transId?: Maybe<Scalars['Int']>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  innvoice_id?: Maybe<Scalars['Int']>;
  method?: Maybe<Method>;
  method_id: Scalars['Int'];
  order_date?: Maybe<Scalars['String']>;
  order_id: Scalars['Int'];
  payment?: Maybe<Payment>;
  payment_id: Scalars['Int'];
  platform?: Maybe<Platform>;
  platform_id: Scalars['Int'];
  product_quantity: Scalars['Int'];
  products?: Maybe<Array<Maybe<Product>>>;
  reason?: Maybe<Reason>;
  shipping?: Maybe<Shipping>;
  shipping_compay_id?: Maybe<Scalars['Int']>;
  shipping_id: Scalars['Int'];
  shipping_price: Scalars['Float'];
  status?: Maybe<Status>;
  status_id: Scalars['Int'];
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['Int']>;
  total_price: Scalars['Float'];
  type?: Maybe<Type>;
  type_id: Scalars['Int'];
  uber_id?: Maybe<Scalars['String']>;
  user?: Maybe<UserDetails>;
  user_id?: Maybe<Scalars['Int']>;
  warehouse?: Maybe<Warehouse>;
  warehouse_id?: Maybe<Scalars['Int']>;
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  details?: Maybe<AppOrderWarehouse>;
  products?: Maybe<Array<Maybe<ProductsOrderWarehouse>>>;
};

export type OrderRowsCount = {
  __typename?: 'OrderRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows?: Maybe<Array<Maybe<Order>>>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Int'];
  order_id: Scalars['Int'];
  payment_id: Scalars['String'];
  platform: Scalars['String'];
};

export type Platform = {
  __typename?: 'Platform';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  order_id: Scalars['Int'];
  price: Scalars['Float'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  sku: Scalars['String'];
  total: Scalars['Float'];
  variation_id?: Maybe<Scalars['Int']>;
};

export type ProductInput = {
  name: Scalars['String'];
  order_id: Scalars['Int'];
  price: Scalars['Float'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  sku: Scalars['String'];
  total: Scalars['Float'];
  variation_id?: Maybe<Scalars['Int']>;
};

export type ProductsOrderWarehouse = {
  __typename?: 'ProductsOrderWarehouse';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  rack: Scalars['String'];
  sku: Scalars['String'];
  total: Scalars['Float'];
  variation_id?: Maybe<Scalars['Int']>;
};

export type Provider = {
  __typename?: 'Provider';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  result?: Maybe<ProviderResult>;
};

export type ProviderResult = {
  __typename?: 'ProviderResult';
  businessPartner?: Maybe<BusinessPartner>;
  openOrders?: Maybe<Array<Maybe<OpenOrders>>>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  GetUserById?: Maybe<User>;
  Users?: Maybe<UserRowsCount>;
  _empty?: Maybe<Scalars['String']>;
  getAllAppOrderWarehouses?: Maybe<Array<Maybe<AppOrderWarehouse>>>;
  getAllAppOrderWarehousesPacking?: Maybe<Array<Maybe<AppOrderWarehouse>>>;
  getAllAppUsers?: Maybe<UserAppRowsCount>;
  getAllBoxes: Array<Maybe<Boxes>>;
  getAllCounters: Counters;
  getAllIssusses: Array<Maybe<Issusses>>;
  getAllModules?: Maybe<ModuleRowsCount>;
  getAllOrders: Array<WoocommerceOrder>;
  getAllRoles?: Maybe<RoleRowsCount>;
  getAllShippingCompanies: Array<Maybe<Companies>>;
  getAllStatusesOrders: Array<Status>;
  getAllStores?: Maybe<StoresRowsCount>;
  getAllSulogDocs: Array<Maybe<SulogDoc>>;
  getAppOderWarehouseByMultiIds?: Maybe<MultiOrderDetails>;
  getAppOrderWarehouseById?: Maybe<OrderDetails>;
  getAppUser?: Maybe<AppUser>;
  getAppWarehouseOrderBoxes?: Maybe<Array<Maybe<Box>>>;
  getBillingOrders?: Maybe<OrderRowsCount>;
  getCollectOrders?: Maybe<OrderRowsCount>;
  getConfigSys: ConfigSys;
  getDocumentsStatuses: Array<DocumentsStatuses>;
  getInProcessOrders?: Maybe<OrderRowsCount>;
  getInRouteOrders?: Maybe<OrderRowsCount>;
  getInternalNotes: Array<InternalNotes>;
  getLocalOrders?: Maybe<OrderRowsCount>;
  getNationalOrders?: Maybe<OrderRowsCount>;
  getOneModule: Module;
  getOneOrder: WoocommerceOrder;
  getOneRole?: Maybe<RolesCatalog>;
  getOneStore?: Maybe<StoresCatalog>;
  getOneSulogDoc?: Maybe<SulogDoc>;
  getOrderById?: Maybe<Order>;
  getPackingOrders?: Maybe<OrderRowsCount>;
  getPendingOrders?: Maybe<OrderRowsCount>;
  getPickingOrders?: Maybe<OrderRowsCount>;
  getQuotes: Array<QuotesData>;
  getReason: Array<ReasonsData>;
  getRejectedOrders?: Maybe<OrderRowsCount>;
  getShippedOrders?: Maybe<OrderRowsCount>;
  getTimeline?: Maybe<Array<Maybe<Timeline>>>;
  getToStockOrders?: Maybe<OrderRowsCount>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetAllAppUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetAllModulesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetAllRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetAllStoresArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetAppOderWarehouseByMultiIdsArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryGetAppOrderWarehouseByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetAppUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetAppWarehouseOrderBoxesArgs = {
  id: Scalars['Int'];
};


export type QueryGetBillingOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetCollectOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetInProcessOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetInRouteOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetInternalNotesArgs = {
  orderId: Scalars['Int'];
};


export type QueryGetLocalOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetNationalOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetOneModuleArgs = {
  id: Scalars['Int'];
};


export type QueryGetOneOrderArgs = {
  id: Scalars['Int'];
};


export type QueryGetOneRoleArgs = {
  id: Scalars['Int'];
};


export type QueryGetOneStoreArgs = {
  id: Scalars['Int'];
};


export type QueryGetOneSulogDocArgs = {
  id: Scalars['Int'];
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetPackingOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetPendingOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetPickingOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetReasonArgs = {
  orderId: Scalars['Int'];
};


export type QueryGetRejectedOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetShippedOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};


export type QueryGetTimelineArgs = {
  id: Scalars['Int'];
};


export type QueryGetToStockOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};

export type Reason = {
  __typename?: 'Reason';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  is_active: Scalars['Boolean'];
  issusesDetails?: Maybe<IssusesDetails>;
  issusse_id: Scalars['Int'];
  order_id: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  userDetails?: Maybe<UserDetails>;
  user_id: Scalars['Int'];
};

export type Recovery = {
  __typename?: 'Recovery';
  id: Scalars['Int'];
  token_recovery: Scalars['String'];
};

export type RoleInput = {
  description: Scalars['String'];
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  role_name: Scalars['String'];
};

export type RoleRowsCount = {
  __typename?: 'RoleRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows?: Maybe<Array<Maybe<RolesCatalog>>>;
};

export type RolesCatalog = {
  __typename?: 'RolesCatalog';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  role_name: Scalars['String'];
};

export type Shipping = {
  __typename?: 'Shipping';
  address_1: Scalars['String'];
  address_2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  order_id: Scalars['Int'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
  state: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Store = {
  __typename?: 'Store';
  address: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  uber_id: Scalars['String'];
};

export type StoreInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  uber_id: Scalars['String'];
};

export type StoresCatalog = {
  __typename?: 'StoresCatalog';
  address: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone: Scalars['String'];
  uber_id: Scalars['String'];
};

export type StoresRowsCount = {
  __typename?: 'StoresRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows?: Maybe<Array<Maybe<StoresCatalog>>>;
};

export type Submodule = {
  __typename?: 'Submodule';
  front_label: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  module_id: Scalars['Int'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
};

export type Timeline = {
  __typename?: 'Timeline';
  dateStatus: Scalars['String'];
  id: Scalars['Int'];
  order_id: Scalars['Int'];
  status?: Maybe<Status>;
  status_id: Scalars['Int'];
  user?: Maybe<UserDetails>;
  user_id: Scalars['Int'];
};

export type Type = {
  __typename?: 'Type';
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  address?: Maybe<AddressesCatalog>;
  avatar?: Maybe<TypeAvatar>;
  contacts?: Maybe<Array<UserContacts>>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  id_address: Scalars['Int'];
  id_avatar_file: Scalars['Int'];
  id_role: Scalars['Int'];
  id_store?: Maybe<Scalars['Int']>;
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type UserAppRowsCount = {
  __typename?: 'UserAppRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows?: Maybe<Array<Maybe<AppUser>>>;
};

export type UserDetails = {
  __typename?: 'UserDetails';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserRowsCount = {
  __typename?: 'UserRowsCount';
  count?: Maybe<Scalars['Int']>;
  rows?: Maybe<Array<Maybe<User>>>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type AddressInput = {
  active?: Maybe<Scalars['Boolean']>;
  external_number: Scalars['String'];
  id_city: Scalars['Int'];
  id_colony: Scalars['Int'];
  id_country: Scalars['Int'];
  id_municipality: Scalars['Int'];
  id_state: Scalars['Int'];
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  internal_number?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  zip_code: Scalars['Int'];
};

export type AddressesCatalog = {
  __typename?: 'addressesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  city?: Maybe<CitiesCatalog>;
  colony?: Maybe<ColoniesCatalog>;
  country?: Maybe<CountriesCatalog>;
  external_number: Scalars['String'];
  id: Scalars['Int'];
  id_city: Scalars['Int'];
  id_colony: Scalars['Int'];
  id_country: Scalars['Int'];
  id_municipality: Scalars['Int'];
  id_state: Scalars['Int'];
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  internal_number?: Maybe<Scalars['String']>;
  municipality?: Maybe<MunicipalitiesCatalog>;
  state?: Maybe<StatesCatalog>;
  street: Scalars['String'];
  zip_code: Scalars['Int'];
};

export type Box = {
  __typename?: 'box';
  box_id: Scalars['Int'];
  id: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type BoxInput = {
  box_id: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Boxes = {
  __typename?: 'boxes';
  height: Scalars['Int'];
  id: Scalars['Int'];
  large: Scalars['Int'];
  name: Scalars['String'];
  size: Scalars['String'];
  width: Scalars['Int'];
};

export type CitiesCatalog = {
  __typename?: 'citiesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  id_state: Scalars['Int'];
  name: Scalars['String'];
};

export type CitiesCatalogSepomex = {
  __typename?: 'citiesCatalogSepomex';
  id?: Maybe<Scalars['Int']>;
  id_state: Scalars['Int'];
  name: Scalars['String'];
};

export type ColoniesCatalog = {
  __typename?: 'coloniesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  id_municipality: Scalars['Int'];
  name: Scalars['String'];
  zip_code: Scalars['Int'];
};

export type ColoniesCatalogSepomex = {
  __typename?: 'coloniesCatalogSepomex';
  id?: Maybe<Scalars['Int']>;
  id_municipality: Scalars['Int'];
  name: Scalars['String'];
  zip_code: Scalars['Int'];
};

export type Companies = {
  __typename?: 'companies';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ConfigSys = {
  __typename?: 'configSys';
  project_favicon: Scalars['String'];
  project_logo: Scalars['String'];
  project_mini_logo: Scalars['String'];
  project_name: Scalars['String'];
};

export type ContactInput = {
  active?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  lastname: Scalars['String'];
  mobile: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  second_lastname?: Maybe<Scalars['String']>;
};

export type ContactsCatalog = {
  __typename?: 'contactsCatalog';
  active?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  lastname: Scalars['String'];
  mobile: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  second_lastname?: Maybe<Scalars['String']>;
};

export type Counters = {
  __typename?: 'counters';
  billing: Scalars['Int'];
  collect: Scalars['Int'];
  complete: Scalars['Int'];
  localShipping: Scalars['Int'];
  nationalShipping: Scalars['Int'];
  pendings: Scalars['Int'];
  processing: Scalars['Int'];
  rejected: Scalars['Int'];
  route: Scalars['Int'];
  toSupply: Scalars['Int'];
};

export type CountriesCatalog = {
  __typename?: 'countriesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type CountriesCatalogSepomex = {
  __typename?: 'countriesCatalogSepomex';
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type GetColoniesCollection = {
  __typename?: 'getColoniesCollection';
  colony_name: Scalars['String'];
  id_colony: Scalars['Int'];
};

export type GetFullAddressCatalog = {
  __typename?: 'getFullAddressCatalog';
  city_name: Scalars['String'];
  colonies: Array<GetColoniesCollection>;
  country_name: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  id_city: Scalars['Int'];
  id_country: Scalars['Int'];
  id_municipality: Scalars['Int'];
  id_state: Scalars['Int'];
  municipality_name: Scalars['String'];
  state_name: Scalars['String'];
};

export type InternalNote = {
  file?: Maybe<Scalars['Upload']>;
  order_id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user_id: Scalars['Int'];
};

export type Issusses = {
  __typename?: 'issusses';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ModuleInfo = {
  __typename?: 'moduleInfo';
  front_label: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
};

export type ModuleInput = {
  front_label: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
};

export type MunicipalitiesCatalog = {
  __typename?: 'municipalitiesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  id_city: Scalars['Int'];
  name: Scalars['String'];
};

export type MunicipalitiesCatalogSepomex = {
  __typename?: 'municipalitiesCatalogSepomex';
  id?: Maybe<Scalars['Int']>;
  id_city: Scalars['Int'];
  name: Scalars['String'];
};

export type PasswordRecoveryInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type PasswordUpdateInput = {
  currentPassword: Scalars['String'];
  id_user: Scalars['Int'];
  password: Scalars['String'];
};

export type PlatformCatalog = {
  __typename?: 'platformCatalog';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProviderData = {
  cardCode?: Maybe<Scalars['String']>;
  cardName?: Maybe<Scalars['String']>;
};

export type QuoteData = {
  cardCode: Scalars['String'];
  cardName: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  docDate: Scalars['String'];
  docStatus: Scalars['Int'];
  docTime: Scalars['String'];
  whsCode: Scalars['String'];
};

export type QuotesData = {
  __typename?: 'quotesData';
  cardCode: Scalars['String'];
  cardName: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  docDate: Scalars['String'];
  docStatus: Scalars['Int'];
  docTime: Scalars['String'];
  id: Scalars['Int'];
  status?: Maybe<Status>;
  whsCode: Scalars['String'];
};

export type ReasonData = {
  issusse_id: Scalars['Int'];
  order_id: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  user_id: Scalars['Int'];
};

export type ReasonsData = {
  __typename?: 'reasonsData';
  issusse_id: Scalars['Int'];
  order_id: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  userDetails?: Maybe<UserDetails>;
  user_id: Scalars['Int'];
};

export type ReturnRole = {
  __typename?: 'returnRole';
  description: Scalars['String'];
  id: Scalars['Int'];
  role_name: Scalars['String'];
};

export type ReturnStore = {
  __typename?: 'returnStore';
  id: Scalars['Int'];
  name: Scalars['String'];
  uber_id: Scalars['String'];
};

export type StatesCatalog = {
  __typename?: 'statesCatalog';
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  id_country?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type StatesCatalogSepomex = {
  __typename?: 'statesCatalogSepomex';
  id?: Maybe<Scalars['Int']>;
  id_country: Scalars['Int'];
  name: Scalars['String'];
};

export type StatusDetails = {
  __typename?: 'statusDetails';
  docNum?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  objType?: Maybe<Scalars['String']>;
  statusCode: Scalars['Int'];
};

export type SubmoduleInfo = {
  __typename?: 'submoduleInfo';
  front_label: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
};

export type SubmoduleInput = {
  front_label: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  relative_link: Scalars['String'];
};

export type SulogDoc = {
  __typename?: 'sulogDoc';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  result: StatusDetails;
};

export type TokenDecrypted = {
  __typename?: 'tokenDecrypted';
  avatar: Scalars['String'];
  email: Scalars['String'];
  exp: Scalars['Int'];
  first_name: Scalars['String'];
  iat: Scalars['Int'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['Int'];
  user_name: Scalars['String'];
};

export type TokenDecryptedApp = {
  __typename?: 'tokenDecryptedApp';
  email: Scalars['String'];
  exp: Scalars['Int'];
  iat: Scalars['Int'];
  id: Scalars['Int'];
  id_type: Scalars['Int'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type TypeAvatar = {
  __typename?: 'typeAvatar';
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type TypeFile = {
  __typename?: 'typeFile';
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type UserAuth = {
  __typename?: 'userAuth';
  token: Scalars['String'];
};

export type UserContactInput = {
  id_contact?: Maybe<Scalars['Int']>;
  id_user?: Maybe<Scalars['Int']>;
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
};

export type UserContacts = {
  __typename?: 'userContacts';
  contact_data?: Maybe<ContactsCatalog>;
  id?: Maybe<Scalars['Int']>;
  id_contact?: Maybe<Scalars['Int']>;
  id_user?: Maybe<Scalars['Int']>;
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
};

export type UserData = {
  __typename?: 'userData';
  id: Scalars['Int'];
  id_role: Scalars['Int'];
  user_name: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type UserModule = {
  __typename?: 'userModule';
  access_delete: Scalars['Boolean'];
  access_edit: Scalars['Boolean'];
  access_export: Scalars['Boolean'];
  access_read: Scalars['Boolean'];
  access_retrieve: Scalars['Boolean'];
  id: Scalars['Int'];
  id_module: Scalars['Int'];
  id_submodule?: Maybe<Scalars['Int']>;
  module_info?: Maybe<ModuleInfo>;
  submodule_info?: Maybe<SubmoduleInfo>;
};

export type UserModuleInput = {
  access_delete: Scalars['Boolean'];
  access_edit: Scalars['Boolean'];
  access_export: Scalars['Boolean'];
  access_read: Scalars['Boolean'];
  access_retrieve: Scalars['Boolean'];
  id_module: Scalars['Int'];
  id_submodule?: Maybe<Scalars['Int']>;
  id_user: Scalars['Int'];
};

export type UserRegisterInput = {
  active: Scalars['Boolean'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id_address?: Maybe<Scalars['Int']>;
  id_role: Scalars['Int'];
  id_store?: Maybe<Scalars['Int']>;
  id_user_delete?: Maybe<Scalars['Int']>;
  id_user_register?: Maybe<Scalars['Int']>;
  id_user_update?: Maybe<Scalars['Int']>;
  last_name: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type WoocommerceOrder = {
  __typename?: 'woocommerceOrder';
  id: Scalars['ID'];
  number: Scalars['String'];
  status: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppOrderWarehouse: ResolverTypeWrapper<AppOrderWarehouse>;
  AppUser: ResolverTypeWrapper<AppUser>;
  AppUserInput: AppUserInput;
  AppUserUpdateInput: AppUserUpdateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BusinessPartner: ResolverTypeWrapper<BusinessPartner>;
  DocumentsStatuses: ResolverTypeWrapper<DocumentsStatuses>;
  FileUpload: ResolverTypeWrapper<FileUpload>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InternalNotes: ResolverTypeWrapper<InternalNotes>;
  IssusesDetails: ResolverTypeWrapper<IssusesDetails>;
  Method: ResolverTypeWrapper<Method>;
  Module: ResolverTypeWrapper<Module>;
  ModuleRowsCount: ResolverTypeWrapper<ModuleRowsCount>;
  MultiOrderDetails: ResolverTypeWrapper<MultiOrderDetails>;
  Mutation: ResolverTypeWrapper<{}>;
  OpenOrders: ResolverTypeWrapper<OpenOrders>;
  Order: ResolverTypeWrapper<Order>;
  OrderDetails: ResolverTypeWrapper<OrderDetails>;
  OrderRowsCount: ResolverTypeWrapper<OrderRowsCount>;
  Payment: ResolverTypeWrapper<Payment>;
  Platform: ResolverTypeWrapper<Platform>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ProductsOrderWarehouse: ResolverTypeWrapper<ProductsOrderWarehouse>;
  Provider: ResolverTypeWrapper<Provider>;
  ProviderResult: ResolverTypeWrapper<ProviderResult>;
  Query: ResolverTypeWrapper<{}>;
  Reason: ResolverTypeWrapper<Reason>;
  Recovery: ResolverTypeWrapper<Recovery>;
  RoleInput: RoleInput;
  RoleRowsCount: ResolverTypeWrapper<RoleRowsCount>;
  RolesCatalog: ResolverTypeWrapper<RolesCatalog>;
  Shipping: ResolverTypeWrapper<Shipping>;
  Status: ResolverTypeWrapper<Status>;
  Store: ResolverTypeWrapper<Store>;
  StoreInput: StoreInput;
  StoresCatalog: ResolverTypeWrapper<StoresCatalog>;
  StoresRowsCount: ResolverTypeWrapper<StoresRowsCount>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Submodule: ResolverTypeWrapper<Submodule>;
  Timeline: ResolverTypeWrapper<Timeline>;
  Type: ResolverTypeWrapper<Type>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserAppRowsCount: ResolverTypeWrapper<UserAppRowsCount>;
  UserDetails: ResolverTypeWrapper<UserDetails>;
  UserRowsCount: ResolverTypeWrapper<UserRowsCount>;
  UserType: ResolverTypeWrapper<UserType>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  addressInput: AddressInput;
  addressesCatalog: ResolverTypeWrapper<AddressesCatalog>;
  box: ResolverTypeWrapper<Box>;
  boxInput: BoxInput;
  boxes: ResolverTypeWrapper<Boxes>;
  citiesCatalog: ResolverTypeWrapper<CitiesCatalog>;
  citiesCatalogSepomex: ResolverTypeWrapper<CitiesCatalogSepomex>;
  coloniesCatalog: ResolverTypeWrapper<ColoniesCatalog>;
  coloniesCatalogSepomex: ResolverTypeWrapper<ColoniesCatalogSepomex>;
  companies: ResolverTypeWrapper<Companies>;
  configSys: ResolverTypeWrapper<ConfigSys>;
  contactInput: ContactInput;
  contactsCatalog: ResolverTypeWrapper<ContactsCatalog>;
  counters: ResolverTypeWrapper<Counters>;
  countriesCatalog: ResolverTypeWrapper<CountriesCatalog>;
  countriesCatalogSepomex: ResolverTypeWrapper<CountriesCatalogSepomex>;
  getColoniesCollection: ResolverTypeWrapper<GetColoniesCollection>;
  getFullAddressCatalog: ResolverTypeWrapper<GetFullAddressCatalog>;
  internalNote: InternalNote;
  issusses: ResolverTypeWrapper<Issusses>;
  moduleInfo: ResolverTypeWrapper<ModuleInfo>;
  moduleInput: ModuleInput;
  municipalitiesCatalog: ResolverTypeWrapper<MunicipalitiesCatalog>;
  municipalitiesCatalogSepomex: ResolverTypeWrapper<MunicipalitiesCatalogSepomex>;
  passwordRecoveryInput: PasswordRecoveryInput;
  passwordUpdateInput: PasswordUpdateInput;
  platformCatalog: ResolverTypeWrapper<PlatformCatalog>;
  providerData: ProviderData;
  quoteData: QuoteData;
  quotesData: ResolverTypeWrapper<QuotesData>;
  reasonData: ReasonData;
  reasonsData: ResolverTypeWrapper<ReasonsData>;
  returnRole: ResolverTypeWrapper<ReturnRole>;
  returnStore: ResolverTypeWrapper<ReturnStore>;
  statesCatalog: ResolverTypeWrapper<StatesCatalog>;
  statesCatalogSepomex: ResolverTypeWrapper<StatesCatalogSepomex>;
  statusDetails: ResolverTypeWrapper<StatusDetails>;
  submoduleInfo: ResolverTypeWrapper<SubmoduleInfo>;
  submoduleInput: SubmoduleInput;
  sulogDoc: ResolverTypeWrapper<SulogDoc>;
  tokenDecrypted: ResolverTypeWrapper<TokenDecrypted>;
  tokenDecryptedApp: ResolverTypeWrapper<TokenDecryptedApp>;
  typeAvatar: ResolverTypeWrapper<TypeAvatar>;
  typeFile: ResolverTypeWrapper<TypeFile>;
  userAuth: ResolverTypeWrapper<UserAuth>;
  userContactInput: UserContactInput;
  userContacts: ResolverTypeWrapper<UserContacts>;
  userData: ResolverTypeWrapper<UserData>;
  userLoginInput: UserLoginInput;
  userModule: ResolverTypeWrapper<UserModule>;
  userModuleInput: UserModuleInput;
  userRegisterInput: UserRegisterInput;
  woocommerceOrder: ResolverTypeWrapper<WoocommerceOrder>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppOrderWarehouse: AppOrderWarehouse;
  AppUser: AppUser;
  AppUserInput: AppUserInput;
  AppUserUpdateInput: AppUserUpdateInput;
  Boolean: Scalars['Boolean'];
  BusinessPartner: BusinessPartner;
  DocumentsStatuses: DocumentsStatuses;
  FileUpload: FileUpload;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InternalNotes: InternalNotes;
  IssusesDetails: IssusesDetails;
  Method: Method;
  Module: Module;
  ModuleRowsCount: ModuleRowsCount;
  MultiOrderDetails: MultiOrderDetails;
  Mutation: {};
  OpenOrders: OpenOrders;
  Order: Order;
  OrderDetails: OrderDetails;
  OrderRowsCount: OrderRowsCount;
  Payment: Payment;
  Platform: Platform;
  Product: Product;
  ProductInput: ProductInput;
  ProductsOrderWarehouse: ProductsOrderWarehouse;
  Provider: Provider;
  ProviderResult: ProviderResult;
  Query: {};
  Reason: Reason;
  Recovery: Recovery;
  RoleInput: RoleInput;
  RoleRowsCount: RoleRowsCount;
  RolesCatalog: RolesCatalog;
  Shipping: Shipping;
  Status: Status;
  Store: Store;
  StoreInput: StoreInput;
  StoresCatalog: StoresCatalog;
  StoresRowsCount: StoresRowsCount;
  String: Scalars['String'];
  Submodule: Submodule;
  Timeline: Timeline;
  Type: Type;
  Upload: Scalars['Upload'];
  User: User;
  UserAppRowsCount: UserAppRowsCount;
  UserDetails: UserDetails;
  UserRowsCount: UserRowsCount;
  UserType: UserType;
  Warehouse: Warehouse;
  addressInput: AddressInput;
  addressesCatalog: AddressesCatalog;
  box: Box;
  boxInput: BoxInput;
  boxes: Boxes;
  citiesCatalog: CitiesCatalog;
  citiesCatalogSepomex: CitiesCatalogSepomex;
  coloniesCatalog: ColoniesCatalog;
  coloniesCatalogSepomex: ColoniesCatalogSepomex;
  companies: Companies;
  configSys: ConfigSys;
  contactInput: ContactInput;
  contactsCatalog: ContactsCatalog;
  counters: Counters;
  countriesCatalog: CountriesCatalog;
  countriesCatalogSepomex: CountriesCatalogSepomex;
  getColoniesCollection: GetColoniesCollection;
  getFullAddressCatalog: GetFullAddressCatalog;
  internalNote: InternalNote;
  issusses: Issusses;
  moduleInfo: ModuleInfo;
  moduleInput: ModuleInput;
  municipalitiesCatalog: MunicipalitiesCatalog;
  municipalitiesCatalogSepomex: MunicipalitiesCatalogSepomex;
  passwordRecoveryInput: PasswordRecoveryInput;
  passwordUpdateInput: PasswordUpdateInput;
  platformCatalog: PlatformCatalog;
  providerData: ProviderData;
  quoteData: QuoteData;
  quotesData: QuotesData;
  reasonData: ReasonData;
  reasonsData: ReasonsData;
  returnRole: ReturnRole;
  returnStore: ReturnStore;
  statesCatalog: StatesCatalog;
  statesCatalogSepomex: StatesCatalogSepomex;
  statusDetails: StatusDetails;
  submoduleInfo: SubmoduleInfo;
  submoduleInput: SubmoduleInput;
  sulogDoc: SulogDoc;
  tokenDecrypted: TokenDecrypted;
  tokenDecryptedApp: TokenDecryptedApp;
  typeAvatar: TypeAvatar;
  typeFile: TypeFile;
  userAuth: UserAuth;
  userContactInput: UserContactInput;
  userContacts: UserContacts;
  userData: UserData;
  userLoginInput: UserLoginInput;
  userModule: UserModule;
  userModuleInput: UserModuleInput;
  userRegisterInput: UserRegisterInput;
  woocommerceOrder: WoocommerceOrder;
};

export type AppOrderWarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppOrderWarehouse'] = ResolversParentTypes['AppOrderWarehouse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  packing_user_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  part?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  picking_user_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rack_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_parts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppUser'] = ResolversParentTypes['AppUser']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<Maybe<ResolversTypes['UserType']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessPartnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessPartner'] = ResolversParentTypes['BusinessPartner']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mailAdress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentsStatusesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentsStatuses'] = ResolversParentTypes['DocumentsStatuses']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileUploadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileUpload'] = ResolversParentTypes['FileUpload']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalNotesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalNotes'] = ResolversParentTypes['InternalNotes']> = {
  fileInternal?: Resolver<Maybe<ResolversTypes['typeFile']>, ParentType, ContextType>;
  file_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDetails']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssusesDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssusesDetails'] = ResolversParentTypes['IssusesDetails']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Method'] = ResolversParentTypes['Method']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Module'] = ResolversParentTypes['Module']> = {
  front_label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relative_link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submodules?: Resolver<Maybe<Array<Maybe<ResolversTypes['Submodule']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModuleRowsCount'] = ResolversParentTypes['ModuleRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Array<ResolversTypes['Module']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MultiOrderDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MultiOrderDetails'] = ResolversParentTypes['MultiOrderDetails']> = {
  details?: Resolver<Maybe<Array<Maybe<ResolversTypes['AppOrderWarehouse']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductsOrderWarehouse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authAppUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationAuthAppUserArgs, 'password' | 'username'>>;
  authUser?: Resolver<ResolversTypes['userAuth'], ParentType, ContextType, RequireFields<MutationAuthUserArgs, 'input'>>;
  avatarUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAvatarUpdateArgs, 'avatar' | 'id_user'>>;
  changeMultipleOrdersToClose?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeMultipleOrdersToCloseArgs, 'ids'>>;
  changeOrderToClose?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeOrderToCloseArgs, 'id'>>;
  changeToBilling?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToBillingArgs, 'order_id' | 'shipping_compay_id'>>;
  changeToCollect?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToCollectArgs, 'order_id'>>;
  changeToInRoute?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToInRouteArgs, 'order_id'>>;
  changeToPacking?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToPackingArgs, 'order_id' | 'rack_code'>>;
  changeToPicking?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToPickingArgs, 'order_id'>>;
  changeToProcess?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToProcessArgs, 'order_id' | 'store_id'>>;
  changeToRejected?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToRejectedArgs, 'id_reason' | 'order_id'>>;
  changeToReturned?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToReturnedArgs, 'order_id'>>;
  changeToShipped?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToShippedArgs, 'order_id'>>;
  changeToSupply?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationChangeToSupplyArgs, 'order_id'>>;
  checkTokenRecovery?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCheckTokenRecoveryArgs, 'token'>>;
  createAppUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateAppUserArgs, 'input'>>;
  createInternalNote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateInternalNoteArgs, 'inputInternalNote'>>;
  createModule?: Resolver<ResolversTypes['Module'], ParentType, ContextType, RequireFields<MutationCreateModuleArgs, 'moduleInput' | 'submoduleInput'>>;
  createOrderWarehouseBoxes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateOrderWarehouseBoxesArgs, 'boxes' | 'orderId'>>;
  createPlatform?: Resolver<Maybe<ResolversTypes['platformCatalog']>, ParentType, ContextType, RequireFields<MutationCreatePlatformArgs, 'name'>>;
  createQuote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateQuoteArgs, 'inputQuote'>>;
  createReason?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateReasonArgs, 'inputReason'>>;
  createRecoveryToken?: Resolver<ResolversTypes['Recovery'], ParentType, ContextType, RequireFields<MutationCreateRecoveryTokenArgs, 'userName'>>;
  createRole?: Resolver<ResolversTypes['returnRole'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'input'>>;
  createSulogDoc?: Resolver<Array<Maybe<ResolversTypes['sulogDoc']>>, ParentType, ContextType, RequireFields<MutationCreateSulogDocArgs, 'ordersId'>>;
  createUserPermission?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateUserPermissionArgs, 'modules' | 'userID'>>;
  decryptToken?: Resolver<ResolversTypes['tokenDecrypted'], ParentType, ContextType, RequireFields<MutationDecryptTokenArgs, 'token'>>;
  decryptTokenApp?: Resolver<ResolversTypes['tokenDecryptedApp'], ParentType, ContextType, RequireFields<MutationDecryptTokenAppArgs, 'token'>>;
  deleteAppUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAppUserArgs, 'id'>>;
  deleteModule?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteModuleArgs, 'id'>>;
  deleteRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, 'id' | 'userId'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id' | 'userId'>>;
  getAllModulesExport?: Resolver<Maybe<Array<Maybe<ResolversTypes['Module']>>>, ParentType, ContextType>;
  getAllPendingExport?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  getAllRolesExport?: Resolver<Maybe<Array<Maybe<ResolversTypes['RolesCatalog']>>>, ParentType, ContextType>;
  getAllUserPermissions?: Resolver<Array<ResolversTypes['userModule']>, ParentType, ContextType, RequireFields<MutationGetAllUserPermissionsArgs, 'userID'>>;
  getAllUsersExport?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getFullAddressByZipcode?: Resolver<ResolversTypes['getFullAddressCatalog'], ParentType, ContextType, RequireFields<MutationGetFullAddressByZipcodeArgs, 'zipCode'>>;
  getInfoProvider?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGetInfoProviderArgs, 'inputProvider'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationGetUserArgs, 'userID'>>;
  isOrderOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationIsOrderOpenArgs, 'id'>>;
  passwordUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPasswordUpdateArgs, 'currentPassword' | 'id_user' | 'password'>>;
  recoveryUserPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRecoveryUserPasswordArgs, 'inputRecovery'>>;
  registerUser?: Resolver<ResolversTypes['userData'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input' | 'inputAddress' | 'inputAvatar' | 'inputContact'>>;
  updateAppUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAppUserArgs, 'id' | 'input'>>;
  updateModule?: Resolver<ResolversTypes['Module'], ParentType, ContextType, RequireFields<MutationUpdateModuleArgs, 'moduleId' | 'moduleInput' | 'submoduleInput' | 'submodulesIdsTodelete'>>;
  updateRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'input' | 'roleId'>>;
  updateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'addressId' | 'input' | 'inputAddress' | 'inputContact' | 'userID'>>;
  updateUserPermission?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserPermissionArgs, 'modules' | 'userID'>>;
  uploadFile?: Resolver<ResolversTypes['FileUpload'], ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'file'>>;
  uploadImage?: Resolver<ResolversTypes['FileUpload'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>;
  uploadMultipleFile?: Resolver<Array<Maybe<ResolversTypes['FileUpload']>>, ParentType, ContextType, RequireFields<MutationUploadMultipleFileArgs, 'file'>>;
  uploadMultipleImage?: Resolver<Array<Maybe<ResolversTypes['FileUpload']>>, ParentType, ContextType, RequireFields<MutationUploadMultipleImageArgs, 'file'>>;
  validateProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationValidateProductArgs, 'orderProductId' | 'productBarcode' | 'productSku'>>;
  validateProductPacking?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationValidateProductPackingArgs, 'orderProductId' | 'productBarcode' | 'productSku'>>;
  validateRack?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationValidateRackArgs, 'rackCode' | 'warehouseOrderId'>>;
};

export type OpenOrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenOrders'] = ResolversParentTypes['OpenOrders']> = {
  cardCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  docDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  docEntry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  docNum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  docStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  docTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numAtCard?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  objType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  innvoice_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['Method']>, ParentType, ContextType>;
  method_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType>;
  payment_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  platform?: Resolver<Maybe<ResolversTypes['Platform']>, ParentType, ContextType>;
  platform_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product_quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['Reason']>, ParentType, ContextType>;
  shipping?: Resolver<Maybe<ResolversTypes['Shipping']>, ParentType, ContextType>;
  shipping_compay_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipping_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shipping_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  status_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  store_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType>;
  type_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uber_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDetails']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouse_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderDetails'] = ResolversParentTypes['OrderDetails']> = {
  details?: Resolver<Maybe<ResolversTypes['AppOrderWarehouse']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductsOrderWarehouse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderRowsCount'] = ResolversParentTypes['OrderRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payment_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<ContextType = any, ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  variation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsOrderWarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsOrderWarehouse'] = ResolversParentTypes['ProductsOrderWarehouse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rack?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  variation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Provider'] = ResolversParentTypes['Provider']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['ProviderResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProviderResult'] = ResolversParentTypes['ProviderResult']> = {
  businessPartner?: Resolver<Maybe<ResolversTypes['BusinessPartner']>, ParentType, ContextType>;
  openOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['OpenOrders']>>>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  GetUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  Users?: Resolver<Maybe<ResolversTypes['UserRowsCount']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getAllAppOrderWarehouses?: Resolver<Maybe<Array<Maybe<ResolversTypes['AppOrderWarehouse']>>>, ParentType, ContextType>;
  getAllAppOrderWarehousesPacking?: Resolver<Maybe<Array<Maybe<ResolversTypes['AppOrderWarehouse']>>>, ParentType, ContextType>;
  getAllAppUsers?: Resolver<Maybe<ResolversTypes['UserAppRowsCount']>, ParentType, ContextType, RequireFields<QueryGetAllAppUsersArgs, never>>;
  getAllBoxes?: Resolver<Array<Maybe<ResolversTypes['boxes']>>, ParentType, ContextType>;
  getAllCounters?: Resolver<ResolversTypes['counters'], ParentType, ContextType>;
  getAllIssusses?: Resolver<Array<Maybe<ResolversTypes['issusses']>>, ParentType, ContextType>;
  getAllModules?: Resolver<Maybe<ResolversTypes['ModuleRowsCount']>, ParentType, ContextType, RequireFields<QueryGetAllModulesArgs, never>>;
  getAllOrders?: Resolver<Array<ResolversTypes['woocommerceOrder']>, ParentType, ContextType>;
  getAllRoles?: Resolver<Maybe<ResolversTypes['RoleRowsCount']>, ParentType, ContextType, RequireFields<QueryGetAllRolesArgs, never>>;
  getAllShippingCompanies?: Resolver<Array<Maybe<ResolversTypes['companies']>>, ParentType, ContextType>;
  getAllStatusesOrders?: Resolver<Array<ResolversTypes['Status']>, ParentType, ContextType>;
  getAllStores?: Resolver<Maybe<ResolversTypes['StoresRowsCount']>, ParentType, ContextType, RequireFields<QueryGetAllStoresArgs, never>>;
  getAllSulogDocs?: Resolver<Array<Maybe<ResolversTypes['sulogDoc']>>, ParentType, ContextType>;
  getAppOderWarehouseByMultiIds?: Resolver<Maybe<ResolversTypes['MultiOrderDetails']>, ParentType, ContextType, RequireFields<QueryGetAppOderWarehouseByMultiIdsArgs, 'ids'>>;
  getAppOrderWarehouseById?: Resolver<Maybe<ResolversTypes['OrderDetails']>, ParentType, ContextType, RequireFields<QueryGetAppOrderWarehouseByIdArgs, 'id'>>;
  getAppUser?: Resolver<Maybe<ResolversTypes['AppUser']>, ParentType, ContextType, RequireFields<QueryGetAppUserArgs, 'id'>>;
  getAppWarehouseOrderBoxes?: Resolver<Maybe<Array<Maybe<ResolversTypes['box']>>>, ParentType, ContextType, RequireFields<QueryGetAppWarehouseOrderBoxesArgs, 'id'>>;
  getBillingOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetBillingOrdersArgs, never>>;
  getCollectOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetCollectOrdersArgs, never>>;
  getConfigSys?: Resolver<ResolversTypes['configSys'], ParentType, ContextType>;
  getDocumentsStatuses?: Resolver<Array<ResolversTypes['DocumentsStatuses']>, ParentType, ContextType>;
  getInProcessOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetInProcessOrdersArgs, never>>;
  getInRouteOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetInRouteOrdersArgs, never>>;
  getInternalNotes?: Resolver<Array<ResolversTypes['InternalNotes']>, ParentType, ContextType, RequireFields<QueryGetInternalNotesArgs, 'orderId'>>;
  getLocalOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetLocalOrdersArgs, never>>;
  getNationalOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetNationalOrdersArgs, never>>;
  getOneModule?: Resolver<ResolversTypes['Module'], ParentType, ContextType, RequireFields<QueryGetOneModuleArgs, 'id'>>;
  getOneOrder?: Resolver<ResolversTypes['woocommerceOrder'], ParentType, ContextType, RequireFields<QueryGetOneOrderArgs, 'id'>>;
  getOneRole?: Resolver<Maybe<ResolversTypes['RolesCatalog']>, ParentType, ContextType, RequireFields<QueryGetOneRoleArgs, 'id'>>;
  getOneStore?: Resolver<Maybe<ResolversTypes['StoresCatalog']>, ParentType, ContextType, RequireFields<QueryGetOneStoreArgs, 'id'>>;
  getOneSulogDoc?: Resolver<Maybe<ResolversTypes['sulogDoc']>, ParentType, ContextType, RequireFields<QueryGetOneSulogDocArgs, 'id'>>;
  getOrderById?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'id'>>;
  getPackingOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetPackingOrdersArgs, never>>;
  getPendingOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetPendingOrdersArgs, never>>;
  getPickingOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetPickingOrdersArgs, never>>;
  getQuotes?: Resolver<Array<ResolversTypes['quotesData']>, ParentType, ContextType>;
  getReason?: Resolver<Array<ResolversTypes['reasonsData']>, ParentType, ContextType, RequireFields<QueryGetReasonArgs, 'orderId'>>;
  getRejectedOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetRejectedOrdersArgs, never>>;
  getShippedOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetShippedOrdersArgs, never>>;
  getTimeline?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<QueryGetTimelineArgs, 'id'>>;
  getToStockOrders?: Resolver<Maybe<ResolversTypes['OrderRowsCount']>, ParentType, ContextType, RequireFields<QueryGetToStockOrdersArgs, never>>;
};

export type ReasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reason'] = ResolversParentTypes['Reason']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  is_active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  issusesDetails?: Resolver<Maybe<ResolversTypes['IssusesDetails']>, ParentType, ContextType>;
  issusse_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userDetails?: Resolver<Maybe<ResolversTypes['UserDetails']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecoveryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recovery'] = ResolversParentTypes['Recovery']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token_recovery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoleRowsCount'] = ResolversParentTypes['RoleRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['RolesCatalog']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolesCatalog'] = ResolversParentTypes['RolesCatalog']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_user_delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_register?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_update?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  role_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shipping'] = ResolversParentTypes['Shipping']> = {
  address_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uber_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoresCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoresCatalog'] = ResolversParentTypes['StoresCatalog']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uber_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoresRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoresRowsCount'] = ResolversParentTypes['StoresRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['StoresCatalog']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmoduleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Submodule'] = ResolversParentTypes['Submodule']> = {
  front_label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  module_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relative_link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']> = {
  dateStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  status_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDetails']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Type'] = ResolversParentTypes['Type']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['addressesCatalog']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['typeAvatar']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['userContacts']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_address?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_avatar_file?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_store?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_register?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_update?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAppRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAppRowsCount'] = ResolversParentTypes['UserAppRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['AppUser']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDetails'] = ResolversParentTypes['UserDetails']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRowsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRowsCount'] = ResolversParentTypes['UserRowsCount']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserType'] = ResolversParentTypes['UserType']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['addressesCatalog'] = ResolversParentTypes['addressesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['citiesCatalog']>, ParentType, ContextType>;
  colony?: Resolver<Maybe<ResolversTypes['coloniesCatalog']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['countriesCatalog']>, ParentType, ContextType>;
  external_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_city?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_colony?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_country?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_municipality?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_user_delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_register?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_update?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  internal_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  municipality?: Resolver<Maybe<ResolversTypes['municipalitiesCatalog']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['statesCatalog']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip_code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoxResolvers<ContextType = any, ParentType extends ResolversParentTypes['box'] = ResolversParentTypes['box']> = {
  box_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoxesResolvers<ContextType = any, ParentType extends ResolversParentTypes['boxes'] = ResolversParentTypes['boxes']> = {
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  large?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CitiesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['citiesCatalog'] = ResolversParentTypes['citiesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CitiesCatalogSepomexResolvers<ContextType = any, ParentType extends ResolversParentTypes['citiesCatalogSepomex'] = ResolversParentTypes['citiesCatalogSepomex']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColoniesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['coloniesCatalog'] = ResolversParentTypes['coloniesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_municipality?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip_code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColoniesCatalogSepomexResolvers<ContextType = any, ParentType extends ResolversParentTypes['coloniesCatalogSepomex'] = ResolversParentTypes['coloniesCatalogSepomex']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_municipality?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip_code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompaniesResolvers<ContextType = any, ParentType extends ResolversParentTypes['companies'] = ResolversParentTypes['companies']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigSysResolvers<ContextType = any, ParentType extends ResolversParentTypes['configSys'] = ResolversParentTypes['configSys']> = {
  project_favicon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_mini_logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactsCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['contactsCatalog'] = ResolversParentTypes['contactsCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ext?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_user_delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_register?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_update?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mobile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  second_lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountersResolvers<ContextType = any, ParentType extends ResolversParentTypes['counters'] = ResolversParentTypes['counters']> = {
  billing?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collect?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  localShipping?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nationalShipping?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pendings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  processing?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rejected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  route?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toSupply?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountriesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['countriesCatalog'] = ResolversParentTypes['countriesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountriesCatalogSepomexResolvers<ContextType = any, ParentType extends ResolversParentTypes['countriesCatalogSepomex'] = ResolversParentTypes['countriesCatalogSepomex']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetColoniesCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['getColoniesCollection'] = ResolversParentTypes['getColoniesCollection']> = {
  colony_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id_colony?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFullAddressCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['getFullAddressCatalog'] = ResolversParentTypes['getFullAddressCatalog']> = {
  city_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colonies?: Resolver<Array<ResolversTypes['getColoniesCollection']>, ParentType, ContextType>;
  country_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id_city?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_country?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_municipality?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  municipality_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssussesResolvers<ContextType = any, ParentType extends ResolversParentTypes['issusses'] = ResolversParentTypes['issusses']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['moduleInfo'] = ResolversParentTypes['moduleInfo']> = {
  front_label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relative_link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MunicipalitiesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['municipalitiesCatalog'] = ResolversParentTypes['municipalitiesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_city?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MunicipalitiesCatalogSepomexResolvers<ContextType = any, ParentType extends ResolversParentTypes['municipalitiesCatalogSepomex'] = ResolversParentTypes['municipalitiesCatalogSepomex']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_city?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['platformCatalog'] = ResolversParentTypes['platformCatalog']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuotesDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['quotesData'] = ResolversParentTypes['quotesData']> = {
  cardCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cardName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  docDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  docStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  docTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  whsCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReasonsDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['reasonsData'] = ResolversParentTypes['reasonsData']> = {
  issusse_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userDetails?: Resolver<Maybe<ResolversTypes['UserDetails']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['returnRole'] = ResolversParentTypes['returnRole']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnStoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['returnStore'] = ResolversParentTypes['returnStore']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uber_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatesCatalogResolvers<ContextType = any, ParentType extends ResolversParentTypes['statesCatalog'] = ResolversParentTypes['statesCatalog']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_country?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatesCatalogSepomexResolvers<ContextType = any, ParentType extends ResolversParentTypes['statesCatalogSepomex'] = ResolversParentTypes['statesCatalogSepomex']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_country?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['statusDetails'] = ResolversParentTypes['statusDetails']> = {
  docNum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  objType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmoduleInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['submoduleInfo'] = ResolversParentTypes['submoduleInfo']> = {
  front_label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relative_link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SulogDocResolvers<ContextType = any, ParentType extends ResolversParentTypes['sulogDoc'] = ResolversParentTypes['sulogDoc']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['statusDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenDecryptedResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokenDecrypted'] = ResolversParentTypes['tokenDecrypted']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenDecryptedAppResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokenDecryptedApp'] = ResolversParentTypes['tokenDecryptedApp']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeAvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['typeAvatar'] = ResolversParentTypes['typeAvatar']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['typeFile'] = ResolversParentTypes['typeFile']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['userAuth'] = ResolversParentTypes['userAuth']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserContactsResolvers<ContextType = any, ParentType extends ResolversParentTypes['userContacts'] = ResolversParentTypes['userContacts']> = {
  contact_data?: Resolver<Maybe<ResolversTypes['contactsCatalog']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_contact?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_register?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_user_update?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  is_active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['userData'] = ResolversParentTypes['userData']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['userModule'] = ResolversParentTypes['userModule']> = {
  access_delete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  access_edit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  access_export?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  access_read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  access_retrieve?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_module?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_submodule?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  module_info?: Resolver<Maybe<ResolversTypes['moduleInfo']>, ParentType, ContextType>;
  submodule_info?: Resolver<Maybe<ResolversTypes['submoduleInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WoocommerceOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['woocommerceOrder'] = ResolversParentTypes['woocommerceOrder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AppOrderWarehouse?: AppOrderWarehouseResolvers<ContextType>;
  AppUser?: AppUserResolvers<ContextType>;
  BusinessPartner?: BusinessPartnerResolvers<ContextType>;
  DocumentsStatuses?: DocumentsStatusesResolvers<ContextType>;
  FileUpload?: FileUploadResolvers<ContextType>;
  InternalNotes?: InternalNotesResolvers<ContextType>;
  IssusesDetails?: IssusesDetailsResolvers<ContextType>;
  Method?: MethodResolvers<ContextType>;
  Module?: ModuleResolvers<ContextType>;
  ModuleRowsCount?: ModuleRowsCountResolvers<ContextType>;
  MultiOrderDetails?: MultiOrderDetailsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OpenOrders?: OpenOrdersResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderDetails?: OrderDetailsResolvers<ContextType>;
  OrderRowsCount?: OrderRowsCountResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductsOrderWarehouse?: ProductsOrderWarehouseResolvers<ContextType>;
  Provider?: ProviderResolvers<ContextType>;
  ProviderResult?: ProviderResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reason?: ReasonResolvers<ContextType>;
  Recovery?: RecoveryResolvers<ContextType>;
  RoleRowsCount?: RoleRowsCountResolvers<ContextType>;
  RolesCatalog?: RolesCatalogResolvers<ContextType>;
  Shipping?: ShippingResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  StoresCatalog?: StoresCatalogResolvers<ContextType>;
  StoresRowsCount?: StoresRowsCountResolvers<ContextType>;
  Submodule?: SubmoduleResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAppRowsCount?: UserAppRowsCountResolvers<ContextType>;
  UserDetails?: UserDetailsResolvers<ContextType>;
  UserRowsCount?: UserRowsCountResolvers<ContextType>;
  UserType?: UserTypeResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  addressesCatalog?: AddressesCatalogResolvers<ContextType>;
  box?: BoxResolvers<ContextType>;
  boxes?: BoxesResolvers<ContextType>;
  citiesCatalog?: CitiesCatalogResolvers<ContextType>;
  citiesCatalogSepomex?: CitiesCatalogSepomexResolvers<ContextType>;
  coloniesCatalog?: ColoniesCatalogResolvers<ContextType>;
  coloniesCatalogSepomex?: ColoniesCatalogSepomexResolvers<ContextType>;
  companies?: CompaniesResolvers<ContextType>;
  configSys?: ConfigSysResolvers<ContextType>;
  contactsCatalog?: ContactsCatalogResolvers<ContextType>;
  counters?: CountersResolvers<ContextType>;
  countriesCatalog?: CountriesCatalogResolvers<ContextType>;
  countriesCatalogSepomex?: CountriesCatalogSepomexResolvers<ContextType>;
  getColoniesCollection?: GetColoniesCollectionResolvers<ContextType>;
  getFullAddressCatalog?: GetFullAddressCatalogResolvers<ContextType>;
  issusses?: IssussesResolvers<ContextType>;
  moduleInfo?: ModuleInfoResolvers<ContextType>;
  municipalitiesCatalog?: MunicipalitiesCatalogResolvers<ContextType>;
  municipalitiesCatalogSepomex?: MunicipalitiesCatalogSepomexResolvers<ContextType>;
  platformCatalog?: PlatformCatalogResolvers<ContextType>;
  quotesData?: QuotesDataResolvers<ContextType>;
  reasonsData?: ReasonsDataResolvers<ContextType>;
  returnRole?: ReturnRoleResolvers<ContextType>;
  returnStore?: ReturnStoreResolvers<ContextType>;
  statesCatalog?: StatesCatalogResolvers<ContextType>;
  statesCatalogSepomex?: StatesCatalogSepomexResolvers<ContextType>;
  statusDetails?: StatusDetailsResolvers<ContextType>;
  submoduleInfo?: SubmoduleInfoResolvers<ContextType>;
  sulogDoc?: SulogDocResolvers<ContextType>;
  tokenDecrypted?: TokenDecryptedResolvers<ContextType>;
  tokenDecryptedApp?: TokenDecryptedAppResolvers<ContextType>;
  typeAvatar?: TypeAvatarResolvers<ContextType>;
  typeFile?: TypeFileResolvers<ContextType>;
  userAuth?: UserAuthResolvers<ContextType>;
  userContacts?: UserContactsResolvers<ContextType>;
  userData?: UserDataResolvers<ContextType>;
  userModule?: UserModuleResolvers<ContextType>;
  woocommerceOrder?: WoocommerceOrderResolvers<ContextType>;
};

