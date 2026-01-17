import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署配置
  // 如果项目部署在子目录，需要设置 base，例如：base: '/piggy/'
  // 如果部署在根目录，使用 base: '/'
  base: '/piggy.github.io/',
  build: {
    outDir: 'dist',
    // 确保构建输出包含正确的路径
    assetsDir: 'assets',
    // 确保 index.html 被正确处理
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // 确保开发和生产环境路径一致
  server: {
    port: 5173,
    // 代理配置，解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // 重写路径，将 /api 前缀保留
        rewrite: (path) => path
      }
    }
  },
})

