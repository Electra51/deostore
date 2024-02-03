import React from "react";
import { Outlet } from "react-router-dom";
import HelmetHooks from "../../hooks/HelmetHooks";
import SideBar from "./SideBar";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <HelmetHooks title={"Dashboard | deostore"} />
      <div className="h-[100vh]">
        <DashboardNavbar />
        <div className="flex ">
          <SideBar />
          <div className="w-full bg-[#FAFAFA]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
