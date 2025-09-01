// src/features/hr-dashboard/pages/EmployeeAttendancePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeAttendancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        console.log("Employee ID:", id);

        const res = await fetch(
          `http://localhost:4000/api/attendance/getMonthlyAttendanceForEmployee/${id}`
        );
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">⏳ جاري التحميل...</div>;
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">
        ❌ لم يتم العثور على بيانات
        <div>
          <button
            onClick={() => navigate("/employees")}
            className="mt-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            ← رجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 " dir="rtl">
      {/* زر رجوع */}
      <button
        onClick={() => navigate("/employees")}
        className=" flex justify-center items-center mb-3  bg-[#F8F8F8] hover:bg-gray-300 w-[40px] h-[40px] rounded-[16px]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.75 19L20.75 10L11.75 1M19.5 10H1.25"
            stroke="#3A455D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* الكروت فوق */}
      <div className="flex justify-center gap-4 mb-6">
        {/* كارت الإجازات */}
        <div className="w-60 h-32 bg-[#D8D8D833] px-6 py-4 rounded-xl shadow flex flex-col items-start text-right">
          <div className="mb-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#121217" />
              <path
                d="M17.1429 9.5V11H22.8571V9.5C22.8571 8.67172 23.4955 8 24.2857 8C25.0759 8 25.7143 8.67172 25.7143 9.5V11H27.8571C29.0402 11 30 12.0073 30 13.25V15.5H10V13.25C10 12.0073 10.9594 11 12.1429 11H14.2857V9.5C14.2857 8.67172 14.9241 8 15.7143 8C16.5045 8 17.1429 8.67172 17.1429 9.5ZM10 17H30V29.75C30 30.9922 29.0402 32 27.8571 32H12.1429C10.9594 32 10 30.9922 10 29.75V17ZM13.5714 20C13.1768 20 12.8571 20.3375 12.8571 20.75V23.75C12.8571 24.1625 13.1768 24.5 13.5714 24.5H26.4286C26.8214 24.5 27.1429 24.1625 27.1429 23.75V20.75C27.1429 20.3375 26.8214 20 26.4286 20H13.5714Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">{data.totalLeaves}</span>
          <span className="text-gray-600 text-sm">أيام الإجازات المتاحة</span>
        </div>

        {/* كارت الغياب */}
        <div className="w-60 h-32 bg-[#D8D8D833] px-6 py-4 rounded-xl shadow flex flex-col items-start text-right">
          <div className="mb-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.664062" width="40" height="40" rx="20" fill="#121217" />
              <path
                d="M20.6641 10C15.1441 10 10.6641 14.48 10.6641 20C10.6641 25.52 15.1441 30 20.6641 30C26.1841 30 30.6641 25.52 30.6641 20C30.6641 14.48 26.1841 10 20.6641 10ZM25.6641 21H15.6641V19H25.6641V21Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">{data.totalAbsent}</span>
          <span className="text-gray-600 text-sm">يوم الغياب</span>
        </div>

        {/* كارت التأخير */}
        <div className="w-60 h-32 bg-[#D8D8D833] px-6 py-4 rounded-xl shadow flex flex-col items-start text-right">
          <div className="mb-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.332031" width="40" height="40" rx="20" fill="#121217" />
              <path
                d="M20.322 10C14.802 10 10.332 14.48 10.332 20C10.332 25.52 14.802 30 20.322 30C25.852 30 30.332 25.52 30.332 20C30.332 14.48 25.852 10 20.322 10ZM23.622 24.71L19.332 20.41V15H21.332V19.59L25.042 23.3L23.622 24.71Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">{data.totalLate}</span>
          <span className="text-gray-600 text-sm">يوم التأخير</span>
        </div>
      </div>

      {/* جدول الحضور */}
      <h2 className="text-xl font-bold mb-6">
        سجل الحضور - {data.employeeName}
      </h2>
      <p className="mb-4">{data.month}</p>

      <div className="bg-[#D8D8D833] rounded-xl shadow overflow-hidden">
        <div className=" overflow-y-auto max-h-80 custom-scroll">
          <table className="min-w-full text-center ">
            <thead className=" top-0  z-10">
              <tr>
                <th className="py-3 px-4">اليوم</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4">الحضور</th>
                <th className="py-3 px-4">الانصراف</th>
              </tr>
            </thead>
            <tbody>
              {data.days?.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{row.day}</td>
                  <td className="py-2 px-4">{row.status}</td>
                  <td className="py-2 px-4">
                    {row.checkIn || "لم يتم تسجيل الحضور"}
                  </td>
                  <td className="py-2 px-4">
                    {row.checkOut || "لم يتم تسجيل الانصراف"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendancePage;
