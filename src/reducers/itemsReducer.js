import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/items";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    update: (state, action) => action.payload,
  },
});

const { update } = itemsSlice.actions;

export const initItems = () => async (dispatch) => {
  const items = await itemService.getAll();
  dispatch(update(items));
};

export default itemsSlice.reducer;
