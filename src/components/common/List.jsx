import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollContext } from './Page';

import './List.css';

export const List = ({
  options, activeOptionId, onActivateOption, onSelectOption,
}) => {
  const onRotaryDetent = (e) => {
    const { direction } = e.detail;

    const index = options.findIndex(item => item.id === activeOptionId);

    if (direction === 'CW') {
      if (index < (options.length - 1)) {
        onActivateOption(options[index + 1].id);
      }
    } else if (index > 0) {
      onActivateOption(options[index - 1].id);
    }
  };

  useEffect(() => {
    window.addEventListener('rotarydetent', onRotaryDetent);
    return () => window.removeEventListener('rotarydetent', onRotaryDetent);
  });

  const items = options.map(item => (
    <Item
      key={item.id}
      id={item.id}
      active={item.id === activeOptionId}
      onSelect={item.onSelect || onSelectOption}
    >
      {item.content || <div>{item.title}</div>}
    </Item>
  ));

  return (
    <ul className="ui-listview ui-snap-listview">
      {items}
    </ul>
  );
};

List.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeOptionId: PropTypes.string.isRequired,
  onActivateOption: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};


export const Item = ({
  id, active, onSelect, children,
}) => {
  const scroll = useContext(ScrollContext);
  const element = useRef(null);

  const scrollToMiddle = (duration) => {
    const itemRect = element.current.getBoundingClientRect();
    scroll(duration, itemRect.top, itemRect.height);
  };

  useEffect(
    () => {
      if (active) {
        window.setTimeout(() => scrollToMiddle(1), 0);
      }
    },
    [active],
  );

  const onClick = (e) => {
    e.preventDefault();
    onSelect(id);
  };

  return (
    <li ref={element} className={`ui-snap-listview-item${active ? ' ui-snap-listview-selected' : ''}`}>
      <a href={`#${id}`} onClick={onClick} id={id}>{children}</a>
    </li>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
