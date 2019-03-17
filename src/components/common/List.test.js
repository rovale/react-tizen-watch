import React from 'react';
import { mount } from 'enzyme';
import { List, Item } from './List';

describe('the List component', () => {
  let options;
  let onGenericSelect;
  let onSpecificSelect;
  let onActivate;

  let events;

  beforeEach(() => {
    events = {};
    window.addEventListener = jest.fn().mockImplementation((eventType, cb) => {
      events[eventType] = cb;
    });

    window.removeEventListener = jest.fn().mockImplementation((eventType) => {
      events[eventType] = null;
    });

    onGenericSelect = jest.fn();
    onSpecificSelect = jest.fn();
    onActivate = jest.fn();

    options = [
      { id: 'option1', title: 'Option 1' },
      { id: 'option2', content: <div><b>Option 2</b></div> },
      { id: 'option3', title: 'Option 3', onSelect: onSpecificSelect },
    ];
  });

  test('it should contain the provided items', () => {
    const list = mount(
      <List
        options={options}
        activeOptionId="option1"
        onActivateOption={() => {}}
        onSelectOption={() => {}}
      />,
    );

    const items = list.find(Item);
    expect(items).toHaveLength(3);
    expect(list.find('ul')).toMatchSnapshot();
  });

  test('it should invoke the generic callback when an option without a specific callback is selected', () => {
    const list = mount(
      <List
        options={options}
        activeOptionId="option1"
        onActivateOption={() => {}}
        onSelectOption={onGenericSelect}
      />,
    );
    const link = list.find('a[id="option1"]');

    link.simulate('click', { preventDefault: () => {} });

    expect(onGenericSelect.mock.calls).toHaveLength(1);
    expect(onGenericSelect.mock.calls[0][0]).toBe('option1');
    expect(onSpecificSelect.mock.calls).toHaveLength(0);
  });

  test('it should invoke the specific callback when an option with a specific callback is selected', () => {
    const list = mount(
      <List
        options={options}
        activeOptionId="option1"
        onActivateOption={() => {}}
        onSelectOption={onGenericSelect}
      />,
    );
    const link = list.find('a[id="option3"]');

    link.simulate('click', { preventDefault: () => {} });

    expect(onGenericSelect.mock.calls).toHaveLength(0);
    expect(onSpecificSelect.mock.calls).toHaveLength(1);
    expect(onSpecificSelect.mock.calls[0][0]).toBe('option3');
  });

  // TODO: enable when hooks are no longer alpha
  // test('it should activate the next item in the list when the bezel is turned clockwise', () => {
  //   mount(<List options={options} activeOptionId="option1" onActivateOption={onActivate} onSelectOption={() => {}} />);

  //   events.rotarydetent({ detail: { direction: 'CW' } });

  //   expect(onActivate.mock.calls).toHaveLength(1);
  //   expect(onActivate.mock.calls[0][0]).toBe('option2');
  // });

  test('it should not go beyond the last item in the list when the bezel is turned clockwise', () => {
    mount(
      <List
        options={options}
        activeOptionId="option3"
        onActivateOption={onActivate}
        onSelectOption={() => {}}
      />,
    );

    events.rotarydetent({ detail: { direction: 'CW' } });

    expect(onActivate.mock.calls).toHaveLength(0);
  });

  // TODO: enable when hooks are no longer alpha
  // test('it should activate the previous item in the list when the bezel is turned counter clockwise', () => {
  //   mount(<List options={options} activeOptionId="option3" onActivateOption={onActivate} onSelectOption={() => {}} />);

  //   events.rotarydetent({ detail: { direction: 'CCW' } });

  //   expect(onActivate.mock.calls).toHaveLength(1);
  //   expect(onActivate.mock.calls[0][0]).toBe('option2');
  // });

  test('it should not go before the first item in the list when the bezel is turned counter clockwise', () => {
    mount(
      <List
        options={options}
        activeOptionId="option1"
        onActivateOption={onActivate}
        onSelectOption={() => {}}
      />,
    );

    events.rotarydetent({ detail: { direction: 'CCW' } });

    expect(onActivate.mock.calls).toHaveLength(0);
  });

  // TODO: check if this works once hooks are not alpha anymore
  // test('it should scroll, putting the active item in the middle', () => {
  //   jest.useFakeTimers();
  //   const page = mount(<Page><List options={options} activeOptionId="option3" onActivateOption={() => {}} onSelectOption={() => {}} /></Page>);
  //   const scroller = page.find('.ui-scroller').first().getDOMNode();
  //   jest.runAllTimers();

  //   expect(scroller.scrollTop).toBe(0);
  // });

  test('it should cleanup the event listeners', () => {
    const list = mount(
      <List
        options={options}
        activeOptionId="option3"
        onActivateOption={() => {}}
        onSelectOption={() => {}}
      />,
    );

    list.unmount();

    expect(events.rotarydetent).toBeNull();
  });
});
