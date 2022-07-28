/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Cropper from "react-easy-crop";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemProgressListener,
  useItemFinishListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { useNavigate } from "react-router-dom";
import { createNewImgUrl } from "../reducers/imgUrlsReducer";
import { showImgs } from "../reducers/showImgsReducer";
import getCroppedImg from "../cropImage";
import imgUrlsService from "../services/imgUrls";
import "../styles.css";
import { showUploading } from "../reducers/showUploadingReducer";
import { setUploadSuccess } from "../reducers/uploadSuccessReducer";
import { setNewUrlStr } from "../reducers/newUrlStrReducer";
import Uploading from "./Uploading";

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
  const navigate = useNavigate();

  useItemFinishListener(async () => {
    const newUrl = `https://focobcn-compressed.s3.amazonaws.com/${newUrlStr}.jpg`;

    let response = false;
    let count = 0;
    while (!response) {
      const date = new Date();
      const sec = date.getUTCSeconds();
      const msec = date.getUTCMilliseconds();
      const time = sec * 1000 + msec;
      if (time % 3000 === 0) {
        count += 3;
        // eslint-disable-next-line no-await-in-loop
        response = await requestCompressedImage(newUrl);

        if (response) {
          // image has been processed
          navigate("/");
          setTimeout(async () => {
            dispatch(showUploading(false));
          }, 1000);
          dispatch(createNewImgUrl(newUrl));
          dispatch(setUploadSuccess(true));
          try {
            // eslint-disable-next-line no-await-in-loop
            await imgUrlsService.removeByUrl(
              `https://focobcn-raw.s3.amazonaws.com/${newUrlStr}.jpg`
            );
          } catch (exception) {
            console.log("imgUrlsReducer exception :>> ", exception);
          }
          break;
        } else if (count >= 45) {
          // timeout
          dispatch(showUploading(false));
          dispatch(setUploadSuccess(false));
          navigate("/kjd7q2bniv09892inafkjf74hertoqm309fnli3498h3");
          break;
        }
      }
    }
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
  right: 20px;
  left: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: DomaineDisplayNarrowMedium;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

function PreviewButtons({ finished, crop, updateRequest, onUploadCancel, onUploadCrop }) {
  return (
    <ButtonsWrapper>
      <button
        className="font-domaine inline-block px-6 py-1.5 m-2 bg-white text-black rounded-full"
        style={{
          display: !finished && updateRequest && crop ? "block" : "none",
        }}
        onClick={onUploadCrop}
        type="button"
      >
        OK
      </button>
      <button
        className="font-domaine inline-block px-6 py-1.5 m-2 bg-white text-black rounded-full"
        style={{
          display: !finished && updateRequest && crop ? "block" : "none",
        }}
        onClick={onUploadCancel}
        type="button"
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
  //   const navigate = useNavigate();

  // const dispatch = useDispatch();
  // dispatch(showImgs(false));

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
  //   useItemFinalizeListener(() => navigate("/"));
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
      {/* {isUploading && navigate("/")} */}
    </>
  );
});

function UploadComponent() {
  const dispatch = useDispatch();
  const previewMethodsRef = useRef();
  const newUrlStr = useSelector((state) => state.newUrlStr);
  const isUploading = useSelector((state) => state.showUploading);

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

    dispatch(showImgs(false));
    dispatch(setNewUrlStr(str));
  };
  return (
    <>
      {/* {!uploadSuccess && <h2> Upload failed, please try again </h2>} */}
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
        <div className="flex grow h-full justify-center items-center ">
          <div>
            {isUploading ? (
              <div className="">
                <Uploading />
              </div>
            ) : (
              <UploadButton
                className="font-domaine px-6 py-1.5 text-black rounded-full"
                onClick={() => handleClick()}
              >
                <div className="w-56 text-lg">Upload face</div>
              </UploadButton>
            )}
            <UploadPreview
              PreviewComponent={ItemPreviewWithCrop}
              previewComponentProps={{ previewMethods: previewMethodsRef }}
              previewMethodsRef={previewMethodsRef}
              fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
            />
            <FinishListener />
          </div>
        </div>
      </Uploady>
    </>
  );
}

export default UploadComponent;
