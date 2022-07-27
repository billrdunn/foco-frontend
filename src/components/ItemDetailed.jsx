import React from "react";
import PropTypes from "prop-types";

function ItemDetailed({ item }) {
  ItemDetailed.propTypes = {
    item: PropTypes.shape({
      latin: PropTypes.string.isRequired,
      common: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.shape({
        cap: PropTypes.string.isRequired,
        gills: PropTypes.string.isRequired,
        stem: PropTypes.string.isRequired,
        flesh: PropTypes.string.isRequired,
        spores: PropTypes.string.isRequired,
      }),
      habitat: PropTypes.string.isRequired,
      flavour: PropTypes.string.isRequired,
      frequency: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  const itemStyle = {
    padding: "10px",
    borderBottom: "10px solid white",
    borderTop: "10px solid white",
  };

  return (
    <div style={itemStyle} id="itemDetailsDiv">
      <h2>{item.latin}</h2>
      <span>{item.common}</span>
      <p>Cap: {item.description.cap}</p>
      <p>Gills: {item.description.gills}</p>
      <p>Stem: {item.description.stem}</p>
      <p>Flesh: {item.description.flesh}</p>
      <p>Spores: {item.description.spores}</p>
      <p>Habitat: {item.habitat}</p>
      <p>Flavour: {item.flavour}</p>
      <p>Frequency: {item.frequency}</p>
      <img src={item.image} alt="Amethyst deceiver pic" height={200} />
      <p />
    </div>
  );
}

export default ItemDetailed;
