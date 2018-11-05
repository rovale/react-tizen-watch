import React from 'react';
import { mount } from 'enzyme';

import { createStore } from 'redux';
import reducer from '../reducers';
import * as action from '../actions/creators';

import Error from './Error';

test('it should render as expected', () => {
  const store = createStore(reducer);
  store.dispatch(action.handleError('someMsg', 'someUrl', 10, 20, { stack: 'someErrorStack' }));
  const wrapper = mount((<Error store={store} />)).children().first().children();
  expect(wrapper).toMatchSnapshot();
});
