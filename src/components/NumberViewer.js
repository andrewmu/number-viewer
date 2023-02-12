import React, { Component, useState } from 'react';
import styled from 'styled-components';

import ValueInput from './ValueInput';
import Presets from './Presets';
import DoubleFloatTable from './DoubleFloatTable';
import NumberExpression from './NumberExpression';

import {
  extractDoubleParts,
  createDoubleFromParts,
  minimumDecrementParts,
  minimumIncrementParts,
} from '../services/numerical';

const InputContainer = styled('div')`
  padding: 10px 0;
`;

const RepresentationContainer = styled('div')`
  margin: 10px;
`;

const NumberViewer = () => {
  const [inputString, setInputString] = useState('0.0');

  let num = 0;
  let numParts = {};
  try {
    /* eslint no-eval: "off" */
    num = eval(inputString);
    numParts = extractDoubleParts(num);
  } catch (e) {
    console.log('failed', num);
  }

  const higher = minimumIncrementParts(numParts);
  const lower = minimumDecrementParts(numParts);

  return (
    <div>
      <InputContainer>
        <ValueInput value={inputString} setNumber={setInputString} />
        <Presets setNumber={setInputString} />
      </InputContainer>

      <DoubleFloatTable {...numParts} />

      <RepresentationContainer>
        <button
          className="adjacent"
          onClick={() => setInputString(createDoubleFromParts(higher).toString())}
        >
          &uarr; {createDoubleFromParts(higher).toString()}
        </button>
        <NumberExpression number={num} {...numParts} />
        <button
          className="adjacent"
          onClick={() => setInputString(createDoubleFromParts(lower).toString())}
        >
          &darr; {createDoubleFromParts(lower).toString()}
        </button>
      </RepresentationContainer>
    </div>
  );
};

export default NumberViewer;
