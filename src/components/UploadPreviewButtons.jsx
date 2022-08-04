import React from "react";
import PropTypes from "prop-types";
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
    finished: PropTypes.bool.isRequired,
    crop: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
    updateRequest: PropTypes.func.isRequired,
    onUploadCancel: PropTypes.func.isRequired,
    onUploadCrop: PropTypes.func.isRequired,
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
