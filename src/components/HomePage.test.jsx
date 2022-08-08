import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import store from "../store";

describe("<HomePage/>", () => {
  let container;
  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    ).container;
  });
  test("renders content", () => {
    expect(container.querySelector(".homePage")).toBeInTheDocument();
  });
});
