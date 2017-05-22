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

const device = (state = {}, action) => {
  switch (action.type) {
    case actionType.CHANGE_DEVICE_ATTRIBUTE:
      if (action.payload.event.deviceId === state.id) {
        console.log(`Device ${state.id} changed.`);
        const newState = { ...state };
        newState[action.payload.event.attributeName] = action.payload.event.value;
        return newState;
      }

      return state;
    default:
      return state;
  }
};

const devices = (state = [], action) => {
  switch (action.type) {
    case actionType.LOAD_DEVICES:
      return action.payload.devices.map(d => ({
        id: d.id,
        title: d.name,
        template: d.template,
        state: (d.template === 'switch') ? d.attributes[0].value : null,
      }));
    case actionType.CHANGE_DEVICE_ATTRIBUTE:
      return state.map(d => device(d, action));
    default:
      return state;
  }
};

const groups = (state = [], action) => {
  switch (action.type) {
    case actionType.LOAD_GROUPS:
      return action.payload.groups.map(group => ({
        id: group.id,
        title: group.name,
        devices: group.devices.map(device => device.deviceId),
      }));
    default:
      return state;
  }
};

const initialUiState = {
  mainRoute: null,
  activePageId: null,
  selectedPageId: null,
  activeDeviceId: null,
  selectedDeviceId: null,
};

const ui = (state = initialUiState, action) => {
  switch (action.type) {
    case actionType.INITIALIZE_APP:
      return { ...state, mainRoute: 'splash' };
    case actionType.LOAD_PAGES:
      return { ...state, mainRoute: 'pages' };

    case actionType.ACTIVATE_PAGE:
      return { ...state, activePageId: action.payload.id };
    case actionType.SELECT_PAGE:
      return { ...state, activePageId: action.payload.id, selectedPageId: action.payload.id };
    case actionType.CLOSE_PAGE:
      return { ...state, selectedPageId: null, activeDeviceId: null };

    case actionType.ACTIVATE_DEVICE:
      return { ...state, activeDeviceId: action.payload.id };
    case actionType.SELECT_DEVICE:
      return { ...state, activeDeviceId: action.payload.id, selectedDeviceId: action.payload.id };
    case actionType.CLOSE_DEVICE:
      return { ...state, selectedDeviceId: null };
    default:
      return state;
  }
};

const reducer = combineReducers({
  pages,
  devices,
  groups,
  ui,
});

export default reducer;
