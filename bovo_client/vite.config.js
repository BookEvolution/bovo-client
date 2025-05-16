/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const { mode } = configEnv;
  const shouldAnalyze = mode === 'analyze';

  return {
    define: {
      'global': 'window', // global을 window로 정의
    },

    plugins: [
      react(),
      ...(shouldAnalyze
        ? [visualizer({
            open: true,
            filename: 'bundle-stats.html',
            gzipSize: true,
            brotliSize: true,
          })]
        : []),
    ],
  }
})
