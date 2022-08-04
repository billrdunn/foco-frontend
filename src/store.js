import { configureStore } from "@reduxjs/toolkit";

import imgUrlsReducer from "./reducers/imgUrlsReducer";
import showImgsReducer from "./reducers/showImgsReducer";
import showUploadingReducer from "./reducers/showUploadingReducer";
import newUrlStrReducer from "./reducers/newUrlStrReducer";
import uploadSuccessReducer from "./reducers/uploadSuccessReducer";
import authenticatedReducer from "./reducers/authenticatedReducer";

const store = configureStore({
  reducer: {
    imgUrls: imgUrlsReducer,
    showImgs: showImgsReducer,
    showUploading: showUploadingReducer,
    newUrlStr: newUrlStrReducer,
    authenticated: authenticatedReducer,
    uploadSuccess: uploadSuccessReducer,
  },
});

export default store;
