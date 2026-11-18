# Introduce_myself

一个**零依赖**的个人介绍单页 —— 纯手写 HTML / CSS / JavaScript，支持**中英文实时切换**、深浅主题、以及一整套滚动与交互动效。

> A zero-dependency personal introduction page. Hand-written HTML / CSS / JS with instant **ZH ⇄ EN** switching, dark/light themes, and a full set of scroll & interaction animations.

---

## 预览 / Preview

直接双击 `index.html` 即可，无需构建、无需服务器。

```bash
# 或者起一个本地静态服务
python -m http.server 8000
# 打开 http://localhost:8000
```

---

## 特性 / Features

| | 说明 |
|---|---|
| 🌐 中英切换 | 右上角 `中 / EN` 开关，全站文案瞬时切换，选择记入 `localStorage`，刷新后保持 |
| 🎨 双主题 | 深色 / 浅色一键切换，跟随系统偏好初始化 |
| ✨ 动效 | 极光渐变、Canvas 粒子连线网络、鼠标光晕、卡片 3D 倾斜、滚动进场、技能条填充、数字滚动、打字机循环、波浪页脚 |
| 🖼️ 图片资源 | `assets/images/` 下为纯 SVG 占位图（头像 + 三张项目缩略图），可直接替换为同名 PNG/JPG |
| 📱 响应式 | 移动端汉堡菜单，`clamp()` 流式排版，`prefers-reduced-motion` 自动降级动效 |
| 🧩 无依赖 | 不需要 npm、不需要打包器，一个文件夹拷走就能跑 |

---

## 目录结构 / Structure

```
Introduce_myself/
├── index.html              # 页面结构（data-i18n 标记文案）
├── assets/
│   ├── css/
│   │   └── style.css       # 设计变量、布局、动画、响应式
│   ├── js/
│   │   ├── i18n.js         # 中英字符串表
│   │   └── main.js         # 语言切换、主题、粒子、滚动动画
│   └── images/             # 图片资源（当前为 SVG 占位，可替换/清空）
│       ├── avatar.svg
│       ├── thumb-1.svg
│       ├── thumb-2.svg
│       └── thumb-3.svg
└── README.md
```

---

## 改成你自己的 / Make it yours

1. **名字与文案**：编辑 `assets/js/i18n.js` 里 `zh` / `en` 两份字典，键名与 HTML 中 `data-i18n="..."` 一一对应。
2. **新增一段文案**：在 HTML 写上 `<p data-i18n="my.key">默认文字</p>`，再往两份字典各加一个 `"my.key"` 即可，切换自动生效。
3. **换头像**：替换 `assets/images/avatar.svg`，或改 `index.html` 里 `<img class="avatar">` 的 `src`。
4. **换配色**：改 `style.css` 顶部 `:root` 里的 `--c1 ~ --c4` 与 `--grad`，全站同步。
5. **改技能条数值**：改每个 `.skill` 的 `data-level="95"`。
6. **加一门语言**：在 `i18n.js` 里加 `ja: {...}`，并在 `index.html` 的 `.lang-switch` 里增加对应按钮（`data-lang="ja"`），再在 `main.js` 的 `detectLang()` 补一个分支。

---

## 中英切换是怎么实现的 / How i18n works

```
HTML:  <h2 data-i18n="about.title">关于我</h2>
                │
i18n.js:        ▼   { zh: { "about.title": "关于我" },
                       en: { "about.title": "About me" } }
                │
main.js:        ▼   applyLang(lang) → querySelectorAll('[data-i18n]') → 写入 textContent
                    同时：<html lang>、document.title、按钮态、localStorage
```

切换时会触发一次模糊淡入（`body.lang-anim`），打字机效果按新语言重新开始。

---

## 浏览器支持 / Browser support

Chrome / Edge / Firefox / Safari 最近两个大版本。用到的现代特性：`IntersectionObserver`、CSS 自定义属性、`color-mix()`、`backdrop-filter`、`clamp()`、`aspect-ratio`、`100svh`。更老的浏览器会退化成静态页面（内容可读，动画缺失）。

---

## License

MIT —— 随便用，改成你自己的就行。
