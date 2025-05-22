// src/contexts/YouTubeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { searchVideos } from "../services/youtubeApi"; // API 함수 임포트

const YouTubeContext = createContext();

export const YouTubeProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("NewJeans"); // 초기 검색어 또는 카테고리
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색어 또는 카테고리가 변경될 때마다 API 호출
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 여기서는 모든 searchTerm을 searchVideos 함수로 처리합니다.
        // 실제 YouTube API는 카테고리 ID로 검색하지만, 예시를 위해 검색어로 대체합니다.
        const data = await searchVideos(searchTerm);
        setVideos(data.items);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm]);

  const updateSearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  };

  return (
    <YouTubeContext.Provider
      value={{ searchTerm, updateSearchTerm, videos, isLoading, error }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (context === undefined) {
    throw new Error("useYouTube must be used within a YouTubeProvider");
  }
  return context;
};
