import React from 'react';
import PropTypes from 'prop-types';
import scroll from 'smooth-move';

export class List extends React.Component {
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
    const direction = e.detail.direction;

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

    const items = options.map(item =>
      <Item
        key={item.id}
        id={item.id}
        active={item.id === this.props.activeOptionId}
        onSelect={this.onSelectItem}
      >
        {`${item.title} ${item.state || ''}`}
      </Item>);

    return (
      <ul className="ui-listview ui-snap-listview">
        {items}
      </ul>
    );
  }
}

List.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeOptionId: PropTypes.string.isRequired,
  onActivateOption: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToMiddle = this.scrollToMiddle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.element = null;
  }

  componentDidMount() {
    if (this.props.active) {
      window.setTimeout(() => this.scrollToMiddle(1), 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      window.setTimeout(() => this.scrollToMiddle(400), 0);
    }
  }

  onSelect(e) {
    e.preventDefault();
    this.props.onSelect(this.props.id);
  }

  scrollToMiddle(duration) {
    const itemRect = this.element.getBoundingClientRect();
    const itemHeight = itemRect.height;
    const scroller = document.getElementsByClassName('ui-scroller')[0];
    const scrollerHeight = scroller.getBoundingClientRect().height;
    const newScrollTop = (itemRect.top + scroller.scrollTop) - ((scrollerHeight - itemHeight) / 2);

    scroll(scroller, { x: 0, y: newScrollTop, duration });
  }

  render() {
    const { id, active, children } = this.props;

    return (
      <li ref={(e) => { this.element = e; }} className={`ui-snap-listview-item${active ? ' ui-snap-listview-selected' : ''}`}>
        <a href={`#${id}`} onClick={this.onSelect} id={id}>{children}</a>
      </li>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
