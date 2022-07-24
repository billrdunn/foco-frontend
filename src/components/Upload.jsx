/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Cropper from "react-easy-crop";
import { Container, Image, Row, Col } from "react-bootstrap";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemProgressListener,
  useItemFinishListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  const navigate = useNavigate();

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

    // console.log("dispatching newUrl :>> ", newUrl);
    dispatch(createNewImgUrl(newUrl));
    dispatch(showUploading(false));
    navigate("/");
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
  left: 30.4%;
  width: 40%;
  height: 40px;
  display: flex;
  align-items: center;
  font-family: DomaineDisplayNarrowMedium;
`;

const UploadButtonWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
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
        className="preview-button"
        style={{
          display: !finished && updateRequest && crop ? "block" : "none",
        }}
        onClick={onUploadCrop}
      >
        OK
      </button>
      <button
        className="preview-button"
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

function Upload() {
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

    const url = `https://focobcn-compressed.s3.amazonaws.com/${str}.jpg`;
    console.log("url :>> ", url);
    dispatch(showImgs(false));
    dispatch(setNewUrlStr(str));
  };

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Container className="logo">
        <Row>
          <Col>
            <Image
              className="image"
              fluid
              src="https://focobcn.s3.eu-west-3.amazonaws.com/FOCO_LOGO.png"
            />
          </Col>
        </Row>
      </Container>
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
        <div className="UploadImageButton">
          {isUploading ? (
            <Rotate>
              <Container className="logo-container">
                <Row>
                  <Col>
                    <Image
                      src="https://focobcn.s3.eu-west-3.amazonaws.com/FOCO_Face.png"
                      alt="loader"
                      className="img-logo"
                    />
                  </Col>
                </Row>
              </Container>
            </Rotate>
          ) : (
            <div>
              <UploadButtonWrapper>
                <UploadButton className="upload-button" onClick={() => handleClick()}>
                  {" "}
                  Upload{" "}
                </UploadButton>
              </UploadButtonWrapper>
            </div>
          )}
          <UploadPreview
            PreviewComponent={ItemPreviewWithCrop}
            previewComponentProps={{ previewMethods: previewMethodsRef }}
            previewMethodsRef={previewMethodsRef}
            fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
          />
          <FinishListener />
        </div>
      </Uploady>
    </div>
  );
}

export default Upload;
