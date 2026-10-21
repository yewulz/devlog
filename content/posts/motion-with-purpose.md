---
{
  "title": "让动效有理由，而不只是会动。",
  "description": "从鼠标反馈到页面转场，建立一套连贯的交互语言。",
  "date": "2026-10-09",
  "published": true,
  "featured": true,
  "cover": "/assets/motion.svg",
  "tags": [
    "交互设计"
  ],
  "slug": "motion-with-purpose"
}
---

## 动效首先需要说明关系

点击卡片后，封面与标题进入详情页，这种连续性让人知道自己在哪里。筛选后保留卡片的位置关系，则能帮助理解内容如何被重新组织。

在设计动效之前，先写下它要回答的问题：这里能点吗？操作完成了吗？我从哪里来到这里？如果不能回答其中一个问题，动画可能只是装饰。

## 不同层级使用不同的时间

按钮反馈需要迅速，卡片重排需要给眼睛一点时间，页面进入则允许更完整的节奏。把所有动画都设成同一个速度，会让界面失去层次。

可以从微交互约 180 毫秒、布局变化约 420 毫秒、页面进入约 600 毫秒开始，再根据实际距离与内容密度调整。

## 用变换处理位移

优先使用 transform 和 opacity。对于卡片重排，先记录旧位置，再更新布局，最后从旧位置过渡到新位置。这个思路通常称为 FLIP。

代码示例展示最小的位移过渡。实际使用时还需要考虑进入、离开、打断与减少动态效果偏好。

## 给访客选择的权利

鼠标拖尾可以增加探索的乐趣，但在阅读时应该安静下来。提供关闭入口，在触屏设备上停用跟随效果，并尊重系统的减少动态效果设置。

优秀的交互既能被注意到，也知道什么时候退到内容后面。

## 代码示例

```javascript
const before = card.getBoundingClientRect();
updateLayout();
const after = card.getBoundingClientRect();

card.animate([
  { transform: `translate(${before.x - after.x}px,
                         ${before.y - after.y}px)` },
  { transform: 'translate(0, 0)' }
], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
```
