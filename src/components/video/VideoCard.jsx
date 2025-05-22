// src/components/video/VideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video || !video.id || !video.snippet) {
    return null; // 유효하지 않은 video 객체 처리
  }

  // 'search' API 결과는 id.videoId, 'videos' API 결과는 id를 사용
  const videoId = typeof video.id === "object" ? video.id.videoId : video.id;
  const thumbnailUrl =
    video.snippet.thumbnails?.high?.url ||
    video.snippet.thumbnails?.medium?.url ||
    "https://via.placeholder.com/360x202?text=No+Image"; // 썸네일 URL
  const title = video.snippet.title;
  const channelTitle = video.snippet.channelTitle;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/video/${videoId}`}>
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600">{channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;
