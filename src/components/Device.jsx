import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Page as UiPage, Header, Content } from './common/Page';
import ButtonsDevice from './ButtonsDevice';
import * as action from '../actions/creators';

let Device = ({ device, onClose }) => {
  const getDeviceContent = () => {
    switch (device.template) {
      case 'buttons':
        return <ButtonsDevice device={device} />;
      default:
        return <div>Content of {device.id} {device.template}</div>;
    }
  };

  return (<UiPage>
    <Header>{device.title}</Header>
    <Content>
      {getDeviceContent(device)}
    </Content>
    {/* <footer className="ui-footer ui-bottom-button ui-fixed">
      <a href="#close" onClick={onClose} className="ui-btn">OK</a>
    </footer> */}
  </UiPage>);
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  device: state.devices.find(d => d.id === state.ui.selectedDeviceId),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(action.closeDevice()),
});

Device = connect(mapStateToProps, mapDispatchToProps)(Device);

export default Device;
