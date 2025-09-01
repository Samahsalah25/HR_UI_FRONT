import axios from "axios";
export default function RequestsTable() {
  const data = [
    { name: "محمد علي", type: "إجازة", date: "01/08/2025", status: "قيد المراجعة" },
    { name: "أحمد حسن", type: "بدل", date: "03/08/2025", status: "مقبول" },
    { name: "سارة محمود", type: "إجازة", date: "05/08/2025", status: "مرفوض" },
  ];

  return (
    <div   style={{ backgroundColor: "#E6E6E64D" }} className=" rounded-2xl shadow flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">الطلبات</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg bg-black text-white text-sm">طلب إجازة</button>
          <button className="px-3 py-1 rounded-lg bg-gray-200 text-sm">طلبات بدل</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm text-right">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">اسم الموظف</th>
              <th className="p-2">نوع الطلب</th>
              <th className="p-2">تاريخ التقديم</th>
              <th className="p-2">الحالة</th>
              <th className="p-2">إجراء سريع</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.type}</td>
                <td className="p-2">{row.date}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">
                  <button className="text-blue-600">👁 عرض</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
