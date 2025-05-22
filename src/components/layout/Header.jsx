// src/components/layout/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useYouTube } from "../../contexts/YouTubeContext"; // Context에서 상태 가져오기

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { updateSearchTerm } = useYouTube();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      updateSearchTerm(searchTerm); // 전역 상태 업데이트
      navigate(`/search/${searchTerm}`); // 검색 결과 페이지로 이동
      setSearchTerm("");
    }
  };

  return (
    <header className="fixed w-full bg-white shadow-md p-4 flex justify-between items-center z-10">
      <Link to="/" className="text-red-600 text-2xl font-bold">
        YouTube
      </Link>
      <form onSubmit={handleSubmit} className="flex-grow mx-4 max-w-xl">
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button type="submit" className="hidden">
          검색
        </button>
      </form>
      <div className="flex items-center space-x-4">
        {/* 다른 아이콘 또는 메뉴 추가 가능 */}
      </div>
    </header>
  );
};

export default Header;
