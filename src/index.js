import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import communicator from './middleware/communicator';
import * as action from './actions/creators';

import App from './components/App';

import './common/tau/wearable/theme/default/tau.css';
import './common/tau/wearable/theme/default/tau.circle.css';

// Array.prototype.find / findIndex does not exist on Tizen 2.3.2.
require('es6-shim');

// eslint-disable-next-line no-underscore-dangle
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
const enhancer = compose(applyMiddleware(communicator));

const store = createStore(reducer, enhancer);

window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.log(error);
  store.dispatch(action.handleError(msg, url, lineNo, columnNo, error));
  return false;
};

store.dispatch(action.initializeApp());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
