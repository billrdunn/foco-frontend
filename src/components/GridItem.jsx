/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";

function GridItem({ img, onClick }) {
    
  return (
    <div>
      <img
        alt="pic"
        src={img.url}
        onClick={onClick}
      />
    </div>
  );
}

export default GridItem;
