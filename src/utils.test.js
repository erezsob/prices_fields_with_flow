import { calcGross, calcPurchase, calcMargin, calcNet } from "./utils";

describe("calcPurchase", () => {
  it("should calculate based on valid gross price, margin and tax", () => {
    const actual = calcPurchase(
      {
        gross: "17.85",
        tax: "0.19",
        margin: "0.5"
      },
      "gross"
    );
    const expected = 10;
    expect(actual).toBe(expected);
  });

  it("should calculate based on valid gross price and tax", () => {
    const actual = calcPurchase(
      {
        gross: "119",
        tax: "0.19"
      },
      "gross"
    );
    const expected = 100;
    expect(actual).toBe(expected);
  });

  it("should re-calculate purchase when purchase already exists and net is being altered", () => {
    const actual = calcPurchase(
      {
        purchase: "105.37",
        net: "120"
      },
      "net"
    );
    const expected = "120";
    expect(actual).toBe(expected);
  });

  it("should not re-calculate purchase when purchase already exists and margin is being added", () => {
    const actual = calcPurchase(
      {
        purchase: "105.37",
        margin: "0.30"
      },
      "margin"
    );
    const expected = 105.37;
    expect(actual).toBe(expected);
  });

  it("should calculate based on valid gross price, tax and net", () => {
    const actual = calcPurchase(
      {
        gross: "119",
        net: 100,
        tax: "0.19"
      },
      "net"
    );
    const expected = 100;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcPurchase({});
    const expected = "";
    expect(actual).toBe(expected);
  });

  test("edge cases", () => {
    {
      const actual = calcPurchase({
        purchase: "sdfg",
        net: "sdfg",
        margin: "sdfg",
        tax: "sdfg",
        gross: "sdfg"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcPurchase({
        purchase: null,
        net: null,
        margin: null,
        tax: null,
        gross: null
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcPurchase(
        {
          gross:
            "17.8545564654654654654654654654654654654654654654654654654654654654654654654654654654354894984984",
          tax: "0.19",
          margin: "0.5"
        },
        "gross"
      );
      const expected = 10;
      expect(actual).toBe(expected);
    }
  });
});

describe("calcMargin", () => {
  it("should empty field when purchase and margin exists and net being changed", () => {
    const actual = calcMargin(
      {
        purchase: "84",
        margin: "0.5",
        net: "100"
      },
      "net"
    );
    const expected = "";
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcMargin({});
    const expected = "";
    expect(actual).toBe(expected);
  });

  test("edge cases", () => {
    {
      const actual = calcMargin({
        purchase: "sdfg",
        net: "sdfg",
        margin: "sdfg",
        tax: "sdfg",
        gross: "sdfg"
      });
      const expected = "sdfg";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcMargin({
        purchase: null,
        net: null,
        margin: null,
        tax: null,
        gross: null
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcMargin(
        {
          purchase:
            "84.012345678912345678912345678912345678946513456789465132465798",
          margin: "0.5",
          net: "100.219273512562793782369498724265727562519782171321972162391"
        },
        "net"
      );
      const expected = "";
      expect(actual).toBe(expected);
    }
  });
});

describe("calcNet", () => {
  it("should calculate based on valid purchase price and margin", () => {
    {
      const actual = calcNet(
        {
          purchase: "30",
          margin: "0.5"
        },
        "purchase"
      );
      const expected = 45;
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet(
        {
          purchase: "30",
          margin: "0.5"
        },
        "margin"
      );
      const expected = 45;
      expect(actual).toBe(expected);
    }
  });

  it("should only calculate when active field is either purchase or gross", () => {
    {
      const actual = calcNet(
        {
          purchase: "30",
          margin: "0.5"
        },
        "purchase"
      );
      const expected = 45;
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet(
        {
          gross: "116",
          tax: 0.16
        },
        "gross"
      );
      const expected = 100;
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet(
        {
          purchase: "30",
          margin: "0.5"
        },
        "somethingElse"
      );
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet({
        purchase: "30",
        margin: "1.5"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
  });

  it("should reset the field when invalid values are provided", () => {
    {
      const actual = calcNet({
        purchase: "",
        net: "30"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet({
        gross: "",
        purchase: "30",
        net: "30"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcNet({});
    const expected = "";
    expect(actual).toBe(expected);
  });

  test("edge cases", () => {
    {
      const actual = calcNet({
        purchase: "sdfg",
        net: "sdfg",
        margin: "sdfg",
        tax: "sdfg",
        gross: "sdfg"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet({
        purchase: null,
        net: null,
        margin: null,
        tax: null,
        gross: null
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet(
        {
          purchase: "30.123465489513584989845313546981531581564849849123135465",
          margin: "0.5"
        },
        "purchase"
      );
      const expected = 45.18;
      expect(actual).toBe(expected);
    }
    {
      const actual = calcNet(
        {
          gross: "116.1455643484864613513515115153434364526484986549865134516",
          tax: 0.16
        },
        "gross"
      );
      const expected = 100.12;
      expect(actual).toBe(expected);
    }
  });
});

describe("calcGross", () => {
  it("should calculate based on valid pruchase price, margin and tax", () => {
    const actual = calcGross({
      purchase: "200",
      margin: "2",
      tax: "0.19"
    });
    const expected = 714;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase price and margin", () => {
    const actual = calcGross({
      purchase: "200",
      margin: "2"
    });
    const expected = 600;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase price and tax", () => {
    const actual = calcGross({
      purchase: "200",
      tax: "0.16"
    });
    const expected = 232;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase", () => {
    const actual = calcGross({
      purchase: "200"
    });
    const expected = 200;
    expect(actual).toBe(expected);
  });

  it("should only calculate when the active field is not itself", () => {
    {
      const actual = calcGross(
        {
          purchase: "200"
        },
        "gross"
      );
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcGross(
        {
          purchase: "200"
        },
        "purchase"
      );
      const expected = 200;
      expect(actual).toBe(expected);
    }
    {
      // when active field is not the field in question, "activeField" can be ommitted
      const actual = calcGross({
        purchase: "200"
      });
      const expected = 200;
      expect(actual).toBe(expected);
    }
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcGross({});
    const expected = "";
    expect(actual).toBe(expected);
  });

  test("edge cases", () => {
    {
      const actual = calcGross({
        purchase: "sdfg",
        net: "sdfg",
        margin: "sdfg",
        tax: "sdfg",
        gross: "sdfg"
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcGross({
        purchase: null,
        net: null,
        margin: null,
        tax: null,
        gross: null
      });
      const expected = "";
      expect(actual).toBe(expected);
    }
    {
      const actual = calcGross({
        purchase: "200.45646541651654867478974954135135487",
        margin: "2",
        tax: "0.19"
      });
      const expected = 715.62;
      expect(actual).toBe(expected);
    }
  });
});
