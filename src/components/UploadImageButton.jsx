/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemProgressListener,
  useItemFinishListener,
} from "@rpldy/uploady";
// import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import UploadButton from "@rpldy/upload-button";
import { useDispatch } from "react-redux";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { createNewImgUrl } from "../reducers/imgUrlsReducer";
import getCroppedImg from "../cropImage";
import "../styles.css";

const FinishListener = ({ newUrl }) => {
  const dispatch = useDispatch();

  useItemFinishListener(() => {
    console.log("dispatching newUrl :>> ", newUrl);
    dispatch(createNewImgUrl(newUrl));
  });
};

// const mockSenderEnhancer = getMockSenderEnhancer({ delay: 1500 });

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
  max-height: 200px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

function PreviewButtons({ finished, crop, updateRequest, onUploadCancel, onUploadCrop }) {
  return (
    <ButtonsWrapper>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none",
        }}
        onClick={onUploadCrop}
      >
        Upload
      </button>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none",
        }}
        onClick={onUploadCancel}
      >
        Cancel
      </button>
    </ButtonsWrapper>
  );
}

const UPLOAD_STATES = {
  NONE: 0,
  UPLOADING: 1,
  FINISHED: 2,
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const { id, url, isFallback, type, updateRequest, requestData, previewMethods } = props;
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  const [croppedImg, setCroppedImg] = useState(null);

  // data for react-easy-crop
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, cap) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(cap);
  }, []);

  const isFinished = uploadState === UPLOAD_STATES.FINISHED;

  useItemProgressListener(() => setUploadState(UPLOAD_STATES.UPLOADING), id);
  useItemFinalizeListener(() => setUploadState(UPLOAD_STATES.FINISHED), id);

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && croppedAreaPixels) {
      const [croppedBlob, croppedUri] = await getCroppedImg(url, croppedAreaPixels);

      requestData.items[0].file = croppedBlob;

      updateRequest({ items: requestData.items });
      setCroppedImg(croppedUri);
    }
  }, [url, requestData, updateRequest, croppedAreaPixels]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img" />
  ) : (
    <>
      {requestData && uploadState === UPLOAD_STATES.NONE ? (
        <div className="crop-view">
          <div className="crop-container">
            <Cropper
              image={url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="controls">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </div>
        </div>
      ) : (
        <PreviewImage src={croppedImg || url} alt="img to upload" />
      )}
      <PreviewButtons
        finished={isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
      <p>{isFinished ? "FINISHED" : ""}</p>
    </>
  );
});

function UploadImageButton() {
  const previewMethodsRef = useRef();

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
      // multiple={false}
      destination={{
        url: "https://focobcn.s3.amazonaws.com/",
        headers: { ContentType: "image/jpeg" },
      }}
      // enhancer={mockSenderEnhancer}
      params={{
        key: `${str}.jpg`,
      }}
    >
      <div className="UploadImageButton">
        <UploadButton> Upload Image </UploadButton>
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
        <FinishListener newUrl={url} />
      </div>
    </Uploady>
  );
}

export default UploadImageButton;
