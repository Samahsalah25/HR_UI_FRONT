import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeesTable = ({ employees, onRowClick }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-[16px] border-b-2 border-gray-200 max-h-[calc(100vh-180px)] custom-scrollbar">
      <table className="min-w-full text-sm text-gray-600 border-0">
        <thead className="text-gray-700 text-md top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-center">اسم الموظف</th>
            <th className="px-4 py-3 text-center">الوظيفة</th>
            <th className="px-4 py-3 text-center">القسم</th>
            <th className="px-4 py-3 text-center">بداية العقد</th>
            <th className="px-4 py-3 text-center">نهاية العقد</th>
            <th className="px-4 py-3 text-center">مدة العقد</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, idx) => (
              <EmployeeRow key={`${emp.id}-${idx}`} emp={emp} onRowClick={onRowClick} />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
