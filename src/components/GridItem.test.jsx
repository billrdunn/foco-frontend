import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GridItem from "./GridItem";

describe("<GridItem/>", () => {
  test("renders content", () => {
    const img = {
      url: "https://example.com/image.jpg",
    };

    const { container } = render(<GridItem img={img} onClick={() => {}} />);

    // screen.debug(container);

    const div = container.querySelector(".GridItem");
    expect(div).toContainHTML("https://example.com/image.jpg");
  });

  test("clicking on grid item triggers onClick", async () => {
    const img = {
      url: "https://example.com/image.jpg",
    };

    const mockOnClick = jest.fn();

    const { container } = render(<GridItem img={img} onClick={mockOnClick} />);

    const user = userEvent.setup();

    const gridItemImg = container.querySelector(".GridItemImg");

    await user.click(gridItemImg);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
