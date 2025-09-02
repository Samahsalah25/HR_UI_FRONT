import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import axios from "axios";

export default function RequestsTable() {
  const [activeTab, setActiveTab] = useState("إجازة"); // الافتراضي إجازة
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة تجيب البيانات من الباك
  const fetchRequests = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/requests?type=${type}`,
        {
          withCredentials: true,
        }
      );
      setRequests(res.data.items || []);
    } catch (err) {
      console.error("خطأ في جلب الطلبات:", err);
    } finally {
      setLoading(false);
    }
  };

  // دالة قبول
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/requests/${id}/approve`,
        {},
        { withCredentials: true }
      );
      fetchRequests(activeTab); // إعادة تحميل البيانات
    } catch (err) {
      console.error("خطأ في قبول الطلب:", err);
    }
  };

  // دالة رفض
  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/requests/${id}/reject`,
        {},
        { withCredentials: true }
      );
      fetchRequests(activeTab); // إعادة تحميل البيانات
    } catch (err) {
      console.error("خطأ في رفض الطلب:", err);
    }
  };

  // أول ما يفتح الكومبوننت يجيب الإجازات
  useEffect(() => {
    fetchRequests(activeTab);
  }, [activeTab]);

  return (
    <div
      style={{}}
      className=" p-4 flex flex-col h-80 min-h-0"
    >
      {/* العنوان */}
      <h2 className="text-lg font-bold text-[#410A5F] mb-3">الطلبات</h2>

      {/* الأزرار */}
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

      {/* الجدول */}
      <div className="flex-1  min-h-2">
        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل البيانات...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد طلبات</p>
        ) : (
          <table className="w-full text-sm text-right">
            <thead className="text-[#410A5F] border-b top-0 ">
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(row.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 text-orange-500 text-xs"
                        >
                          <Check size={14} /> قبول
                        </button>
                        <button
                          onClick={() => handleReject(row.id)}
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
