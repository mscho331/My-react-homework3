// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoList from "../components/video/VideoList"; // 직접 경로 임포트
import { useYouTube } from "../contexts/YouTubeContext"; // Context에서 상태 가져오기

const HomePage = () => {
  const {
    searchTerm: contextSearchTerm,
    updateSearchTerm,
    videos,
    isLoading,
    error,
  } = useYouTube();
  const { searchTerm: paramSearchTerm, categoryName } = useParams();

  useEffect(() => {
    // URL 파라미터가 Context의 searchTerm과 다르면 업데이트
    if (paramSearchTerm && paramSearchTerm !== contextSearchTerm) {
      updateSearchTerm(paramSearchTerm);
    } else if (categoryName && categoryName !== contextSearchTerm) {
      updateSearchTerm(categoryName);
    } else if (
      !paramSearchTerm &&
      !categoryName &&
      contextSearchTerm !== "NewJeans"
    ) {
      // 파라미터가 없고, Context의 searchTerm이 기본값이 아니면 기본값으로 설정
      updateSearchTerm("NewJeans");
    }
  }, [paramSearchTerm, categoryName, contextSearchTerm, updateSearchTerm]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        {paramSearchTerm
          ? `'${paramSearchTerm}' 검색 결과`
          : categoryName
          ? `${categoryName} 카테고리`
          : "인기 동영상"}
      </h2>
      <VideoList videos={videos} isLoading={isLoading} error={error} />
    </div>
  );
};

export default HomePage;
