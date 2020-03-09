import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './components/App/App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://playlistsound.herokuapp.com/graphql',
  cache,
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError}) => {
    if (networkError) {
      console.log('Network error', networkError);
      if (networkError.statusCode === 401) {
        localStorage.setItem('token', null);
      }
    }
  }
});

ReactDOM.render(
<ApolloProvider client={client}>
  <App />
  </ApolloProvider>
  , document.getElementById('root'));
