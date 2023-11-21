import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
export default defineConfig({
  plugins: [reactRefresh()],
  // 配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 10010,
    // proxy: {
    //   "/api": {
    //     target: "https://yourBaseUrl",
    //     changeOrigin: true,
    //     cookieDomainRewrite: "",
    //     secure: false,
    //   },
    // },
  },
});
