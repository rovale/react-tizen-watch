import * as actionType from '../actions/types';
import initWebSocket from '../common/webSocket';

// eslint-disable-next-line arrow-parens
const communicator = store => next => action => {
  switch (action.type) {
    case actionType.INITIALIZE_APP:
      initWebSocket(store);
      break;
    default:
      break;
  }

  return next(action);
};

export default communicator;


