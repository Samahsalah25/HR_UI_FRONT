import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const TaskPopup = ({ employee, onBack, onClose, onAddTask, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employee?.id) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/tasks/taskbyemployee/${employee.id}`
        );
        setTasks(res.data?.data || []);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employee]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[700px] max-h-[80vh] relative flex flex-col">

        {/* العنوان + الإكس + سهم الرجوع */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1"
            >
              <svg width="15" height="15" viewBox="0 0 22 20" fill="none">
                <path
                  d="M11.75 19L20.75 10L11.75 1M19.5 10H1.25"
                  stroke="#410A5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-sm font-semibold mt-1 text-[#FF9831]">المهام</span>
          </div>

          <button onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM16.05 17.25L12 13.2L7.95 17.25L6.75 16.05L10.8 12L6.75 7.95L7.95 6.75L12 10.8L16.05 6.75L17.25 7.95L13.2 12L17.25 16.05L16.05 17.25Z"
                fill="#410A5F"
              />
            </svg>
          </button>
        </div>

        {/* زر إضافة مهمة جديدة */}
        <div className="mb-4 flex justify-end">
          <button 
            onClick={onAddTask} 
            className="flex items-center gap-2 bg-[#FF9831] text-white px-4 py-2 rounded-[16px] text-sm"
          >
            <Plus size={16} />
            إضافة مهمة جديدة
          </button>
        </div>

        {/* جدول المهام */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          {loading ? (
            <div className="text-center text-gray-500 p-4">⏳ جاري تحميل المهام...</div>
          ) : (
            <table className="w-full text-right border-separate border-spacing-y-2">
              <thead className="sticky top-0 text-[#410A5F] z-10 ">
                <tr className="text-sm border-b">
                  <th className="p-2">اليوم</th>
                  <th className="p-2">عنوان المهمة</th>
                  <th className="p-2">حالة المهمة</th>
                  <th className="p-2">نسبة الإنجاز</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task._id} className="bg-[#F8F8F8] hover:bg-gray-100 transition rounded-lg text-black">
                      <td className="p-2">{new Date(task.assignDate).toLocaleDateString()}</td>
                      <td className="p-2">{task.title}</td>
                      <td className="p-2">{task.status}</td>
                      <td className="p-2 flex items-center gap-4">
                        {task.progressPercentage}%
                        {task.progressPercentage !== 100 && (
                          <button 
                            onClick={() => onEditTask(task)} 
                            className="text-[#FF9831] hover:text-[#cc7a28]"
                          >
                            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M14.4776 1.00412C14.6446 1.01912 14.7176 1.22312 14.5976 1.34212L6.27761 9.66212C6.18362 9.75617 6.11632 9.87351 6.08261 10.0021L5.08261 13.8321C5.0496 13.9587 5.05026 14.0917 5.08454 14.2179C5.11881 14.3442 5.18551 14.4592 5.278 14.5517C5.37049 14.6442 5.48557 14.7109 5.6118 14.7452C5.73803 14.7795 5.87104 14.7801 5.99761 14.7471L9.82661 13.7471C9.95533 13.7131 10.0727 13.6455 10.1666 13.5511L18.6046 5.11312C18.631 5.08602 18.6646 5.06705 18.7015 5.05846C18.7383 5.04986 18.7768 5.052 18.8125 5.06463C18.8482 5.07725 18.8795 5.09983 18.9027 5.12969C18.9259 5.15956 18.9401 5.19545 18.9436 5.23312C19.2948 8.58274 19.2747 11.9609 18.8836 15.3061C18.6606 17.2111 17.1296 18.7061 15.2316 18.9191C11.7552 19.3043 8.24697 19.3043 4.77061 18.9191C2.87161 18.7061 1.34061 17.2111 1.11761 15.3061C0.705589 11.7811 0.705589 8.22013 1.11761 4.69512C1.34061 2.78912 2.87161 1.29412 4.77061 1.08212C7.99512 0.724697 11.2478 0.69856 14.4776 1.00412Z"
                                fill="#FF9831"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 p-4">
                      لا توجد مهام حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
