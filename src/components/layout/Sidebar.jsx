// src/components/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../utils/constants"; // 카테고리 목록
import { useYouTube } from "../../contexts/YouTubeContext"; // Context에서 상태 가져오기

const Sidebar = () => {
  const { updateSearchTerm } = useYouTube();

  const handleCategoryClick = (categoryName) => {
    updateSearchTerm(categoryName);
  };

  return (
    <aside className="fixed top-16 left-0 w-60 h-[calc(100vh-64px)] bg-white shadow-md p-4 overflow-y-auto">
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.name} className="mb-2">
              <Link
                to={`/category/${category.name}`}
                onClick={() => handleCategoryClick(category.name)}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                {/* 아이콘 추가 (예: <category.icon className="mr-2" />) */}
                <span className="text-lg">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
