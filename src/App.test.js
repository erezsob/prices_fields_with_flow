import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom
// import "jest-dom/extend-expect";
import { StyledApp as App } from "./index";

afterEach(cleanup);

test.skip("test....", () => {
  const { getByPlaceholderText } = render(<App />);

  // const purchase = getByTestId("purchase");
  const purchase = getByPlaceholderText("Purchase Price");
  purchase.value = "100";
  fireEvent.change(purchase);
  console.log(purchase);
  // Assert
  expect(getByPlaceholderText("Purchase Price").value).toBe("100");
  // expect(getByPlaceholderText("Net").value).toBe("100");
  // expect(getByPlaceholderText("Final Price").value).toBe("100");
  // expect(getByTestId("ok-button")).toHaveAttribute("disabled");
  // snapshots work great with regular DOM nodes!
  // expect(container.firstChild).toMatchSnapshot();
});
