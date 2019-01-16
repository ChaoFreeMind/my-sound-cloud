import 'isomorphic-fetch';
import 'normalize.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import configureStore from '@soundnode-redux/client/src/app/store/configureStore';
import App from '@soundnode-redux/client/src/app/layout/App';
import theme from '@soundnode-redux/client/src/app/css/theme';

const client = new ApolloClient({ uri: 'http://localhost:4444/graphql' });

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);