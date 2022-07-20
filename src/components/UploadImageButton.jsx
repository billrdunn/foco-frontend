import React from "react";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useDispatch } from "react-redux";
// import { updateUser } from "../reducers/usersReducer";
import { createNewImgUrl } from "../reducers/imgUrlsReducer";

const FinishListener = ({ newUrl }) => {
  const dispatch = useDispatch();

  useItemFinishListener(() => {
    console.log("dispatching newUrl :>> ", newUrl);
    dispatch(createNewImgUrl(newUrl));
  });
};

function UploadImageButton() {
  const date = new Date();
  const msec = date.getUTCMilliseconds().toString();
  const sec = date.getUTCSeconds().toString();
  const mins = date.getMinutes().toString();
  const hour = date.getHours().toString();
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const str = `${year}-${month}-${day}-${hour}-${mins}-${sec}-${msec}`;

  const url = `https://focobcn.s3.amazonaws.com/${str}.jpg`;

  return (
    <Uploady
      destination={{
        url: "https://focobcn.s3.amazonaws.com/",
        headers: { ContentType: "image/jpeg" },
      }}
      params={{
        key: `${str}.jpg`,
      }}
    >
      <FinishListener newUrl={url} />
      <UploadButton />
    </Uploady>
  );
}

export default UploadImageButton;
