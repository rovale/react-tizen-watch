import React from 'react';
import { mount } from 'enzyme';

import Switch from './Switch';

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [{ value: true }],
  };
  const wrapper = mount((<Switch device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
