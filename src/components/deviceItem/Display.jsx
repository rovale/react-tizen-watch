import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ device }) => {
  const getLine = (key, a1, a2) => (
    <div key={key} className="ui-li-sub-text">
      {a1.acronym }: {a1.value}{a1.unit}
      {!!a2 && <span>,&nbsp;{a2.acronym }: {a2.value}{a2.unit}</span>}
    </div>
  );

  const getLines = () => {
    const lines = [];
    for (let i = 0; i < device.attributes.length; i += 2) {
      lines.push(getLine(i, device.attributes[i], device.attributes[i + 1]));
    }
    return lines;
  };

  return (
    <div>
      <div>{device.title}</div>
      {getLines()}
    </div>
  );
};

Display.propTypes = {
  device: PropTypes.shape({
    title: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Display;
