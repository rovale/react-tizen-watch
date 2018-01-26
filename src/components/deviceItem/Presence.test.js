import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Presence from './Presence';

Enzyme.configure({ adapter: new Adapter() });

test('it should render as expected', () => {
  const device = {
    id: 'someDevice',
    title: 'Some Device',
    attributes: [{ value: true }],
  };
  const wrapper = mount((<Presence device={device} />)).children().first();
  expect(wrapper).toMatchSnapshot();
});
