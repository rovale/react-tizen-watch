import React from 'react';
import PropTypes from 'prop-types';

const Thermostat = ({ device }) => (
  <div>
    {device.title}<br />
    <div className="ui-li-sub-text">
      {device.attributes[0].acronym } {device.attributes[0].value}{device.attributes[0].unit}
    </div>
  </div>
);

Thermostat.propTypes = {
  device: PropTypes.shape({
    title: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Thermostat;
