import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import LoginForm from "./LoginForm";
import store from "../store";

describe("<LoginForm/>", () => {
  let container;
  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    ).container;
  });
  test("shows error text if password is incorrect", async () => {
    const input = screen.getByPlaceholderText("password");
    const loginButton = screen.getByText("Login");
    const user = userEvent.setup();
    await user.type(input, "wrongpassword");
    await user.click(loginButton);

    expect(container.querySelector(".passwordError")).toBeInTheDocument();
  });
  test("shows no text if password is correct", async () => {
    const input = screen.getByPlaceholderText("password");
    const loginButton = screen.getByText("Login");
    const user = userEvent.setup();
    await user.type(input, `${process.env.REACT_APP_MANAGE_PASSWORD}`);
    await user.click(loginButton);

    expect(container.querySelector(".passwordError")).not.toBeInTheDocument();
  });
});
