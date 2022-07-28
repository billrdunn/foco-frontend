/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles.css";
import Gallery from "react-grid-gallery";
// import ClickableImage from "./ClickableImage";
import { deleteImgUrl } from "../reducers/imgUrlsReducer";
import LoginForm from "./LoginForm";
import Header from "./Header";
import GridItem from "./GridItem";

function ImageGrid() {
  const dispatch = useDispatch();
  const tmp = useSelector((state) => state.imgUrls);
  const imgs = tmp.slice().reverse();
  const showImgs = useSelector((state) => state.showImgs);

  // eslint-disable-next-line arrow-body-style
  const forGallery = imgs.map((img) => {
    return {
      src: img.url,
      thumbnail: img.url,
      thumbnailWidth: 320,
      thumbnailHeight: 320,
      isSelected: false,
      caption: "",
    };
  });
  const onClickThumbnail = (image) => {

    const imgUrl = image.url;
    console.log(imgUrl);

    const imgToDelete = imgs.find((img) => img.url === imgUrl);

    console.log("imgToDelete :>> ", imgToDelete);
    dispatch(deleteImgUrl(imgToDelete));
  };

  return (
    <div>
      <Header />
      <h1 className="text-white">tap an image to delete it</h1>
      <div className="grid pt-[30px]">
        {imgs.map((img) => (
          <GridItem onClick={() => onClickThumbnail(img)} key={img.id} img={img} />
        ))}
      </div>
    </div>
  );
}

function ManageImages() {
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <div className="bg-black px-10px pb-10px w-auto h-full">
      {authenticated ? <ImageGrid /> : <LoginForm />};
    </div>
  );
}

export default ManageImages;
