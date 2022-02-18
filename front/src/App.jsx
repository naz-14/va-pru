import React, { useReducer } from 'react'
import { ApolloProvider } from '@apollo/client'
import { AuthContext } from './Auth/AuthContext'
import { authReducer } from './Auth/AuthReducer'
import { AppRouter } from './Routers/AppRouter'
import client from './config/apollo'
import * as dotenv from 'dotenv'
dotenv.config()

function App() {
  const [user, dispatch] = useReducer(authReducer, {})
  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
