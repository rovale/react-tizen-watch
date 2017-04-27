import React from 'react';

export const Page = ({ children }) =>
  <div className="ui-page ui-page-active">
    {children}
  </div>;

Page.prototype.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export const Header = ({ children }) =>
  <header className="ui-header">
    <h2 className="ui-title">{children}</h2>
  </header>;

Header.prototype.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export const Content = ({ children }) =>
  <div className="ui-content">
    {children}
  </div>;

Content.prototype.propTypes = {
  children: React.PropTypes.element.isRequired,
};

