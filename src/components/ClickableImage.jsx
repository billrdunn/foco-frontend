/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";

function ClickableImage({ img }) {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <Col xs={12} sm={12} md={12} lg={12} onClick={() => setClicked(false)}>
      <Image className="image" fluid src={img.url} />
    </Col>
  ) : (
    <Col onClick={() => setClicked(true)}>
      <Image className="image" fluid src={img.url} />
    </Col>
  );
  // <Col>
  //   <Image className="image" fluid src={img.url} onClick={() => setClicked(true)} />
  // </Col>
}

export default ClickableImage;
