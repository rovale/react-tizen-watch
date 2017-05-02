import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

// import reducers from './reducers';

import App from './App';

import './tau/wearable/theme/default/tau.css';
import './tau/wearable/theme/default/tau.circle.css';

const history = createHistory();

const middleware = routerMiddleware(history);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    // ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(middleware)),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
