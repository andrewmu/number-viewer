import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { toNonScientificString, EXPONENT_BIAS } from '../services/numerical';

const StyledTable = styled('table')`
  margin: 10px 0;

  border-spacing: 1px;

  && .sign {
    background-color: #fc0;
  }
  && .positions .sign {
    background-color: #fec;
  }
  && .exponent {
    background-color: #7e7;
  }
  && .positions .exponent {
    background-color: #cfc;
  }
  && .mantissa {
    background-color: #0cf;
  }
  && .implicit-digit,
  && .positions .mantissa {
    background-color: #bef;
  }
  && th,
  && td {
    text-align: center;
    padding: 2px;
  }
`;

const BitsRow = styled('tr')`
  font-family: monospace;
  font-size: 10px;

  td.bit-1 {
    font-weight: bold;
  }

  td.sign.bit-1 {
    background-color: #c90;
  }
  td.exponent.bit-1 {
    background-color: #5a5;
  }
  td.mantissa.bit-1 {
    background-color: #09c;
  }
`;

const NumericRow = styled('tr')`
  font-size: 2rem;
  .biased {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const Bit = ({ className, bit }) => (
  <td className={`${className} bit-${bit}`}>{bit}</td>
);
Bit.propTypes = {
  className: PropTypes.string,
  bit: PropTypes.number
};

export default function DoubleFloatTable ({
  sign,
  exponent,
  upperMantissa,
  lowerMantissa,
  mantissa
}) {
  let implicitDigit = '1.';
  if (exponent === 0) {
    implicitDigit = '0.';
  } else if (exponent === 0x7ff) {
    implicitDigit = ' - ';
  }

  let displayedMantissa = (mantissa !== undefined && toNonScientificString(mantissa)) || '~';
  if (exponent === 0x7ff) {
    if (upperMantissa === 0 && lowerMantissa === 0) {
      displayedMantissa = '0';
    } else {
      displayedMantissa = '0x' + ((upperMantissa * 2 ** 32) + lowerMantissa).toString(16);
    }
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="sign">Sign</th>
          <th className="exponent" colSpan={11}>
            Exponent
          </th>
          <th className="mantissa" colSpan={53}>
            Mantissa
          </th>
        </tr>
        <BitsRow className="positions">
          <th className="sign">63</th>
          {Array.from({ length: 11 }, (_, i) => i).map(i => (
            <th className="exponent" key={i}>
              {62 - i}
            </th>
          ))}
          <th className="mantissa" />
          {Array.from({ length: 52 }, (_, i) => i).map(i => (
            <th className="mantissa" key={i}>
              {51 - i < 10 ? '0' : ''}
              {51 - i}
            </th>
          ))}
        </BitsRow>
      </thead>
      <tbody>
        <BitsRow>
          <Bit className="sign" bit={sign} />
          {Array.from({ length: 11 }, (_, i) => i).map(i => (
            <Bit
              className="exponent"
              bit={(exponent >> (10 - i)) & 0x1}
              key={`exponent-${i}`}
            />
          ))}
          <td className="implicit-digit">{implicitDigit}</td>
          {Array.from({ length: 20 }, (_, i) => i).map(i => (
            <Bit
              className="mantissa"
              bit={(upperMantissa >> (19 - i)) & 0x1}
              key={`upperMantissa-${i}`}
            />
          ))}
          {Array.from({ length: 32 }, (_, i) => i).map(i => (
            <Bit
              className="mantissa"
              bit={(lowerMantissa >> (31 - i)) & 0x1}
              key={`lowerMantissa-${i}`}
            />
          ))}
        </BitsRow>
        <NumericRow>
          <td className="sign">
            {(sign !== undefined && (sign > 0 ? '-' : '+')) || '~'}
          </td>
          <td className="exponent" colSpan="11">
            {(exponent !== undefined && (
              <span className="biased">({exponent})</span>
            )) ||
              '~'}
            {exponent !== undefined && exponent - EXPONENT_BIAS}
          </td>
          <td className="mantissa" colSpan="53">{displayedMantissa}</td>
        </NumericRow>
      </tbody>
    </StyledTable>
  );
}

DoubleFloatTable.propTypes = {
  sign: PropTypes.number, // integer
  exponent: PropTypes.number, // integer
  upperMantissa: PropTypes.number, // integer
  lowerMantissa: PropTypes.number, // integer
  mantissa: PropTypes.number // float
};
