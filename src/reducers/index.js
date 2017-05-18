import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as actionType from '../actions/types';

const pages = (state = [], action) => {
  switch (action.type) {
    case actionType.LOAD_PAGES:
      return action.payload.pages.map(page => ({
        id: page.id,
        title: page.name,
        devices: page.devices.map(device => device.deviceId),
      }));
    default:
      return state;
  }
};

const ui = (state = { activePageId: null }, action) => {
  switch (action.type) {
    case actionType.ACTIVATE_PAGE:
    case actionType.SELECT_PAGE:
      return { ...state, activePageId: action.payload.id };
    case actionType.LOAD_PAGES:
      return { ...state, activePageId: action.payload.pages[0].id };
    default:
      return state;
  }
};

const reducer = combineReducers({
  pages,
  ui,
  router: routerReducer,
});

export default reducer;
