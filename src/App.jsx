import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./features/hr-dashboard/pages/HomePage";
import Requests from "./features/hr-dashboard/pages/Requests"; 
import ReportsPage from "./features/hr-dashboard/pages/ReportsPage";
import EmployeesPage from "./features/hr-dashboard/pages/EmployeesPage";
import EmployeeAttendancePage from "./features/hr-dashboard/pages/EmployeeAttendancePage";
import AddEmployeePage from "./features/hr-dashboard/pages/AddEmployeePage";
import LoginPage from "./features/hr-dashboard/pages/LoginPage";
import DashboardHome from "./features/hr-dashboard/pages/DashboardHome";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول بدون الـ DashboardLayout */}
        <Route path="/" element={<LoginPage />} />

        {/* باقي الصفحات داخل الـ DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:id/attendance" element={<EmployeeAttendancePage />} />
          <Route path="/addemployee" element={<AddEmployeePage mode="add" />} />
          <Route path="/editemployee/:id" element={<AddEmployeePage mode="edit" />} />
        <Route path="/dashhome" element={<DashboardHome/>} />
        </Route>
      </Routes>
    </Router>
  );
}
