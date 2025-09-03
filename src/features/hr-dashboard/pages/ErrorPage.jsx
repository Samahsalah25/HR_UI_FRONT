import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  let errorMessage = "حدث خطأ غير متوقع";
  let errorCode = "500";

  if (error?.status === 404) {
    errorMessage = "الصفحة المطلوبة غير موجودة";
    errorCode = "404";
  } else if (error?.status === 403) {
    errorMessage = "ليس لديك صلاحية للوصول إلى هذه الصفحة";
    errorCode = "403";
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #410A5A 0%, #2a063d 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      
      {/* أيقونة */}
      <div style={{
        fontSize: '5rem',
        marginBottom: '10px',
        color: '#FF9831',
        animation: 'float 3s ease-in-out infinite'
      }}>
        {errorCode === '404' ? '🔍' : errorCode === '403' ? '🚫' : '⚡'}
      </div>

      {/* الكود */}
      <h1 style={{ 
        fontSize: '5rem', 
        margin: 0, 
        color: '#FF9831'
      }}>
        {errorCode}
      </h1>

      {/* الرسالة */}
      <p style={{ 
        marginTop: '10px',
        marginBottom: '30px',
        fontSize: '1.3rem',
        lineHeight: '1.6',
        maxWidth: '450px'
      }}>
        {errorMessage}
      </p>

      {/* زر العودة */}
      <Link 
        to="/home" 
        style={{
          padding: '12px 28px',
          backgroundColor: '#FF9831',
          color: '#410A5A',
          textDecoration: 'none',
          borderRadius: '40px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(255, 152, 49, 0.4)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#ff8c1a';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#FF9831';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        العودة إلى الرئيسية
      </Link>

      {/* أنيميشن */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;
