import React from "react";
import { shallow, mount, render } from "enzyme";
import { StyledApp as App } from "./index";

describe("coming from base", () => {
  const wrapper = mount(<App />);
  const purchaseField = wrapper.find('[data-testid="purchase"]').find("input");
  const marginField = wrapper.find('[data-testid="margin"]').find("input");
  const netField = wrapper.find('[data-testid="net"]').find("input");
  const taxField = wrapper.find('[data-testid="tax"]').find("input");
  const grossField = wrapper.find('[data-testid="gross"]').find("input");
  test("inputing just purchaser price", () => {
    purchaseField.simulate("change", { target: { value: "100" } });
    expect(
      wrapper
        .find('[data-testid="net"]')
        .find("input")
        .prop("value")
    ).toBe(100);
    expect(
      wrapper
        .find('[data-testid="tax"]')
        .find("input")
        .prop("value")
    ).toBe("0.19");
    expect(
      wrapper
        .find('[data-testid="gross"]')
        .find("input")
        .prop("value")
    ).toBe(119);
  });
  test("inputing purchase and margin", () => {
    purchaseField.simulate("change", { target: { value: "100" } });
    marginField.simulate("change", { target: { value: "10" } });
    expect(
      wrapper
        .find('[data-testid="net"]')
        .find("input")
        .prop("value")
    ).toBe(110);
    expect(
      wrapper
        .find('[data-testid="tax"]')
        .find("input")
        .prop("value")
    ).toBe("0.19");
    expect(
      wrapper
        .find('[data-testid="gross"]')
        .find("input")
        .prop("value")
    ).toBe(130.9);
  });
});
