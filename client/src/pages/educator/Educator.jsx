import React from "react";
import { Outlet } from "react-router-dom";
import NavbarEducator from "../../components/educator/NavbarEducator";
import Sidebar from "../../components/educator/Sidebar";
import Footer from "../../components/educator/Footer";

const Educator = () => {
  return (
    <div className="text-base min-h-screen bg-white">
      <NavbarEducator />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;
