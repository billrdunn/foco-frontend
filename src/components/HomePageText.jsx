import React from "react";

// eslint-disable-next-line react/prop-types
function HomePageText({ blank }) {
  if (!blank) {
    return (
      <>
        <div className="h-auto align-top w-auto justify-center ">
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
            <div className="text-white text-center font-domaine">
              <a href="https://www.instagram.com/foco.bcn/">Instagram</a>
              <span className="block mb-[-2px]" />
              <a href="mailto:info@focobcn.com">Email</a>
            </div>
          </div>
        </div>
      </>
    );
  }
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

export default HomePageText;
