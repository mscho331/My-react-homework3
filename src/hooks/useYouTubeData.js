// src/hooks/useYouTubeData.js
import { useState, useEffect } from "react";
import {
  getPopularVideos,
  searchVideos,
  getVideoDetails,
  getRelatedVideos,
} from "../services/youtubeApi";

const useYouTubeData = (type, queryOrId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let result;
        if (type === "popular") {
          result = await getPopularVideos();
        } else if (type === "search") {
          result = await searchVideos(queryOrId);
        } else if (type === "videoDetails") {
          result = await getVideoDetails(queryOrId);
        } else if (type === "relatedVideos") {
          result = await getRelatedVideos(queryOrId);
        } else {
          throw new Error("유효하지 않은 데이터 타입입니다.");
        }
        setData(result.items); // Google API는 items 배열로 데이터를 반환
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    // 쿼리나 ID가 있거나, 인기 동영상 요청일 때만 API 호출
    if (queryOrId || type === "popular") {
      fetchData();
    }
  }, [type, queryOrId]);

  return { data, isLoading, error };
};

export default useYouTubeData;
