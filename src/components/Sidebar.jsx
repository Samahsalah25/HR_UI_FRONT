import React, { useState } from "react";
import { LogOut, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.PNG";

// ===== Icons =====
function IconHome() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.99961 18.9997V13.9997H13.9996V18.9997C13.9996 19.5497 14.4496 19.9997 14.9996 19.9997H17.9996C18.5496 19.9997 18.9996 19.5497 18.9996 18.9997V11.9997H20.6996C21.1596 11.9997 21.3796 11.4297 21.0296 11.1297L12.6696 3.59973C12.2896 3.25973 11.7096 3.25973 11.3296 3.59973L2.96961 11.1297C2.62961 11.4297 2.83961 11.9997 3.29961 11.9997H4.99961V18.9997C4.99961 19.5497 5.44961 19.9997 5.99961 19.9997H8.99961C9.54961 19.9997 9.99961 19.5497 9.99961 18.9997Z"
        fill="white"
      />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <path
        d="M16 3.022C16 3.014 16 3.008 16 3V1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0C14.7348 0 14.4804 0.105357 14.2929 0.292893C14.1054 0.48043 14 0.734784 14 1V2.1C13.6709 2.03317 13.3358 1.99966 13 2H12V1C12 0.734784 11.8946 0.48043 11.7071 0.292893C11.5196 0.105357 11.2652 0 11 0C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C4.66415 1.99966 4.32913 2.03317 4 2.1V1C4 0.734784 3.89464 0.48043 3.70711 0.292893C3.51957 0.105357 3.26522 0 3 0C2.73478 0 2.48043 0.105357 2.29289 0.292893C2.10536 0.48043 2 0.734784 2 1V3V3.022C1.38078 3.48437 0.877698 4.08454 0.530565 4.77498C0.183433 5.46543 0.00178433 6.2272 0 7V19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H13C14.3256 23.9984 15.5964 23.4711 16.5338 22.5338C17.4711 21.5964 17.9984 20.3256 18 19V7C17.9982 6.2272 17.8166 5.46543 17.4694 4.77498C17.1223 4.08454 16.6192 3.48437 16 3.022Z"
        fill="white"
      />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.49434 12C5.74234 12 3.99434 10.252 3.99434 6.5C3.99434 2.748 5.74134 1 9.49434 1C13.2473 1 14.9943 2.748 14.9943 6.5C14.9943 10.252 13.2473 12 9.49434 12ZM12.1823 23H2.00034C1.73034 23 1.47234 22.891 1.28334 22.697C1.09534 22.504 0.993338 22.242 1.00034 21.972C1.14934 16.458 3.76734 13.999 9.48634 13.999C9.77734 13.999 10.0553 14.01 10.3313 14.023C10.0973 14.888 9.97434 15.874 9.97434 16.999C9.97434 19.802 10.6943 21.78 12.1823 23Z"
        fill="white"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M0.00195312 4.12305C0.00195312 2.6752 1.19779 1.49805 2.66862 1.49805H9.33529V6.74805C9.33529 7.47402 9.93112 8.06055 10.6686 8.06055H16.002V13.2162L12.3853 16.7764C11.9561 17.1988 11.6561 17.7238 11.5103 18.3021L10.7311 21.3742C10.6353 21.7516 10.6561 22.1453 10.7853 22.5021L2.66862 22.498C1.19779 22.498 0.00195312 21.3209 0.00195312 19.873V4.12305Z"
        fill="white"
      />
    </svg>
  );
}

// عناصر السايدبار
const items = [
  { key: "home", label: "الرئيسية", Icon: IconHome, type: "link", to: "/home" },
  { key: "requests", label: "الطلبات", Icon: IconClipboard, type: "link", to: "/requests" },
  { key: "employees", label: "إدارة الموظفين", Icon: IconUsers, type: "link", to: "/employees" },
  { key: "reports", label: "التقارير", Icon: IconChart, type: "link", to: "/reports" },
  { key: "contact", label: "تواصل معنا", Icon: Phone, type: "button" },
  { key: "logout", label: "تسجيل خروج", Icon: LogOut, type: "button" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const activeIndex = items.findIndex((it) =>
    it.type === "link"
      ? it.key === "home"
        ? location.pathname === "/"
        : location.pathname.startsWith(`/${it.key}`)
      : false
  );

  const highlightIndex = hoverIndex !== null ? hoverIndex : activeIndex;
  const itemHeight = 64;

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="relative h-[100vh] w-[220px] bg-[#FF9831] text-white flex flex-col rounded-[16px] overflow-hidden">
      {/* Logo */}
{/* Logo in center like button */}
<div className="flex justify-center py-5">
  <div className="w-22 h-21 rounded-2xl  grid place-content-center">
    <img
      src={Logo}
      alt="Logo"
      className="w-[90%] h-full object-contain rounded-2xl"
    />
  </div>
</div>



      {/* المنحني الأبيض */}
      {highlightIndex >= 0 && (
        <svg
          width="216"
          height={itemHeight + 20}
          viewBox={`0 0 216 ${itemHeight + 20}`}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 transition-transform duration-300"
          style={{
            transform: `translateY(${highlightIndex * itemHeight + 80}px)`,
          }}
        >
          <path
            d={`
              M0,0 
              C0,10 10,20 24,20 
              H192 
              C205,20 216,30 216,${(itemHeight + 20) / 2} 
              C216,${itemHeight + 4} 205,${itemHeight + 8} 192,${itemHeight + 8} 
              H24 
              C10,${itemHeight + 8} 0,${itemHeight + 12} 0,${itemHeight + 20} 
              Z
            `}
            fill="white"
          />
        </svg>
      )}

      {/* القائمة */}
      <nav className="relative z-10 p-3 flex-1 flex flex-col justify-between">
        {/* روابط القائمة */}
        <div className="space-y-2">
          {items.filter(it => it.type === "link").map((it, index) => (
            <Link
              key={it.key}
              to={it.to}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`relative w-full flex items-center gap-3 px-4 h-[64px] rounded-[20px] text-[16px] leading-[22px] font-[Almarai] font-medium transition-colors ${
                index === activeIndex
                  ? "text-[#410A5F] font-bold"
                  : "text-white hover:text-[#410A5F]"
              }`}
            >
              <it.Icon />
              <span>{it.label}</span>
            </Link>
          ))}
        </div>

        {/* أزرار الفوتر */}
        <div className="space-y-2">
          {items.filter(it => it.type === "button").map((it, index) => (
            <button
              key={it.key}
              onClick={it.key === "logout" ? handleLogout : undefined}
              onMouseEnter={() =>
                setHoverIndex(index + items.filter(i => i.type === "link").length)
              }
              onMouseLeave={() => setHoverIndex(null)}
              className="relative w-full flex items-center gap-3 px-4 h-[64px] rounded-[20px] text-[16px] leading-[22px] font-[Almarai] font-medium hover:text-[#410A5F] transition-colors"
            >
              <it.Icon />
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

// //////////////////////////
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const items = [
//   { key: "home", label: "الرئيسية", to: "/" },
//   { key: "requests", label: "الطلبات", to: "/requests" },
//   { key: "employees", label: "إدارة الموظفين", to: "/employees" },
//   { key: "reports", label: "التقارير", to: "/reports" },
// ];

// export default function Sidebar() {
//   const location = useLocation();
//   const [hoverIndex, setHoverIndex] = useState(null);

//   const activeIndex = items.findIndex((it) => it.to === location.pathname);
//   const highlightIndex = hoverIndex !== null ? hoverIndex : activeIndex;

//   // ارتفاع كل زرار (px-6 py-6 ≈ 96px إجمالي)
//   const itemHeight = 96;

//   return (
//     <aside className="relative w-[216px] h-[960px] bg-[#121217]">
//       {/* المنحني الأبيض */}
//       {highlightIndex >= 0 && (
//       <svg
//   width="216"
//   height="96"
//   viewBox="0 0 216 96"
//   xmlns="http://www.w3.org/2000/svg"
//   className="absolute left-0 transition-transform duration-300"
//   style={{
//     transform: `translateY(${highlightIndex * 96}px)`, // ← يزبط مكان كل زرار
//   }}
// >
//   <path
//     d="
//       M0,0 
//       C0,10 10,20 24,20 
//       H192 
//       C205,20 216,30 216,48 
//       C216,66 205,76 192,76 
//       H24 
//       C10,76 0,86 0,96 
//       Z
//     "
//     fill="white"
//   />
// </svg>

//       )}

//       {/* اللينكات */}
//       <nav className="relative z-10 flex flex-col">
//         {items.map((it, index) => (
//           <Link
//             key={it.key}
//             to={it.to}
//             onMouseEnter={() => setHoverIndex(index)}
//             onMouseLeave={() => setHoverIndex(null)}
//             className={`px-6 py-6 transition-colors ${
//               location.pathname === it.to
//                 ? "text-black font-bold"
//                 : "text-white hover:text-black"
//             }`}
//           >
//             {it.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }
