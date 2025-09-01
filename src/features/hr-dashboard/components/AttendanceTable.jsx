export default function AttendanceTable() {
  const data = [
    { name: "محمود عادل", dept: "المبيعات", status: "حاضر" },
    { name: "سارة محمد", dept: "التسويق", status: "متأخر" },
    { name: "خالد علي", dept: "الدعم الفني", status: "غائب" },
  ];

  return (
    <div   style={{ backgroundColor: "#E6E6E64D" }}  className="rounded-2xl shadow p-4 flex flex-col h-full">
      <h2 className="text-lg font-bold mb-3">الحضور</h2>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm text-right">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">اسم الموظف</th>
              <th className="p-2">القسم</th>
              <th className="p-2">الحالة</th>
              <th className="p-2">إجراء سريع</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.dept}</td>
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
