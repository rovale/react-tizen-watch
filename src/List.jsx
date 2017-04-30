import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// See: http://krasimirtsonev.com/blog/article/react-third-party-library-integration
export class List extends React.Component {
  constructor(props) {
    super(props);

    this.snapListStyle = null;
  }

  componentDidMount() {
    const element = this.list;
    window.setTimeout(() => (this.snapListStyle =
      window.tau.helper.SnapListStyle.create(element)), 0);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.snapListStyle.destroy();
  }

  render() {
    const { children, match } = this.props;

    const childrenWithMatch =
      React.Children.map(children,
        child => React.cloneElement(child, { match }));

    return (
      <ul ref={(c) => { this.list = c; }} className="ui-listview">
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

export const Item = ({ id, children, match }) =>
  <li><Link id={id} to={`${match.url}/${id}`}>{children}</Link></li>;

Item.prototype.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

