import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    updateLogin: (state, action) => action.payload,
    setLoginNull: () => null,
  },
});

const { updateLogin, setLoginNull } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

const loginExceptionSlice = createSlice({
  name: "loginException",
  initialState: null,
  reducers: {
    updateLoginException: (state, action) => action.payload,
    setLoginExceptionNull: () => null,
  },
});

const { updateLoginException, setLoginExceptionNull } = loginExceptionSlice.actions;
export const loginExceptionReducer = loginExceptionSlice.reducer;

export const initLoggedInUser = () => async (dispatch) => {
  const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON);
    // Need to update the user in case the user has changed since the last time they logged in
    const newUser = await loginService.update(user);
    userService.setToken(newUser.token);
    dispatch(updateLogin(newUser));
  }
};

export const updateLoggedInUser = (updatedUser) => async (dispatch) => {
  dispatch(updateLogin(updatedUser));
};

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await loginService.login({ username, password });

    window.localStorage.setItem("loggedInUser", JSON.stringify(response));
    userService.setToken(response.token);
    dispatch(updateLogin(response));
    dispatch(setLoginExceptionNull());
  } catch (exception) {
    dispatch(updateLoginException(exception.response.data.error));
  }
};

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem("loggedInUser");
  dispatch(setLoginNull());
};
