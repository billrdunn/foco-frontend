import { createSlice } from "@reduxjs/toolkit";

const searchValSlice = createSlice({
  name: "searchVal",
  initialState: "",
  reducers: {
    setSearchVal: (state, action) => action.payload,
  },
});

export const { setSearchVal } = searchValSlice.actions;
export default searchValSlice.reducer;
