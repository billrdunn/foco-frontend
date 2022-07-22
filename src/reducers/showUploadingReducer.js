import { createSlice } from "@reduxjs/toolkit";

const showUploadingSlice = createSlice({
  name: "showUploading",
  initialState: false,
  reducers: {
    showUploading: (state, action) => action.payload,
  },
});

export const { showUploading } = showUploadingSlice.actions;
export default showUploadingSlice.reducer;
