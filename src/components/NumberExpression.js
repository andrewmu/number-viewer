import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { toNonScientificString, EXPONENT_BIAS } from '../services/numerical';

const Expression = styled('div')`
  font-size: 3em;
  margin: 5px;

  .sign {
    background-color: #fec;
  }
  .mantissa {
    background-color: #bef;
  }
  sup {
    font-size: 50%;
    background-color: #cfc;
  }
`;

const NumberExpression = ({
  number,
  sign,
  exponent,
  upperMantissa,
  lowerMantissa,
  mantissa
}) =>
  exponent !== 0x7ff ? (
    <Expression>
      {number} = <span className="sign">{sign > 0 ? '-' : '+'}</span>
      <span className="mantissa">{toNonScientificString(mantissa)}</span>
      &times;2
      <sup>{exponent - EXPONENT_BIAS}</sup>
    </Expression>
  ) : (
    <Expression>
      {upperMantissa === 0 && lowerMantissa === 0 ? (
        <span>
          <span className="sign">{`${sign ? '-' : '+'}`}</span>
          Infinity
        </span>
      ) : (
        <span>
          <span className="sign">{`${sign ? '-' : '+'}`}</span>
          NaN
        </span>
      )}
    </Expression>
  );

NumberExpression.propTypes = {
  number: PropTypes.number,
  sign: PropTypes.number, // integer
  exponent: PropTypes.number, // integer
  upperMantissa: PropTypes.number, // integer
  lowerMantissa: PropTypes.number, // integer
  mantissa: PropTypes.number // float
};

export default NumberExpression;
