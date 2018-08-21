import _ from "lodash/fp";

const ROUND_MODES = {
  ROUND_DOWN: "ROUND_DOWN",
  ROUND_UP: "ROUND_UP"
};

export default class FinancialValues {
  static get ROUND_MODES() {
    return ROUND_MODES;
  }

  static roundAmount(value, mode) {
    const roundDown = i => (mode === ROUND_MODES.ROUND_DOWN ? i - 1 : i);
    const roundUp = i => (mode === ROUND_MODES.ROUND_DOWN ? i : i + 1);

    // const parsedValue = parseFloat(value);
    const fixedTo = 2;
    const base = Math.pow(10, fixedTo);
    const findExtra = value * base;
    const fullValue = Math.floor(findExtra);

    const surpress = findExtra - fullValue;
    const amount =
      surpress !== 0
        ? (surpress < 0.5 ? roundDown(fullValue) : roundUp(fullValue)) / base
        : value;

    return {
      amount,
      difference: value - amount
    };
  }
}

// Source: http://www.jacklmoore.com/notes/rounding-in-javascript/
const round = _.curry((decimals, roundDirection, value) => {
  const direction = roundDirection === "up" ? "ceil" : "floor";
  return Number(Math[direction](value + "e" + decimals) + "e-" + decimals);
});

const roundTo2 = round(2);
export const roundUp = roundTo2("up");
export const roundDown = roundTo2("down");

// export const roundDown = val =>
//   FinancialValues.roundAmount(val, FinancialValues.ROUND_MODES.ROUND_DOWN)
//     .amount;

// export const roundUp = val =>
//   FinancialValues.roundAmount(val, FinancialValues.ROUND_MODES.ROUND_UP).amount;
