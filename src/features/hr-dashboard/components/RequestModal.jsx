import React from "react";
import axios from "axios";
const RequestModal = ({ request, onClose, onAddNote , onUpdate }) => {
  if (!request) return null;
  console.log(request.attachments);

  const handleApprove = async () => {
  try {
    console.log('request id' ,request._id);
    
  await axios.patch(
  `http://localhost:4000/api/requests/${request._id}/approve`,
  {}, // body فارغ
  { withCredentials: true } // config
);

   
    onUpdate();
    onClose();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("حدث خطأ أثناء الموافقة");
  }
};


const handleReject = async () => {
  try {
    await axios.patch(
      `http://localhost:4000/api/requests/${request._id}/reject`,
      {}, // فارغ
      { withCredentials: true }
    );
    onUpdate();
    onClose();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("حدث خطأ أثناء الرفض");
  }
};


  const handleForward = async () => {
    try {
    await axios.patch(
  `http://localhost:4000/api/requests/${request._id}/forward`,
  {}, // body لو فاضي
  { withCredentials: true } // مهم للكوكيز
);

      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء التحويل");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 rounded-[16px] text-[#6A1B9A]">
      <div className="bg-white rounded-[16px] w-[50vw] max-h-[92vh] flex flex-col" dir="rtl">

        {/* زر الإغلاق */}
        <div className="flex justify-between items-center p-2">
          <div></div>
          <button onClick={onClose} className="text-[#6A1B9A]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM16.05 17.25L12 13.2L7.95 17.25L6.75 16.05L10.8 12L6.75 7.95L7.95 6.75L12 10.8L16.05 6.75L17.25 7.95L13.2 12L17.25 16.05L16.05 17.25Z" fill="#6A1B9A"/>
            </svg>
          </button>
        </div>

        {/* محتوى المودال scrollable */}
        <div  className="  p-6 flex-1 overflow-y-auto scrollbar-thin"
  style={{
    scrollbarColor: "#410A5F transparent",
    scrollbarWidth: "thin",
  }}>
          {/* الصفوف المختلفة (الاسم، نوع الطلب، التواريخ، الوصف، المرفقات) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold">الاسم</label>
              <input className="w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.employee?.name || ""} readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">نوع الطلب</label>
              <input className="w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.type || ""} readOnly />
            </div>
          </div>

          {/* باقي التفاصيل حسب النوع */}
          {request.type === "إجازة" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold">البداية</label>
                <input type="date" className="text-right w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.leave?.startDate?.split("T")[0] || ""} readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold">النهاية</label>
                <input type="date" className="text-right w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.leave?.endDate?.split("T")[0] || ""} readOnly />
              </div>
            </div>
          )}

          {request.type === "اعتراض" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold">نوع الاعتراض</label>
                <input className="w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.appeal?.appealType || ""} readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold">تاريخ التقديم</label>
                <input type="date" className="text-right w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.createdAt?.split("T")[0] || ""} readOnly />
              </div>
            </div>
          )}

          {request.type === "شكوى" && (
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-bold">تاريخ التقديم</label>
              <input type="date" className="text-right w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]" value={request.createdAt?.split("T")[0] || ""} readOnly />
            </div>
          )}

          {/* الوصف */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-bold">الوصف</label>
            <textarea
              className="w-full border border-[#6A1B9A] rounded-[32px] p-2 text-[#6A1B9A]"
              value={
                request.type === "إجازة"
                  ? request.leave?.description || ""
                  : request.type === "اعتراض"
                  ? request.appeal?.description || ""
                  : request.type === "شكوى"
                  ? request.complaint?.description || ""
                  : request.type === "بدل"
                  ? request.allowance?.description || ""
                  : request.type === "مطالبة تأمينية"
                  ? request.insurance?.description || ""
                  : ""
              }
              readOnly
            />
          </div>

          {/* المرفقات */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-bold mb-1">المرفقات</label>
            {request.attachments && request.attachments.length > 0 ? (
              request.attachments.map((file, index) => (
                <a
                  key={index}
                href={`http://localhost:4000${file.url}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#6A1B9A] p-2 flex items-center justify-center rounded-[25px] mb-2 hover:bg-gray-100 text-[#6A1B9A]"
                >
                  <span>رؤية الملف: {file.filename || `مرفق ${index + 1}`}</span>
                </a>
              ))
            ) : (
              <p className="text-[#6A1B9A]">لا يوجد مرفقات</p>
            )}
          </div>
        </div>

        {/* الأزرار ثابتة أسفل المودال */}
        {request.status === "قيد المراجعة" && (
          <div className="p-4 space-y-3  border-gray-200 bg-white sticky bottom-0 z-10 rounded-b-[32px]
">
            <button onClick={handleApprove}
             className="w-full bg-[#FF9831] text-white py-2 rounded-[32px] font-bold">
              قبول
            </button>
            <button onClick={handleReject}
            className="w-full border border-[#FF9831] text-[#FF9831] py-2 rounded-[32px] font-bold">
              رفض
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="w-full border border-[#FF9831] text-[#FF9831] rounded-[32px] py-2 font-bold" onClick={onAddNote}>
                إضافة ملاحظة
              </button>
              <button onClick={handleForward}
              className="w-full border border-[#FF9831] text-[#FF9831] rounded-[32px] py-2 font-bold">
                تحويل الى المدير المباشر
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RequestModal;
