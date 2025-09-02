import ProgressCircle from "./ProgressCircle";

export default function ProgressCard({ data }) {
  if (!data) return <p>جاري تحميل البيانات...</p>;

  // نحافظ على نفس الألوان لكن ناخد النسبة من الـ API
  const chartData = [
    { name: "الحضور", value: parseFloat(data.presentPercent), color: "#FF9831" },
    { name: "المتأخرين", value: parseFloat(data.latePercent), color: "#410A5F" },
    { name: "الغائبين بعذر", value: parseFloat(data.absentWithExcusePercent), color: "green" },
    { name: "الغائبين بدون عذر", value: parseFloat(data.absentWithoutExcusePercent), color: "red" },
  ];

  return (
    <div className="flex items-center h-full">
      {/* الدواير - يمين */}
      <div className="flex-1 flex justify-center items-center relative">
        {chartData.map((d, i) => (
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
      <div className=" relative flex-1 flex flex-col justify-center space-y-3 pl-6">
        {chartData.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              {/* الدائرة الصغيرة بنفس اللون */}
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: d.color }}
              ></span>
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
