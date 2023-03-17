import { n as numberKeys } from './key-4c5a210a.js';

function isValidDecimal(value) {
  return !Number.isInteger(Number(value));
}
function isValidNumber(numberString) {
  return !(!numberString || isNaN(Number(numberString)));
}
function parseNumberString(numberString) {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return null;
  }
  let containsDecimal = false;
  const result = numberString
    .split("")
    .filter((value, i) => {
    if (value.match(/\./g) && !containsDecimal) {
      containsDecimal = true;
      return true;
    }
    if (value.match(/\-/g) && i === 0) {
      return true;
    }
    return numberKeys.includes(value);
  })
    .reduce((string, part) => string + part);
  return isValidNumber(result) ? Number(result).toString() : null;
}
function sanitizeDecimalString(decimalString) {
  return (decimalString === null || decimalString === void 0 ? void 0 : decimalString.endsWith(".")) ? decimalString.replace(".", "") : decimalString;
}
function sanitizeNumberString(value) {
  return value ? Number(sanitizeDecimalString(value)).toString() : value;
}
function stringContainsNumbers(string) {
  return numberKeys.some((number) => string.includes(number));
}

export { isValidDecimal as a, sanitizeNumberString as b, isValidNumber as i, parseNumberString as p, sanitizeDecimalString as s };
