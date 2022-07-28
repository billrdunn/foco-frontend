import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { authenticate } from "../reducers/authenticatedReducer";
import useField from "../hooks/index";
import Header from "./Header";

function LoginForm() {
  const dispatch = useDispatch();

  const loginException = useSelector((state) => state.loginException);

  const passwordField = useField("password", "loginInputPassword", "password");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.value === process.env.MANAGE_PASSWORD) {
      dispatch(authenticate(true));
    }
  };

  return (
    <div>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            id={passwordField.id}
            type={passwordField.type}
            value={passwordField.value}
            onChange={passwordField.onChange}
            placeholder={passwordField.placeholder}
          />
        </Form.Group>
        {loginException}
        <br />
        <Button className="bg-white text-black" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
