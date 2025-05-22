// src/components/video/VideoList.jsx
import React from "react";
import VideoCard from "./VideoCard"; // 직접 경로 임포트
import Loading from "../common/Loading"; // 직접 경로 임포트

const VideoList = ({ videos, isLoading, error }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        에러 발생: {error.message}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl mt-8">
        영상이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.map((video) => (
        <VideoCard
          key={typeof video.id === "object" ? video.id.videoId : video.id}
          video={video}
        />
      ))}
    </div>
  );
};

export default VideoList;
