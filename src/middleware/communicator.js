import * as actionType from '../actions/types';
import { initWebSocket, toggleSwitch, clickButton } from '../common/webSocket';

// eslint-disable-next-line arrow-parens
const communicator = store => next => action => {
  switch (action.type) {
    case actionType.INITIALIZE_APP:
      initWebSocket(store);
      break;
    case actionType.TOGGLE_SWITCH:
      toggleSwitch(action.payload.id);
      break;
    case actionType.CLICK_BUTTON: {
      const deviceId = store.getState().ui.selectedDeviceId;
      clickButton(deviceId, action.payload.id);
      break;
    }
    default:
      break;
  }

  return next(action);
};

export default communicator;
