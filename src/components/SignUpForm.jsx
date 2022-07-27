import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createNewUser } from "../reducers/signUpReducer";
import useField from "../hooks/index";

function SignUpForm() {
  const dispatch = useDispatch();
  const signUpStatus = useSelector((state) => state.signUpStatus);

  const usernameField = useField("text", "signUpInputUsername", "Username");
  const nameField = useField("text", "signUpInputName", "Name");
  const passwordField = useField("password", "signUpInputPassword", "Password");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createNewUser({
        username: usernameField.value,
        name: nameField.value,
        password: passwordField.value,
      })
    );
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            id={usernameField.id}
            type={usernameField.type}
            value={usernameField.value}
            onChange={usernameField.onChange}
            placeholder={usernameField.placeholder}
          />
          <Form.Control
            id={nameField.id}
            type={nameField.type}
            value={nameField.value}
            onChange={nameField.onChange}
            placeholder={nameField.placeholder}
          />
          <Form.Control
            id={passwordField.id}
            type={passwordField.type}
            value={passwordField.value}
            onChange={passwordField.onChange}
            placeholder={passwordField.placeholder}
          />
        </Form.Group>
        {signUpStatus}
        <br />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUpForm;
