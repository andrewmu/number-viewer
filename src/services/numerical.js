export const EXPONENT_BIAS = 1023;

export const extractDoubleParts = (n) => {
  let floatArray = Float64Array.of(n);
  const intView = new Uint32Array(floatArray.buffer);

  const sign = (intView[1] >> 31) & 0x1;
  const exponent = (intView[1] >> 20) & 0x7ff;
  const upperMantissa = intView[1] & 0x000fffff;
  const lowerMantissa = intView[0];

  const mantissa =
    exponent !== 0
      ? createDoubleFromParts({
          sign: 0,
          exponent: EXPONENT_BIAS,
          upperMantissa,
          lowerMantissa,
        })
      : upperMantissa * Math.pow(2, -20) + lowerMantissa * Math.pow(2, -52); // denorm

  return {
    sign,
    exponent,
    upperMantissa,
    lowerMantissa,
    mantissa,
  };
};

export const createDoubleFromParts = ({ sign, exponent, upperMantissa, lowerMantissa }) => {
  let intArray = new Int32Array(2);
  intArray[0] = lowerMantissa;
  intArray[1] = (sign << 31) | (exponent << 20) | upperMantissa;

  let floatView = new Float64Array(intArray.buffer);
  return floatView[0];
};

export const minimumIncrementParts = ({ sign, exponent, upperMantissa, lowerMantissa }) => {
  if (lowerMantissa === 0xffffffff) {
    if (upperMantissa === 0xfffff) {
      upperMantissa = 0;
      lowerMantissa = 0;
      exponent += 1;
    } else {
      upperMantissa += 1;
      lowerMantissa = 0;
    }
  } else {
    lowerMantissa += 1;
  }

  return {
    sign,
    exponent,
    upperMantissa,
    lowerMantissa,
  };
};

export const minimumDecrementParts = ({ sign, exponent, upperMantissa, lowerMantissa }) => {
  if (lowerMantissa === 0) {
    if (upperMantissa === 0) {
      upperMantissa = 0xfffff;
      lowerMantissa = 0xffffffff;
      exponent -= 1;
    } else {
      upperMantissa -= 1;
      lowerMantissa = 0xffffffff;
    }
  } else {
    lowerMantissa -= 1;
  }

  return {
    sign,
    exponent,
    upperMantissa,
    lowerMantissa,
  };
};

export const toNonScientificString = (n) => {
  try {
    let str = n.toString();
    if (str.includes('e')) {
      const [[whole, fraction], [exp]] = str.split('e').map((parts) => parts.split('.'));

      let digits = String(parseInt(whole));
      if (fraction !== undefined) digits += fraction;

      const exp10 = parseInt(exp);
      if (exp10 < 0) {
        str = '0.' + '0'.repeat(-exp10 - 1) + digits.substring(0, Math.max(1, 17 + exp10));
      } else if (exp10 > 0) {
        str = digits + '0'.repeat(exp10 - 1);
      }
    }
    return str;
  } catch (e) {
    return 0;
  }
};
