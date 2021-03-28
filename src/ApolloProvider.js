import React from 'react';
import { ApolloClient, InMemoryCache , createHttpLink, ApolloProvider} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import App from './App';

const httpLink = createHttpLink({
    uri: 'https://fast-castle-09114.herokuapp.com/'
})

const setAuthorizationLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: setAuthorizationLink.concat(httpLink),
});

const Provider = () => {   
    return(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
    )
}
  
export default Provider;