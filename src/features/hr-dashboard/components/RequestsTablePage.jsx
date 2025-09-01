import React from "react";
import axios from "axios";
// Helper لتنسيق التاريخ
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const RequestsTable = ({ columns, data, filter, onRowClick  ,  fetchRequests}) => {
const handleApprove = async (requestId) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/requests/${requestId}/approve`,
      {}, // لو الباك بيرضى object فارغ
      { withCredentials: true }
    );
    fetchRequests(filter); // تحديث الجدول
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "حدث خطأ أثناء الموافقة");
  }
};

const handleReject = async (requestId) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/requests/${requestId}/reject`,
      {},
      { withCredentials: true }
    );
    fetchRequests(filter); // تحديث الجدول
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "حدث خطأ أثناء الرفض");
  }
};


  return (
    <div
      className="overflow-x-auto overflow-y-auto rounded-[16px] border-b-2 border-gray-200 max-h-[calc(100vh-120px)] custom-scrollbar"
      style={{ backgroundColor: "#E6E6E64D", scrollbarColor: "#7B1FA2 #E6E6E64D" ,scrollbarColor: "#410A5F transparent",
    scrollbarWidth: "thin",}}
   
    >
      <table className="min-w-full text-sm rounded-[16px]">
        <thead className="text-[#410A5F] text-md top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-center font-bold text-[#410A5F]">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition text-black cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                <td className="px-4 py-3 text-center">{row.employeeName}</td>
                <td className="px-4 py-3 text-center">{row.type}</td>
                <td className="px-4 py-3 text-center">{formatDate(row.submittedAt)}</td>
     <td className={`p-2 ${row.status !== "قيد المراجعة" ? "font-bold" : ""}`}>{row.status}</td>

                {/* التاريخ حسب الحالة */}
                {row.status === "مقبول" && filter !== "الكل" && (
                  <td className="px-4 py-3 text-center ">{formatDate(row.decisionDate)}</td>
                )}
                {row.status === "مرفوض" && filter !== "الكل" && (
                  <td className="px-4 py-3 text-center ">{formatDate(row.decisionDate)}</td>
                )}

                {/* الإجراء السريع */}
                {row.status === "قيد المراجعة" && (
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                      onClick={(e) => {
    e.stopPropagation(); 
    handleApprove(row.id);
  }}
                      
                      className="rounded-[16px] w-[101px] flex items-center justify-center gap-1 px-3 py-1 bg-[#E9E8E8] text-[#FF9831] font-bold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9831" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        قبول
                      </button>
                      <button
                      onClick={(e) => {
    e.stopPropagation();
    handleReject(row.id);
  }}
                      className="flex items-center gap-1 px-3 py-1 bg-[#E9E8E8] text-black rounded-[16px] w-[101px] justify-center font-bold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        رفض
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
