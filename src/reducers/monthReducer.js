import { createSlice } from "@reduxjs/toolkit";

const monthSlice = createSlice({
  name: "month",
  initialState: "",
  reducers: {
    setMonth: (state, action) => action.payload,
  },
});

export const { setMonth } = monthSlice.actions;
export default monthSlice.reducer;
