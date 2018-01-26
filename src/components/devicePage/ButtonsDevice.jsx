import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List } from '../common/List';

import * as action from '../../actions/creators';

const ButtonsDevice = ({
  device, activeButtonId, onActivateButton, onClickButton,
}) => {
  const { buttons } = device.config;
  const activeOptionId = activeButtonId || buttons[0].id;

  const getListItemContent = button => (
    <div>
      <div className="vertical-align-middle">
        <input
          type="radio"
          readOnly
          checked={button.id === device.attributes[0].value}
        />
      </div>
      <div className="vertical-align-middle">
        &nbsp;{button.text}
      </div>
    </div>);

  return (<List
    options={buttons.map(b => ({
      id: b.id,
      content: getListItemContent(b),
    }))}
    activeOptionId={activeOptionId}
    onActivateOption={onActivateButton}
    onSelectOption={onClickButton}
  />);
};

ButtonsDevice.propTypes = {
  device: PropTypes.shape({
    attributes: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
  }).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsDevice);
