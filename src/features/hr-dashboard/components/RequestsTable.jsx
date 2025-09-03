import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import axios from "axios";

export default function RequestsTable() {
  const [activeTab, setActiveTab] = useState("إجازة");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/requests?type=${type}`,
        { withCredentials: true }
      );
      setRequests(res.data.items || []);
    } catch (err) {
      console.error("خطأ في جلب الطلبات:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/requests/${id}/approve`,
        {},
        { withCredentials: true }
      );
      fetchRequests(activeTab);
    } catch (err) {
      console.error("خطأ في قبول الطلب:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/requests/${id}/reject`,
        {},
        { withCredentials: true }
      );
      fetchRequests(activeTab);
    } catch (err) {
      console.error("خطأ في رفض الطلب:", err);
    }
  };

  useEffect(() => {
    fetchRequests(activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col ">
      <h2 className="text-lg font-bold text-[#410A5F] mb-3">الطلبات</h2>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab("إجازة")}
          className={`px-3 py-1 rounded-lg text-sm ${
            activeTab === "إجازة"
              ? "bg-[#FF9831] text-white"
              : "bg-[#E9E8E866] text-[#A2A4A7]"
          }`}
        >
          طلبات إجازة
        </button>
        <button
          onClick={() => setActiveTab("بدل")}
          className={`px-3 py-1 rounded-lg text-sm ${
            activeTab === "بدل"
              ? "bg-[#FF9831] text-white"
              : "bg-[#E9E8E866] text-[#A2A4A7]"
          }`}
        >
          طلبات بدل
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل البيانات...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد طلبات</p>
        ) : (
          <table className="w-full text-sm text-right table-auto">
            <thead className="text-[#410A5F] border-b">
              <tr>
                <th className="p-2">اسم الموظف</th>
                <th className="p-2">نوع الطلب</th>
                <th className="p-2">تاريخ التقديم</th>
                <th className="p-2">الحالة</th>
                <th className="p-2">إجراء سريع</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((row) => (
                <tr key={row.id} className="border-b last:border-none">
                  <td className="p-2">{row.employeeName}</td>
                  <td className="p-2">{row.type}</td>
                  <td className="p-2">
                    {new Date(row.submittedAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td
                    className={`p-2 ${
                      row.status === "مقبول"
                        ? "text-orange-500 font-semibold"
                        : row.status === "مرفوض"
                        ? "text-red-500 font-semibold"
                        : ""
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="p-2">
                    {row.status === "قيد المراجعة" && (
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleApprove(row.id)}
                          disabled={loading}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 text-orange-500 text-xs"
                        >
                          <Check size={14} /> قبول
                        </button>
                        <button
                          onClick={() => handleReject(row.id)}
                          disabled={loading}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 text-gray-600 text-xs"
                        >
                          <X size={14} /> رفض
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
