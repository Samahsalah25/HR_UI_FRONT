// ProgressCard.jsx
import ProgressCircle from "./ProgressCircle";

export default function ProgressCard() {
  const data = [
    { name: "الحضور"  , value: 86, color: "#000000" },
    { name: "المتأخرين", value: 12, color: "#4b5563" },
    { name: "الغائبين بعذر", value: 8, color: "#9ca3af" },
    { name: "الغائبين بدون عذر", value: 5, color: "#d1d5db" },
  ];

  return (
    <div className="flex items-center h-full">
      {/* الدواير - يمين */}
      <div className="flex-1 flex justify-center items-center relative">
        {data.map((d, i) => (
          <div key={i} className="absolute">
            <ProgressCircle
              value={d.value}
              color={d.color}
              size={110 - i * 15}
              stroke={5}
            />
          </div>
        ))}
      </div>

      {/* الكلام - شمال */}
      <div className="flex-1 flex flex-col justify-center space-y-3 pl-6">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              {/* الدائرة الصغيرة قبل الكلام */}
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span className="font-medium px-1">{d.name}</span>
            </div>
            <span style={{ color: d.color }} className="font-bold">
              {d.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
