# 个人简介页 / Personal Profile

一个**零依赖**的单页个人简介：纯手写 HTML / CSS / JS，中英实时切换、深浅双主题、粒子与进场动效。
**没有任何跳转**——顶栏只有语言和主题两个按钮，联系方式点击即复制到剪贴板。

> A zero-dependency one-page profile. Hand-written HTML / CSS / JS, instant ZH ⇄ EN switching, dark/light themes, particle background. **No links anywhere** — contact info copies to clipboard on click.

---

## 页面结构（就三块）

```
首屏      头像 + 名字 + 打字机角色 + 一句简介 + 三个标签胶囊
技能方向  4 张卡片：前端开发 / 后端开发 / 机器学习 / 视觉 AI
联系方式  邮箱 + GitHub，点击复制，不跳转
```

---

## 改内容

**身份信息** —— `assets/js/profile.js`：

```js
window.PROFILE = {
  name: "lhx",                    // 名字（首屏大字、logo、页脚）
  initial: "L",                   // logo 上的字母
  email: "hxliu621@gmail.com",    // 联系卡片显示与复制的内容
  github: "github.com/lhx",       // ← 换成你的用户名
  roles: { zh: [...], en: [...] } // 打字机循环的角色词
};
```

**文案** —— `assets/js/i18n.js` 里 `zh` / `en` 两份字典，键名和 HTML 的 `data-i18n="..."` 对应。

**头像** —— 在 `index.html` 里是**内联 SVG**（`<svg class="avatar">`），不加载任何图片文件，所以不会出现"图片裂了/不显示"。想换成照片：

```html
<!-- 把整个 <svg class="avatar"> 换成这一行 -->
<img class="avatar" src="assets/images/me.jpg" alt="avatar">
```

（`.avatar` 的圆形、边框、浮动动画对 img 同样生效。）

**技能卡** —— 直接改 `index.html` 里对应 `.group` 的 `<h3>` / `<p>` / `<ul class="chips">`；中英双语的文字记得同步改 `i18n.js` 里的 `groups.*` 键。

---

## 特性

| | 说明 |
|---|---|
| 🚫 零跳转 | 页面内 `<a>` 元素数量为 0；联系方式用复制按钮，不 mailto、不开新窗口 |
| 🌐 中英切换 | 右上角 `中 / EN`，全站文案瞬时切换，选择存 `localStorage` |
| 🎨 双主题 | 深 / 浅色切换，首次跟随系统偏好 |
| ✨ 动效 | 极光渐变、Canvas 粒子连线、鼠标光晕、卡片 3D 倾斜、滚动错峰进场、打字机、波浪页脚 |
| ♿ 可降级 | 关掉 JS 内容照常可读；`prefers-reduced-motion` 自动收紧动效 |
| 📱 响应式 | 流式排版，移动端单列，无横向溢出 |
| 🚀 无依赖 | 没有 npm、没有打包器、没有外部字体和 CDN |

---

## 目录

```
Introduce_myself/
├── index.html              # 结构（文案挂 data-i18n，身份挂 data-profile）
├── assets/
│   ├── css/style.css       # 设计变量 / 布局 / 动画 / 响应式
│   ├── js/
│   │   ├── profile.js      # 身份信息（名字、邮箱、GitHub、角色词）
│   │   ├── i18n.js         # 中英文案
│   │   └── main.js         # 渲染、切换、复制、粒子、进场动画
│   └── images/             # 备用图片目录（当前头像已内联，不依赖此目录）
└── README.md
```

---

## 预览

直接双击 `index.html`；或

```bash
python -m http.server 8000
```

---

## License

MIT
