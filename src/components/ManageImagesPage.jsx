import React from "react";
import { useSelector } from "react-redux";
import "../styles.css";
import Header from "./Header";
import LoginForm from "./LoginForm";
import ImageGrid from "./ManageImagesGrid";

function ManageImagesPage() {
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <div className="homePage bg-black w-auto h-auto min-h-screen px-[10px] pb-[10px]">
      <Header />
      <div className="bg-black absolute w-screen h-auto min-h-screen px-[10px] pb-[10px]">
        {authenticated ? <ImageGrid /> : <LoginForm />}
      </div>
    </div>
  );
}

export default ManageImagesPage;
