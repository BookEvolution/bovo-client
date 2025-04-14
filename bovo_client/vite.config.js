import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'global': 'window', // global을 window로 정의
  },

  plugins: [
    react(),
    visualizer({
      open: true, // 분석 결과를 브라우저로 자동 오픈
      filename: 'bundle-stats.html', // 생성될 파일 이름
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
