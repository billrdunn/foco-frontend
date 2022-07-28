import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex  w-auto h-auto items-end pt-[60px] mb-[60px] ">
      <div className="flex h-auto logo mx-auto items-end ">
        <Logo />
      </div>
    </div>
  );
}

export default Header;
