import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import schema from './graphql/schemasMap'
import sequelize from './db/connection'
import pathRequest from './Path'
import { graphqlUploadExpress } from 'graphql-upload'
import Auth from './Auth'
import validatePermissions from './helpers/permissions'
import fs from 'fs'
import https from 'https'
import http from 'http'
import bodyParser from 'body-parser'
import syncRoutes from './restApi/router/syncRoutes'
import stockRoutes from './restApi/router/stockRoutes'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

;(async () => {
  try {
    sequelize.sync({ alter: true })
  } catch (e) {
    console.log(e)
  }
  const PORT = 4000
  const app = express()
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
    context: async (req) => {
      const auth = Auth(req)
      const path = pathRequest(req)
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
      return { ...auth, path }
    },
  })
  await server.start()
  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app, path: '/graphql' })
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use('/sync', syncRoutes)
  app.use('/stock', stockRoutes)
  const httpServer = http.createServer(app)
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  )
  //   )
  // }
  httpServer.listen(PORT, () => {
    console.log('Graphql server runing on: ')
  })
})()
