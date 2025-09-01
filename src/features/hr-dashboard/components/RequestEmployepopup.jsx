import React, { useEffect, useState } from "react";
import { ChevronRight, Check, X } from "lucide-react";
import axios from "axios";

const RequestEmployepopup = ({ employeeId, onClose, onBack }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/requests/getrequests/${employeeId}`,
          {
            withCredentials: true,
          }
        );
        setRequests(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error("❌ Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchRequests();
  }, [employeeId]);
const handleApprove = async (requestId) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/requests/${requestId}/approve`,
      {}, // لو الباك بيرضى object فارغ
      { withCredentials: true }
    );
    setRequests(prev =>
      prev.map(r => r._id === requestId ? { ...r, status: "مقبول" } : r)
    );
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
    setRequests(prev =>
      prev.map(r => r._id === requestId ? { ...r, status: "مرفوض" } : r)
    );
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "حدث خطأ أثناء الرفض");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-6 w-[700px] max-h-[80vh] flex flex-col">
        
        {/* الهيدر */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={onBack} className="flex items-center text-[#410A5F]">
            <svg width="15" height="15" viewBox="0 0 22 20" fill="none">
              <path d="M11.75 19L20.75 10L11.75 1M19.5 10H1.25" stroke="#410A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button onClick={onClose} className="text-[#410A5F] text-xl">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 0.5C5.15 0.5 0.5 5.15 0.5 11C0.5 16.85 5.15 21.5 11 21.5C16.85 21.5 21.5 16.85 21.5 11C21.5 5.15 16.85 0.5 11 0.5ZM15.05 16.25L11 12.2L6.95 16.25L5.75 15.05L9.8 11L5.75 6.95L6.95 5.75L11 9.8L15.05 5.75L16.25 6.95L12.2 11L16.25 15.05L15.05 16.25Z" fill="#410A5F"/>
            </svg>
          </button>
        </div>

        <h2 className="text-lg font-bold text-right mb-4 text-[#FF9831]">الطلبات</h2>

        <div 
          className="flex-1 overflow-y-auto pr-2"
          style={{
            maxHeight: "50vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#6B46C1 transparent",
          }}
        >
          {loading ? (
            <div className="text-center text-gray-500 p-4">⏳ جاري تحميل الطلبات...</div>
          ) : (
            <table className="w-full bg-[#F8F8F8]">
              <thead>
                <tr className="text-sm text-[#410A5F]">
                  <th className="p-2">نوع الطلب</th>
                  <th className="p-2">تاريخ التقديم</th>
                  <th className="p-2">الحالة</th>
                  <th className="p-2">إجراء سريع</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id} className="text-center border-b border-[#D8D8D8]">
                      <td className="p-2">{req.type}</td>
                      <td className="p-2">{new Date(req.createdAt).toLocaleDateString()}</td>
<td className={`p-2 ${req.status !== "قيد المراجعة" ? "font-bold" : ""}`}>{req.status}</td>

                      <td className="p-2">
                      {req.status === "قيد المراجعة" ? (
  <div className="flex justify-center gap-2">
    <button 
      onClick={() => handleApprove(req._id)}
      className="flex items-center gap-2 px-4 py-2 bg-[#E9E8E8] rounded-full text-sm font-semibold"
    >
      <Check size={16} className="text-[#FF9831]" />
      <span className="text-[#FF9831]">مقبول</span>
    </button>
    <button 
      onClick={() => handleReject(req._id)}
      className="flex items-center gap-2 px-4 py-2 bg-[#E9E8E8] rounded-full text-sm font-semibold"
    >
      <X size={16} className="text-black" />
      <span className="text-black">مرفوض</span>
    </button>
  </div>
) : (
  <span className="text-gray-400 text-sm">-</span>
)}

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 p-4">
                      لا توجد طلبات حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default RequestEmployepopup;
