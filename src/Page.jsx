import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ children }) =>
  <div className="ui-page ui-page-active ui-scroll-on">
    {children}
  </div>;

Page.prototype.propTypes = {
  children: PropTypes.element.isRequired,
};

export const Header = ({ children }) =>
  <header className="ui-header">
    <h2 className="ui-title">{children}</h2>
  </header>;

Header.prototype.propTypes = {
  children: PropTypes.element.isRequired,
};

export const Content = ({ children }) =>
  <div className="ui-content">
    {children}
  </div>;

Content.prototype.propTypes = {
  children: PropTypes.element.isRequired,
};

