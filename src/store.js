import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";
import itemsReducer from "./reducers/itemsReducer";
import { loginReducer, loginExceptionReducer } from "./reducers/loginReducer";
import searchValReducer from "./reducers/searchValReducer";
import { signUpStatusReducer } from "./reducers/signUpReducer";
import monthReducer from "./reducers/monthReducer";
import imgUrlsReducer from "./reducers/imgUrlsReducer";
import showImgsReducer from "./reducers/showImgsReducer";
import showUploadingReducer from "./reducers/showUploadingReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    items: itemsReducer,
    loggedInUser: loginReducer,
    searchVal: searchValReducer,
    loginException: loginExceptionReducer,
    signUpStatus: signUpStatusReducer,
    month: monthReducer,
    imgUrls: imgUrlsReducer,
    showImgs: showImgsReducer,
    showUploading: showUploadingReducer
  },
});

export default store;
