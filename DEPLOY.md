# GitHub Pages 部署指南

## 问题说明

### 问题 1：路由 404
GitHub Pages 是静态文件托管服务，不支持服务器端路由。当用户直接访问 `/accounts` 这样的路由时，GitHub Pages 会尝试查找 `/accounts/index.html`，但这个文件不存在，所以返回 404。

**解决方案**：本项目已配置使用 **HashRouter**，URL 格式为 `/#/accounts`，这样 GitHub Pages 不需要特殊配置就能正常工作。

### 问题 2：找不到 `/src/main.jsx`
如果看到 "找不到 `/src/main.jsx`" 的错误，说明部署了错误的文件。

**原因**：
- Vite 构建会将 `index.html` 中的 `/src/main.jsx` 替换为打包后的文件（如 `/assets/main-xxxxx.js`）
- 如果部署了源代码的 `index.html` 而不是构建后的 `dist/index.html`，就会出现这个错误

**解决方案**：确保部署的是 `dist` 目录的内容，而不是源代码。

## 部署步骤

### 方法一：使用 GitHub Actions（推荐）

1. 确保代码已推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"
3. GitHub Actions 会自动构建和部署
4. **重要**：确保 `.github/workflows/deploy.yml` 文件存在且正确配置
5. 部署后检查 Actions 标签页，确保构建成功

### 方法二：手动部署

1. **构建项目**（重要：必须执行）：
```bash
npm run build
```

2. **验证构建输出**（可选但推荐）：
```bash
npm run verify
```
这会检查 `dist/index.html` 是否正确（不应该包含 `/src/main.jsx`）

3. **将 `dist` 目录的内容推送到 `gh-pages` 分支**：
```bash
# 安装 gh-pages（如果还没有）
npm install --save-dev gh-pages

# 执行部署（会自动构建和验证）
npm run deploy
```

4. 在 GitHub 仓库设置中：
   - Settings → Pages
   - Source 选择 "gh-pages" 分支
   - 保存

**⚠️ 重要提示**：
- 不要直接推送源代码到 `gh-pages` 分支
- 必须部署 `dist` 目录的内容
- 确保 `dist/index.html` 不包含 `/src/main.jsx`

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

## 验证构建

在部署前，可以验证构建输出是否正确：

```bash
npm run build:verify
```

这会：
1. 构建项目
2. 验证 `dist/index.html` 是否正确（不应该包含 `/src/main.jsx`）

如果看到错误，说明构建有问题，需要检查配置。

## 验证部署

部署完成后，访问：
- `https://username.github.io/repo-name/` （如果部署在子目录）
- `https://username.github.io/` （如果部署在根目录）

所有路由应该都能正常工作。

## 常见问题

### 问题：GitHub Pages 找不到 `/src/main.jsx`

**原因**：构建后的 `index.html` 不应该包含 `/src/main.jsx`，Vite 会自动将其替换为打包后的文件。

**解决方案**：
1. 确保运行了 `npm run build` 命令
2. 检查 `dist/index.html` 文件，应该包含类似 `<script type="module" src="/assets/index-xxxxx.js"></script>` 的引用
3. 如果 `dist/index.html` 仍然包含 `/src/main.jsx`，说明构建有问题：
   - 检查 `vite.config.js` 配置
   - 确保 `index.html` 在项目根目录（不在 `public` 目录）
   - 删除 `dist` 目录后重新构建：`rm -rf dist && npm run build`

### 问题：资源文件 404

如果 CSS、图片等资源文件 404，可能是 `base` 配置不正确：
- 如果部署在根目录：`base: '/'`
- 如果部署在子目录：`base: '/repo-name/'`

