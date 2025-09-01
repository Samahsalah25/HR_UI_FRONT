import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const AddEmployeePage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🟢 لو وضع تعديل، هات بيانات الموظف بالـ id
  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/api/hr/getOneemployee/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const emp = res.data;

          // 🟢 نعمل normalize للبيانات عشان الفورم يقرأها صح
          const normalized = {
            ...emp,
            empNumber: emp.employeeNumber || "",
            contractDuration: emp.contractDurationId?._id || emp.contractDurationId || "",
            residencyDuration: emp.residencyDurationId?._id || emp.residencyDurationId || "",
            branch: emp.workplace?._id || emp.workplace || "",
            department: emp.department?._id || emp.department || "",
            manager: emp.manager?._id || emp.manager || "",
            contractStart: emp.contractStart ? emp.contractStart.split("T")[0] : "",
            residencyStart: emp.residencyStart ? emp.residencyStart.split("T")[0] : "",
            workHours: emp.workHoursPerWeek || "",
            basicSalary: emp.salary?.base || "",
            housing: emp.salary?.housingAllowance || "",
            transport: emp.salary?.transportAllowance || "",
            other: emp.salary?.otherAllowance || "",
          };

          setEmployeeData(normalized);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ خطأ في جلب بيانات الموظف:", err);
          toast.error("❌ فشل في تحميل بيانات الموظف");
          setLoading(false);
        });
    }
  }, [id, mode, token]);

  // 🟢 إضافة موظف
  const handleAdd = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        jobTitle: data.jobTitle,
        employeeNumber: data.empNumber,
        ...(data.department && { department: data.department }),
        ...(data.manager && { manager: data.manager }),
        employmentType: data.employmentType,
        ...(data.contractStart && { contractStart: data.contractStart }),
        ...(data.contractDuration && { contractDurationId: data.contractDuration }),
        ...(data.residencyStart && { residencyStart: data.residencyStart }),
        ...(data.residencyDuration && { residencyDurationId: data.residencyDuration }),
        ...(data.branch && { workplace: data.branch }),
        ...(data.workHours && Number(data.workHours) > 0 && { workHoursPerWeek: Number(data.workHours) }),
        salary: {
          base: Number(data.basicSalary) || 0,
          housingAllowance: Number(data.housing) || 0,
          transportAllowance: Number(data.transport) || 0,
          otherAllowance: Number(data.other) || 0,
        },
      };

      await axios.post("http://localhost:4000/api/hr", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ تم إضافة الموظف بنجاح");
      navigate("/employees");
    } catch (err) {
      toast.error("❌ حصل خطأ أثناء الإضافة");
      console.error(err);
    }
  };

  // 🟢 تعديل موظف
  const handleEdit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        jobTitle: data.jobTitle,
        employeeNumber: data.empNumber,
        ...(data.department && { department: data.department }),
        ...(data.manager && { manager: data.manager }),
        employmentType: data.employmentType,
        ...(data.contractStart && { contractStart: data.contractStart }),
        ...(data.contractDuration && { contractDurationId: data.contractDuration }),
        ...(data.residencyStart && { residencyStart: data.residencyStart }),
        ...(data.residencyDuration && { residencyDurationId: data.residencyDuration }),
        ...(data.branch && { workplace: data.branch }),
        ...(data.workHours && Number(data.workHours) > 0 && { workHoursPerWeek: Number(data.workHours) }),
        salary: {
          base: Number(data.basicSalary) || 0,
          housingAllowance: Number(data.housing) || 0,
          transportAllowance: Number(data.transport) || 0,
          otherAllowance: Number(data.other) || 0,
        },
      };

      await axios.patch(`http://localhost:4000/api/hr/updateemployee/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✏️ تم تعديل بيانات الموظف");
      navigate("/employees");
    } catch (err) {
      toast.error("❌ حصل خطأ أثناء التعديل");
      console.error(err);
    }
  };

  if (mode === "edit" && loading) return <p>⏳ جاري تحميل البيانات...</p>;

  return (
    <EmployeeForm
      mode={mode}
      onSubmit={mode === "add" ? handleAdd : handleEdit}
      initialData={employeeData} // ✅ البيانات القديمة بتتباصي للفورم هنا
    />
  );
};

export default AddEmployeePage;
