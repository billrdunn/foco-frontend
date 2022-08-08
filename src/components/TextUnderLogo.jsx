import React from "react";
import PropTypes from "prop-types";
import { useWindowDimensions } from "../hooks";

function TextUnderLogo({ blank }) {
  TextUnderLogo.propTypes = {
    blank: PropTypes.bool.isRequired,
  };

  // Use custom hook to get window dimensions
  const dimensions = useWindowDimensions();

  // Return different text design depending on window width
  // note a blank component is used to keep consistent design when no text is needed
  if (!blank) {
    // contains text
    if (dimensions.width < 1024) {
      // Mobile/tablet text (email & insta links, single col)
      return (
        <>
          <div className="textUnderLogoMobile h-auto align-top w-auto justify-center ">
            <div className="mob:columns-1 tab:columns-1 desk:columns-2 ">
              <div className="text-white text-center font-domaine">
                01.08.22 — Swift, Shoreditch
                <span className="block mb-[-2px]" />
                02.08.22 — Calloh Callay, Shoreditch
              </div>
              <div className="text-white text-center font-domaine">
                04.08.22 — Lab 22, Cardiff
                <span className="block mb-[-2px]" />
                07.08.22 — Filthy XIII, Bristol
              </div>
            </div>
          </div>
          <div className="h-auto align-top w-auto justify-center  pt-[60px]">
            <div className="mob:columns-1 tab:columns-1 desk:columns-2 ">
              <div className="text-white text-center font-domaine ">
                <a
                  className=" hover:text-[#A4FF94]"
                  href="https://www.instagram.com/foco.bcn/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Instagram
                </a>
                <span className="block mb-[-2px]" />
                <a className=" hover:text-[#A4FF94]" href="mailto:info@focobcn.com">
                  Email
                </a>
              </div>
            </div>
          </div>
        </>
      );
    }
    // Desktop text (no email & insta links, two cols)
    return (
      <div className="textUnderLogoDesktop h-auto align-top w-auto justify-center ">
        <div className="mob:columns-1 tab:columns-1 desk:columns-2 ">
          <div className="text-white text-center font-domaine">
            01.08.22 — Swift, Shoreditch
            <span className="block mb-[-2px]" />
            02.08.22 — Calloh Callay, Shoreditch
          </div>
          <div className="text-white text-center font-domaine">
            04.08.22 — Lab 22, Cardiff
            <span className="block mb-[-2px]" />
            07.08.22 — Filthy XIII, Bristol
          </div>
        </div>
      </div>
    );
  }
  // Blank component, same size as with text
  return (
    <div className="h-auto align-top w-auto justify-center ">
      <div className="mob:columns-1 tab:columns-1 desk:columns-2 ">
        <div className="text-white text-center font-domaine">
          <br />
          <br />
        </div>
        <div className="text-white text-center font-domaine">
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default TextUnderLogo;
