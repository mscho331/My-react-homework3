// src/services/youtubeApi.js
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // 환경 변수에서 API 키 가져오기

const youtubeApi = axios.create({
  baseURL: BASE_URL,
});

// Axios interceptor를 통해 모든 요청에 공통으로 API Key 파라미터 추가
youtubeApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    key: API_KEY,
  };
  return config;
});

export const fetchFromAPI = async (url, params = {}) => {
  try {
    const response = await youtubeApi.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

// YouTube API 엔드포인트 예시
export const getPopularVideos = async () => {
  return fetchFromAPI("videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "KR", // 대한민국 인기 동영상
    maxResults: 50,
  });
};

export const searchVideos = async (query) => {
  return fetchFromAPI("search", {
    part: "snippet",
    q: query,
    type: "video",
    maxResults: 50,
  });
};

export const getVideoDetails = async (videoId) => {
  return fetchFromAPI("videos", {
    part: "snippet,statistics",
    id: videoId,
  });
};

export const getRelatedVideos = async (videoId) => {
  return fetchFromAPI("search", {
    part: "snippet",
    relatedToVideoId: videoId,
    type: "video",
    maxResults: 20,
  });
};
