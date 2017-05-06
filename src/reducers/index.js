import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const options = () => [
  { id: 'option1', title: 'Option 1' },
  { id: 'option2', title: 'Option 2' },
  { id: 'option3', title: 'Option 3' },
  { id: 'option4', title: 'Option 4' },
  { id: 'option5', title: 'Option 5' },
  { id: 'option6', title: 'Option 6' },
  { id: 'option7', title: 'Option 7' },
  { id: 'option8', title: 'Option 8' },
  { id: 'option9', title: 'Option 9' },
  { id: 'option10', title: 'Option 10' },
  { id: 'option11', title: 'Option 11' },
  { id: 'option12', title: 'Option 12' },
  { id: 'option13', title: 'Option 13' },
  { id: 'option14', title: 'Option 14' },
];

const activeOptionId = (state = 'option1', action) => {
  switch (action.type) {
    case 'ACTIVATE_OPTION':
      return action.id;
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
