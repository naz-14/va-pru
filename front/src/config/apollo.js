import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: 'http://127.0.0.1:4000/graphql', //LOCALHOST
  // uri: 'https://neosuite.vinosamerica.graphql.com', //PRODUCTIVO
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  const requestPath = window.location.pathname
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      requestPath,
    },
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({ addTypename: false }),
  link: authLink.concat(httpLink),
})

export default client
