import React from "react";

export default function RatingCard() {
  return (
    <div className="relative bg-[#F6F6F6] rounded-xl p-4 flex flex-col justify-between items-start h-full">
      <div className="absolute -bottom-0 -left-0 w-[100px] h-[100px] bg-[#410A5F0D] rounded-tr-full"></div>
      {/* أيقونة */}
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.5" width="40" height="40" rx="20" fill="#FF9831" />
        <path
          d="M19.0489 11.4271C19.3483 10.5057 20.6517 10.5057 20.9511 11.4271L22.4697 16.1008C22.6035 16.5128 22.9875 16.7918 23.4207 16.7918H28.335C29.3037 16.7918 29.7065 18.0314 28.9228 18.6008L24.947 21.4894C24.5966 21.744 24.4499 22.1954 24.5838 22.6074L26.1024 27.2812C26.4017 28.2025 25.3472 28.9686 24.5635 28.3992L20.5878 25.5106C20.2373 25.256 19.7627 25.256 19.4122 25.5106L15.4365 28.3992C14.6528 28.9686 13.5983 28.2025 13.8976 27.2812L15.4162 22.6074C15.5501 22.1954 15.4034 21.744 15.053 21.4894L11.0772 18.6008C10.2935 18.0314 10.6963 16.7918 11.665 16.7918H16.5793C17.0125 16.7918 17.3965 16.5128 17.5303 16.1008L19.0489 11.4271Z"
          fill="white"
        />
      </svg>

      {/* كلمة التقييم */}
      <h2 className="font-bold text-[#410A5F] mt-2 ">التقييم</h2>

      {/* النجوم */}
      <div className="flex text-yellow-400 ">
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            fill="gold"
            stroke="gold"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.434 0 9.587l8.332-1.569z" />
          </svg>
        ))}
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="gold"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.434 0 9.587l8.332-1.569z" />
        </svg>
      </div>

      {/* النص أسفل النجوم */}
      <p className="text-sm font-medium text-center">
        4 / 5 الأداء ممتاز
      </p>
    </div>
  );
}
