# DEVLOG 无数据库部署与发布指南

代码和 Markdown 内容保存在 GitHub，Cloudflare Pages 构建静态前台。Decap CMS 通过 GitHub 授权写入仓库，不使用数据库。

## 1. 本地运行

安装 Node.js 22 或更新版本，在本项目目录运行：

```sh
npm ci
npm run build
npm run preview
```

浏览器打开终端显示的本地地址。若要使用 `/admin/` 编辑并保存本地内容，另开终端运行：

```sh
npm run cms:local
```

回到本地 `/admin/`，点击“打开本地编辑器”。这不是在线登录模式，文件会直接写到当前项目的 `content/` 和 `public/uploads/`。编辑后重新执行 `npm run build` 查看前台结果。

## 2. 创建 GitHub 仓库

在自己的 GitHub 账号下创建仓库，把本项目目录作为仓库根目录上传。应包含 `package.json`、锁文件、`build.mjs`、`content/`、`public/`、`functions/`、`server/` 等源文件。不要上传 `node_modules/`、`.env`、`.dev.vars` 或任何客户端密钥。`dist/` 由构建生成，无需提交。

个人公开博客可使用公开仓库。私有仓库同样支持，但 GitHub OAuth 的授权范围需要设为 `repo`。公开仓库中的草稿文件也对仓库访客可见；“未发布”只保证它不出现在网站输出中。需要私密草稿时使用私有仓库。

## 3. 连接 Cloudflare Pages

在 Cloudflare 中创建 Pages 项目，选择 Git 集成并连接上一步仓库。配置：

| 配置 | 值 |
| --- | --- |
| 框架预设 | None |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| 根目录 | 仓库根目录；若存放在子目录则填对应路径 |
| Node.js | `22` 或更新版本 |
| 发布分支 | `main`，或你实际使用的分支 |

首次部署后，得到一个 `https://项目名称.pages.dev` 地址。没有自定义域名也可以继续。

## 4. 创建 GitHub OAuth App

在 GitHub 的 Settings → Developer settings → OAuth Apps → New OAuth App 创建应用。

- Homepage URL：你的完整 Pages 网站地址。
- Authorization callback URL：`https://你的网站/api/callback`。
- Client ID 和 Client Secret：填到下一步 Cloudflare 服务端环境变量中。不要写进源码或在聊天中发送 Client Secret。

本方案的 `/api/auth` 和 `/api/callback` 由 Pages Functions 运行。它们只处理登录，采用签名、短时 Cookie 和 PKCE，不保存文章、账号或会话数据库。

## 5. 设置 Cloudflare 环境变量

在 Pages 项目的 Settings → Variables and Secrets 设置以下变量，替换为自己的值：

| 名称 | 示例或用途 |
| --- | --- |
| `GITHUB_REPO` | `你的用户名/仓库名`，构建和运行时都需要 |
| `GITHUB_BRANCH` | `main`，构建时需要 |
| `SITE_URL` | `https://你的网站.pages.dev`，构建时需要 |
| `CMS_SITE_URL` | 与 `SITE_URL` 相同，运行时需要 |
| `GITHUB_CLIENT_ID` | OAuth App 的 Client ID，运行时需要 |
| `GITHUB_CLIENT_SECRET` | OAuth App 的 Client Secret，使用 Secret 类型 |
| `CMS_SESSION_SECRET` | 至少 32 个随机字符，使用 Secret 类型 |
| `CMS_ALLOWED_USERS` | 允许管理内容的 GitHub 登录名，多个账号用英文逗号分隔 |
| `CMS_REPO_VISIBILITY` | 公开仓库填 `public`，私有仓库填 `private` |

生成会话密钥的命令：

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`CMS_AUTH_ORIGIN` 通常不填；使用单独授权域名时再填写。设置完成后重新部署，保证构建后的后台配置和运行时变量一致。构建环境需要安装开发依赖，因为 CMS 的固定版本 JS 包会从依赖复制到输出目录；不要设置省略 devDependencies 的安装选项。

生产密钥只配置到生产环境。分支预览不默认开放在线编辑；可以预览页面，但不要把生产 OAuth 密钥复制到不受信任的预览部署中。

## 6. 日常发布

打开正式网站的 `/admin/`，进入编辑器并用允许的 GitHub 账号登录。该账号还必须拥有仓库写入权限。

1. 选择“文章”“项目”或“知识笔记”，点击新建。
2. 填写标题与 URL 标识。URL 标识使用小写英文、数字和连字符；发布后保持不变。
3. 编辑正文，上传封面和插图，填写标签及项目地址。
4. 写作过程中保存草稿。准备公开时打开“发布到前台”开关，再通过编辑流程发布。
5. CMS 将内容合并到发布分支，Pages 自动构建。构建成功后，列表、详情、搜索、RSS 和站点地图一起更新。

“在首页展示”决定是否进入首页最近内容。首页最多展示 12 项，完整内容仍在对应栏目中。项目的“出现在开源栏目”决定开源页面收录。知识笔记的“知识分类”会自动形成新的分组。

删除或下架内容后，下一次构建会清理旧输出。Git 历史保留修改记录，可通过仓库恢复。仓库中保存的是文件，不是浏览器本地存储。

## 7. 设置域名与作者信息

后台“网站设置”可以修改站点名称、简介、首页标题、作者，以及是否显示示例说明。域名、仓库、分支等配置优先使用 Cloudflare 环境变量；修改这类部署变量后需要重新构建。

绑定自定义域名后，同时更新 `SITE_URL`、`CMS_SITE_URL`、GitHub OAuth App 的 Homepage 和 Callback URL，再重新部署。正文中相对根路径的站内链接继续有效。

## 8. 可选：GitHub Pages

前台也可以部署到 GitHub Pages。GitHub Pages 不能运行 Pages Functions，因此登录接口需另外部署 `auth-worker.mjs` 到 Cloudflare Workers，并设置 `CMS_AUTH_ORIGIN` 为 Worker 域名。Worker 使用与上文相同的服务端变量；OAuth Callback URL 改成 Worker 的 `/api/callback`。

当前页面使用根路径资源。若部署到 GitHub Pages，应使用自定义域名或 `用户名.github.io` 用户站点。暂不支持带 `/仓库名/` 前缀的项目站点路径。

## 故障排查

- 后台显示未配置：检查构建环境中的 `GITHUB_REPO` 和 `SITE_URL`，然后重新部署。
- 登录提示 OAuth 未配置：检查运行时变量、会话密钥长度和回调域名。
- 登录后无权限：检查 `CMS_ALLOWED_USERS`、仓库写入权限，以及私有仓库授权范围。
- 保存后网站没更新：检查是否发布到了正确分支、“发布到前台”是否开启，以及 Pages 最近一次构建日志。
- 构建提示封面或日期错误：修正对应 Markdown 元数据。封面使用后台上传的 `/uploads/...` 路径。
- 本地代理无法连接：先运行 `npm run cms:local`，确认端口 8081 未被占用。本地代理不要暴露到公网。

官方参考：

- [Decap CMS](https://decapcms.org/docs/intro/)
- [Decap GitHub backend](https://decapcms.org/docs/github-backend/)
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [GitHub OAuth web flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
