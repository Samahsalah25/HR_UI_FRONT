import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", hours: 120 },
  { month: "Feb", hours: 100 },
  { month: "Mar", hours: 140 },
  { month: "Apr", hours: 90 },
  { month: "May", hours: 110 },
  { month: "Jun", hours: 130 },
  { month: "Jul", hours: 80 },
  { month: "Aug", hours: 150 },
  { month: "Sep", hours: 100 },
  { month: "Oct", hours: 120 },
  { month: "Nov", hours: 140 },
  { month: "Dec", hours: 110 },
];

export default function WorkHoursChart() {
  return (
    <div className="bg-[#E9E8E84D] rounded-2xl  p-1 h-full">
      {/* العنوان */}
      <h2 className="font-semibold text-[#410A5F] text-base text-right">
        ساعات العمل
      </h2>

      {/* الليجند تحت العنوان في النص */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4 mt-1">
        <span className="w-3 h-3 rounded-full bg-[#f97316]"></span>
        Annual working hours
      </div>

      {/* الشارت أصغر */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={24} barCategoryGap={0}>
          {/* المحور الأفقي */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Months",
              position: "insideBottom",
              offset: -5,
              fill: "#6B7280",
              fontSize: 12,
            }}
          />

          {/* المحور الرأسي */}
          <YAxis
            domain={[0, 160]}
            ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160]}
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              fill: "#6B7280",
              fontSize: 12,
            }}
          />

          <Tooltip />

          {/* الأعمدة */}
          <Bar dataKey="hours" fill="#f97316" radius={[0, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
