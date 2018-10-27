import React from 'react';
import styled from 'styled-components';

const Table = styled('table')`
  margin: 20px auto;
  border-collapse: collapse;
  border-radius: 4px;

  tr th {
    text-align: left;
  }
  tr th,
  tr td {
    font-size: 1.2rem;
    padding: 8px 12px;
  }

  tr {
    background-color: #ddd;
  }
  tr .sign {
    background-color: #fec;
    text-align: center;
  }
  tr .exponent {
    background-color: #cfc;
  }
  tr .mantissa {
    background-color: #bef;
  }

  tr th {
    background-color: #ccc;
  }
  tr th.sign {
    background-color: #fc0;
  }
  tr th.exponent {
    background-color: #7e7;
  }
  tr th.mantissa {
    background-color: #0cf;
  }

  tbody tr .sign,
  tbody tr .exponent,
  tbody tr .mantissa {
    font-family: monospace;
  }
`;

const NumberMap = () => (
  <Table>
    <thead>
      <tr>
        <th className="sign">Sign</th>
        <th className="exponent">Exponent</th>
        <th className="mantissa">Mantissa</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="sign">0</td>
        <td className="exponent">11111111111</td>
        <td className="mantissa">00000..00001&ndash;11111..11111</td>
        <td>NaN (quiet and signalling)</td>
      </tr>
      <tr>
        <td className="sign">0</td>
        <td className="exponent">11111111111</td>
        <td className="mantissa">00000..00000</td>
        <td>Positive Infinity</td>
      </tr>
      <tr>
        <td className="sign">0</td>
        <td className="exponent">00000000001&ndash;11111111110</td>
        <td className="mantissa">00000..00000&ndash;11111..11111</td>
        <td>
          Normalised numbers (1.0*2
          <sup>-1022</sup> to 1.999999*2
          <sup>1023</sup>)
        </td>
      </tr>
      <tr>
        <td className="sign">0</td>
        <td className="exponent">00000000000</td>
        <td className="mantissa">00000..00000&ndash;11111..11111</td>
        <td>
          Denormalised numbers (1.0*2
          <sup>-(1023+51)</sup> to 0.999999*2
          <sup>-1023</sup>)
        </td>
      </tr>
      <tr>
        <td className="sign">0</td>
        <td className="exponent">00000000000</td>
        <td className="mantissa">00000..00000</td>
        <td>Positive Zero</td>
      </tr>
      <tr>
        <td className="sign">1</td>
        <td className="exponent">00000000000</td>
        <td className="mantissa">00000..00000</td>
        <td>Negative Zero</td>
      </tr>
      <tr>
        <td className="sign">1</td>
        <td className="exponent">00000000000</td>
        <td className="mantissa">00000..00000&ndash;11111..11111</td>
        <td>
          Negative denormalised numbers (-1.0*2
          <sup>-(1023+51)</sup> to -0.999999*2
          <sup>-1023</sup>)
        </td>
      </tr>
      <tr>
        <td className="sign">1</td>
        <td className="exponent">00000000001&ndash;11111111110</td>
        <td className="mantissa">00000..00000&ndash;11111..11111</td>
        <td>
          Negative normalised numbers (-1.0*2
          <sup>-1022</sup> to -1.999999*2
          <sup>1023</sup>)
        </td>
      </tr>
      <tr>
        <td className="sign">1</td>
        <td className="exponent">11111111111</td>
        <td className="mantissa">00000..00000</td>
        <td>Negative Infinity</td>
      </tr>
      <tr>
        <td className="sign">1</td>
        <td className="exponent">11111111111</td>
        <td className="mantissa">00000..00001&ndash;11111..11111</td>
        <td>Negative NaN (quiet and signalling)</td>
      </tr>
    </tbody>
  </Table>
);

export default NumberMap;
