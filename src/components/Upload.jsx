import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Header from "./Header";
import UploadComponent from "./UploadComponent";
import HomePageText from "./HomePageText";

function Upload() {
  const isUploading = useSelector((state) => state.showUploading);
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no height=device-height"
        />
      </Helmet>
      <div className="bg-black px-10px pb-10px w-auto h-screen">
        <Header />
        <HomePageText blank={!isUploading} />
        <UploadComponent />
      </div>
    </div>
  );
}

export default Upload;
