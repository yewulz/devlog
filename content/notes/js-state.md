---
{
  "title": "状态与本地存储",
  "description": "从事件到可预测的界面更新。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "前端基础"
  ],
  "group": "前端基础",
  "symbol": "{ }",
  "slug": "js-state"
}
---

## 先描述状态

记录用户选择了什么、输入了什么，以及当前内容集合。用这些数据推导界面，避免到处维护重复状态。

## 在边界处理持久化

保存和读取都可能失败。让存储成为可替换的一层，不要让某一次失败阻塞所有交互。

## 为数据提供出口

对于本地内容，导出 JSON 是一个简单的备份方式。恢复时需要验证结构，避免错误数据破坏界面。

## 实践示例

```javascript
const state = { tasks: [], filter: "all" };

try {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
} catch {
  // Keep the current session usable.
}
```
