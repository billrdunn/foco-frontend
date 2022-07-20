import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/loginReducer";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button type="submit" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
