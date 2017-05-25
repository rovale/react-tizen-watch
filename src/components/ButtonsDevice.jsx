import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List } from './common/List';

import * as action from '../actions/creators';

let ButtonsDevice = ({ device, activeButtonId, onActivateButton, onClickButton }) => {
  const buttons = device.config.buttons;
  const activeOptionId = activeButtonId || buttons[0].id;

  return (<List
    options={buttons.map(b => ({ id: b.id, title: b.text }))}
    activeOptionId={activeOptionId}
    onActivateOption={onActivateButton}
    onSelectOption={onClickButton}
  />);
};

ButtonsDevice.propTypes = {
  device: PropTypes.object.isRequired,
  activeButtonId: PropTypes.string,
  onActivateButton: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

ButtonsDevice.defaultProps = {
  activeButtonId: null,
};

const mapStateToProps = state => ({
  activeButtonId: state.ui.activeButtonId,
});

const mapDispatchToProps = dispatch => ({
  onActivateButton: id => dispatch(action.activateButton(id)),
  onClickButton: id => dispatch(action.clickButton(id)),
});

ButtonsDevice = connect(mapStateToProps, mapDispatchToProps)(ButtonsDevice);

export default ButtonsDevice;
