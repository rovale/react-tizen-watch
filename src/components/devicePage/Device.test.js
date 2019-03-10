import React from 'react';
import { shallow } from 'enzyme';

import { createStore } from 'redux';
import reducer from '../../reducers';
import * as action from '../../actions/creators';

import Device from './Device';
import ButtonsDevice from './ButtonsDevice';

/* eslint-disable object-curly-newline */
const devices = [
  { id: 'someDisplayDevice', name: 'SDD', template: 'device', attributes: [] },
  {
    id: 'somePresenceDevice',
    name: 'SPD',
    template: 'presence',
    attributes: [],
  },
  { id: 'someSwitch', name: 'SS', template: 'switch', attributes: [] },
  {
    id: 'someTemperatureDevice',
    name: 'STD',
    template: 'temperature',
    attributes: [],
  },
  { id: 'someThermostat', name: 'ST', template: 'thermostat', attributes: [] },
  { id: 'someButtons', name: 'SB', template: 'buttons', attributes: [] },
];
/* eslint-enable object-curly-newline */

describe('The Device component', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(action.loadDevices(devices));
  });

  test('it should show a ButtonsDevice component for a buttons device', () => {
    store.dispatch(action.selectDevice('someButtons'));
    const device = shallow(<Device store={store} />).dive();

    const buttonsDevice = device.find(ButtonsDevice);

    expect(buttonsDevice).toHaveLength(1);
  });

  test('it should show some text for a device without a specific implementation', () => {
    store.dispatch(action.selectDevice('someTemperatureDevice'));

    const device = shallow(<Device store={store} />).dive();
    expect(device.dive()).toMatchSnapshot();
  });
});
