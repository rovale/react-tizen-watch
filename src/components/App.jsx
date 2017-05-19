import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../actions/creators';
import Splash from './Splash';
import Pages from './Pages';
import Page from './Page';

class App extends Component {
  static propTypes = {
    mainRoute: PropTypes.string,
    selectedPageId: PropTypes.string,
    onClosePage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('tizenhwkey', (ev) => {
      if (ev.key || ev.keyName === 'back') {
        if (this.props.mainRoute === 'pages' && !this.props.selectedPageId) {
          try {
            console.log('Exiting.');
            window.tizen.application.getCurrentApplication().exit();
          } catch (err) {
            // ignore
          }
        } else if (this.props.mainRoute === "pages" && this.props.selectedPageId) {
          this.props.onClosePage();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CW' } }));
          break;
        case 'ArrowLeft':
          window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CCW' } }));
          break;
        case 'Backspace':
          window.dispatchEvent(new KeyboardEvent('tizenhwkey', { key: 'back' }));
          break;
        default:
          break;
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.mainRoute === "splash" && <Splash />}
        {this.props.mainRoute === "pages" && !this.props.selectedPageId && <Pages />}
        {this.props.mainRoute === "pages" && this.props.selectedPageId && <Page />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    mainRoute: state.ui.mainRoute,
    selectedPageId: state.ui.selectedPageId,
  }
);

const mapDispatchToProps = dispatch => ({
  onClosePage: () => dispatch(action.closePage()),
});

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
