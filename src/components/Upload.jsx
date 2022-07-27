import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import UploadComponent from "./UploadComponent";
import HomePageText from "./HomePageText";

function Upload() {
  const isUploading = useSelector((state) => state.showUploading);
  return (
    <div className="bg-black px-10px pb-10px w-auto h-screen">
      <Header />
      <HomePageText blank={!isUploading} />
      <UploadComponent />
    </div>
  );
}

export default Upload;
