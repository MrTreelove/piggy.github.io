import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署配置
  // 如果项目部署在子目录，需要设置 base，例如：base: '/piggy/'
  // 如果部署在根目录，使用 base: '/'
  base: '/',
  build: {
    outDir: 'dist',
    // 确保构建输出包含正确的路径
    assetsDir: 'assets',
  },
})

