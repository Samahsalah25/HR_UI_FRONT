import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EmployeesTable from "../components/EmployeesTable";
import EmployeePopup from "../components/EmployeePopup";
import EmployeeAttendancePage from "../pages/EmployeeAttendancePage";
import { Filter, ListChecks } from "lucide-react";
import TaskPopup from "../components/TaskPopup";
import AddTaskModal from "../components/AddTaskModal";
import RequestEmployepopup from "../components/RequestEmployepopup";
import AddEmployeePage from "./AddEmployeePage";

const EmployeesPage = () => {
  const [filter, setFilter] = useState("الكل");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState("list");
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/hr/");
      const mapped = res.data.map((emp) => ({
        id: emp._id,
        name: emp.name || "غير محدد",
        job: emp.jobTitle || "—",
        department: emp.department || "—",
        startDate: emp.contractStart
          ? new Date(emp.contractStart).toISOString().split("T")[0]
          : "—",
        endDate: emp.contractEnd
          ? new Date(emp.contractEnd).toISOString().split("T")[0]
          : "—",
        duration: emp.contractDuration || "—",
        status: emp.contractEnd
          ? new Date(emp.contractEnd) > new Date()
            ? "نشط"
            : "منتهي"
          : "—",
        attendance: emp.attendance || [],
        tasks: emp.tasks || [],
        requests: emp.requests || [],
      }));
      setEmployees(mapped);
    } catch (error) {
      console.error("❌ خطأ في جلب الموظفين:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees =
    filter === "الكل" ? employees : employees.filter((emp) => emp.status === filter);

  const goToAdd = () => navigate("/addemployee");
  const goToEdit = (emp) => navigate(`/editemployee/${emp.id}`);

  return (
    <div className="px-6 pt-0 relative" dir="rtl">
      {/* الفلتر + إضافة موظف جديد */}
      <div className="flex justify-between items-start mb-3">
        <div></div>
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-start">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-[16px] w-[115px] text-[10px] text-[#410A5F] border-[#410A5F] hover:bg-[#410A5F] hover:text-white transition-colors">
              <Filter size={15} />
              <span>تصفية حسب</span>
            </button>
          </div>
          <button
            className="px-4 py-2 bg-[#FF9831] text-white rounded-[16px] hover:bg-[#ffb45a] transition-colors"
            onClick={goToAdd}
          >
            + إضافة موظف جديد
          </button>
        </div>
      </div>

      {loading ? (
        <p className="p-4">جاري تحميل الموظفين...</p>
      ) : (view === "addEmployee" || view === "editEmployee") ? (
        <AddEmployeePage
          mode={view === "editEmployee" ? "edit" : "add"}
          initialData={view === "editEmployee" ? (selectedEmployee || {}) : {}}
          onBack={() => {
            setView("list");
            setSelectedEmployee(null);
          }}
          onSubmit={(data) => {
            console.log("🚀 بيانات الحفظ:", data);
            setView("list");
            fetchEmployees();
          }}
        />
      ) : (
        <>
          {/* الجدول */}
          <div
            className="overflow-y-auto rounded-[16px] border-b-2 p-4 custom-scrollbar"
            style={{ backgroundColor: "#E6E6E64D", maxHeight: "calc(100vh - 220px)" }}
          >
            <button className="flex items-center gap-2 px-3 py-2 border rounded-[16px] w-[100px] mb-3 text-[#410A5F] border-[#410A5F] hover:bg-[#410A5F] hover:text-white transition-colors">
              <ListChecks size={18} />
              <span>تحديد</span>
            </button>

            <EmployeesTable
              employees={filteredEmployees}
              onRowClick={(emp) => {
                setSelectedEmployee(emp);
                setView("popup");
              }}
              dotColor="#FF9831" // هنا نخلي النقاط باللون الأورانج
            />
          </div>

          {/* البوب أب + باقي الحالات */}
          {selectedEmployee && view === "popup" && (
            <EmployeePopup
              employee={selectedEmployee}
              onClose={() => {
                setSelectedEmployee(null);
                setView("list");
              }}
              onSelect={(type) => {
                if (type === "attendance") setView("attendance");
                if (type === "tasks") setView("tasks");
                if (type === "requests") setView("requests");
                if (type === "edit") goToEdit(selectedEmployee);
              }}
              onEdit={() => goToEdit(selectedEmployee)}
              dotColor="#FF9831" // تمرير اللون للأيقونات الثلاث نقاط
            />
          )}

          {selectedEmployee && view === "tasks" && (
            <TaskPopup
              employee={selectedEmployee}
              onBack={() => setView("popup")}
              onClose={() => setView("list")}
              onAddTask={() => setView("addTask")}
              onEditTask={(task) => {
                setSelectedTask(task);
                setView("editTask");
              }}
              dotColor="#FF9831"
            />
          )}

          {selectedEmployee && view === "attendance" && (
            <EmployeeAttendancePage
              employee={selectedEmployee}
              onBack={() => setView("popup")}
            />
          )}

          {selectedEmployee && view === "addTask" && (
            <AddTaskModal
               employeeId={selectedEmployee.id}
              mode="add"
              onClose={() => setView("list")}
              onBack={() => setView("tasks")}
              onSubmit={(newTask) => {
                console.log("🚀 مهمة جديدة:", newTask);
                setView("tasks");
              }}
            />
          )}

          {selectedEmployee && view === "editTask" && (
            <AddTaskModal
              mode="edit"
              task={selectedTask}
              onClose={() => setView("list")}
              onBack={() => setView("tasks")}
              onSubmit={(updatedTask) => {
                console.log("✏️ تعديل:", updatedTask);
                setView("tasks");
              }}
            />
          )}

        {selectedEmployee && view === "requests" && (
  <RequestEmployepopup
    employeeId={selectedEmployee.id}  // بدل requests
    onClose={() => setView("list")}
    onBack={() => setView("popup")}
    dotColor="#FF9831"
  />
)}

        </>
      )}
    </div>
  );
};

export default EmployeesPage;
