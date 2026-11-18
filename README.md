# Introduce_myself

一个**零依赖**的个人介绍单页 —— 纯手写 HTML / CSS / JavaScript，支持**中英文实时切换**、深浅双主题，以及一整套滚动与交互动效。

> A zero-dependency personal homepage. Hand-written HTML / CSS / JS with instant **ZH ⇄ EN** switching, dark/light themes, and a full set of scroll & interaction animations.

---

## 想改成你自己的？只改一个文件

所有「属于你的东西」都集中在 **`assets/js/profile.js`**，不用碰 HTML / CSS：

```js
window.PROFILE = {
  name: "lhx",                          // 名字（导航、首屏大字、页脚）
  initial: "L",                         // logo / 头像字母
  avatar: "assets/images/avatar.svg",   // 头像路径
  email: "hxliu621@gmail.com",
  github: "https://github.com/你的用户名",

  roles: {                              // 首屏打字机循环的角色词
    zh: ["Python 脚本开发者", "..."],
    en: ["Python Scripter", "..."]
  },

  stats: [                              // 首屏三个数字
    { value: 3, suffix: "+", key: "stats.years" },
    { value: 12, suffix: "+", key: "stats.projects" },
    { value: 6, suffix: "",  key: "stats.skills" }
  ],

  skills: [                             // 技能条：想加几条加几条
    { name: "Python", level: 88 },
    { name: "JavaScript", level: 82 }
  ],

  tags: ["Python", "JavaScript", "Git"],   // 技能标签

  projects: [                              // 三张项目卡的图与链接
    { thumb: "assets/images/thumb-1.svg", url: "#projects" }
  ]
};
```

改完刷新页面就生效。**文案**（标题、段落、项目描述、时间线）在 `assets/js/i18n.js` 的 `zh` / `en` 两份字典里。

**三个必须改的地方**：`name`、`github`、`skills` —— 现在的数值是占位示例，换成你自己的。

---

## 预览 / Preview

直接双击 `index.html` 即可，无需构建、无需服务器。

```bash
python -m http.server 8000    # 或起个本地静态服务
# http://localhost:8000
```

---

## 特性 / Features

| | 说明 |
|---|---|
| 🌐 中英切换 | 右上角 `中 / EN` 开关，全站文案瞬时切换，选择记入 `localStorage`，刷新后保持 |
| 🎨 双主题 | 深色 / 浅色一键切换，首次按系统偏好初始化 |
| 🧩 数据驱动 | 名字、头像、技能、标签、项目、联系方式全部来自 `profile.js`，改数据不改结构 |
| ✨ 动效 | 极光渐变、Canvas 粒子连线网络、鼠标光晕、卡片 3D 倾斜、滚动错峰进场、技能条填充、数字滚动、打字机循环、波浪页脚 |
| 🖼️ 图片资源 | `assets/images/` 下为纯 SVG（头像 + 三张项目缩略图），可直接换成同名 PNG/JPG |
| 📱 响应式 | 移动端汉堡菜单，`clamp()` 流式排版，无横向溢出 |
| ♿ 可降级 | 关掉 JS 也有完整内容；`prefers-reduced-motion` 自动收紧动效 |
| 🚀 无依赖 | 不需要 npm、不需要打包器，一个文件夹拷走就能跑 |

---

## 目录结构 / Structure

```
Introduce_myself/
├── index.html              # 结构骨架（文案挂 data-i18n，资料挂 data-profile）
├── assets/
│   ├── css/style.css       # 设计变量、布局、动画、响应式
│   ├── js/
│   │   ├── profile.js      # ★ 你的个人资料（唯一需要改的文件）
│   │   ├── i18n.js         # 中英文案字典
│   │   └── main.js         # 资料渲染、语言切换、主题、粒子、滚动动画
│   └── images/             # 头像与项目缩略图（SVG 占位，可替换）
├── .gitattributes          # 统一 LF
├── .gitignore
└── README.md
```

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

个人资料走另一条线：`profile.js → renderProfile() → 生成技能条 / 数字 / 标签的 DOM`。
所以**加一条技能只要往数组里加一行**，不需要复制 HTML 结构。

切换语言时会触发一次模糊淡入（`body.lang-anim`），打字机按新语言重新开始。

---

## 常用改动 / Recipes

**加一条技能**
```js
skills: [ ..., { name: "Rust", level: 60 } ]
```

**加一门语言**
1. `i18n.js` 里加 `ja: { ... }`
2. `index.html` 的 `.lang-switch` 加 `<span class="lang-opt" data-lang="ja">日</span>`
3. `profile.js` 的 `roles` 加 `ja: [...]`
4. `main.js` 的 `detectLang()` 补一个分支

**换配色**：改 `style.css` 顶部 `:root` 的 `--c1 ~ --c4` 与 `--grad`

**换头像**：替换 `assets/images/avatar.svg`，或改 `profile.js` 的 `avatar`

---

## 浏览器支持 / Browser support

Chrome / Edge / Firefox / Safari 最近两个大版本。用到 `IntersectionObserver`、CSS 自定义属性、`color-mix()`、`backdrop-filter`、`clamp()`、`aspect-ratio`、`100svh`。

---

## License

MIT
