import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import HomePage from "./components/HomePage";
import { initImgs } from "./reducers/imgUrlsReducer";
import ManageImagesPage from "./components/ManageImagesPage";
import UploadPage from "./components/UploadPage";
import "./styles.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initImgs());
  }, [dispatch]);

  return (
    <div>
      {/* Fix the height and width of app and prevent unnecessary scrolling, and user resizing */}
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no height=device-height"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foocccooooface" element={<UploadPage />} />
        <Route path="/manage-images" element={<ManageImagesPage />} />
      </Routes>
    </div>
  );
}

export default App;

// For AWS bucket policy:

// "Condition": {
//   "StringLike": {
//     "aws:Referer": [
//       "https://www.focobcn.com/*",
//       "https://focobcn.com/*"
//     ]
//   }
// }
