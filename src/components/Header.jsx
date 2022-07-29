import React, { useState, useEffect } from "react";
import Logo from "./Logo";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });
  }, []);

  if (window.innerWidth < 1024) {
    return (
      <div className="flex place-content-evenly mob:columns-1 tab:columns-1 desk:columns-3 py-[60px]">
        <div className="h-auto mx-[-88px] logo items-end ">
          <Logo />
        </div>
      </div>
    );
  }
  return (
    <div className="flex place-content-evenly mob:columns-1 tab:columns-1 desk:columns-3 py-[60px]">
      <div className="flex items-center h-auto logo ">
        <div className=" h-auto w-autologo mx-auto items-end text-white font-domaine">
          <a href="mailto:info@focobcn.com">Email</a>
        </div>
      </div>
      <div className="h-auto mx-[-88px] logo items-end ">
        <Logo />
      </div>
      <div className="flex h-auto logo items-center ">
        <div className=" text-white w-autologo mx-auto items-end b  font-domaine">
          <a href="https://www.instagram.com/foco.bcn/" target="_blank" rel="noreferrer noopener">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
