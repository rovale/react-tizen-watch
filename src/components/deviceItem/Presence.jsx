import React from 'react';
import PropTypes from 'prop-types';

const Presence = ({ device }) => (
  <div>
    <div className="vertical-align-middle">
      <input
        type="checkbox"
        readOnly
        checked={device.attributes[0].value}
      />
    </div>
    <div className="vertical-align-middle">
      &nbsp;{device.title}
    </div>
  </div>
);

Presence.propTypes = {
  device: PropTypes.shape({
    attributes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Presence;
