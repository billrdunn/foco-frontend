import React from "react";
import TextUnderLogo from "./TextUnderLogo";
import ImagesGrid from "./ImagesGrid";
import Header from "./Header";

function Home() {
  return (
    <div className="bg-black w-auto h-auto min-h-screen px-[10px] pb-[10px]">
      <Header/>
      <TextUnderLogo />
      <ImagesGrid />
    </div>
  );
}

export default Home;
