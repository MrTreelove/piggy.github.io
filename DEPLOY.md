# GitHub Pages 部署指南

## 问题说明

GitHub Pages 是静态文件托管服务，不支持服务器端路由。当用户直接访问 `/accounts` 这样的路由时，GitHub Pages 会尝试查找 `/accounts/index.html`，但这个文件不存在，所以返回 404。

## 解决方案

本项目已配置使用 **HashRouter**，URL 格式为 `/#/accounts`，这样 GitHub Pages 不需要特殊配置就能正常工作。

## 部署步骤

### 方法一：使用 GitHub Actions（推荐）

1. 确保代码已推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"
3. GitHub Actions 会自动构建和部署

### 方法二：手动部署

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录的内容推送到 `gh-pages` 分支：
```bash
# 安装 gh-pages（如果还没有）
npm install --save-dev gh-pages

# 添加部署脚本到 package.json
# "deploy": "gh-pages -d dist"

# 执行部署
npm run deploy
```

3. 在 GitHub 仓库设置中：
   - Settings → Pages
   - Source 选择 "gh-pages" 分支
   - 保存

### 方法三：使用 BrowserRouter + 404.html（可选）

如果你想要更干净的 URL（不带 # 号），可以：

1. 将 `HashRouter` 改回 `BrowserRouter`
2. 确保 `public/404.html` 文件存在（已创建）
3. 在 GitHub Pages 设置中启用自定义 404 页面

## 注意事项

- 如果项目部署在子目录（如 `username.github.io/repo-name`），需要修改 `vite.config.js` 中的 `base` 配置：
  ```js
  base: '/repo-name/',
  ```
  同时需要更新 `App.jsx` 中的 Router：
  ```jsx
  <Router basename="/repo-name">
  ```

- 确保所有资源路径使用相对路径或正确的 base 路径

## 验证部署

部署完成后，访问：
- `https://username.github.io/repo-name/` （如果部署在子目录）
- `https://username.github.io/` （如果部署在根目录）

所有路由应该都能正常工作。

