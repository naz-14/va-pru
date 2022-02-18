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
;(async () => {
  try {
    sequelize.sync({ alter: true })
  } catch (e) {
    console.log(e)
  }

  const PORT = process.env.PORT || 4000
  const PORT_SSL = 443
  const app = express()
  const server = new ApolloServer({
    schema,
    context: async (req) => {
      const auth = Auth(req)
      const path = pathRequest(req)
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
      return { ...auth, path }
    },
  })
  await server.start()

  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app, path: '/graphql' })
  app.use('/files', express.static('./public/files'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use('/sync', syncRoutes)
  app.use('/stock', stockRoutes)
  const httpServer = http.createServer(app)
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  })

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
})()
