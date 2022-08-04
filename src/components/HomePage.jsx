import React from "react";
import TextUnderLogo from "./TextUnderLogo";
import ImagesGrid from "./ImagesGrid";
import Header from "./Header";

function HomePage() {
  return (
    <div className="bg-black w-auto h-auto min-h-screen px-[10px] pb-[10px]">
      <Header />
      <TextUnderLogo blank={false} />
      <ImagesGrid />
    </div>
  );
}

export default HomePage;
