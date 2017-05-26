import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../actions/creators';
import Error from './Error';
import Splash from './Splash';
import Pages from './Pages';
import Page from './Page';
import Device from './devicePage/Device';

class App extends Component {
  static propTypes = {
    mainRoute: PropTypes.string,
    selectedPageId: PropTypes.string,
    selectedDeviceId: PropTypes.string,
    onClosePage: PropTypes.func.isRequired,
    onCloseDevice: PropTypes.func.isRequired,
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
        } else if (this.props.mainRoute === "pages" && this.props.selectedPageId && !this.props.selectedDeviceId) {
          this.props.onClosePage();
        } else if (this.props.mainRoute === "pages" && this.props.selectedPageId && this.props.selectedDeviceId) {
          this.props.onCloseDevice();
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
        {this.props.mainRoute === "error" && <Error />}
        {this.props.mainRoute === "splash" && <Splash />}
        {this.props.mainRoute === "pages" && !this.props.selectedPageId && <Pages />}
        {this.props.mainRoute === "pages" && this.props.selectedPageId && !this.props.selectedDeviceId && <Page />}
        {this.props.mainRoute === "pages" && this.props.selectedPageId && this.props.selectedDeviceId && <Device />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    mainRoute: state.ui.mainRoute,
    selectedPageId: state.ui.selectedPageId,
    selectedDeviceId: state.ui.selectedDeviceId,
  }
);

const mapDispatchToProps = dispatch => ({
  onClosePage: () => dispatch(action.closePage()),
  onCloseDevice: () => dispatch(action.closeDevice()),
});

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
