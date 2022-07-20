import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: null,
  reducers: {
    updateSignUp: (state, action) => action.payload,
  },
});

export const signUpReducer = signUpSlice.reducer;

const signUpStatusSlice = createSlice({
  name: "signUpStatus",
  initialState: null,
  reducers: {
    updateSignUpStatus: (state, action) => action.payload,
    setSignUpStatusNull: () => null,
  },
});

export const signUpStatusReducer = signUpStatusSlice.reducer;

const { updateSignUp } = signUpSlice.actions;
const { updateSignUpStatus } = signUpStatusSlice.actions;

export const createNewUser = (newUser) => async (dispatch) => {
  try {
    const user = await userService.create(newUser);
    dispatch(updateSignUp(user));
    dispatch(updateSignUpStatus("Account created"));
  } catch (exception) {
    dispatch(updateSignUpStatus(exception.response.data.error));
  }
};
