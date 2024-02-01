import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import HelmetHooks from "../../hooks/HelmetHooks";

const MainLayout = () => {
  return (
    <div>
      <HelmetHooks title={"Deostore | home"} />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
