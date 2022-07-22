import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
// import Navigation from "./components/Navigation";
import { initImgs } from "./reducers/imgUrlsReducer";
import Upload from "./components/Upload";

function App() {
  const dispatch = useDispatch();

  // If the url matches "/items/:id", we can use the match variable to find the item
  // const match = useMatch("/items/:id");
  // const item = match ? items.find((i) => i.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initImgs());
  }, [dispatch]);

  return (
    <div className="container">
      {/* <Navigation /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
