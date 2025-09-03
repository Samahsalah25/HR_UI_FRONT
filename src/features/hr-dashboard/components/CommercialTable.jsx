import { useState, useEffect } from "react";
import axios from "axios";

export default function CommercialTable() {
  const [activeTab, setActiveTab] = useState("سجل تجاري");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (category) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/licence", {
        params: { category },
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <div
      // style={{ backgroundColor: "#E9E8E84D" }}
      className="relative rounded-2xl p-4 flex flex-col "
    >
      {/* الأزرار */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => setActiveTab("سجل تجاري")}
          className={`px-3 py-1 rounded-lg text-sm ${
            activeTab === "سجل تجاري"
              ? "bg-[#FF9831] text-white"
              : "bg-[#E9E8E866] text-[#A2A4A7]"
          }`}
        >
          سجل تجاري
        </button>
        <button
          onClick={() => setActiveTab("تراخيص")}
          className={`px-3 py-1 rounded-lg text-sm ${
            activeTab === "تراخيص"
              ? "bg-[#FF9831] text-white"
              : "bg-[#E9E8E866] text-[#A2A4A7]"
          }`}
        >
          تراخيص
        </button>
      </div>

      {/* الجدول */}
      <div className="flex-1 overflow-auto max-h-40 custom-scrollbar">
        {loading ? (
          <p className="text-center text-gray-500">جار التحميل...</p>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right min-w-0">
              <thead className="text-[#410A5F] border-b border-[#D8D8D8]">
                <tr>
                  <th className="p-2">النوع</th>
                  <th className="p-2">الرقم</th>
                  <th className="p-2">الفرع</th>
                  <th className="p-2">تاريخ الانضمام</th>
                  <th className="p-2">تاريخ الانتهاء</th>
                  <th className="p-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row._id}
                    className="border-b border-gray-300 last:border-none text-[#1B1C1C]"
                  >
                    <td className="p-2">{row.type}</td>
                    <td className="p-2">{row.number}</td>
                    <td className="p-2">{row.branch}</td>
                    <td className="p-2">
                      {new Date(row.issueDate).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="p-2">
                      {new Date(row.expiryDate).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="p-2">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">لا توجد بيانات</p>
        )}
      </div>

      {/* ستايل للسكرول بار */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
