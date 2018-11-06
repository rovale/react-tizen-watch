import React from 'react';
import { mount } from 'enzyme';

import { createStore } from 'redux';
import reducer from '../reducers';
import * as action from '../actions/creators';

import Pages from './Pages';
import { List } from './common/List';
import { Header } from './common/Page';

const pages = [
  {
    id: 'climate',
    name: 'Climate',
    devices: [],
  },
  {
    id: 'lights',
    name: 'Lights',
    devices: [],
  },
];

describe('The Pages component', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(action.loadPages(pages));
  });

  test('it should show a header with the title of the application', () => {
    const wrapper = mount((<Pages store={store} />));
    const header = wrapper.find(Header);
    expect(header.text()).toBe('Demo home');
  });

  test('it should show a list with the pages as options', () => {
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    const listOptions = list.prop('options');
    expect(listOptions).toHaveLength(2);
    expect(listOptions[0]).toMatchObject({ id: 'climate', title: 'Climate' });
    expect(listOptions[1]).toMatchObject({ id: 'lights', title: 'Lights' });
  });

  test('it should mark the first page as active option', () => {
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    expect(list.prop('activeOptionId')).toBe('climate');
  });

  test('it should mark the selected page as active option', () => {
    store.dispatch(action.selectPage('lights'));
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    expect(list.prop('activeOptionId')).toBe('lights');
  });

  test('it should define the necessary callbacks', () => {
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    expect(list.prop('onActivateOption')).toBeDefined();
    expect(list.prop('onSelectOption')).toBeDefined();
  });

  test('it should select the page when the option is selected in the list', () => {
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    list.prop('onSelectOption')('lights');
    expect(store.getState().ui.activePageId).toBe('lights');
    expect(store.getState().ui.selectedPageId).toBe('lights');
  });

  test('it should activate the page when the option is activated in the list', () => {
    const wrapper = mount((<Pages store={store} />));
    const list = wrapper.find(List);
    list.prop('onActivateOption')('lights');
    expect(store.getState().ui.activePageId).toBe('lights');
    expect(store.getState().ui.selectedPageId).toBeNull();
  });
});
