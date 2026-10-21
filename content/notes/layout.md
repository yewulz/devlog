---
{
  "title": "布局与空间",
  "description": "Grid、Flex 与响应式布局。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "前端基础"
  ],
  "group": "前端基础",
  "symbol": "▦",
  "slug": "layout"
}
---

## 让 Grid 处理二维关系

当内容同时依赖行和列时，Grid 更适合表达整体结构。卡片列表可以通过 repeat 与 minmax 自动适配可用宽度。

## 用 Flex 组织一条轴线

导航、按钮组和工具栏通常是一维关系。让间距由 gap 管理，比在每一个子元素上单独增加外边距更容易维护。

## 让内容决定断点

缩小浏览器，观察内容何时开始拥挤。断点应该响应内容，而不是只对应某一个设备型号。

## 实践示例

```css
.collection {
  display: grid;
  grid-template-columns: repeat(
    auto-fit, minmax(min(100%, 280px), 1fr)
  );
  gap: 24px;
}
```
