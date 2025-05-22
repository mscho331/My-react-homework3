// src/pages/VideoDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import useYouTubeData from "../hooks/useYouTubeData";
import Loading from "../components/common/Loading";
import VideoList from "../components/video/VideoList";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const {
    data: videoDetails,
    isLoading: detailsLoading,
    error: detailsError,
  } = useYouTubeData("videoDetails", videoId);
  const {
    data: relatedVideos,
    isLoading: relatedLoading,
    error: relatedError,
  } = useYouTubeData("relatedVideos", videoId);

  if (detailsLoading) {
    return <Loading />;
  }

  if (detailsError) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        동영상 상세 정보를 불러오는 데 실패했습니다: {detailsError.message}
      </div>
    );
  }

  if (!videoDetails || videoDetails.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl mt-8">
        동영상 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const video = videoDetails[0];

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="lg:w-2/3 lg:pr-8 mb-8 lg:mb-0">
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`} // 이 줄로 변경하세요!
            controls
            playing
            width="100%"
            height="100%"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">{video.snippet.title}</h1>
        <p className="text-gray-700 text-sm mb-4">
          {video.snippet.channelTitle}
        </p>
        <p className="text-gray-800 text-base">{video.snippet.description}</p>
        {video.statistics && (
          <div className="mt-4 text-sm text-gray-600">
            <p>
              조회수: {parseInt(video.statistics.viewCount).toLocaleString()}회
            </p>
            {video.statistics.likeCount && (
              <p>
                좋아요: {parseInt(video.statistics.likeCount).toLocaleString()}
                개
              </p>
            )}
          </div>
        )}
      </div>
      <div className="lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">관련 동영상</h2>
        <VideoList
          videos={relatedVideos}
          isLoading={relatedLoading}
          error={relatedError}
        />
      </div>
    </div>
  );
};

export default VideoDetailPage;
