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

  static defaultProps = {
    mainRoute: null,
    selectedPageId: null,
    selectedDeviceId: null,
  }

  componentDidMount() {
    window.addEventListener('tizenhwkey', (ev) => {
      if ((ev.key || ev.keyName) === 'back') {
        if (!this.props.selectedPageId) {
          try {
            window.tizen.application.getCurrentApplication().exit();
          } catch (err) {
            // ignore
          }
        } else if (this.props.selectedPageId && !this.props.selectedDeviceId) {
          this.props.onClosePage();
        } else {
          this.props.onCloseDevice();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CW' } }));
      } else if (e.key === 'ArrowLeft') {
        window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CCW' } }));
      } else if (e.key === 'Backspace') {
        window.dispatchEvent(new KeyboardEvent('tizenhwkey', { key: 'back' }));
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.mainRoute === 'error' && <Error />}
        {this.props.mainRoute === 'splash' && <Splash />}
        {this.props.mainRoute === 'pages' && !this.props.selectedPageId && <Pages />}
        {this.props.mainRoute === 'pages' && this.props.selectedPageId && !this.props.selectedDeviceId && <Page />}
        {this.props.mainRoute === 'pages' && this.props.selectedPageId && this.props.selectedDeviceId && <Device />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mainRoute: state.ui.mainRoute,
  selectedPageId: state.ui.selectedPageId,
  selectedDeviceId: state.ui.selectedDeviceId,
});

const mapDispatchToProps = dispatch => ({
  onClosePage: () => dispatch(action.closePage()),
  onCloseDevice: () => dispatch(action.closeDevice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
