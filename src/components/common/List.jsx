import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollContext } from './Page';

import './List.css';

export class List extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeOptionId: PropTypes.string.isRequired,
    onActivateOption: PropTypes.func.isRequired,
    onSelectOption: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onRotaryDetent = this.onRotaryDetent.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentDidMount() {
    window.addEventListener('rotarydetent', this.onRotaryDetent);
  }

  componentWillUnmount() {
    window.removeEventListener('rotarydetent', this.onRotaryDetent);
  }

  onRotaryDetent(e) {
    const { direction } = e.detail;

    const index = this.props.options.findIndex(item => item.id === this.props.activeOptionId);

    if (direction === 'CW') {
      if (index < (this.props.options.length - 1)) {
        this.props.onActivateOption(this.props.options[index + 1].id);
      }
    } else if (index > 0) {
      this.props.onActivateOption(this.props.options[index - 1].id);
    }
  }

  onSelectItem(itemId) {
    this.props.onSelectOption(itemId);
  }

  render() {
    const { options } = this.props;

    const items = options.map(item => (
      <Item
        key={item.id}
        id={item.id}
        active={item.id === this.props.activeOptionId}
        onSelect={item.onSelect || this.onSelectItem}
      >
        {item.content || <div>{item.title}</div>}
      </Item>
    ));

    return (
      <ul className="ui-listview ui-snap-listview">
        {items}
      </ul>
    );
  }
}

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
