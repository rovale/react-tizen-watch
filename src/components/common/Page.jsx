import React from 'react';
import PropTypes from 'prop-types';
import scroll from 'smooth-move';

export class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    scrollToMiddle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.element = null;
  }

  getChildContext() {
    return { scrollToMiddle: this.scrollToMiddle };
  }

  scrollToMiddle = (duration, itemTop, itemHeight) => {
    const scroller = this.element.getElementsByClassName('ui-scroller')[0];
    const scrollerHeight = scroller.getBoundingClientRect().height;
    const newScrollTop = (itemTop + scroller.scrollTop) - ((scrollerHeight - itemHeight) / 2);

    scroll(scroller, { x: 0, y: newScrollTop, duration });
  }

  render() {
    return (
      <div ref={(e) => { this.element = e; }} className="ui-page ui-page-active ui-scroll-on">
        <div className="ui-scroller ui-snap-container" ref={e => e && e.setAttribute('tizen-circular-scrollbar', '')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const Header = ({ children }) => (
  <header className="ui-header">
    <h2 className="ui-title">{children}</h2>
  </header>
);

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export const Content = ({ children }) => {
  return (
    <div className="ui-content" ref={e => e && e.setAttribute('tizen-circular-scrollbar', '')}>
      {children}
    </div>);
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
