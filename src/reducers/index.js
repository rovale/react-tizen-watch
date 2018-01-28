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

const attribute = (state = {}, action) => {
  switch (action.type) {
    case actionType.CHANGE_DEVICE_ATTRIBUTE:
      if (action.payload.event.attributeName === state.name) {
        return {
          ...state,
          value: action.payload.event.value,
        };
      }

      return state;
    default:
      return state;
  }
};

const device = (state = {}, action) => {
  switch (action.type) {
    case actionType.CHANGE_DEVICE_ATTRIBUTE:
      if (action.payload.event.deviceId === state.id) {
        const newState = {
          ...state,
          attributes: state.attributes.map(a => attribute(a, action)),
        };
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
        attributes: d.attributes,
        config: d.config,
      }));
    case actionType.CHANGE_DEVICE_ATTRIBUTE:
      return state.map(d => device(d, action));
    default:
      return state;
  }
};

const initialUiState = {
  error: null,
  mainRoute: null,
  activePageId: null,
  selectedPageId: null,
  activeDeviceId: null,
  selectedDeviceId: null,
  activeButtonId: null,
};

const ui = (state = initialUiState, action) => {
  switch (action.type) {
    case actionType.INITIALIZE_APP:
      return { ...state, mainRoute: 'splash' };
    case actionType.HANDLE_ERROR:
      return {
        ...state,
        mainRoute: 'error',
        error: {
          msg: action.payload.msg,
          url: action.payload.url,
          lineNo: action.payload.lineNo,
          columnNo: action.payload.columnNo,
          error: action.payload.error,
        },
      };
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

    case actionType.TOGGLE_SWITCH:
      return { ...state, activeDeviceId: action.payload.id };

    case actionType.ACTIVATE_BUTTON:
      return { ...state, activeButtonId: action.payload.id };
    case actionType.CLICK_BUTTON:
      return { ...state, activeButtonId: action.payload.id };

    default:
      return state;
  }
};

const reducer = combineReducers({
  pages,
  devices,
  ui,
});

export default reducer;
