import React from 'react';
import { mount } from 'enzyme';

import Presence from './Presence';

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [{ value: true }],
  };
  const wrapper = mount((<Presence device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
