/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import HomePageText from "./HomePageText";
import ImagesGrid from "./ImagesGrid";
import Header from "./Header";

function Home() {
  return (
    <div className="bg-black px-10px pb-10px w-auto h-screen">
      <Header/>
      <HomePageText />
      <ImagesGrid />
    </div>
  );
}

export default Home;
