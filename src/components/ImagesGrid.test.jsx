import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import ImagesGrid from "./ImagesGrid";
import store from "../store";

describe("<ImagesGrid />", () => {
  let container;
  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <ImagesGrid />
      </Provider>
    ).container;
  });
  test("renders content", () => {
    expect(container.querySelector(".imagesGrid")).toBeInTheDocument();
  });

  test("gridType is grid-small by default", () => {
    expect(container.querySelector(".grid-small")).toBeInTheDocument();
    expect(container.querySelector(".grid-large")).not.toBeInTheDocument();
  });
});
