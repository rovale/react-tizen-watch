import { push } from 'react-router-redux';
import * as actionType from '../actions/types';

// eslint-disable-next-line arrow-parens
const navigator = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case actionType.INITIALIZE_APP:
      store.dispatch(push('/splash'));
      break;
    case actionType.LOAD_PAGES:
      store.dispatch(push('/main'));
      break;
    case actionType.SELECT_PAGE:
      store.dispatch(push(`/main/${action.payload.id}`));
      break;
    default:
      break;
  }

  return result;
};

export default navigator;


