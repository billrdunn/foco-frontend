import { createSlice } from "@reduxjs/toolkit";

const newUrlStrSlice = createSlice({
  name: "newUrl",
  initialState: "",
  reducers: {
    setNewUrlStr: (state, action) => action.payload,
  },
});

export const { setNewUrlStr } = newUrlStrSlice.actions;
export default newUrlStrSlice.reducer;
