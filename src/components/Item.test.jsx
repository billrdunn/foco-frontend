import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

const mockItem = {
  latin: "latin info",
  common: ["common 1", "common 2"],
  description: {
    cap: "cap info",
    gills: "gills info",
    stem: "stem info",
    flesh: "flesh info",
    spores: "spores info",
  },
  habitat: "habitat info",
  flavour: "flavour info",
  frequency: "frequency info",
  image: "image info",
};

describe("<Item />", () => {
  let container;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(<Item item={mockItem} found handleToggleFound={mockHandler} />).container;
  });
  test("clicking the button calls event handler once", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("toggle found");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  test("by default an item shows latin and common name but nothing else", async () => {
    const itemDetailsDiv = container.querySelector("#itemDetailsDiv");
    expect(itemDetailsDiv).toBeNull();

    const itemBasicDiv = container.querySelector("#itemBasicDiv");
    expect(itemBasicDiv).toHaveTextContent("latin info");
    expect(itemBasicDiv).toHaveTextContent("common 1");
  });

  test("when view details button is clicked all the information is shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view details");
    await user.click(button);
    
    const itemBasicDiv = container.querySelector("#itemBasicDiv");
    expect(itemBasicDiv).toBeNull();

    const itemDetailsDiv = container.querySelector("#itemDetailsDiv");
    expect(itemDetailsDiv).toHaveTextContent("latin info");
    expect(itemDetailsDiv).toHaveTextContent("common 1");
    expect(itemDetailsDiv).toHaveTextContent("cap info");
    expect(itemDetailsDiv).toHaveTextContent("gills info");
    expect(itemDetailsDiv).toHaveTextContent("flesh info");
    expect(itemDetailsDiv).toHaveTextContent("spores info");
    expect(itemDetailsDiv).toHaveTextContent("habitat info");
    expect(itemDetailsDiv).toHaveTextContent("flavour info");
    expect(itemDetailsDiv).toHaveTextContent("frequency info");
  });

  test("if the toggle found button is called twice, the event handler registers two events", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("toggle found");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
