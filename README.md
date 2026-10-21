# DEVLOG

开发者博客、作品集与知识笔记网站。采用静态 HTML + Markdown + Decap CMS，内容保存在 GitHub，无需数据库。

## 本地运行

需要 Node.js 22 或更新版本。

```sh
npm ci
npm run build
npm run preview
```

访问 http://127.0.0.1:4174 。另开终端执行 `npm run cms:local`，再访问 `/admin/`，选择“打开本地编辑器”。本地保存直接写入内容文件；重新构建即可更新前台。

## 内容与代码

- `content/posts/`：博客文章。
- `content/projects/`：个人作品和开源项目。
- `content/notes/`：知识笔记。
- `content/settings/site.json`：站点信息与部署配置。
- `public/uploads/`：后台上传的图片。
- `public/`：样式、交互脚本与静态素材。
- `build.mjs`、`lib/`：生成器、Markdown 渲染与后台配置。
- `functions/api/`、`server/oauth.mjs`：Cloudflare GitHub 登录接口。

新内容通过后台创建，或增加 Markdown 文件，无需修改页面代码。`published: false` 的内容不会进入前台、搜索、RSS 和站点地图。文件名使用小写英文和连字符，发布后保持 URL 标识不变。

## 部署与验证

推荐 GitHub 托管代码，Cloudflare Pages 自动构建。浏览器后台使用 GitHub OAuth 登录，发布内容提交到仓库并触发构建。只有登录接口运行在 Cloudflare Functions，文章和图片都是仓库文件。

仓库、域名和 OAuth 配置当前保留为空。完整配置步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。密钥只设置在 Cloudflare，不能写入仓库或前端文件。

```sh
npm run check
npx wrangler pages functions build functions --outdir .wrangler/functions
```

`dist/` 为生成产物，`public/` 和 `content/` 才是维护入口。

