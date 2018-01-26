import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Temperature from './Temperature';

Enzyme.configure({ adapter: new Adapter() });

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [
      { acronym: 'acronym1', value: 'value 1', unit: 'unit 1' },
      { acronym: 'acronym2', value: 'value 2', unit: 'unit 2' },
    ],
  };
  const wrapper = mount((<Temperature device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
