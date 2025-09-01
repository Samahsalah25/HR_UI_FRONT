export default function CardBox({ title, icon, items }) {
  return (
    <div
      className="rounded-xl shadow p-3 flex flex-col items-center h-[180px] w-[240px] flex-shrink-0"
      style={{ backgroundColor: "#E6E6E64D" }}
    >
      {/* العنوان */}
      <h2 className="text-sm font-bold mb-1">{title}</h2>

      {/* الأيقونة */}
      <div className="text-xl mb-2">{icon}</div>

      {/* العناصر */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center"
          >
            <span className="text-xs">{item.label}</span>
            <span className="text-sm font-bold mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
