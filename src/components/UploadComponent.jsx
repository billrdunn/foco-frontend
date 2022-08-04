import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cropper from "react-easy-crop";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemProgressListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { showImgs } from "../reducers/showImgsReducer";
import getCroppedImg from "../cropImage";
import "../styles.css";
import { showUploading } from "../reducers/showUploadingReducer";
import { setNewUrlStr } from "../reducers/newUrlStrReducer";
import RotatingIcon from "./RotatingIcon";
import UploadPreviewButtons from "./UploadPreviewButtons";
import UploadFinishListener from "./UploadFinishListener";

const UPLOAD_STATES = {
  NONE: 0,
  UPLOADING: 1,
  FINISHED: 2,
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const dispatch = useDispatch();
  const { id, url, isFallback, type, updateRequest, requestData, previewMethods } = props;
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  const [, setCroppedImg] = useState(null);

  // TODO if user uploads non image file, reload page
  if (isFallback) {
    window.location.reload(true);
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, cap) => {
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

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? null : (
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
      <UploadPreviewButtons
        finished={isUploading || isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
    </>
  );
});

function UploadComponent() {
  const dispatch = useDispatch();
  const previewMethodsRef = useRef();
  const newUrlStr = useSelector((state) => state.newUrlStr);
  const isUploading = useSelector((state) => state.showUploading);
  const uploadSuccess = useSelector((state) => state.uploadSuccess);

  const showFailureText = !uploadSuccess && !isUploading;

  const handleClick = () => {
    const date = new Date();
    // Create unique filename for the imaged based on the time and date of upload
    const str = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date
      .getDate()
      .toString()}-${date.getHours().toString()}-${date.getMinutes().toString()}-${date
      .getUTCSeconds()
      .toString()}-${date.getUTCMilliseconds().toString()}`;

    dispatch(showImgs(false));
    dispatch(setNewUrlStr(str));
  };
  return (
    <>
      <div className="flex justify-center items-center">
        {showFailureText && (
          <h1 className="text-white text-[25px]"> Upload failed, please try again. </h1>
        )}
      </div>
      <Uploady
        destination={{
          url: "https://focobcn-raw.s3.amazonaws.com/",
          headers: { ContentType: "image/jpeg" },
        }}
        params={{
          key: `${newUrlStr}.jpg`,
        }}
      >
        <div className="flex grow h-full justify-center items-center ">
          <div>
            {isUploading ? (
              <div className="">
                <RotatingIcon />
              </div>
            ) : (
              <UploadButton
                className="font-domaine px-[13px] py-1 text-black rounded-full"
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
            <UploadFinishListener />
          </div>
        </div>
      </Uploady>
    </>
  );
}

export default UploadComponent;
