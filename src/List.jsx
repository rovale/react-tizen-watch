import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import scroll from 'smooth-move';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onRotaryDetent = this.onRotaryDetent.bind(this);
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

  render() {
    const { options, match } = this.props;

    const items = options.map(item =>
      <Item
        key={item.id}
        id={item.id}
        match={match}
        selected={item.id === this.props.activeOptionId}
      >
        {item.title}
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
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  activeOptionId: PropTypes.string.isRequired,
  onActivateOption: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  options: state.list.options,
  activeOptionId: state.list.activeOptionId,
});

const mapDispatchToProps = dispatch => ({
  onActivateOption: id => dispatch({ type: 'ACTIVATE_OPTION', id }),
});

export const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToMiddle = this.scrollToMiddle.bind(this);
    this.element = null;
  }

  componentDidMount() {
    if (this.props.selected) {
      window.setTimeout(this.scrollToMiddle, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      window.setTimeout(this.scrollToMiddle, 0);
    }
  }

  scrollToMiddle() {
    const itemRect = this.element.getBoundingClientRect();
    const itemHeight = itemRect.height;
    const scroller = document.getElementsByClassName('ui-scroller')[0];
    const scrollerHeight = scroller.getBoundingClientRect().height;
    const newScrollTop = (itemRect.top + scroller.scrollTop) - ((scrollerHeight - itemHeight) / 2);

    scroll(scroller, { x: 0, y: newScrollTop, duration: 300 });
  }

  render() {
    const { id, selected, children, match } = this.props;

    return (
      <li ref={(e) => { this.element = e; }} className={`ui-snap-listview-item${selected ? ' ui-snap-listview-selected' : ''}`}>
        <Link id={id} to={`${match.url}/${id}`}>{children}</Link>
      </li>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  children: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

Item.defaultProps = {
  selected: false,
  match: {
    url: '/',
  },
};

