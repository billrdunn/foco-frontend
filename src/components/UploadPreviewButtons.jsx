import React from "react";
import PropTyes from "prop-types";
import styled from "styled-components";

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

function UploadPreviewButtons({ finished, crop, updateRequest, onUploadCancel, onUploadCrop }) {
  UploadPreviewButtons.propTypes = {
    finished: PropTyes.bool.isRequired,
    crop: PropTyes.shape.isRequired,
    updateRequest: PropTyes.func.isRequired,
    onUploadCancel: PropTyes.func.isRequired,
    onUploadCrop: PropTyes.func.isRequired,
  };
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

export default UploadPreviewButtons;
