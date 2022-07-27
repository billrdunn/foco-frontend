/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";

function GridItem({ img }) {
    
  return (
    <div>
      <img
        alt="pic"
        src={img.url}
        onClick={() => {
          console.log(img.url);
        }}
      />
    </div>
  );
}

export default GridItem;
