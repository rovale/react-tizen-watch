import { push } from 'react-router-redux';
import * as actionType from '../actions/types';

// eslint-disable-next-line arrow-parens
const navigate = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case actionType.LOAD_PAGES:
      store.dispatch(push('/main'));
      break;
    default:
      break;
  }

  return result;
};

export default navigate;


