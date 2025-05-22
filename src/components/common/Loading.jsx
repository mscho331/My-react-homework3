// src/components/common/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="ml-4 text-lg">Loading...</p>
    </div>
  );
};

export default Loading;
