import React from "react";

export default function WorkHoursSummary() {
  const worked = 140;
  const target = 180;
  const percentage = (worked / target) * 100;
  const ARC_LEN = 370;

  return (
    <div className="bg-[#E9E8E84D] rounded-2xl p-6 flex flex-col h-full">
      {/* العنوان */}
      <h2 className="font-semibold text-[#410A5F] mb-2 text-base text-right">
        إجمالي ساعات العمل
      </h2>

      {/* المنحنى */}
      <div className="w-52 h-36 mx-auto flex flex-col items-center">
        <svg viewBox="0 0 260 130" className="w-full h-full">
          {/* التراك الرمادي */}
          <path
            d="M20,120 A110,110 0 0,1 240,120"
            stroke="#9CA3AF"
            strokeOpacity="0.25"
            strokeWidth="24"
            fill="none"
          />
          {/* البروجريس البرتقالي */}
          <path
            d="M20,120 A110,110 0 0,1 240,120"
            stroke="#f97316"
            strokeWidth="24"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={ARC_LEN - (ARC_LEN * percentage) / 100}
          />
        </svg>

        {/* القيم تحت المنحنى */}
        <div className="w-full flex justify-between px-4 mt-4">
          {/* يمين: ساعات العمل الفعلية */}
          <div className="flex flex-col items-center space-y-1">
            <span className="text-sm text-gray-600">ساعات العمل الفعلية</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#410A5F]">{worked}</span>
              <span className="w-3 h-3 rounded-sm bg-[#9CA3AF]"></span>
            </div>
          </div>

          {/* شمال: إجمالي ساعات العمل */}
          <div className="flex flex-col items-center space-y-1">
            <span className="text-sm text-gray-600">إجمالي ساعات العمل</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#410A5F]">{target}</span>
              <span className="w-3 h-3 rounded-sm bg-[#f97316]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
