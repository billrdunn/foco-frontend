import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import UploadComponent from "./UploadComponent";
import HomePageText from "./HomePageText";

function Upload() {
  const isUploading = useSelector((state) => state.showUploading);
  return (
    <div className="flex flex-col bg-blue-300 px-10px pb-10px w-auto h-screen">
      <div className="flex flex-col bg-green-300 h-full">
        <Header />
        <HomePageText blank={!isUploading} />
        <UploadComponent />
      </div>
    </div>
  );
}

export default Upload;
