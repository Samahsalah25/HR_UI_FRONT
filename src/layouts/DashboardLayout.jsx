import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden p-[10px]">
      {/* Container */}
      <div className="flex flex-1 h-[calc(100vh-16px)] m-2 rounded-xl bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="flex-1 p-6">
            <Outlet /> {/* هنا تظهر كل صفحات الـ Dashboard */}
          </main>
        </div>
      </div>
    </div>
  );
}
