export default function CommercialTable() {
  const data = [
    { type: "سجل تجاري", number: "12345", branch: "القاهرة", start: "01/01/2023", end: "01/01/2026", status: "ساري" },
    { type: "ترخيص", number: "67890", branch: "الإسكندرية", start: "02/01/2023", end: "02/01/2025", status: "منتهي" },
    { type: "ترخيص", number: "54321", branch: "الجيزة", start: "03/01/2023", end: "03/01/2025", status: "ساري" },
  ];

  return (
    <div style={{ backgroundColor: "#E6E6E64D" }} className=" rounded-2xl  p-4 flex flex-col h-full">
      {/* الأزرار */}
      <div className="flex gap-2 mb-3">
        <button className="px-3 py-1 rounded-lg bg-black text-white text-sm">سجل تجاري</button>
        <button className="px-3 py-1 rounded-lg bg-gray-300 text-sm">تراخيص</button>
      </div>

      {/* الجدول */}
      <div className="flex-1 overflow-y-auto max-h-40 custom-scrollbar">
        <table className="w-full text-sm text-right">
          <thead className="text-gray-700 border-b border-[#D8D8D8]">
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
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-300 last:border-none">
                <td className="p-2">{row.type}</td>
                <td className="p-2">{row.number}</td>
                <td className="p-2">{row.branch}</td>
                <td className="p-2">{row.start}</td>
                <td className="p-2">{row.end}</td>
                <td className="p-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ستايل للسكرول بار */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af; /* gray-400 */
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #e5e7eb; /* gray-200 */
        }
      `}</style>
    </div>
  );
}
