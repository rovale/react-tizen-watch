import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const options = (state = [], action) => {
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

const activeOptionId = (state = 'option1', action) => {
  switch (action.type) {
    case 'ACTIVATE_OPTION':
      return action.id;
    case 'LOAD_PAGES':
      return action.payload.pages[0].id;
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

export default reducer;
