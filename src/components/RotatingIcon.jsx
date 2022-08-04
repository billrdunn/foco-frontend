import React from "react";
import styled, { keyframes } from "styled-components";

function RotatingIcon() {
  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

  const Rotate = styled.div`
    animation: ${rotate} 2s linear infinite;
  `;
  return (
    <div className="mx-auto columns-1 w-138px">
      <Rotate>
        <img src="https://focobcn.s3.eu-west-3.amazonaws.com/FOCO_Face.png" alt="loader" />
      </Rotate>
    </div>
  );
}

export default RotatingIcon;
