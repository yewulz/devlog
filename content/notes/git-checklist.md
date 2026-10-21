---
{
  "title": "Git 工作流清单",
  "description": "分支、提交与发布前检查。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "开发工具"
  ],
  "group": "开发工具",
  "symbol": "⑂",
  "slug": "git-checklist"
}
---

## 开始之前

查看工作区状态，确认正在使用的分支。了解已有改动，避免覆盖正在进行的其他工作。

## 提交之前

审阅差异，运行与修改相关的检查，确认生成文件和本地配置是否应该进入仓库。

## 发布之后

验证部署状态和关键路径。记录当前版本对应的源码，让之后的回滚有明确目标。

## 实践示例

```sh
git status
git diff --check
git diff
git add path/to/file
git commit -m "Describe the reason for the change"
```
