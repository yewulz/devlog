---
{
  "title": "页面性能笔记",
  "description": "字体、图片与渲染的基本取舍。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "前端基础"
  ],
  "group": "前端基础",
  "symbol": "ϟ",
  "slug": "web-performance"
}
---

## 先照顾首屏内容

避免让不必要的资源阻塞标题与正文。核心内容应当在脚本执行之前就已经存在于页面中。

## 让资源匹配展示尺寸

为封面使用合适的比例，设置明确尺寸以减少布局偏移。低于首屏的图片可以延迟加载。

## 测量后再优化

用实际场景判断瓶颈，不要只根据文件数量猜测性能。优先解决影响感知速度和交互响应的问题。

## 实践示例

```html
<img
  src="cover.webp"
  width="800"
  height="560"
  loading="lazy"
  alt="Describe the project preview"
>
```
