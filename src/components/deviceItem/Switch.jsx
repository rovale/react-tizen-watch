import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ device }) => (
  <div>
    <div className="ui-toggleswitch vertical-align-middle">
      <input
        type="checkbox"
        className="ui-switch-input"
        readOnly
        checked={device.attributes[0].value}
      />
      <div className="ui-switch-button" />
    </div>
    <div className="vertical-align-middle">
      &nbsp;{device.title}
    </div>
  </div>
);

Switch.propTypes = {
  device: PropTypes.shape({
    attributes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Switch;
