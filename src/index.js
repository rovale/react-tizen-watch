import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose as reduxCompose } from 'redux';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import App from './App';

import './tau/wearable/theme/default/tau.css';
import './tau/wearable/theme/default/tau.circle.css';

const options = () => [
  { id: 'option1', title: 'Option 1' },
  { id: 'option2', title: 'Option 2' },
  { id: 'option3', title: 'Option 3' },
  { id: 'option4', title: 'Option 4' },
  { id: 'option5', title: 'Option 5' },
  { id: 'option6', title: 'Option 6' },
  { id: 'option7', title: 'Option 7' },
  { id: 'option8', title: 'Option 8' },
  { id: 'option9', title: 'Option 9' },
  { id: 'option10', title: 'Option 10' },
  { id: 'option11', title: 'Option 11' },
  { id: 'option12', title: 'Option 12' },
  { id: 'option13', title: 'Option 13' },
  { id: 'option14', title: 'Option 14' },
];

const activeOptionId = (state = 'option1', action) => {
  switch (action.type) {
    case 'ACTIVATE_OPTION':
      return action.id;
    default:
      return state;
  }
};

const list = (state = {}, action) => ({
  ...state,
  options: options(state.options, action),
  activeOptionId: activeOptionId(state.activeOptionId, action),
});

const reducer = combineReducers({
  list,
  router: routerReducer,
});

// eslint-disable-next-line no-underscore-dangle
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
const history = createMemoryHistory();
const enhancer = compose(applyMiddleware(routerMiddleware(history)));

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
