import React from "react";
import { useSelector } from "react-redux";
import "../styles.css";
import LoginForm from "./LoginForm";
import ImageGrid from "./ManageImagesGrid";

function ManageImagesPage() {
  const authenticated = useSelector((state) => state.authenticated);
  console.log("authenticated :>> ", authenticated);

  return (
    <div className="bg-black absolute w-screen h-auto min-h-screen px-[10px] pb-[10px]">
      {authenticated ? <ImageGrid /> : <LoginForm />}
    </div>
  );
}

export default ManageImagesPage;
