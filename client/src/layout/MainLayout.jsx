import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/pages/student/HeroSection";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
