import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../actions/creators';
import { Page as UiPage, Header, Content } from './common/Page';
import { List } from './common/List';

import './Page.css';

let Page = ({ pageTitle, devices, activeDeviceId,
  onActivateDevice, onSelectDevice, onToggleSwitch }) => {
  const getListItemContent = (item) => {
    if (item.template === 'switch') {
      return (
        <div>
          {(item.attributes[0].value) ?
            <i className="fa fa-power-off switch-on" aria-hidden="true" /> :
            <i className="fa fa-power-off switch-off" aria-hidden="true" />}
          &nbsp;{item.title}
        </div>);
    }
    return <div>{`${item.title}`}</div>;
  };

  const getOnSelect = (item) => {
    if (item.template === 'switch') {
      return () => onToggleSwitch(item.id);
    }
    return null;
  };

  const deviceOptions = devices.map(d => ({
    ...d,
    content: getListItemContent(d),
    onSelect: getOnSelect(d),
  }));

  return (<UiPage>
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

Page = connect(mapStateToProps, mapDispatchToProps)(Page);

export default Page;
