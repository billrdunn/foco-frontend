/* eslint-disable no-await-in-loop */
import { useSelector, useDispatch } from "react-redux";
import { useItemFinishListener } from "@rpldy/uploady";
import { useNavigate } from "react-router-dom";
import { createNewImgUrl } from "../reducers/imgUrlsReducer";
import imgUrlsService from "../services/imgUrls";
import "../styles.css";
import { showUploading } from "../reducers/showUploadingReducer";
import { setUploadSuccess } from "../reducers/uploadSuccessReducer";

const requestCompressedImage = async (url) => {
  try {
    // TODO try websockets instead of polling
    await imgUrlsService.getSingle(url);
    return true;
  } catch (exception) {
    return false;
  }
};

function UploadFinishListener() {
  const dispatch = useDispatch();
  const newUrlStr = useSelector((state) => state.newUrlStr);
  const navigate = useNavigate();

  useItemFinishListener(async () => {
    const newUrl = `https://focobcn-compressed.s3.amazonaws.com/${newUrlStr}.jpg`;

    let response = false;
    let count = 0;
    while (!response) {
      // Request compressed image every 3 seconds
      // response = true if compressed image is available
      const date = new Date();
      const time = date.getUTCSeconds() * 1000 + date.getUTCMilliseconds();
      if (time % 3000 === 0) {
        count += 3;
        response = await requestCompressedImage(newUrl);

        if (response) {
          // Image has been processed
          navigate("/");
          setTimeout(async () => {
            dispatch(showUploading(false));
          }, 1000);
          dispatch(createNewImgUrl(newUrl));
          dispatch(setUploadSuccess(true));
          try {
            // Delete uncompressed (raw) image
            await imgUrlsService.removeByUrl(
              `https://focobcn-raw.s3.amazonaws.com/${newUrlStr}.jpg`
            );
          } catch (exception) {
            console.log("Exception while deleting raw image :>> ", exception);
          }
          break;
        } else if (count >= 2) {
          // If processing takes longer than 45 seconds, cancel and show error
          dispatch(showUploading(false));
          dispatch(setUploadSuccess(false));
          navigate("/foocccooooface");
          break;
        }
      }
    }
  });
}

export default UploadFinishListener;
