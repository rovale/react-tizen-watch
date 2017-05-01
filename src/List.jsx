import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this.rotaryDetentHandler = this.rotaryDetentHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('rotarydetent', this.rotaryDetentHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('rotarydetent', this.rotaryDetentHandler);
  }

  rotaryDetentHandler(e) {
    const direction = e.detail.direction;

    if (direction === 'CW') {
      if (this.state.selectedIndex < (this.props.children.length - 1)) {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      }
    } else if (this.state.selectedIndex > 0) {
      this.setState({ selectedIndex: this.state.selectedIndex - 1 });
    }
  }

  render() {
    const { children, match } = this.props;

    const childrenWithMatch =
      React.Children.map(children,
        (child, index) =>
          React.cloneElement(child, { match, selected: index === this.state.selectedIndex }));

    return (
      <ul className="ui-listview ui-snap-listview">
        {childrenWithMatch}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.scrollIntoView = this.scrollIntoView.bind(this);
    this.element = null;
  }

  componentDidMount() {
    if (this.props.selected) {
      window.setTimeout(this.scrollIntoView, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      window.setTimeout(this.scrollIntoView, 0);
    }
  }

  scrollIntoView() {
    const itemRect = this.element.getBoundingClientRect();
    const itemHeight = itemRect.height;
    const scroller = document.getElementsByClassName('ui-scroller')[0];
    const scrollerHeight = scroller.getBoundingClientRect().height;
    scroller.scrollTop = (itemRect.top + scroller.scrollTop) - ((scrollerHeight - itemHeight) / 2);
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


