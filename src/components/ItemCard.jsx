import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function ItemBasic({ img }) {

  ItemBasic.propTypes = {
    img: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <Card bg="dark" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img.url}/>
    </Card>
  );
}

export default ItemBasic;
