import React, { useState } from "react";
import { useSelector } from "react-redux";

import "../styles.css";
import GridItem from "./GridItem";

function ImagesGrid() {
  // Get urls of all images from the store
  const tmp = useSelector((state) => state.imgUrls);
  // Order images from first to last
  const imgs = tmp.slice().reverse();

  // Large grid has max. 2 columns
  // Small grid has min. 2 columns
  // Grid size toggled by clicking any image
  const [clicked, setClicked] = useState(false);
  const gridType = clicked ? "grid-large" : "grid-small";

  return (
    <div className="imagesGrid bg-black w-auto h-auto">
      <div className={`${gridType} pt-[60px]`}>
        {imgs.map((img) => (
          <GridItem
            key={img.id}
            img={img}
            onClick={() => setClicked(!clicked)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImagesGrid;
