import React from "react";
import { MoreVertical } from "lucide-react";

const EmployeeRow = ({ emp, onRowClick }) => {
  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => onRowClick?.(emp)}
    >
      {/* اسم الموظف + الصورة */}
      <td className="px-4 py-2 ">
        <div className="flex items-center gap-3 text-center ml-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 4.8C14.316 4.8 16.2 6.684 16.2 9C16.2 11.316 14.316 13.2 12 13.2C9.684 13.2 7.8 11.316 7.8 9C7.8 6.684 9.684 4.8 12 4.8ZM12 21.6C9.564 21.6 6.684 20.616 4.632 18.144C6.73419 16.4955 9.32851 15.5995 12 15.5995C14.6715 15.5995 17.2658 16.4955 19.368 18.144C17.316 20.616 14.436 21.6 12 21.6Z" fill="black"/>
</svg>

          <span className="font-medium">{emp.name}</span>
        </div>
      </td>

      <td className="px-4 py-2 text-center">{emp.job}</td>
      <td className="px-4 py-2 text-center">{emp.department}</td>
      <td className="px-4 py-2 text-center">{emp.startDate}</td>
      <td className="px-4 py-2 text-center">{emp.endDate}</td>

      {/* المدة في النص + ٣ نقط */}
      <td className="px-4 py-2">
        <div className="flex items-center justify-center">
          <div className="flex-1 text-center">{emp.duration}</div>
          <span className="p-1 rounded  hover:bg-gray-200" title="إجراء سريع">
            <MoreVertical size={16} className="text-[#FF9831]" />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
