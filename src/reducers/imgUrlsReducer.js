import { createSlice } from "@reduxjs/toolkit";
import imgUrlService from "../services/imgUrls";

const imgUrlSlice = createSlice({
  name: "imgUrls",
  initialState: [],
  reducers: {
    updateAll: (state, action) => action.payload,
    addImg: (state, action) => {
      state.filter((img) => img.id !== action.payload.id).push(action.payload);
    },
  },
});

const { updateAll, addImg } = imgUrlSlice.actions;

export const createNewImgUrl = (newimgUrl) => async (dispatch) => {
  try {
    const imgUrl = await imgUrlService.create({ url: newimgUrl });
    // console.log("adding imgUrl :>> ", imgUrl);
    dispatch(addImg(imgUrl));
    const allImgUrls = await imgUrlService.getAll();
    dispatch(updateAll(allImgUrls));
  } catch (exception) {
    // console.log("imgUrlsReducer exception :>> ", exception);
  }
};

export const initImgs = () => async (dispatch) => {
  const imgs = await imgUrlService.getAll();
  dispatch(updateAll(imgs));
};

export default imgUrlSlice.reducer;
