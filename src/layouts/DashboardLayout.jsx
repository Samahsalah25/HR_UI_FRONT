import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <div className="h-screen lg:overflow-hidden
     w-screen p-2">
      {/* الحاوية */}
      <div className="flex h-full w-full rounded-xl bg-white overflow-hidden">
        {/* Sidebar - يظهر بس في الشاشات الكبيرة */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 h-full">
          <Topbar />
         <main className="flex-1 p-4 lg:p-6 overflow-auto lg:overflow-hidden bg-white">

            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
