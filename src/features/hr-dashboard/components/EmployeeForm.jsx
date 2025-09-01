import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeForm = ({ mode = "add", initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jobTitle: "",
    empNumber: "",
    department: "",
    manager: "",
    employmentType: "",
    contractDuration: "",
    contractStart: "",
    residencyDuration: "",
    residencyStart: "",
    startDate: "",
    workHours: "",
    branch: "",
    basicSalary: "",
    housing: "",
    transport: "",
    other: "",
    total: 0,
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [managers, setManagers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [residencies, setResidencies] = useState([]);

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        password: "",
      }));
    }
  }, [initialData, mode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depRes, branchRes, contractRes, managerRes, residencyRes] =
          await Promise.all([
            axios.get("http://localhost:4000/api/departments"),
            axios.get("http://localhost:4000/api/branch"),
            axios.get("http://localhost:4000/api/contracts"),
            axios.get("http://localhost:4000/api/hr/managers"),
            axios.get("http://localhost:4000/api/residencies"),
          ]);

        setDepartments(Array.isArray(depRes.data) ? depRes.data : []);
        setBranches(
          Array.isArray(branchRes.data?.data) ? branchRes.data.data : []
        );
        setContracts(Array.isArray(contractRes.data) ? contractRes.data : []);
        setManagers(Array.isArray(managerRes.data) ? managerRes.data : []);
        setResidencies(Array.isArray(residencyRes.data) ? residencyRes.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total =
      Number(formData.basicSalary || 0) +
      Number(formData.housing || 0) +
      Number(formData.transport || 0) +
      Number(formData.other || 0);
    setFormData((prev) => ({ ...prev, total }));
  }, [formData.basicSalary, formData.housing, formData.transport, formData.other]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    else if (formData.name.length < 3)
      newErrors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";

    if (!formData.email.trim()) newErrors.email = "الإيميل مطلوب";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "الإيميل غير صالح";

    if (mode === "add" && !formData.password.trim()) {
  newErrors.password = "كلمة المرور مطلوبة";
} else if (formData.password && formData.password.length < 6) {
  newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
}

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "المسمى الوظيفي مطلوب";
    if (!formData.empNumber.trim()) newErrors.empNumber = "الرقم الوظيفي مطلوب";
    if (!formData.department) newErrors.department = "القسم مطلوب";
    if (!formData.manager) newErrors.manager = "المدير مطلوب";
    if (!formData.employmentType) newErrors.employmentType = "نوع التوظيف مطلوب";
    if (!formData.contractDuration) newErrors.contractDuration = "مدة العقد مطلوبة";
    if (!formData.contractStart) newErrors.contractStart = "تاريخ بدء العقد مطلوب";
    if (!formData.workHours) newErrors.workHours = "عدد ساعات العمل مطلوب";
    if (!formData.branch) newErrors.branch = "مكان العمل مطلوب";
    if (!formData.basicSalary) newErrors.basicSalary = "الراتب الأساسي مطلوب";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SelectBox = ({
    name,
    value,
    onChange,
    options = [],
    placeholder,
    addYearLabel,
  }) => (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-[32px] p-3 pr-10 border-[#121217] appearance-none ${
          value === "" ? "text-[#121217]" : "text-black"
        }`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {Array.isArray(options) &&
          options.map((opt, i) => (
            <option key={i} value={opt.value || opt._id}>
              {addYearLabel
                ? `${opt.year} ${opt.year > 1 ? "سنوات" : "سنة"}`
                : opt.name || opt.label || opt.value}
            </option>
          ))}
      </select>
      <svg
        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      {(errors[name] || serverErrors[name]) && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name] || serverErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col bg-white rounded-[32px] text-right max-w-4xl mx-auto h-[85vh] relative">
      <div className="p-4">
        <h2 className="text-lg font-bold">
          {mode === "add" ? "إضافة موظف جديد" : "تعديل البيانات"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200">
        {/* معلومات أساسية */}
        <div>
          <h3 className="text-md font-bold mb-3">معلومات أساسية</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block mb-1">الاسم</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم الموظف"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.name || serverErrors.name) && (
                <p className="text-red-500 text-sm">
                  {errors.name || serverErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">الإيميل</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="أدخل الإيميل"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.email || serverErrors.email) && (
                <p className="text-red-500 text-sm">
                  {errors.email || serverErrors.email}
                </p>
              )}
            </div>

            {mode === "add" && (
              <div>
                <label className="block mb-1">كلمة المرور</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور"
                  className="w-full border rounded-[32px] p-3 border-[#121217]"
                />
                {(errors.password || serverErrors.password) && (
                  <p className="text-red-500 text-sm">
                    {errors.password || serverErrors.password}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1">المسمى الوظيفي</label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="أدخل المسمى الوظيفي"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.jobTitle || serverErrors.jobTitle) && (
                <p className="text-red-500 text-sm">
                  {errors.jobTitle || serverErrors.jobTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">الرقم الوظيفي</label>
              <input
                name="empNumber"
                value={formData.empNumber}
                onChange={handleChange}
                placeholder="أدخل الرقم الوظيفي"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.empNumber || serverErrors.empNumber) && (
                <p className="text-red-500 text-sm">
                  {errors.empNumber || serverErrors.empNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">القسم</label>
              <SelectBox
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departments.map((d) => ({ value: d._id, name: d.name }))}
                placeholder="اختر القسم"
              />
            </div>

            <div>
              <label className="block mb-1">المدير المباشر</label>
              <SelectBox
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                options={managers.map((m) => ({ value: m._id, name: m.name }))}
                placeholder="اختر المدير"
              />
            </div>

            <div>
              <label className="block mb-1">نوع التوظيف</label>
              <SelectBox
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                options={[
                  { value: "Full-Time", name: "دوام كامل" },
                  { value: "Part-Time", name: "دوام جزئي" },
                  { value: "Contract", name: "أخري" },
                ]}
                placeholder="اختر نوع التوظيف"
              />
            </div>

            <div>
              <label className="block mb-1">مدة العقد</label>
              <SelectBox
                name="contractDuration"
                value={formData.contractDuration}
                onChange={handleChange}
                options={contracts.map((c) => ({ value: c._id, name: c.name }))}
                placeholder="اختر مدة العقد"
              />
            </div>

            <div>
              <label className="block mb-1">تاريخ بدء العقد</label>
              <input
                type="date"
                name="contractStart"
                value={formData.contractStart}
                onChange={handleChange}
                className="w-full border rounded-[32px] p-3 border-[#121217] text-right"
                dir="rtl"
              />
              {(errors.contractStart || serverErrors.contractStart) && (
                <p className="text-red-500 text-sm">
                  {errors.contractStart || serverErrors.contractStart}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">تاريخ بدء الإقامة (اختياري)</label>
              <input
                type="date"
                name="residencyStart"
                value={formData.residencyStart}
                onChange={handleChange}
                className="w-full border rounded-[32px] p-3 border-[#121217]  text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block mb-1">مدة الإقامة (اختياري)</label>
              <SelectBox
                name="residencyDuration"
                value={formData.residencyDuration}
                onChange={handleChange}
                options={residencies.map((r) => ({
                  value: r._id,
                  name: r.year + " " + (r.year > 1 ? "سنوات" : "سنة"),
                }))}
                placeholder="اختر مدة الإقامة"
              />
            </div>

            <div>
              <label className="block mb-1">ساعات العمل الأسبوعية</label>
              <input
                name="workHours"
                value={formData.workHours}
                onChange={handleChange}
                placeholder="عدد الساعات"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.workHours || serverErrors.workHours) && (
                <p className="text-red-500 text-sm">
                  {errors.workHours || serverErrors.workHours}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-1">مكان العمل (الفرع)</label>
              <SelectBox
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                options={branches.map((b) => ({ value: b._id, name: b.name }))}
                placeholder="اختر الفرع"
              />
            </div>
          </div>
        </div>

        {/* معلومات الراتب */}
        <div>
          <h3 className="text-md font-bold mb-3">معلومات الراتب</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block mb-1">الراتب الأساسي</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="الراتب الأساسي"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
              {(errors.basicSalary || serverErrors.basicSalary) && (
                <p className="text-red-500 text-sm">
                  {errors.basicSalary || serverErrors.basicSalary}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">بدل سكن</label>
              <input
                type="number"
                name="housing"
                value={formData.housing}
                onChange={handleChange}
                placeholder="بدل السكن"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
            </div>
            <div>
              <label className="block mb-1">بدل انتقال</label>
              <input
                type="number"
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                placeholder="بدل الانتقال"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
            </div>
            <div>
              <label className="block mb-1">أخرى</label>
              <input
                type="number"
                name="other"
                value={formData.other}
                onChange={handleChange}
                placeholder="إضافي"
                className="w-full border rounded-[32px] p-3 border-[#121217]"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">الإجمالي</label>
              <input
                type="number"
                name="total"
                value={formData.total}
                readOnly
                className="w-full border rounded-[32px] p-3 bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sticky bottom-0 bg-white border-t border-gray-200">
        <button
          onClick={async (e) => {
            e.preventDefault();
            setServerErrors({});
            if (validate()) {
              try {
                await onSubmit(formData);
              } catch (err) {
                if (err.response?.data?.errors) {
                  setServerErrors(err.response.data.errors);
                }
              }
            }
          }}
          className="w-full py-3 bg-black text-white rounded-[32px] font-bold"
        >
          {mode === "add" ? "إضافة موظف جديد" : "حفظ التعديلات"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
