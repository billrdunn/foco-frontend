/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
// import SearchBar from "./SearchBar";
// import ItemCard from "./ItemCard";
// import { setMonth } from "../reducers/monthReducer";
import "../styles.css";
import Gallery from "react-grid-gallery";
// import ClickableImage from "./ClickableImage";

function Home() {
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

  return (
    <div>
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
      <Container className="gallery-container">
        {showImgs && <Gallery images={forGallery} enableImageSelection={false} />}
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

export default Home;
