import FinancialValues, { roundUp, roundDown } from "./financialValues";

test("round down", () => {
  {
    const value = "2.22999999999";
    const actual = roundDown(value);
    const expected = 2.22;
    expect(actual).toBe(expected);
  }
  {
    const value = "125.3933333";
    const actual = roundDown(value);
    const expected = 125.39;
    expect(actual).toBe(expected);
  }
});

test("round up", () => {
  {
    const value = "2.2222222222";
    const actual = roundUp(value);
    const expected = 2.23;
    expect(actual).toBe(expected);
  }
  {
    const value = "125.3903";
    const actual = roundUp(value);
    const expected = 125.4;
    expect(actual).toBe(expected);
  }
  {
    const value = "125.3900000001";
    const actual = roundUp(value);
    const expected = 125.4;
    expect(actual).toBe(expected);
  }
});
