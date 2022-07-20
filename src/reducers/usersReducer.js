import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { updateLoggedInUser } from "./loginReducer";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    updateAll: (state, action) => action.payload,
    updateSingle: (state, action) => {
      state.filter((user) => user.id !== action.payload.id).push(action.payload);
    },
  },
});

const { updateAll, updateSingle } = usersSlice.actions;

export const initUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch(updateAll(users));
};

export const updateUser = (id, newUser) => async (dispatch) => {
  const updatedUser = await userService.update(id, newUser);
  dispatch(updateSingle(updatedUser));
  dispatch(updateLoggedInUser(updatedUser));
};

export default usersSlice.reducer;
