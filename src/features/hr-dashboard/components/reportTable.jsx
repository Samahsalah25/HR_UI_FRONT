import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div
      className="overflow-x-auto overflow-y-auto  border-b-2  max-h-[calc(100vh-150px)] custom-scrollbar"
      style={{ backgroundColor: "#E6E6E64D" }}
    >
      <table className="min-w-full text-sm text-[#1B1C1C] rounded-[16px]">
        <thead className="text-[#410A5F] text-md top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-center font-[700px]">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition text-[#121217]">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    {row[col] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
