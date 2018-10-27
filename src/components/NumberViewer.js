import React, { Component } from 'react';
import styled from 'styled-components';

import ValueInput from './ValueInput';
import Presets from './Presets';
import DoubleFloatTable from './DoubleFloatTable';
import NumberExpression from './NumberExpression';

import {
  extractDoubleParts,
  createDoubleFromParts,
  minimumDecrementParts,
  minimumIncrementParts
} from '../services/numerical';

const InputContainer = styled('div')`
  padding: 10px 0;
`;

const RepresentationContainer = styled('div')`
  margin: 10px;
`;

class NumberViewer extends Component {
  constructor () {
    super();
    this.state = {
      inputString: '0.0'
    };
  }

  render () {
    const setNumber = inputString => this.setState({ inputString });

    let num = 0;
    let numParts = {};
    try {
      /* eslint no-eval: "off" */
      /* eslint security/detect-eval-with-expression: "off" */
      num = eval(this.state.inputString);
      numParts = extractDoubleParts(num);
    } catch (e) {
      console.log('failed');
    }

    const higher = minimumIncrementParts(numParts);
    const lower = minimumDecrementParts(numParts);

    return (
      <div>
        <InputContainer>
          <ValueInput value={this.state.inputString} setNumber={setNumber} />
          <Presets setNumber={setNumber} />
        </InputContainer>

        <DoubleFloatTable {...numParts} />

        <RepresentationContainer>
          <button
            className="adjacent"
            onClick={e => setNumber(createDoubleFromParts(higher).toString())}
          >
            &uarr; {createDoubleFromParts(higher).toString()}
          </button>
          <NumberExpression number={num} {...numParts} />
          <button
            className="adjacent"
            onClick={e => setNumber(createDoubleFromParts(lower).toString())}
          >
            &darr; {createDoubleFromParts(lower).toString()}
          </button>
        </RepresentationContainer>
      </div>
    );
  }
}

export default NumberViewer;
