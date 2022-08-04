import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles.css";
import { deleteImgUrl } from "../reducers/imgUrlsReducer";
import Header from "./Header";
import GridItem from "./GridItem";

function ImageGrid() {
  const dispatch = useDispatch();
  const tmp = useSelector((state) => state.imgUrls);
  const imgs = tmp.slice().reverse();

  const onClickThumbnail = (image) => {
    const imgUrl = image.url;
    const imgToDelete = imgs.find((img) => img.url === imgUrl);
    dispatch(deleteImgUrl(imgToDelete));
  };

  return (
    <div>
      <Header />
      <h1 className="text-white">tap an image to delete it</h1>
      <div className="grid-small pt-[30px]">
        {imgs.map((img) => (
          <GridItem onClick={() => onClickThumbnail(img)} key={img.id} img={img} />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
