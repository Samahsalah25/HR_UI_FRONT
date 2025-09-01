import React, { useEffect, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          credentials: "include", // لإرسال الكوكيز
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white/0">
      {/* Search box */}
      <div className="flex-1 flex justify-center">
        <div className="w-[400px] h-12 bg-[#E6E6E64D] rounded-[24px] flex items-center gap-2 px-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z"
              stroke="#D0C7C7"
              strokeMiterlimit="10"
            />
            <path
              d="M10.5713 10.5713L13.9997 13.9997"
              stroke="#D0C7C7"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="بحث"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="w-10 h-10 rounded-full bg-[#E6E6E64D] grid place-content-center">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>

        {/* Admin info */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex items-center gap-1">
            <div className="flex flex-col text-right">
              <span className="font-semibold text-sm">{user.name || "اسم الأدمن"}</span>
              <span className="text-xs text-gray-400">{user.role || "الدور"}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-700" />
          </div>
        </div>
      </div>
    </header>
  );
}
