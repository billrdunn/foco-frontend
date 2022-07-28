/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import UploadComponent from "./UploadComponent";
import HomePageText from "./HomePageText";

function Upload() {
  const isUploading = useSelector((state) => state.showUploading);

  if (isUploading) {
    return (
      <div className="bg-black absolute w-full h-full overflow-hidden ">
        <div className="flex flex-col h-screen ">
          <Header />
          <HomePageText blank={!isUploading} />
          <UploadComponent />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black absolute w-full h-full overflow-hidden">
      <div className="flex flex-col h-screen ">
        <Header />
        <HomePageText blank={!isUploading} />
        <UploadComponent />
        <HomePageText blank={!isUploading} />
        <div className="flex w-auto h-[85px] items-end mt-[60px]" />
      </div>
    </div>
  );
}

export default Upload;
