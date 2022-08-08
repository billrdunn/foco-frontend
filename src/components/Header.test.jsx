import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("<Header/> (desktop)", () => {
  let container;
  beforeEach(() => {
    // Set window width to desktop width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.dispatchEvent(new Event("resize"));
    expect(window.innerWidth).toBe(1024);
    render(<Header />);
    container = render(<Header />).container;
  });
  test("renders correct desktop content", () => {
    const desktopHeader = container.querySelector(".desktopHeader");

    expect(desktopHeader).toBeInTheDocument();
    expect(desktopHeader).toHaveTextContent("Email");
    expect(desktopHeader).toHaveTextContent("Instagram");
    expect(container.querySelector(".mobileHeader")).not.toBeInTheDocument();
  });
  test("instagram text contains link which opens in new tab", () => {
    const instagramLink = container.querySelector(".instagramLink");

    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink.getAttribute("href")).toBe("https://www.instagram.com/foco.bcn/");
    expect(instagramLink.getAttribute("target")).toBe("_blank");
  });
  test("email text contains link", () => {
    const instagramLink = container.querySelector(".emailLink");

    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink.getAttribute("href")).toBe("mailto:info@focobcn.com");
  });
});

describe("<Header/> (mobile)", () => {
  let container;
  beforeEach(() => {
    // Set window width to mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1023,
    });
    window.dispatchEvent(new Event("resize"));
    expect(window.innerWidth).toBe(1023);
    render(<Header />);
    container = render(<Header />).container;
  });
  test("renders correct mobile content", () => {
    const mobileHeader = container.querySelector(".mobileHeader");

    expect(mobileHeader).toBeInTheDocument();
    expect(mobileHeader).not.toHaveTextContent("Email");
    expect(mobileHeader).not.toHaveTextContent("Instagram");
    expect(container.querySelector(".desktopHeader")).not.toBeInTheDocument();
  });
});
