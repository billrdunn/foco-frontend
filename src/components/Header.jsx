import React, { useState, useEffect } from "react";
import Logo from "./Logo";

function Header() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // Listen for resize events and rerender page when they occur
    window.addEventListener("resize", () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });
  }, []);

  // Return different header design depending on window width
  if (dimensions.width < 1024) {
    // Mobile/tablet header (no email & insta links)
    return (
      <div className="mobileHeader">
        <div className="flex place-content-evenly mob:columns-1 tab:columns-1 desk:columns-3 py-[60px]">
          <div className="h-auto mx-[-88px] logo items-end ">
            <Logo />
          </div>
        </div>
      </div>
    );
  }
  // Desktop header (contains email & insta links)
  return (
    <div className="desktopHeader">
      <div className="flex place-content-evenly mob:columns-1 tab:columns-1 desk:columns-3 py-[60px]">
        <div className="flex items-center h-auto logo ">
          <div className=" h-auto w-autologo mx-auto items-end text-white font-domaine">
            <a className="emailLink hover:text-[#A4FF94]" href="mailto:info@focobcn.com">
              Email
            </a>
          </div>
        </div>
        <div className="h-auto mx-[-88px] logo items-end ">
          <Logo />
        </div>
        <div className="flex h-auto logo items-center ">
          <div className=" w-autologo mx-auto items-end font-domaine text-white">
            <a
              className="instagramLink hover:text-[#A4FF94]"
              href="https://www.instagram.com/foco.bcn/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
