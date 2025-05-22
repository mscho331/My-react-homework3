// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 이 줄을 추가

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 이 줄을 추가
  ],
});
