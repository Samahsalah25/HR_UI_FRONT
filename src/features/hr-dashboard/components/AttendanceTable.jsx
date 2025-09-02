import { useState, useEffect } from "react";
import axios from "axios";

export default function AttendanceTable() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/attendance/dailyAttendanceTable",
        { withCredentials: true }
      );
      setData(res.data.table || []);
    } catch (err) {
      console.error("خطأ في جلب الحضور:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#E6E6E64D" }}
      className="rounded-2xl shadow p-4 flex flex-col h-full"
    >
      <h2 className="text-lg font-bold mb-3 text-[#410A5F]">الحضور</h2>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل البيانات...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد بيانات</p>
        ) : (
          <table className="w-full text-sm text-right">
            <thead className="text-[#410A5F] border-b">
              <tr>
                <th className="p-2">اسم الموظف</th>
                <th className="p-2">القسم</th>
                <th className="p-2">الحالة</th>
                <th className="p-2">إجراء سريع</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((row, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="p-2">{row.employeeName}</td>
                  <td className="p-2">{row.departmentName}</td>
                  <td className="p-2">{row.status}</td>
                  <td className="p-2">
                    {row.status === "متأخر" || row.status === "غائب" ? (
                      <svg
                        width="66"
                        height="25"
                        viewBox="0 0 66 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_89_2170)">
                          <path
                            d="M9 21.5C10.25 21.5 11.4207 21.2627 12.512 20.788C13.6033 20.3133 14.5533 19.6717 15.362 18.863C16.1707 18.0543 16.8123 17.1043 17.287 16.013C17.7617 14.9217 17.9993 13.7507 18 12.5C18.0007 11.2493 17.763 10.0787 17.287 8.988C16.811 7.89733 16.1697 6.94733 15.363 6.138C14.5563 5.32867 13.6063 4.687 12.513 4.213C11.4197 3.739 10.2487 3.50133 9 3.5V5.5C10.95 5.5 12.604 6.17933 13.962 7.538C15.32 8.89667 15.9993 10.5507 16 12.5C16.0007 14.4493 15.3213 16.1037 13.962 17.463C12.6027 18.8223 10.9487 19.5013 9 19.5V21.5ZM5 17.5L6.4 16.075L3.825 13.5H12V11.5H3.825L6.4 8.9L5 7.5L-1.90735e-06 12.5L5 17.5Z"
                            fill="#1B1C1C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_89_2170">
                            <rect
                              width="66"
                              height="24"
                              fill="white"
                              transform="matrix(-1 0 0 1 66 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      ""
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
