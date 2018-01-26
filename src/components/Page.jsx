import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../actions/creators';
import { Page as UiPage, Header, Content } from './common/Page';
import { List } from './common/List';
import Switch from './deviceItem/Switch';
import Display from './deviceItem/Display';
import Presence from './deviceItem/Presence';
import Temperature from './deviceItem/Temperature';
import Thermostat from './deviceItem/Thermostat';

let Page = ({
  pageTitle, devices, activeDeviceId, onActivateDevice, onSelectDevice, onToggleSwitch,
}) => {
  const getListItemContent = (device) => {
    switch (device.template) {
      case 'device':
        return <Display device={device} />;
      case 'presence':
        return <Presence device={device} />;
      case 'switch':
        return <Switch device={device} />;
      case 'temperature':
        return <Temperature device={device} />;
      case 'thermostat':
        return <Thermostat device={device} />;
      default:
        return <div>{`${device.title} - (${device.template})`}</div>;
    }
  };

  const getOnSelect = (device) => {
    switch (device.template) {
      case 'switch':
        return () => onToggleSwitch(device.id);
      default:
        return null;
    }
  };

  const deviceOptions = devices.map(d => ({
    ...d,
    content: getListItemContent(d),
    onSelect: getOnSelect(d),
  }));

  return (
    <UiPage>
      <Header>{pageTitle}</Header>
      <Content>
        <List
          options={deviceOptions}
          activeOptionId={activeDeviceId}
          onActivateOption={onActivateDevice}
          onSelectOption={onSelectDevice}
        />
      </Content>
    </UiPage>);
};

Page.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeDeviceId: PropTypes.string.isRequired,
  onActivateDevice: PropTypes.func.isRequired,
  onSelectDevice: PropTypes.func.isRequired,
  onToggleSwitch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const selectedPage = state.pages.find(p => p.id === state.ui.selectedPageId);

  return {
    pageTitle: selectedPage.title,
    devices: selectedPage.devices.map(pd => state.devices.find(d => pd === d.id)),
    activeDeviceId: state.ui.activeDeviceId || selectedPage.devices[0],
  };
};

const mapDispatchToProps = dispatch => ({
  onActivateDevice: id => dispatch(action.activateDevice(id)),
  onSelectDevice: id => dispatch(action.selectDevice(id)),
  onToggleSwitch: id => dispatch(action.toggleSwitch(id)),
});

export default Page = connect(mapStateToProps, mapDispatchToProps)(Page);
