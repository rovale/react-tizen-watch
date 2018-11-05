import React from 'react';
import { shallow, mount } from 'enzyme';

import { createStore } from 'redux';
import reducer from '../reducers';
import * as action from '../actions/creators';

import Error from './Error';
import Splash from './Splash';
import Pages from './Pages';
import Page from './Page';
import Device from './devicePage/Device';
import App from './App';

describe('The App component', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  test('it should render the Splash component', () => {
    store.dispatch(action.initializeApp());

    const app = mount((<App store={store} />));

    expect(app.find(Splash).exists()).toBe(true);
    expect(app.find(Splash)).toMatchSnapshot();
  });

  test('it should render the Error component', () => {
    store.dispatch(action.handleError('someMsg', 'someUrl', 10, 20, { stack: 'someErrorStack' }));

    const app = shallow((<App store={store} />));

    expect(app.dive().find(Error).exists()).toBe(true);
  });

  test('it should render the Pages component', () => {
    store.dispatch(action.loadPages([]));

    const app = shallow((<App store={store} />));

    expect(app.dive().find(Pages).exists()).toBe(true);
  });

  test('it should render the Page component', () => {
    const pages = [{ id: 'climate', devices: [] }];
    store.dispatch(action.loadPages(pages));
    store.dispatch(action.selectPage('climate'));

    const app = shallow((<App store={store} />));

    expect(app.dive().find(Page).exists()).toBe(true);
  });

  test('it should render the Device component', () => {
    const pages = [{ id: 'climate', devices: ['thermostat'] }];
    const devices = [{ id: 'thermostat' }];
    store.dispatch(action.loadPages(pages));
    store.dispatch(action.loadDevices(devices));
    store.dispatch(action.selectPage('climate'));
    store.dispatch(action.selectDevice('thermostat'));

    const app = shallow((<App store={store} />));

    expect(app.dive().find(Device).exists()).toBe(true);
  });

  describe('when the back button is pressed', () => {
    let events;

    beforeEach(() => {
      events = {};
      window.addEventListener = jest.fn().mockImplementation((eventType, cb) => {
        events[eventType] = cb;
      });

      window.dispatchEvent = jest.fn().mockImplementation((event) => {
        events[event.type](event);
      });
    });

    test('it should close the application when showing the splash screen', () => {
      store.dispatch(action.initializeApp());
      shallow((<App store={store} />)).dive();
      const exit = jest.fn();
      window.tizen = { application: { getCurrentApplication: () => ({ exit }) } };

      events.tizenhwkey({ keyName: 'back' });

      expect(exit.mock.calls).toHaveLength(1);
    });

    test('it should close the application when showing the pages', () => {
      store.dispatch(action.loadPages([]));
      shallow((<App store={store} />)).dive();
      const exit = jest.fn();
      window.tizen = { application: { getCurrentApplication: () => ({ exit }) } };

      events.tizenhwkey({ keyName: 'back' });

      expect(exit.mock.calls).toHaveLength(1);
    });

    test('it should close the page when showing a specific page', () => {
      const pages = [{ id: 'climate', devices: [] }];
      store.dispatch(action.loadPages(pages));
      store.dispatch(action.selectPage('climate'));
      shallow((<App store={store} />)).dive();

      events.tizenhwkey({ keyName: 'back' });

      expect(store.getState().ui.selectedPageId).toBeNull();
    });

    test('it should close the device when showing a specific device', () => {
      const pages = [{ id: 'climate', devices: ['thermostat'] }];
      const devices = [{ id: 'thermostat' }];
      store.dispatch(action.loadPages(pages));
      store.dispatch(action.loadDevices(devices));
      store.dispatch(action.selectPage('climate'));
      store.dispatch(action.selectDevice('thermostat'));
      shallow((<App store={store} />)).dive();

      events.tizenhwkey({ keyName: 'back' });

      expect(store.getState().ui.selectedDeviceId).toBeNull();
    });
  });

  describe('when testing the application in a browser', () => {
    let events;

    beforeEach(() => {
      events = {};
      window.addEventListener = jest.fn().mockImplementation((eventType, cb) => {
        events[eventType] = cb;
      });
    });

    test('it should dispatch a back tizenhwkey event on backspace button press', () => {
      const spy = jest.fn();
      window.dispatchEvent = spy;
      store.dispatch(action.loadPages([]));
      shallow((<App store={store} />)).dive();

      events.keyup({ key: 'Backspace' });

      expect(spy.mock.calls).toHaveLength(1);
      expect(spy.mock.calls[0][0].type).toBe('tizenhwkey');
      expect(spy.mock.calls[0][0].key).toBe('back');
    });

    test('it should dispatch a CCW rotarydetent event on left arrow press', () => {
      const spy = jest.fn();
      window.dispatchEvent = spy;
      store.dispatch(action.loadPages([]));
      shallow((<App store={store} />)).dive();

      events.keyup({ key: 'ArrowLeft' });

      expect(spy.mock.calls).toHaveLength(1);
      expect(spy.mock.calls[0][0].type).toBe('rotarydetent');
      expect(spy.mock.calls[0][0].detail).toEqual({ direction: 'CCW' });
    });

    test('it should dispatch a CW rotarydetent event on right arrow press', () => {
      const spy = jest.fn();
      window.dispatchEvent = spy;
      store.dispatch(action.loadPages([]));
      shallow((<App store={store} />)).dive();

      events.keyup({ key: 'ArrowRight' });

      expect(spy.mock.calls).toHaveLength(1);
      expect(spy.mock.calls[0][0].type).toBe('rotarydetent');
      expect(spy.mock.calls[0][0].detail).toEqual({ direction: 'CW' });
    });
  });
});
