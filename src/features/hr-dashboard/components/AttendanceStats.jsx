import React from "react";

const stats = [
  { label: "الحضور", value: 80, color: "#FF9831" },
  { label: "الغياب", value: 12, color: "#410A5F" },
  { label: "التأخير", value: 8, color: "#FDD130" },
];

export default function AttendanceStats() {
  return (
    <div className="relative flex gap-4 w-full justify-center">
      {stats.map((s, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center rounded-xl p-4 w-full shadow"
          style={{ backgroundColor: "#FF98311A" }}
        >
          {/* الزاوية المزخرفة */}
          <div className="absolute -bottom-0 -left-0 w-[25px] h-[25px] bg-[#410A5F0D] rounded-tr-full"></div>

          {/* Progress Circle */}
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              {/* الخلفية الرمادية */}
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="#D9D9D9"
                strokeWidth="6"
                fill="none"
              />
              {/* الجزء الملون */}
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke={s.color}
                strokeWidth="6"
                fill="none"
                strokeDasharray={2 * Math.PI * 35}
                strokeDashoffset={2 * Math.PI * 35 * (1 - s.value / 100)}
              />
            </svg>
          </div>

          {/* القيمة تحت الدايرة */}
          <span
            className="text-lg font-bold mt-2"
            style={{ color: s.color }}
          >
            {s.value}%
          </span>

          {/* Label تحت القيمة */}
          <span
            className="text-sm font-medium"
            style={{ color: "#1B1C1C" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
