export default function QuickInfoCard({ icon, title, value }) {
  return (
    <div style={{background:'#D8D8D833'}} className="relative rounded-lg p-3 flex flex-col items-start space-y-2 shadow overflow-hidden">
      {/* المحتوى الأساسي */}
      <div className="w-8 h-8">{icon}</div>
          <p className="text-lg font-bold">{value}</p>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {/* الدائرة السوداء في البوتوم ليفت */}
      <div className="absolute -bottom-6 -left-9 w-[51px] h-[51px] bg-black rounded-full"></div>
    </div>
  );
}
