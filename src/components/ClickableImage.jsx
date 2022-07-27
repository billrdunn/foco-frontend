/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import "../styles.css";

function ClickableImage({ img }) {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <Col xs={12} sm={12} md={12} lg={12} onClick={() => setClicked(false)}>
      <Image src={img.url} />
    </Col>
  ) : (
    <Col onClick={() => setClicked(true)}>
      <Image src={img.url} />
    </Col>
  );
}

export default ClickableImage;
