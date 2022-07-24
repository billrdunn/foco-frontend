/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";

import "../styles.css";
import Gallery from "react-grid-gallery";
import { Helmet } from "react-helmet";

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

function Home() {
  const { width } = useWindowDimensions();

  const tmp = useSelector((state) => state.imgUrls);
  const imgs = tmp.slice().reverse();
  const showImgs = useSelector((state) => state.showImgs);

  // eslint-disable-next-line arrow-body-style
  const forGallery = imgs.map((img) => {
    return {
      src: img.url,
      thumbnail: img.url,
      thumbnailWidth: 30,
      thumbnailHeight: 150,
      isSelected: false,
      caption: "",
    };
  });

  const thumbnailStyle = () => ({
    width: "100%",
    height: "100%",
  });

  // eslint-disable-next-line consistent-return
  const tileViewportStyle = () => {
    // eslint-disable-next-line no-unused-vars
    const tileWidth = (nTiles, windowWidth) => windowWidth / nTiles - (40 + 4 * (nTiles - 1)) / 2;

    if (width > 299 && width < 400) {
      return {
        width: `${width / 2 - 28}px`,
        height: `${width / 2 - 28}px`,
      };
      // eslint-disable-next-line no-else-return
    } else if (width >= 400 && width < 576) {
      return {
        width: `${width / 3 - 20}px`,
        height: `${width / 3 - 20}px`,
      };
    } 
    else if (width >= 576 && width < 768) {
      return {
        width: "119px",
        height: "119px",
      };
    }
    else if (width >= 768 && width < 992) {
      return {
        width: "164px",
        height: "164px",
      };
    }
    else if (width >= 992 && width < 1200) {
      return {
        width: "178px",
        height: "178px",
      };
    }
    else if (width >= 1200 && width < 1400) {
      return {
        width: "214px",
        height: "214px",
      };
    }
    else if (width >= 1400) {
      return {
        width: "250px",
        height: "250px",
      };
    }
    return {
      width: "100%",
      height: "100%",
    };
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
      <Container className="gallery-container">
        {showImgs && (
          <Gallery
            images={forGallery}
            enableImageSelection={false}
            showImageCount={false}
            thumbnailStyle={() => thumbnailStyle()}
            tileViewportStyle={() => tileViewportStyle()}
          />
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

export default Home;
