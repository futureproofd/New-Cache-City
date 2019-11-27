/* eslint-disable no-multi-spaces */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/Routes';
import reducers from '../reducers';
import Layout from '../components/Layout';

// redux chrome debug tools compose, else compose with redux
const composeEnhancers =  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const store = createStore(reducers, window.INITIAL_STATE, enhancer);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <div>{renderRoutes(Routes)}</div>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
