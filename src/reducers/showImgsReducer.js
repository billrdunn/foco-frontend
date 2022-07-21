import { createSlice } from "@reduxjs/toolkit";

const showImgsSlice = createSlice({
  name: "showImgs",
  initialState: true,
  reducers: {
    showImgs: (state, action) => action.payload,
  },
});

export const { showImgs } = showImgsSlice.actions;
export default showImgsSlice.reducer;
