import React from 'react';
import { ApolloClient, split, InMemoryCache , createHttpLink, ApolloProvider} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from "@apollo/client/link/context";

import App from './App';

const httpLink = createHttpLink({
    uri: 'https://fast-castle-09114.herokuapp.com/',
    options:{
        reconnect: true
    }
    //  'https://fast-castle-09114.herokuapp.com/'
})

const wsLink = new WebSocketLink({
    uri:  'ws://fast-castle-09114.herokuapp.com/graphql',
    // 'ws://localhost:5000/graphql',
    options: {
      reconnect: true
    }
  });
  

const setAuthorizationLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: setAuthorizationLink.concat(splitLink),
});

const Provider = () => {   
    return(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
    )
}
  
export default Provider;