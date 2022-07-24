import { createSlice } from "@reduxjs/toolkit";

const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState: false,
  reducers: {
    authenticate: (state, action) => action.payload,
  },
});

export const { authenticate } = authenticatedSlice.actions;
export default authenticatedSlice.reducer;
