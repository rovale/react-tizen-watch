import React from 'react';
import { shallow } from 'enzyme';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../../reducers';
import communicator from '../../middleware/communicator';
import * as action from '../../actions/creators';

import ButtonsDevice from './ButtonsDevice';
import { List, Item } from './../common/List';

const devices = [
  {
    id: 'pick-a-color-radio',
    name: 'Pick a color',
    template: 'buttons',
    attributes: [
      {
        name: 'button',
        value: 'blue',
      },
    ],
    config: {
      buttons: [
        { id: 'red', text: 'Red' },
        { id: 'green', text: 'Green' },
        { id: 'blue', text: 'Blue' },
      ],
    },
  },
];

describe('The ButtonsDevice component', () => {
  let store;
  let device;
  let socketIoEmitSpy;

  beforeEach(() => {
    socketIoEmitSpy = jest.fn();
    window.testSocketIoClient = () => ({ emit: socketIoEmitSpy, on: jest.fn() });

    const enhancer = compose(applyMiddleware(communicator));
    store = createStore(reducer, enhancer);
    store.dispatch(action.initializeApp());
    store.dispatch(action.loadDevices(devices));
    [device] = store.getState().devices;
  });

  test('it should show a list with the buttons as options', () => {
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();

    const listContent = buttonsDevice.dive();
    expect(listContent).toMatchSnapshot();
    expect(listContent.find(Item)).toHaveLength(3);

    const checkBox = listContent.find('Item[id="blue"] input');
    expect(checkBox.prop('checked')).toBeTruthy();
  });

  test('it should reflect a device attribute change', () => {
    store.dispatch(action.changeDeviceAttribute({
      deviceId: 'pick-a-color-radio',
      attributeName: 'button',
      value: 'red',
    }));

    [device] = store.getState().devices;
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();

    const listContent = buttonsDevice.dive();
    const checkBox = listContent.find('Item[id="red"] input');
    expect(checkBox.prop('checked')).toBeTruthy();
  });

  test('it should mark the first button as active one', () => {
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();
    const list = buttonsDevice.find(List);

    expect(list.prop('activeOptionId')).toBe('red');
  });

  test('it should mark the activated button as active button', () => {
    store.dispatch(action.activateButton('green'));
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();
    const list = buttonsDevice.find(List);

    expect(list.prop('activeOptionId')).toBe('green');
  });

  test('it should activate the button when the option is activated in the list', () => {
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();
    const list = buttonsDevice.find(List);

    list.prop('onActivateOption')('blue');

    expect(store.getState().ui.activeButtonId).toBe('blue');
  });

  test('it should activate the button when the button is selected', () => {
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();
    const list = buttonsDevice.find(List);
    const listContent = list.dive();
    const listItem = listContent.find('Item[id="blue"]');

    // TODO: make onSelect work without specifying the id.
    listItem.prop('onSelect')('blue');

    expect(store.getState().ui.activeButtonId).toBe('blue');
  });

  test('it should emit the expected command when the button is selected', () => {
    const buttonsDevice = shallow((<ButtonsDevice store={store} device={device} />)).dive();
    const list = buttonsDevice.find(List);
    const listContent = list.dive();
    const listItem = listContent.find('Item[id="blue"]');

    // TODO: make onSelect work without specifying the id.
    listItem.prop('onSelect')('blue');

    expect(socketIoEmitSpy.mock.calls).toMatchSnapshot();
  });
});
