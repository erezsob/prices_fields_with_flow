import _ from "lodash/fp";
import { roundUp, roundDown } from "./financialValues";

const calcGrossFromTax = _.curry(
  (tax, value) => value + roundUp(_.multiply(value, tax))
);
const calcNetFromGrossTax = _.curry((tax, gross) =>
  _.flow(
    t => (parseFloat(t) ? _.divide(gross, 1 + parseFloat(t)) : 1),
    roundDown
  )(tax)
);

const handleMargin = margin =>
  _.flow(
    parseFloat,
    m => (Boolean(m) ? 1 + m : 1)
  )(margin);

const multiplyByMargin = _.curry((val, margin) =>
  _.flow(
    handleMargin,
    _.multiply(val)
  )(margin)
);

/**
 * @param {Object} obj
 * @param {string} obj.margin
 * @param {string} obj.net
 * @param {string} obj.tax
 * @param {string} obj.gross
 * @param {string} activeField
 * @returns {(string|number)}
 */
export const calcPurchase = (
  { purchase, margin, net, tax = "0", gross },
  activeField = ""
) => {
  if (activeField === "net" && net !== purchase) {
    return net || "";
  }
  return activeField === "gross" && Boolean(gross)
    ? _.flow(
        parseFloat,
        calcNetFromGrossTax(tax),
        x => _.divide(x, handleMargin(margin))
      )(gross)
    : parseFloat(purchase) || "";
};

/**
 * @param {tax} obj
 * @param {string} obj.purchase
 * @param {string} obj.margin
 * @param {string} obj.net
 * @param {string} activeField
 * @returns {(string|number)}
 */
export const calcMargin = ({ purchase, margin, net }, activeField = "") => {
  if (activeField === "net" && purchase !== net) {
    return "";
  }
  return margin || "";
};

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.margin
 * @param {string} obj.tax
 * @param {string} obj.gross
 * @param {string} activeField
 * @returns {(string|number)}
 */
export const calcNet = ({ purchase, margin, tax, gross }, activeField = "") => {
  if (activeField === "gross") {
    return gross ? calcNetFromGrossTax(tax, gross) : "";
  }
  return Boolean(purchase) &&
    (activeField === "purchase" || activeField === "margin")
    ? _.flow(
        p => multiplyByMargin(p, margin),
        roundDown
      )(purchase)
    : "";
};

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.margin
 * @param {string} obj.net
 * @param {string} obj.tax
 * @param {string} activeField
 * @returns {(string|number)}
 */
export const calcGross = (
  { purchase, margin, net, tax = "0" },
  activeField = ""
) => {
  const nextVal =
    activeField === "margin"
      ? purchase
      : activeField === "net"
        ? net
        : purchase;
  return activeField !== "gross" && Number(nextVal)
    ? _.flow(
        v => multiplyByMargin(v, margin),
        roundDown,
        calcGrossFromTax(tax)
      )(nextVal)
    : "";
};
