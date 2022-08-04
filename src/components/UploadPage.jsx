/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import UploadComponent from "./UploadComponent";
import TextUnderLogo from "./TextUnderLogo";

function UploadPage() {
  const isUploading = useSelector((state) => state.showUploading);

  return (
    <div className="bg-black absolute w-full h-full overflow-clip">
      <div className="flex flex-col h-full ">
        <Header />
        <TextUnderLogo blank={!isUploading} />
        <UploadComponent />
        {!isUploading && (
          <div>
            <TextUnderLogo blank />
            <div className="flex w-auto h-auto pb-[85px] " />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
