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

const ui = (state = { mainRoute: null, activePageId: null, selectedPageId: null }, action) => {
  switch (action.type) {
    case actionType.INITIALIZE_APP:
      return { ...state, mainRoute: 'splash' };
    case actionType.LOAD_PAGES:
      return { ...state, mainRoute: 'pages', activePageId: action.payload.pages[0].id };
    case actionType.ACTIVATE_PAGE:
      return { ...state, activePageId: action.payload.id };
    case actionType.SELECT_PAGE:
      return { ...state, activePageId: action.payload.id, selectedPageId: action.payload.id };
    case actionType.CLOSE_PAGE:
      return { ...state, selectedPageId: null };
    default:
      return state;
  }
};

const reducer = combineReducers({
  pages,
  ui,
});

export default reducer;
