import PropTypes from "prop-types";
import React, { useState } from "react";

function Togglable({ buttonLabel, children }) {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="submit" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button type="submit" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
}

export default Togglable;
