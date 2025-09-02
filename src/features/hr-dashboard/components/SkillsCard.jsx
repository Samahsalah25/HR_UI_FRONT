import React from "react";

const skills = [
  { name: "الالتزام", value: 85 },
  { name: "التعاون", value: 80 },
  { name: "الإنجاز", value: 82 },
  { name: "الإبداع", value: 77 },
];

export default function SkillsCard() {
  return (
    <div className="relative bg-[#F6F6F6] rounded-xl shadow p-4">
      <div className="absolute top-0 left-0 w-[100px] h-[100px] bg-[#410A5F0D] rounded-br-full"></div>
      {/* أيقونة برتقالية */}
      <div className="w-12 h-12 bg-[#FF9831] rounded-full flex justify-center items-center mb-3">
        <svg
          width="23"
          height="13"
          viewBox="0 0 23 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 2.5C22.5 3.6 21.6 4.5 20.5 4.5C20.3274 4.50269 20.1555 4.47909 19.99 4.43L16.43 7.98C16.48 8.14 16.5 8.32 16.5 8.5C16.5 9.6 15.6 10.5 14.5 10.5C13.4 10.5 12.5 9.6 12.5 8.5C12.5 8.32 12.52 8.14 12.57 7.98L10.02 5.43C9.86 5.48 9.68 5.5 9.5 5.5C9.32 5.5 9.14 5.48 8.98 5.43L4.43 9.99C4.48 10.15 4.5 10.32 4.5 10.5C4.5 11.6 3.6 12.5 2.5 12.5C1.4 12.5 0.5 11.6 0.5 10.5C0.5 9.4 1.4 8.5 2.5 8.5C2.68 8.5 2.85 8.52 3.01 8.57L7.57 4.02C7.52 3.86 7.5 3.68 7.5 3.5C7.5 2.4 8.4 1.5 9.5 1.5C10.6 1.5 11.5 2.4 11.5 3.5C11.5 3.68 11.48 3.86 11.43 4.02L13.98 6.57C14.14 6.52 14.32 6.5 14.5 6.5C14.68 6.5 14.86 6.52 15.02 6.57L18.57 3.01C18.5209 2.84454 18.4973 2.67257 18.5 2.5C18.5 1.4 19.4 0.5 20.5 0.5C21.6 0.5 22.5 1.4 22.5 2.5Z"
            fill="white"
          />
        </svg>
      </div>

      {/* عنوان المهارات */}
      <h2 className="font-bold text-[#410A5F] mb-3">المهارات</h2>

      {/* سطور المهارات مع التشارت في نفس السطر */}
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center mb-2 space-x-2">
          {/* الاسم والبار مع بعض */}
              {/* النسبة */}
          <span className="text-[#410A5F] text-sm">{skill.value}%</span>
        
          <div className="flex-1 h-2 bg-[#D9D9D9] rounded-full relative">
            <div
              className="h-2 bg-purple-700 rounded-full absolute top-0 right-0"
              style={{ width: `${skill.value}%` }}
            ></div>
          </div>

        <span className="text-[#410A5F] text-sm">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
