/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Container } from "react-bootstrap";

import "../styles.css";
import GridItem from "./GridItem";
// import Gallery from "react-grid-gallery";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function ImagesGrid() {
  const tmp = useSelector((state) => state.imgUrls);
  const imgs = tmp.slice().reverse();
  const [clicked, setClicked] = useState(false);

  const gridType = clicked ? "grid-large" : "grid-small";

  return (
    <div className="bg-black w-auto h-auto">
      <div className={`${gridType} pt-[60px]`}>
        {imgs.map((img) => (
          <GridItem key={img.id} img={img} onClick={() => setClicked(!clicked)} />
        ))}
      </div>
    </div>
  );
}

export default ImagesGrid;
