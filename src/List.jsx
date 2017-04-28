import React from 'react';
import PropTypes from 'prop-types';

// See: http://krasimirtsonev.com/blog/article/react-third-party-library-integration
export class List extends React.Component {
  constructor(props) {
    super(props);

    this.snapListStyle = null;
  }

  componentDidMount() {
    const component = this.list;
    window.setTimeout(() => (this.snapListStyle =
      window.tau.helper.SnapListStyle.create(component)), 0);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.snapListStyle.destroy();
  }

  render() {
    const { children, onSelect } = this.props;

    const childrenWithOnSelect =
      React.Children.map(children,
        child => React.cloneElement(child, { onSelect }));

    return (
      <ul ref={(c) => { this.list = c; }} className="ui-listview">
        {childrenWithOnSelect}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const Item = ({ id, children, onSelect }) =>
  <li><a href={`#${id}`} onClick={() => onSelect(id)}>{children}</a></li>;

Item.prototype.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
};

