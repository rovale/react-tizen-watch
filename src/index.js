import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import reducer from './reducers';
import communicator from './middleware/communicator';
import navigator from './middleware/navigator';
import * as action from './actions/creators';

import App from './components/App';

import './common/tau/wearable/theme/default/tau.css';
import './common/tau/wearable/theme/default/tau.circle.css';

// eslint-disable-next-line no-underscore-dangle
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
const history = createMemoryHistory();
const enhancer = compose(applyMiddleware(
  routerMiddleware(history),
  navigator,
  communicator,
));

const store = createStore(reducer, enhancer);
store.dispatch(action.initializeApp());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
