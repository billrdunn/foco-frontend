/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import "../styles.css";
import { Helmet } from "react-helmet";
import ImagesGrid from "./ImagesGrid";

function Home() {
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
      <ImagesGrid />
    </div>
  );
}

export default Home;
