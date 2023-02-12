# Number Inspector

This project allows people to enter numerical values or expressions and see the underlying number encoding.

## Technical debt

The denorms aren't correct.  When the exponent is 0 and the mantissa is > 0, the displayed exponent should be a maximum of -1022. - might be ok now, will need to confirm

Need to enable linting in the editor (VSC)

# TODO

Add more information about the encoding

Make it clear that this is the IEEE 754 double precision encoding (64b)

Fix the link styling

In the map, make denorm values not overlap 'norms'