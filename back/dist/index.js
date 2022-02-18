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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection_1.default.sync({ alter: true });
    }
    catch (e) {
        console.log(e);
    }
    const PORT = process.env.PORT || 4000;
    const PORT_SSL = 443;
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema: schemasMap_1.default,
        context: (req) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = (0, Auth_1.default)(req);
            const path = (0, Path_1.default)(req);
            // if (
            //   !auth?.isAuth &&
            //   req.req.body.operationName !== 'authUser' &&
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
            //   req.req.body.operationName !== 'getAllUserPermissions' &&
            //   req.req.body.operationName !== 'GetUserById' &&
            //   req.req.body.operationName !== 'AppConfig' &&
            //   req.req.body.operationName !== 'GetAllCounters'
            //   !auth.typeID
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
            //   req.req.body.operationName === 'authAppUser' ||
            //   req.req.body.operationName === 'getPickingAppOrders'
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
    app.use('/files', express_1.default.static('./public/files'));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use('/sync', syncRoutes_1.default);
    app.use('/stock', stockRoutes_1.default);
    const httpServer = http_1.default.createServer(app);
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
    // const configurations = {
    //   production: {
    //     ssl: true,
    //     port: PORT_SSL,
    //     hostname: 'localhost',
    //   },
    //   development: { ssl: false, port: PORT, hostname: 'localhost' },
    // }
    // const config = configurations['development']
    // Create the HTTPS or HTTP server, per configuration
    // if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    // const httpServer = https.createServer(
    //   {
    //     key: fs.readFileSync(`./ssl/ssl.key`),
    //     cert: fs.readFileSync(`./ssl/ssl.crt`),
    //   },
    //   app
    // )
    // await new Promise<void>((resolve) =>
    //   httpServer.listen({ port: config.port }, resolve)
    // )
    //   const httpServer = http.createServer(app)
    //   await new Promise<void>((resolve) =>
    //     httpServer.listen({ port: config.port }, resolve)
    //   )
    // }
    // console.log(
    //   'Graphql server runing on: ',
    //   `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
    //     server.graphqlPath
    //   }`
    // )
}))();
