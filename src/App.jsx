// src/App.jsx (교체할 새로운 파일 내용)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout"; // 직접 경로 임포트
import HomePage from "./pages/HomePage"; // 직접 경로 임포트
import VideoDetailPage from "./pages/VideoDetailPage"; // 직접 경로 임포트
import { YouTubeProvider } from "./contexts/YouTubeContext"; // Context Provider import

function App() {
  return (
    <Router>
      <YouTubeProvider>
        {" "}
        {/* 전역 상태를 제공할 Provider */}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:searchTerm" element={<HomePage />} />{" "}
            {/* 검색 결과 */}
            <Route path="/category/:categoryName" element={<HomePage />} />{" "}
            {/* 카테고리 */}
            <Route path="/video/:videoId" element={<VideoDetailPage />} />
            {/* 404 페이지 등 필요한 라우트 추가 가능 */}
          </Routes>
        </Layout>
      </YouTubeProvider>
    </Router>
  );
}

export default App;
