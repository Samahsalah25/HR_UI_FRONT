import React, { useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.PNG";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // ✅ هنا ضفت loading
  const navigate = useNavigate();

  // ✅ أول ما الصفحة تفتح أسأل السيرفر: هل المستخدم Logged in؟
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data?.user) {
          navigate("/home", { replace: true });
        }
      })
      .catch(() => {
        // مش logged in → يفضل في صفحة login
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // مهم عشان الكوكيز تتخزن
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          employeeNumber: data.message?.includes("credentials")
            ? "رقم التعريفي أو كلمة المرور غير صحيحة"
            : data.message || "حدث خطأ في تسجيل الدخول",
          password: data.message?.includes("credentials")
            ? "رقم التعريفي أو كلمة المرور غير صحيحة"
            : data.message || "حدث خطأ في تسجيل الدخول",
        });
        return;
      }

      // ✅ بعد تسجيل الدخول بنجاح
      navigate("/home");
    } catch (err) {
      console.error(err);
      setErrors({
        employeeNumber: "حدث خطأ في الاتصال بالسيرفر",
        password: "حدث خطأ في الاتصال بالسيرفر",
      });
    }
  };

  // ✅ لو لسه بيتأكد من الكوكي
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-600">جاري التحقق...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded text-center">
        {/* اللوجو */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Makhzny Logo" className="h-20 mb-6" />
          <h1 className="text-lg font-bold text-orange-400">تسجيل الدخول</h1>
        </div>

        {/* الفورم */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          {/* Employee Number */}
          <div className="relative">
            <label
              className="block text-sm mb-1 font-bold"
              style={{ color: "#410A5F" }}
            >
              رقم التعريفي (ID)
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                placeholder="رقم التعريفي (ID)"
                className={`w-full pr-12 pl-4 py-2 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errors.employeeNumber ? "border-blue-500" : ""
                }`}
              />
              <FaUser className="absolute right-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.employeeNumber && (
              <p className="text-blue-500 text-sm mt-1">
                {errors.employeeNumber}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              className="block text-sm mb-1 font-bold"
              style={{ color: "#410A5F" }}
            >
              كلمة المرور
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="كلمة المرور"
                className={`w-full pr-4 pl-12 py-2 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errors.password ? "border-blue-500" : ""
                }`}
                dir="rtl"
              />
              <div
                className="absolute left-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-blue-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-[32px] bg-orange-400 hover:bg-orange-500 text-white font-semibold"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
