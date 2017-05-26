import React from 'react';
import PropTypes from 'prop-types';

const Temperature = ({ device }) => (
  <div>
    <div>{device.title}</div>
    <div className="ui-li-sub-text">
      {device.attributes[0].acronym } {device.attributes[0].value}{device.attributes[0].unit}
      ,&nbsp;
      {device.attributes[1].acronym } {device.attributes[1].value}{device.attributes[1].unit}
    </div>
  </div>
);

Temperature.propTypes = {
  device: PropTypes.shape({
    title: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Temperature;
