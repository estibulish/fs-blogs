# 部署到 GitHub Pages 指南

本文档介绍如何将 VitePress 博客部署到 GitHub Pages。

## 1. 创建 GitHub 仓库

首先需要在 GitHub 上创建一个新的仓库：
- 可以使用 `your-username.github.io` 作为仓库名
- 或使用其他名称（最终博客地址将是 `https://username.github.io/repo-name`）
- 确保仓库是公开的（public）

## 2. 配置 GitHub Actions

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main] # 或者 master，取决于你的默认分支名

# 设置 GITHUB_TOKEN 的权限
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发的部署  
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run docs:build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: .vitepress/dist
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2 
```

## 3. 修改 VitePress 配置

更新 `.vitepress/config.ts` 文件，添加正确的 base 路径：

```typescript
export default {
  // 如果部署在 username.github.io，base 可以省略
  // 如果部署在 username.github.io/repo-name，需要设置 base
  // your-repo-name 是你的仓库名
  base: '/your-repo-name/',
  // ... 其他配置
}
```

## 4. 更新 package.json

修改 `package.json` 文件，添加部署相关命令：

```json
{
  "scripts": {
    "deploy": "npm run docs:build"
  }
}
```

## 5. 配置 .gitignore

创建或更新 `.gitignore` 文件，添加以下内容：

```gitignore
node_modules
.vitepress/dist
.vitepress/cache
```

## 6. 启用 GitHub Pages

1. 进入 GitHub 仓库的 Settings
2. 找到 Pages 选项
3. 在 Source 部分选择 "GitHub Actions"

## 7. 推送代码到 GitHub

执行以下命令将代码推送到 GitHub：

```bash
# 如果是新仓库，先初始化
git init
git add .
git commit -m "Initial commit"
git branch -M main  # 确保使用 main 分支
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

## 注意事项

1. 确保仓库是公开的（public）
2. 第一次部署可能需要等待几分钟
3. 如果使用自定义域名，可以在仓库设置的 Pages 部分配置
4. 每次推送代码到 main 分支时，GitHub Actions 都会自动构建并部署最新版本

## 部署完成

完成上述步骤后，你的博客将会在以下地址上线：
- 如果仓库名是 `username.github.io`：https://username.github.io
- 如果是其他名称：https://username.github.io/repo-name

```

这个 Markdown 文档包含了完整的部署流程，你可以将它保存在项目的 `docs` 目录下，方便以后查阅。文档使用了清晰的章节结构，包含了所有必要的配置文件和命令，以及重要的注意事项。
