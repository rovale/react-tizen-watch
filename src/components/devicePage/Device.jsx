import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Page as UiPage, Header, Content } from '../common/Page';
import ButtonsDevice from './ButtonsDevice';

const Device = ({ device }) => {
  const getDeviceContent = () => {
    switch (device.template) {
      case 'buttons':
        return <ButtonsDevice device={device} />;
      default:
        return <div>Content of {device.id} {device.template}</div>;
    }
  };

  return (
    <UiPage>
      <Header>{device.title}</Header>
      <Content>
        {getDeviceContent(device)}
      </Content>
    </UiPage>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  device: state.devices.find(d => d.id === state.ui.selectedDeviceId),
});

export default connect(mapStateToProps)(Device);
