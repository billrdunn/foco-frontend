import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex w-auto h-[85px] items-end">
      <div className="flex logo mx-auto items-end">
        <Logo />
      </div>
    </div>
  );
}

export default Header;
