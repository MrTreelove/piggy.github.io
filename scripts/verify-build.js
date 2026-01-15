#!/usr/bin/env node

/**
 * 验证构建输出是否正确
 * 检查 dist/index.html 是否包含正确的脚本引用（不应该有 /src/main.jsx）
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const indexHtmlPath = join(distDir, 'index.html')

console.log('🔍 验证构建输出...\n')

if (!existsSync(distDir)) {
  console.error('❌ dist 目录不存在！请先运行 npm run build')
  process.exit(1)
}

if (!existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html 不存在！构建可能失败')
  process.exit(1)
}

const indexHtml = readFileSync(indexHtmlPath, 'utf-8')

// 检查是否包含源代码路径（不应该有）
if (indexHtml.includes('/src/main.jsx')) {
  console.error('❌ 错误：dist/index.html 仍然包含 /src/main.jsx')
  console.error('   这说明构建没有正确处理 index.html')
  console.error('   请检查 vite.config.js 配置')
  process.exit(1)
}

// 检查是否包含打包后的脚本（应该有）
if (!indexHtml.includes('<script') || !indexHtml.includes('assets/')) {
  console.warn('⚠️  警告：dist/index.html 可能没有包含正确的脚本引用')
  console.log('   当前 index.html 内容：')
  console.log(indexHtml.substring(0, 500))
}

console.log('✅ 构建输出验证通过！')
console.log('   - dist/index.html 存在')
console.log('   - 没有发现源代码路径引用')
console.log('\n📦 可以安全部署到 GitHub Pages')

