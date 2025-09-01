import React, { useState } from "react";
import axios from "axios";

const NoteModal = ({ onClose, onBack, requestId, onUpdate }) => {
  const [text, setText] = useState("");

  const handleSendNote = async () => {
    if (!text.trim()) return alert("اكتب الملاحظة أولاً");
    try {
      await axios.post(
        `http://localhost:4000/api/requests/${requestId}/notes`,
        { text },
        { withCredentials: true }
      );
      alert("تم إرسال الملاحظة بنجاح");
      if (onUpdate) onUpdate(); // لتحديث الجدول بعد الإرسال
      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] w-[60vw] max-w-xl p-6 relative border border-[#A2A4A7]">
        
        {/* الهيدر */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col items-start">
            <div 
              onClick={onBack} 
              className="w-8 h-8 flex items-center justify-center bg-white border border-[#A2A4A7] rounded-full cursor-pointer mb-2"
            >
              <svg width="18" height="19" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.75 19L20.75 10L11.75 1M19.5 10H1.25" stroke="#410A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[16px] font-bold text-right text-[#410A5F]">الملاحظة</h2>
          </div>

          <button onClick={onClose} className="text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM16.05 17.25L12 13.2L7.95 17.25L6.75 16.05L10.8 12L6.75 7.95L7.95 6.75L12 10.8L16.05 6.75L17.25 7.95L13.2 12L17.25 16.05L16.05 17.25Z" fill="#410A5F" />
            </svg>
          </button>
        </div>

        {/* النص */}
        <textarea 
          placeholder="اكتب الملاحظة هنا..." 
          className="w-full border border-[#A2A4A7] rounded-[16px] p-2 mb-4 min-h-[100px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* زر إرسال */}
        <button
          onClick={handleSendNote}
          className="w-full bg-[#FF9831] text-white py-2 rounded-[32px] font-bold"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
