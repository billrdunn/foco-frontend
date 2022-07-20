import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("<LoginForm />", () => {
  let container;
  let handleLogin;
  let user;

  beforeEach(() => {
    handleLogin = jest.fn();
    container = render(<LoginForm handleLogin={handleLogin} />).container;
    user = userEvent.setup();
  });
  test("<LoginForm /> updates parent state and calls onSubmit", async () => {
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const sendButton = screen.getByText("login");

    await user.type(usernameInput, "testUsername");
    await user.type(passwordInput, "testPassword");
    await user.click(sendButton);

    expect(handleLogin.mock.calls).toHaveLength(1);
    expect(handleLogin.mock.calls[0][0].username).toBe("testUsername");
    expect(handleLogin.mock.calls[0][0].password).toBe("testPassword");
  });

  test("<LoginForm /> updates parent state and calls onSubmit v2", async () => {
    // More flexible way of doing the same thing as the test above
    // using "className" attribute
    const usernameInput = container.querySelector(".loginInputUsername");
    const passwordInput = container.querySelector(".loginInputPassword");
    const sendButton = container.querySelector(".loginButton");

    await user.type(usernameInput, "testUsername");
    await user.type(passwordInput, "testPassword");
    await user.click(sendButton);

    expect(handleLogin.mock.calls).toHaveLength(1);
    expect(handleLogin.mock.calls[0][0].username).toBe("testUsername");
    expect(handleLogin.mock.calls[0][0].password).toBe("testPassword");
  });

  test("<LoginForm /> updates parent state and calls onSubmit v3", async () => {
    // Yet another way of doing the same thing as the tests above
    // using "id" attribute
    // Note element ids are unique
    const usernameInput = container.querySelector("#loginInputUsername");
    const passwordInput = container.querySelector("#loginInputPassword");
    const sendButton = container.querySelector("#loginButton");

    await user.type(usernameInput, "testUsername");
    await user.type(passwordInput, "testPassword");
    await user.click(sendButton);

    expect(handleLogin.mock.calls).toHaveLength(1);
    expect(handleLogin.mock.calls[0][0].username).toBe("testUsername");
    expect(handleLogin.mock.calls[0][0].password).toBe("testPassword");

    // Example of how to ensure something is not rendered
    // note queryByText does not cause an exception if the element is not found
    const element = screen.queryByText("do not want this thing to be rendered");
    expect(element).toBeNull();
  });
});
