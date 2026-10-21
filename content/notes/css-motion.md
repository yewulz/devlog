---
{
  "title": "CSS 动效手册",
  "description": "缓动、变换与可访问性。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "界面工程"
  ],
  "group": "界面工程",
  "symbol": "↗",
  "slug": "css-motion"
}
---

## 从 transform 和 opacity 开始

位移、缩放和透明度可以覆盖大量界面反馈。保持变换幅度克制，避免让阅读区域反复移动。

## 缓动决定感觉

ease-out 适合进入，ease-in 常用于离开。长距离变化需要更长的时间，让速度与移动距离保持合理的关系。

## 尊重减少动态效果

使用 prefers-reduced-motion 媒体查询，为不需要复杂动效的访客保留即时而清楚的状态变化。

## 实践示例

```css
.card {
  transition: transform 420ms cubic-bezier(.22, 1, .36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
```
