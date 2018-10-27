import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  input,
  && {
    font-size: 3rem;
  }
  input {
    border: 1px solid #999;
    border-radius: 6px;
    margin-left: 20px;
    padding: 0 10px;
  }
`;

const ValueInput = ({ value, setNumber }) => (
  <StyledContainer className="inputArea">
    <label htmlFor="inputText">
      Value
      <input
        type="text"
        id="inputText"
        style={{
          width: `${Math.max(3, value.length * 0.58)}em`
        }}
        value={value}
        onChange={event => setNumber(event.target.value)}
      />
    </label>
  </StyledContainer>
);
ValueInput.propTypes = {
  value: PropTypes.string,
  setNumber: PropTypes.func.isRequired
};

export default ValueInput;
