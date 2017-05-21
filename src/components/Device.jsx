import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Page as UiPage, Content } from './common/Page';
import * as action from '../actions/creators';

let Device = ({ selectedDeviceId, onClose }) =>
  <UiPage>
    <Content>
      Current device: {selectedDeviceId}
    </Content>
    <footer className="ui-footer ui-bottom-button ui-fixed">
      <a href="#close" onClick={onClose} className="ui-btn">OK</a>
    </footer>
  </UiPage>;

Device.propTypes = {
  selectedDeviceId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedDeviceId: state.ui.selectedDeviceId,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(action.closeDevice()),
});

Device = connect(mapStateToProps, mapDispatchToProps)(Device);

export default Device;
