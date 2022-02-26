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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schemasMap_1 = __importDefault(require("./graphql/schemasMap"));
const connection_1 = __importDefault(require("./db/connection"));
const Path_1 = __importDefault(require("./Path"));
const graphql_upload_1 = require("graphql-upload");
const Auth_1 = __importDefault(require("./Auth"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const syncRoutes_1 = __importDefault(require("./restApi/router/syncRoutes"));
const stockRoutes_1 = __importDefault(require("./restApi/router/stockRoutes"));
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_1 = require("graphql");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection_1.default.sync({ alter: false });
    }
    catch (e) {
        console.log(e);
    }
    const PORT = 4000;
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema: schemasMap_1.default,
        plugins: [
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    subscriptionServer.close();
                                });
                            },
                        };
                    });
                },
            },
        ],
        context: (req) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = (0, Auth_1.default)(req);
            const path = (0, Path_1.default)(req);
            // if (
            //   !auth?.isAuth &&
            //   req.req.body.operationName !== 'authUser' &&
            //   req.req.body.operationName !== 'AuthAppUser' &&
            //   req.req.body.operationName !== 'DecryptTokenApp' &&
            //   req.req.body.operationName !== 'CreateRecoveryToken' &&
            //   req.req.body.operationName !== 'checkTokenRecovery' &&
            //   req.req.body.operationName !== 'RecoveryUserPassword' &&
            //   req.req.body.operationName !== 'GetAllCounters'
            // ) {
            //   throw new AuthenticationError('You must be logged in')
            // }
            // if (
            //   req.req.body.operationName !== 'authUser' &&
            //   req.req.body.operationName !== 'CreateRecoveryToken' &&
            //   req.req.body.operationName !== 'checkTokenRecovery' &&
            //   req.req.body.operationName !== 'RecoveryUserPassword' &&
            //   req.req.body.operationName !== 'decryptToken' &&
            //   req.req.body.operationName !== 'DecryptTokenApp' &&
            //   req.req.body.operationName !== 'getAllUserPermissions' &&
            //   req.req.body.operationName !== 'GetUserById' &&
            //   req.req.body.operationName !== 'AppConfig' &&
            //   req.req.body.operationName !== 'GetAllCounters' &&
            //   !auth.typeId &&
            //   auth.isAuth
            // ) {
            //   const { havePermissions, path: relativePath } =
            //     await validatePermissions({
            //       id_user: auth.userId,
            //       path,
            //     })
            //   if (!havePermissions) {
            //     throw new Error("You don't have permissions")
            //   }
            // }
            // if (!auth.typeId) {
            //   return { ...auth, path }
            // }
            // if (
            //   req.req.body.operationName === 'AuthAppUser' ||
            //   req.req.body.operationName === 'DecryptTokenApp' ||
            //   req.req.body.operationName === 'GetAllAppOrderWarehousesPacking' ||
            //   req.req.body.operationName === 'GetAppUserWarehouseOrdersPacking' ||
            //   req.req.body.operationName === 'ChangeOrderPackingToClose' ||
            //   req.req.body.operationName === 'GetAllBoxes' ||
            //   req.req.body.operationName === 'CreateOrderWarehouseBoxes' ||
            //   req.req.body.operationName === 'GetAppOrderWarehouseById' ||
            //   req.req.body.operationName === 'PackingOrderChanged' ||
            //   req.req.body.operationName === 'PackingOrderCompleted' ||
            //   req.req.body.operationName === 'ValidateProductPacking' ||
            //   req.req.body.operationName === 'ChangeOrderPackingToCompleted' ||
            //   req.req.body.operationName === 'GetPickingAppOrders' ||
            //   req.req.body.operationName === 'GetAllAppOrderWarehouses' ||
            //   req.req.body.operationName === 'GetAppOrderWarehouseById' ||
            //   req.req.body.operationName === 'GetAppOderWarehouseByMultiIds' ||
            //   req.req.body.operationName === 'IsOrderOpen' ||
            //   req.req.body.operationName === 'ChangeOrderToClose' ||
            //   req.req.body.operationName === 'ChangeMultipleOrdersToClose' ||
            //   req.req.body.operationName === 'ValidateProduct' ||
            //   req.req.body.operationName === 'ValidateRack' ||
            //   req.req.body.operationName === 'PickingOrderChanged' ||
            //   req.req.body.operationName === 'GetAppUserWarehouseOrders' ||
            //   req.req.body.operationName === 'PickingOrderCompleted'
            // ) {
            //   return auth
            // } else {
            //   throw new Error('You dont have right permissions')
            // }
            return Object.assign(Object.assign({}, auth), { path });
        }),
    });
    yield server.start();
    app.use((0, graphql_upload_1.graphqlUploadExpress)());
    server.applyMiddleware({ app, path: '/graphql' });
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use('/sync', syncRoutes_1.default);
    app.use('/stock', stockRoutes_1.default);
    const httpServer = http_1.default.createServer(app);
    const subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
        schema: schemasMap_1.default,
        execute: graphql_1.execute,
        subscribe: graphql_1.subscribe,
    }, {
        server: httpServer,
        path: '/graphql',
    });
    //   )
    // }
    httpServer.listen(PORT, () => {
        console.log('Graphql server runing on: ');
    });
}))();
