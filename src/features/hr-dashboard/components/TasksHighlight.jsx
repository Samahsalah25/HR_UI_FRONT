export default function TasksHighlight() {
  const completed = 80;
  const incomplete = 20;

  const drawCircle = (progress, color, radius, strokeWidth = 8) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    );
  };

  return (
    <div className="relative bg-[#E9E8E84D] rounded-2xl p-4 flex flex-col h-full">
     
     <div className="absolute top-0 left-0 w-[80px] h-[80px] bg-[#410A5F0D] rounded-br-full"></div>
      <h2 className="w-full font-semibold text-[#410A5F] mb-2 text-[16px] text-right">
        انجاز المهام
      </h2>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative w-28 h-28 mb-3">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r="65" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <circle cx="100" cy="100" r="45" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            {drawCircle(completed, "#f97316", 65, 8)}
            {drawCircle(incomplete, "#facc15", 45, 8)}
          </svg>
        </div>

        <div className="w-full space-y-1 text-xs">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span>
             <span className="text-[#f97316]">   المهام المكتملة</span>
            </div>
            <span className="font-semibold text-[#f97316]">{completed}%</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]"></span>
           <span className="text-[#facc15]">   المهام غير المكتملة</span>
            </div>
            <span className="font-semibold text-[#facc15]">{incomplete}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
