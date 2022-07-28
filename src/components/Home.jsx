/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import HomePageText from "./HomePageText";
import ImagesGrid from "./ImagesGrid";
import Header from "./Header";

function Home() {
  return (
    <div className="bg-black absolute w-screen h-screen px-[10px] pb-[10px]">
      <Header/>
      <HomePageText />
      <ImagesGrid />
    </div>
  );
}

export default Home;
