import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { authenticate } from "../reducers/authenticatedReducer";
import { useField } from "../hooks/index";

function LoginForm() {
  const dispatch = useDispatch();
  const [loginFailed, setLoginFailed] = useState(false);

  const passwordField = useField("password", "loginInputPassword", "password");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwordField.value === process.env.REACT_APP_MANAGE_PASSWORD) {
      setLoginFailed(false);
      dispatch(authenticate(true));
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Form onSubmit={handleSubmit} className="flex w-1/2 justify-center items-center">
          <Form.Group>
            <Form.Control
              id={passwordField.id}
              type={passwordField.type}
              value={passwordField.value}
              onChange={passwordField.onChange}
              placeholder={passwordField.placeholder}
            />
          </Form.Group>
          <Button className="bg-white text-black" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
      <div className="flex justify-center">
        <br />
        {loginFailed && <div className="passwordError text-red-500">Incorrect password</div>}
      </div>
    </div>
  );
}

export default LoginForm;
