// src/features/hr-dashboard/pages/ReportsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/reportTable";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("الحضور");
  const [attendanceData, setAttendanceData] = useState([]);
  const [contractsData, setContractsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["الحضور", "العقود"];

  const columnsMap = {
    الحضور: [
      "اسم الموظف",
      "الحضور",
      "الغياب",
      "التأخير",
      "الإجازات",
      "الإجازات المتبقية",
    ],
    العقود: [
      "اسم الموظف",
      "بداية العقد",
      "نهاية العقد",
      "الوقت المتبقي",
      "مدة العقد",
    ],
  };

  const dataMap = {
    الحضور: attendanceData,
    العقود: contractsData,
  };

  // 📌 fetch attendance
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/attendance/monthlyReport"
      );

      // ✨ إعادة تشكيل البيانات للجدول
      const mapped = res.data.reports.map((emp) => ({
        "اسم الموظف": emp.name,
        "الحضور": emp.attendance.present,
        "الغياب": emp.attendance.absent,
        "التأخير": emp.attendance.late,
        "الإجازات": emp.leaves.taken,
        "الإجازات المتبقية": emp.leaves.remaining,
      }));

      setAttendanceData(mapped);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 fetch contracts
  const fetchContracts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/hr/getAllContracts"
      );

      const mapped = res.data.map((c) => ({
        "اسم الموظف": c.employeeName,
        "بداية العقد": new Date(c.contractStart).toLocaleDateString(),
        "نهاية العقد": new Date(c.contractEnd).toLocaleDateString(),
        "الوقت المتبقي": c.remainingDays + " يوم",
        "مدة العقد": c.contractDuration,
      }));

      setContractsData(mapped);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 كل ما يتغير التاب
  useEffect(() => {
    if (activeTab === "العقود" && contractsData.length === 0) {
      fetchContracts();
    }
    if (activeTab === "الحضور" && attendanceData.length === 0) {
      fetchAttendance();
    }
  }, [activeTab]);

  return (
    <div className="p-b-4">
      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 transition w-[172px] rounded-tl-[16px] rounded-tr-[16px] ${
              activeTab === tab
                ? "bg-[#FF9831] text-white"
                : "bg-[#E9E8E8] text-[#5D5D5D7A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="p-4">جاري التحميل...</p>
      ) : (
        <Table columns={columnsMap[activeTab]} data={dataMap[activeTab]} />
      )}
    </div>
  );
};

export default ReportsPage;
