# Number Inspector

This project allows people to enter numerical values or expressions and see the underlying number encoding.

## Technical debt

The denorms aren't correct.  When the exponent is 0 and the mantissa is > 0, the displayed exponent should be a maximum of -1022.