import React from 'react';
import PropTypes from 'prop-types';

export const List = ({ children, onSelect }) => {
  const childrenWithOnSelect =
    React.Children.map(children,
      child => React.cloneElement(child, { onSelect }));

  return (
    <ul className="ui-listview">
      {childrenWithOnSelect}
    </ul>
  );
};

List.prototype.propTypes = {
  children: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const Item = ({ id, children, onSelect }) =>
  <li><a href={`#${id}`} onClick={() => onSelect(id)}>{children}</a></li>;

Item.prototype.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
};

