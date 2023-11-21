import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import { defineConfig } from 'vite';
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
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/315227',
        changeOrigin: true,
        cookieDomainRewrite: '',
        secure: false,
      },
    },
  },
});
