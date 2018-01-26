import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createStore } from 'redux';
import reducer from '../reducers';
import * as action from '../actions/creators';

import Error from './Error';

Enzyme.configure({ adapter: new Adapter() });

test('it should render as expected', () => {
  const store = createStore(reducer);
  store.dispatch(action.handleError('someMsg', 'someUrl', 10, 20, { stack: 'someErrorStack' }));
  const wrapper = mount((<Error store={store} />)).children().first().children();
  expect(wrapper).toMatchSnapshot();
});
