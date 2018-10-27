import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  margin: 20px 0 0 0;
`;

const StyledButton = styled('button')`
  margin: 2px;
`;

const PresetButton = ({ value, setNumber, children }) => (
  <StyledButton onClick={event => setNumber(value)}>
    {children || value}
  </StyledButton>
);
PresetButton.propTypes = {
  value: PropTypes.string.isRequired,
  setNumber: PropTypes.func.isRequired,
  children: PropTypes.node
};

const presetValues = [
  // format: [ <value>, <optional displayed value>]
  ['0'],
  ['1'],
  ['Math.PI', 'Pi'],
  ['Math.E', 'e'],
  ['Infinity'],
  ['-Infinity'],
  ['NaN'],
  ['Number.MAX_SAFE_INTEGER', 'MAX_SAFE_INTEGER'],
  ['Number.MIN_SAFE_INTEGER', 'MIN_SAFE_INTEGER'],
  ['Number.MAX_VALUE', 'MAX_VALUE'],
  ['Number.MIN_VALUE', 'MIN_VALUE']
];

const Presets = ({ setNumber }) => {
  return (
    <StyledContainer className="presets">
      {presetValues.map(([value, displayedValue = value]) =>
        <PresetButton key={value} value={value} setNumber={setNumber}>
          {displayedValue}
        </PresetButton>
      )}
    </StyledContainer>
  );
};

Presets.propTypes = {
  setNumber: PropTypes.func.isRequired
};

export default Presets;
