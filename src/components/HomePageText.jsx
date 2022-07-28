import React from "react";

// eslint-disable-next-line react/prop-types
function HomePageText({ blank }) {
  if (!blank) {
    return (
      <div className="h-auto align-top w-auto justify-center ">
        <div className="mob:columns-1 tab:columns-1 desk:columns-2 ">
          <div className="text-white text-center font-domaine">
            01.08.22 — Swift, Shoreditch
            <br />
            02.08.22 — Calloh Callay, Shoreditch
          </div>
          <div className="text-white text-center font-domaine">
            04.08.22 — Lab 22, Cardiff
            <br />
            07.08.22 — Filthy XIII, Bristol
          </div>
        </div>
      </div>
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
