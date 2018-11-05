import React from 'react';
import { mount } from 'enzyme';

import Display from './Display';

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [
      { acronym: 'acronym1', value: 'value 1', unit: 'unit 1' },
      { acronym: 'acronym2', value: 'value 2', unit: 'unit 2' },
      { acronym: 'acronym3', value: 'value 3', unit: 'unit 3' },
      { acronym: 'acronym4', value: 'value 4', unit: 'unit 4' },
      { acronym: 'acronym5', value: 'value 5', unit: 'unit 5' },
    ],
  };
  const wrapper = mount((<Display device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
