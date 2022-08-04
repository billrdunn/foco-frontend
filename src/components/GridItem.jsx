/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

function GridItem({ img, onClick }) {
  GridItem.propTypes = {
    img: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  return (
    <div>
      <img alt="pic" src={img.url} onClick={onClick} />
    </div>
  );
}

export default GridItem;
