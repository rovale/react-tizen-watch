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
import './common/font-awesome-4.7.0/css/font-awesome.css';

// eslint-disable-next-line no-underscore-dangle
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
const enhancer = compose(applyMiddleware(
  communicator,
));

const store = createStore(reducer, enhancer);
store.dispatch(action.initializeApp());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
