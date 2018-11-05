import React from 'react';
import { mount } from 'enzyme';

import Thermostat from './Thermostat';

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [
      { acronym: 'acronym1', value: 'value 1', unit: 'unit 1' },
    ],
  };
  const wrapper = mount((<Thermostat device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
