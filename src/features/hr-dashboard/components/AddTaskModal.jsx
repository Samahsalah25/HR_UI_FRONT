import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";

// Validation schema
const createTaskSchema = Yup.object().shape({
  title: Yup.string().trim().required("حقل العنوان مطلوب"),
  description: Yup.string().trim().required("حقل الوصف مطلوب"),
  assignedTo: Yup.string()
    .length(24, "assignedTo يجب أن يكون معرف MongoDB صالح")
    .required("يجب اختيار الموظف"),
  assignDate: Yup.date().nullable().typeError("تاريخ الإسناد يجب أن يكون بصيغة  (YYYY-MM-DD)"),
  dueDate: Yup.date().required("حقل تاريخ الاستحقاق مطلوب").typeError("التاريخ يجب أن يكون بصيغة (YYYY-MM-DD)"),
  attachment: Yup.mixed().nullable(),
});

const updateTaskSchema = Yup.object().shape({
  title: Yup.string().trim(),
  description: Yup.string().trim(),
  assignedTo: Yup.string()
    .length(24, "assignedTo يجب أن يكون معرف MongoDB صالح")
    .nullable(),
  assignDate: Yup.date().nullable().typeError("تاريخ الإسناد يجب أن يكون بصيغة  (YYYY-MM-DD)"),
  dueDate: Yup.date().nullable().typeError("التاريخ يجب أن يكون بصيغة (YYYY-MM-DD)"),
  attachment: Yup.mixed().nullable(),
});

const formatDate = (dateString) => (dateString ? dateString.split("T")[0] : "");

const AddTaskModal = ({ task, employeeId, mode = "add", onClose, onBack, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title || "");
      setAssignDate(formatDate(task.assignDate || task.date));
      setDueDate(formatDate(task.dueDate));
      setDescription(task.description || "");
      if (task.attachments && task.attachments.length > 0) {
        setFile(task.attachments[0].filename);
      }
    } else {
      setTitle("");
      setAssignDate("");
      setDueDate("");
      setDescription("");
      setFile(null);
    }
    setErrors({});
    setBackendError("");
  }, [task, mode]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    setErrors({});
    setBackendError("");

    const formData = { title, description, dueDate, assignDate, assignedTo: employeeId };

    try {
      // Validation
      const schema = mode === "edit" ? updateTaskSchema : createTaskSchema;
      await schema.validate(formData, { abortEarly: false });

      const formPayload = new FormData();
      formPayload.append("title", title);
      formPayload.append("description", description);
      formPayload.append("dueDate", dueDate);
      formPayload.append("assignDate", assignDate);
      if (mode === "add") formPayload.append("assignedTo", employeeId);
      if (file instanceof File) formPayload.append("attachments", file);

      let response;
      if (mode === "edit" && task?._id) {
        response = await axios.patch(
          `http://localhost:4000/api/tasks/${task._id}`,
          formPayload,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
      } else {
        response = await axios.post(
          "http://localhost:4000/api/tasks",
          formPayload,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
      }

      if (onSubmit) onSubmit(response.data);
      onClose();
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => { fieldErrors[e.path] = e.message; });
        setErrors(fieldErrors);
      } else if (err.response?.data?.details) {
        setBackendError(err.response.data.details.join(" | "));
      } else {
        setBackendError("حدث خطأ غير متوقع");
      }
      console.error("❌ Error saving task:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-[#410A5F]">
      <div className="bg-white rounded-[16px] w-[50vw] max-h-[92vh] pb-6 flex flex-col" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center p-3">
          <button onClick={onBack} className="text-[#410A5F]">
            <svg width="15" height="15" viewBox="0 0 22 20" fill="none">
              <path d="M11.75 19L20.75 10L11.75 1M19.5 10H1.25" stroke="#410A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={onClose} className="text-[#410A5F]">✖</button>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 flex-1 overflow-y-auto space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="font-bold">العنوان</label>
            <input
              className="w-full border border-[#410A5F] rounded-[32px] p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اسم المهمة"
            />
            {errors.title && <span className="text-orange-500 text-sm">{errors.title}</span>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold">تاريخ الإسناد</label>
              <input
                type="date"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                className="text-right w-full border border-[#410A5F] rounded-[32px] p-2"
              />
              {errors.assignDate && <span className="text-orange-500 text-sm">{errors.assignDate}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">تاريخ الاستلام</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-right w-full border border-[#410A5F] rounded-[32px] p-2"
              />
              {errors.dueDate && <span className="text-orange-500 text-sm">{errors.dueDate}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-bold">الوصف</label>
            <textarea
              className="w-full border border-[#410A5F] rounded-[32px] p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصف المهمة"
            />
            {errors.description && <span className="text-orange-500 text-sm">{errors.description}</span>}
          </div>

          {/* File */}
          <div className="flex flex-col gap-1">
            <label className="font-bold mb-1">المرفقات</label>
            <label htmlFor="fileUpload" className="w-full border border-[#410A5F] p-2 flex items-center justify-between cursor-pointer rounded-[25px] gap-2">
              <div className="flex items-center gap-2">📎 <span>{file instanceof File ? file.name : file ? "📄 ملف مرفق" : "إضافة ملف"}</span></div>
              {!(file instanceof File) && file && (
                <a href={`http://localhost:4000/uploads/tasks/${file}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#410A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </a>
              )}
            </label>
            <input id="fileUpload" type="file" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Backend Error */}
          {backendError && <div className="text-orange-500 text-sm mt-2">{backendError}</div>}
        </div>

        {/* Submit Button */}
        <div className="p-4">
          <button onClick={handleSubmit} className="w-full bg-[#FF9831] text-white py-2 rounded-[32px] font-bold">
            {mode === "edit" ? "حفظ التعديلات" : "تعيين مهمة"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
