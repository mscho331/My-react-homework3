// src/components/layout/Layout.jsx
import React from "react";
import Header from "./Header"; // 직접 경로 임포트
import Sidebar from "./Sidebar"; // 직접 경로 임포트

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        {" "}
        {/* 헤더 높이만큼 패딩 */}
        <Sidebar />
        <main className="flex-1 ml-60 p-4 bg-gray-50">
          {" "}
          {/* 사이드바 너비만큼 마진 */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
