import React from "react";

// eslint-disable-next-line react/prop-types
function HomePageText({ blank }) {
  return (
    <div className=" align-top h-[165px] w-auto justify-center">
      <div className="mob:columns-1 tab:columns-1 desk:columns-2 mt-60px">
        {!blank && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default HomePageText;
