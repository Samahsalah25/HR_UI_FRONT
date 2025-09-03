import React, { useEffect, useState, useRef } from "react";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { items } from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const [user, setUser] = useState({ name: "", role: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // جلب بيانات المستخدم
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // إغلاق المنيو عند النقر خارجاً
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3   sticky top-0 z-30">
      {/* زرار المنيو في الموبايل */}
      <div className="relative">
        <button
          className="lg:hidden p-2 rounded-md bg-[#FF9831]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Dropdown Menu */}
     {menuOpen && (
  <div
    ref={menuRef}
    className="fixed inset-0 z-50 flex justify-start items-start"
  >
    {/* خلفية مظللة */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setMenuOpen(false)}
    />

    {/* القائمة */}
    <div className="relative mt-16 ml-4 mr-4 w-64 bg-white rounded-br-[32px] rounded-bl-[32px]  overflow-y-auto max-h-[calc(100vh-4rem)]  animate-scaleY">
      {/* روابط */}
      <nav className="flex flex-col divide-y divide-[#FF9831]">
        {items.filter(it => it.type === "link").map(it => (
          <Link
            key={it.key}
            to={it.to}
            className="px-4 py-3 hover:bg-[#FF9831]/10 text-gray-700 font-medium border-none"
            onClick={() => setMenuOpen(false)}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* أزرار الفوتر */}
      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={() => alert("صفحة اتصل بنا")}
          className="w-full px-4 py-2 rounded-[23px] bg-[#FF9831] text-white hover:bg-[#410A5F]"
        >
          اتصل بنا
        </button>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-[32px] bg-[#410A5F] text-white hover:bg-[#FF9831]"
        >
          تسجيل خروج
        </button>
      </div>
    </div>
  </div>
)}

      </div>

      {/* صندوق البحث */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="w-[400px] h-12 bg-[#E6E6E64D] rounded-[24px] flex items-center gap-2 px-4">
          <input
            type="text"
            placeholder="بحث"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* أيقونات المستخدم والاشعارات */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-[#E6E6E64D] grid place-content-center">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col text-right">
            <span className="font-semibold text-sm">{user.name || "اسم الأدمن"}</span>
            <span className="text-xs text-gray-400">{user.role || "الدور"}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      <style>
        {`
          @keyframes scaleY {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          .animate-scaleY {
            animation: scaleY 0.2s ease-out forwards;
          }
        `}
      </style>
    </header>
  );
}
