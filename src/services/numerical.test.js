import { extractDoubleParts, toNonScientificString } from './numerical';

describe('extractDoubleParts', () => {
  it('extracts the bits from positive zero', () => {
    const parts = extractDoubleParts(0.0);
    expect(parts).toMatchObject({
      sign: 0,
      exponent: 0,
      upperMantissa: 0,
      lowerMantissa: 0,
      mantissa: 0
    });
  });

  it('extracts the bits from negative zero', () => {
    const parts = extractDoubleParts(-0.0);
    expect(parts).toMatchObject({
      sign: 1,
      exponent: 0,
      upperMantissa: 0,
      lowerMantissa: 0,
      mantissa: 0
    });
  });

  it('extracts the bits from one', () => {
    const parts = extractDoubleParts(1.0);
    expect(parts).toMatchObject({
      sign: 0,
      exponent: 1023,
      upperMantissa: 0,
      lowerMantissa: 0,
      mantissa: 1.0
    });
  });

  it('extracts the bits from Infinity', () => {
    const parts = extractDoubleParts(Infinity);
    expect(parts).toMatchObject({
      sign: 0,
      exponent: 0x7ff,
      upperMantissa: 0,
      lowerMantissa: 0
    });
  });

  it('extracts the bits from NaN', () => {
    const parts = extractDoubleParts(NaN);
    expect(parts).toMatchObject({
      sign: 0,
      exponent: 0x7ff,
      upperMantissa: 0x80000,
      lowerMantissa: 0
    });
  });
});

describe('toNonScientificString', () => {
  it('formats 0', () => {
    expect(toNonScientificString(0.0)).toBe('0');
  });

  it('formats 1', () => {
    expect(toNonScientificString(1.0)).toBe('1');
  });

  it('formats 1.0e-10', () => {
    expect(toNonScientificString(1.0e-10)).toBe('0.0000000001');
  });

  it('formats 1.0e10', () => {
    expect(toNonScientificString(1.0e10)).toBe('10000000000');
  });
});
