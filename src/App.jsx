import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import GlobalFonts from './fonts/fonts';

import Home from "./components/Home";
// import Navigation from "./components/Navigation";
import { initImgs } from "./reducers/imgUrlsReducer";
import Upload from "./components/Upload";
import ManageImages from "./components/ManageImages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initImgs());
  }, [dispatch]);

  return (
    <div className="container">
      <GlobalFonts />
      {/* <Navigation /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kjd7q2bniv09892inafkjf74hertoqm309fnli3498h3" element={<Upload />} />
        <Route path="/manage-images" element={<ManageImages />} />
      </Routes>
    </div>
  );
}

export default App;
