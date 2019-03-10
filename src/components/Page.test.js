import React from 'react';
import { shallow } from 'enzyme';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import communicator from '../middleware/communicator';
import * as action from '../actions/creators';

import Page from './Page';
import { List } from './common/List';

const pages = [
  {
    id: 'somePage',
    name: 'Some Page',
    devices: [
      { deviceId: 'someDisplayDevice' },
      { deviceId: 'somePresenceDevice' },
      { deviceId: 'someSwitch' },
      { deviceId: 'someTemperatureDevice' },
      { deviceId: 'someThermostat' },
      { deviceId: 'someButtons' },
    ],
  },
];

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

describe('The Page component', () => {
  let store;
  let dispatchedActions;
  let socketIoEmitSpy;

  // eslint-disable-next-line arrow-parens, no-unused-vars
  const spyMiddleware = theStore => theNext => theAction => {
    dispatchedActions.push(theAction);
    return theNext(theAction);
  };

  beforeEach(() => {
    dispatchedActions = [];

    socketIoEmitSpy = jest.fn();
    window.testSocketIoClient = () => ({
      emit: socketIoEmitSpy,
      on: jest.fn(),
    });

    const enhancer = compose(applyMiddleware(spyMiddleware, communicator));
    store = createStore(reducer, enhancer);
    store.dispatch(action.initializeApp());
    store.dispatch(action.loadPages(pages));
    store.dispatch(action.loadDevices(devices));
    store.dispatch(action.selectPage('somePage'));
  });

  test('it should show a list with the devices as options', () => {
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);

    const listOptions = list.prop('options');
    expect(listOptions).toHaveLength(6);

    expect(list.dive()).toMatchSnapshot();
  });

  test('it should mark the first device as active option', () => {
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);

    expect(list.prop('activeOptionId')).toBe('someDisplayDevice');
  });

  test('it should mark the selected device as active option', () => {
    store.dispatch(action.selectDevice('someThermostat'));
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);

    expect(list.prop('activeOptionId')).toBe('someThermostat');
  });

  test('it should activate the device when the option is activated in the list', () => {
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);

    list.prop('onActivateOption')('someThermostat');

    expect(store.getState().ui.activeDeviceId).toBe('someThermostat');
    expect(store.getState().ui.selectedDeviceId).toBeNull();
  });

  test('it should select the device when the option is selected in the list', () => {
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);
    const listContent = list.dive();
    const listItem = listContent.find('Item[id="someThermostat"]');

    // TODO: make onSelect work without specifying the id.
    listItem.prop('onSelect')('someThermostat');

    expect(store.getState().ui.activeDeviceId).toBe('someThermostat');
    expect(store.getState().ui.selectedDeviceId).toBe('someThermostat');
  });

  test('it should toggle the switch when the option is a switch', () => {
    const page = shallow(<Page store={store} />).dive();
    const list = page.find(List);
    const listContent = list.dive();
    const listItemWithSwitch = listContent.find('Item[id="someSwitch"]');

    listItemWithSwitch.prop('onSelect')();

    expect(dispatchedActions[dispatchedActions.length - 1]).toMatchObject(
      action.toggleSwitch('someSwitch'),
    );
    expect(socketIoEmitSpy.mock.calls).toMatchSnapshot();
  });
});
