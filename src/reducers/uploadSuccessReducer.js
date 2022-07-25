import { createSlice } from "@reduxjs/toolkit";

const uploadStateSlice = createSlice({
  name: "uploadState",
  initialState: true,
  reducers: {
    setUploadSuccess: (state, action) => action.payload,
  },
});

export const { setUploadSuccess } = uploadStateSlice.actions;
export default uploadStateSlice.reducer;
