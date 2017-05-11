import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const pages = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PAGES':
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
    case 'ACTIVATE_PAGE':
      return { ...state, activePageId: action.id };
    case 'LOAD_PAGES':
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
