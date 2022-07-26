/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemProgressListener,
  useItemFinishListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { createNewImgUrl } from "../reducers/imgUrlsReducer";
import { showImgs } from "../reducers/showImgsReducer";
import getCroppedImg from "../cropImage";
import imgUrlsService from "../services/imgUrls";
import "../styles.css";
import { showUploading } from "../reducers/showUploadingReducer";
import { setNewUrlStr } from "../reducers/newUrlStrReducer";

const requestCompressedImage = async (url) => {
  try {
    // eslint-disable-next-line no-await-in-loop
    await imgUrlsService.getSingle(url);
    return true;
  } catch (exception) {

    return false;
  }
};

const FinishListener = () => {
  const dispatch = useDispatch();
  const newUrlStr = useSelector((state) => state.newUrlStr);

  useItemFinishListener(async () => {

    const newUrl = `https://focobcn-compressed.s3.amazonaws.com/${newUrlStr}.jpg`;

    let response = false;
    while (!response) {
      const date = new Date();
      const sec = date.getUTCSeconds();
      const msec = date.getUTCMilliseconds();
      if ((sec * 1000 + msec) % 3000 === 0) {
        // eslint-disable-next-line no-await-in-loop
        response = await requestCompressedImage(newUrl);
      }
    }

    dispatch(createNewImgUrl(newUrl));
    dispatch(showUploading(false));

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
  position: absolute;
  bottom: 20px;
  left: 34.4%;
  width: 40%;
  height: 40px;
  display: flex;
  align-items: center;
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
        OK
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
  const dispatch = useDispatch();
  const { id, url, isFallback, type, updateRequest, requestData, previewMethods } = props;
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  // eslint-disable-next-line no-unused-vars
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
  const isUploading = uploadState === UPLOAD_STATES.UPLOADING;

  useItemProgressListener(() => setUploadState(UPLOAD_STATES.UPLOADING), id);
  useItemProgressListener(() => dispatch(showImgs(true)));
  useItemProgressListener(() => dispatch(showUploading(true)));
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
    dispatch(showImgs(true));
    if (previewMethods.current.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img" />
  ) : (
    <>
      {requestData && uploadState === UPLOAD_STATES.NONE ? (
        <div>
          <div>
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
        </div>
      ) : null}
      <PreviewButtons
        finished={isUploading || isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
    </>
  );
});

function UploadImageButton() {
  const dispatch = useDispatch();
  const previewMethodsRef = useRef();
  const newUrlStr = useSelector((state) => state.newUrlStr);

  const handleClick = () => {
    const date = new Date();
    const msec = date.getUTCMilliseconds().toString();
    const sec = date.getUTCSeconds().toString();
    const mins = date.getMinutes().toString();
    const hour = date.getHours().toString();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const str = `${year}-${month}-${day}-${hour}-${mins}-${sec}-${msec}`;

    const url = `https://focobcn-compressed.s3.amazonaws.com/${str}.jpg`;
    console.log("url :>> ", url);
    dispatch(showImgs(false));
    dispatch(setNewUrlStr(str));
  };

  return (
    <Uploady
      // multiple={false}
      destination={{
        url: "https://focobcn-raw.s3.amazonaws.com/",
        headers: { ContentType: "image/jpeg" },
      }}
      // enhancer={mockSenderEnhancer}
      params={{
        key: `${newUrlStr}.jpg`,
      }}
    >
      <div>
        <UploadButton onClick={() => handleClick()}> Upload Image </UploadButton>
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
        <FinishListener />
      </div>
    </Uploady>
  );
}

export default UploadImageButton;
