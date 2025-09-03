// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // نطلب من السيرفر نتاكد ان التوكين صحيح (الكوكي هيتبعت اوتوماتيك)
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          withCredentials: true, // مهم جداً علشان الكوكي يتبعت
        });

        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">⏳ جاري التحقق من الجلسة...</div>;
  }

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
