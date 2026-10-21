---
{
  "title": "设计变量与组件",
  "description": "从颜色到一套一致的界面语言。",
  "date": "2026-10-01",
  "published": true,
  "featured": true,
  "cover": "/assets/notes.svg",
  "tags": [
    "界面工程"
  ],
  "group": "界面工程",
  "symbol": "◈",
  "slug": "design-tokens"
}
---

## 使用语义化变量

比起 gray-100，surface、text-muted 和 border 更能说明颜色在界面中的角色，也更方便切换主题。

## 收敛间距和圆角

先确定有限的间距刻度，再将它们用于组件。减少不必要的变化，整体自然会更有秩序。

## 补齐交互状态

每个可操作组件都需要考虑 hover、focus-visible、active 与 disabled。键盘反馈也是设计的一部分。

## 实践示例

```css
:root {
  --surface: #faf9f6;
  --text: #242623;
  --text-muted: #969990;
  --space-sm: 8px;
  --space-md: 16px;
  --radius: 8px;
}
```
