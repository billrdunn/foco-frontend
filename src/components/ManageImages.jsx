/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
// import SearchBar from "./SearchBar";
// import ItemCard from "./ItemCard";
// import { setMonth } from "../reducers/monthReducer";
import "../styles.css";
import Gallery from "react-grid-gallery";
// import ClickableImage from "./ClickableImage";
import { Helmet } from "react-helmet";
import { deleteImgUrl } from "../reducers/imgUrlsReducer";
import LoginForm from "./LoginForm";

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
  const onClickThumbnail = (index, image) => {
    const imgUrl = image.target.currentSrc;
    console.log(imgUrl);

    const imgToDelete = imgs.find((img) => img.url === image.target.currentSrc);

    console.log("imgToDelete :>> ", imgToDelete);
    dispatch(deleteImgUrl(imgToDelete));
  };

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no height=device-height"
        />
      </Helmet>
      <Container className="logo">
        <Row>
          <Col>
            <Image
              className="image"
              fluid
              src="https://focobcn.s3.eu-west-3.amazonaws.com/FOCO_LOGO.png"
            />
          </Col>
        </Row>
      </Container>
      <br />
      <h1>tap an image to delete it</h1>
      <Container className="gallery-container">
        {showImgs && (
          <div
            style={{
              display: "block",
              minHeight: "250px",
              minWidth: "250px",
              width: "100%",
              overflow: "auto",
            }}
          >
            <Gallery
              images={forGallery}
              showImageCount={false}
              enableLightBox={false}
              enableImageSelection={false}
              onClickThumbnail={onClickThumbnail}
            />
          </div>
        )}
      </Container>
      {/* <Container>
        {showImgs && (
          <Row xs={2} sm={3} md={4} lg={5}>
            {imgs.map((img) => (
              <ClickableImage key={img.id} img={img} />
            ))}
          </Row>
        )}
      </Container> */}
    </div>
  );
}

function ManageImages() {
  const authenticated = useSelector((state) => state.authenticated);

  return authenticated ? <ImageGrid /> : <LoginForm />;
}

export default ManageImages;
