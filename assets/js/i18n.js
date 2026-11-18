/* ============================================================
   i18n.js — 中英字符串表
   新增语言：在同级对象里加一份 + 在 index.html 的 lang-switch 加按钮
   ============================================================ */

window.I18N = {

  /* ---------------- 简体中文 ---------------- */
  zh: {
    "meta.title": "YG · 个人介绍",
    "meta.roles": ["静态前端开发者", "交互动效爱好者", "细节偏执狂", "喜欢把想法跑起来的人"],

    "nav.home": "首页",
    "nav.about": "关于",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.contact": "联系",

    "hero.eyebrow": "你好，我是",
    "hero.desc": "一个喜欢把想法变成能跑起来的页面的开发者。专注静态前端、交互动画与细腻的视觉体验。",
    "hero.cta1": "看看我的项目",
    "hero.cta2": "联系我",
    "hero.scroll": "向下滚动",

    "stats.years": "年经验",
    "stats.projects": "个项目",
    "stats.passion": "热爱程度",

    "about.title": "关于我",
    "about.sub": "把复杂的东西做简单，把简单的东西做漂亮。",
    "about.c1.title": "写代码",
    "about.c1.text": "语义化的 HTML、可维护的 CSS 架构、不依赖框架也能跑的原生 JS。",
    "about.c2.title": "做动效",
    "about.c2.text": "克制的过渡、跟手的曲线。动画是为了让信息更好被理解，而不是更花哨。",
    "about.c3.title": "重细节",
    "about.c3.text": "间距、对比、焦点态、键盘可达性——这些看不见的地方决定质感。",
    "about.c4.title": "爱折腾",
    "about.c4.text": "新工具先动手跑一遍再评价，踩过的坑都变成下一次的设计约束。",

    "skills.title": "技能",
    "skills.sub": "每天都在长的一棵树，不是一张清单。",

    "projects.title": "项目",
    "projects.sub": "几个自己真正做完、并一直在维护的东西。",
    "projects.p1.title": "极简作品集",
    "projects.p1.text": "零依赖的单页作品集，滚动驱动的视差与视口动画，首屏 40KB 以内。",
    "projects.p2.title": "双语文档站",
    "projects.p2.text": "中英实时切换的文档模板，路由级懒加载与全文检索全部在浏览器端完成。",
    "projects.p3.title": "交互实验室",
    "projects.p3.text": "一堆小实验：粒子场、液态按钮、可拖拽的物理卡片，用来验证动效手感。",
    "projects.view": "查看",

    "time.title": "经历",
    "time.sub": "一条往前的线，每一步都算数。",
    "time.t1.title": "第一次把页面放到线上",
    "time.t1.text": "从 GitHub Pages 开始，理解了“能被访问”和“能跑”之间的差距。",
    "time.t2.title": "沉迷动效与细节",
    "time.t2.text": "开始研究缓动曲线、滚动时间轴与性能预算，动画从装饰变成语言。",
    "time.t3.title": "做完整的产品而不是页面",
    "time.t3.text": "接手从设计到部署的全流程，学会在约束里做取舍。",
    "time.t4.title": "持续输出，持续重构",
    "time.t4.text": "把每一次重写都当成一次对旧自己的复盘。",
    "time.now": "现在",

    "contact.title": "一起做点什么？",
    "contact.text": "有想法、有页面、有想改的东西，都可以直接找我聊。",
    "contact.mail": "发邮件",

    "footer.built": "用原生 HTML / CSS / JS 手写"
  },

  /* ---------------- English ---------------- */
  en: {
    "meta.title": "YG · Introduction",
    "meta.roles": ["Static Front-end Developer", "Motion & Interaction Nerd", "Detail Obsessive", "Someone who ships ideas"],

    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Hi, I'm",
    "hero.desc": "A developer who likes turning ideas into pages that actually run. Focused on static front-end, interaction motion, and fine-grained visual craft.",
    "hero.cta1": "See my work",
    "hero.cta2": "Get in touch",
    "hero.scroll": "Scroll down",

    "stats.years": "Years",
    "stats.projects": "Projects",
    "stats.passion": "Passion",

    "about.title": "About me",
    "about.sub": "Make complex things simple, and simple things beautiful.",
    "about.c1.title": "Writing code",
    "about.c1.text": "Semantic HTML, maintainable CSS architecture, and vanilla JS that runs without a framework.",
    "about.c2.title": "Crafting motion",
    "about.c2.text": "Restrained transitions, curves that feel physical. Motion should clarify information, not decorate it.",
    "about.c3.title": "Sweating details",
    "about.c3.text": "Spacing, contrast, focus states, keyboard access — the invisible parts are what make it feel solid.",
    "about.c4.title": "Always tinkering",
    "about.c4.text": "I try new tools by hand before judging them. Every pitfall becomes a constraint for the next build.",

    "skills.title": "Skills",
    "skills.sub": "A tree that keeps growing, not a checklist.",

    "projects.title": "Projects",
    "projects.sub": "A few things I actually finished and still maintain.",
    "projects.p1.title": "Minimal Portfolio",
    "projects.p1.text": "A zero-dependency single page with scroll-driven parallax and viewport animations, under 40KB first paint.",
    "projects.p2.title": "Bilingual Docs",
    "projects.p2.text": "A docs template with instant ZH/EN switching, route-level lazy loading and fully client-side search.",
    "projects.p3.title": "Interaction Lab",
    "projects.p3.text": "Small experiments: particle fields, liquid buttons, draggable physics cards — built to test how motion feels.",
    "projects.view": "View",

    "time.title": "Journey",
    "time.sub": "One line forward, every step counts.",
    "time.t1.title": "Shipped my first page",
    "time.t1.text": "It started on GitHub Pages, where I learned the gap between “it renders” and “it runs”.",
    "time.t2.title": "Fell for motion and detail",
    "time.t2.text": "Dove into easing curves, scroll timelines and performance budgets. Animation became language, not decoration.",
    "time.t3.title": "Built products, not just pages",
    "time.t3.text": "Took over the whole flow from design to deploy, and learned to trade off inside constraints.",
    "time.t4.title": "Keep shipping, keep refactoring",
    "time.t4.text": "Every rewrite is a review of the developer I used to be.",
    "time.now": "Now",

    "contact.title": "Let's build something",
    "contact.text": "An idea, a page, or something you want rebuilt — just reach out.",
    "contact.mail": "Send email",

    "footer.built": "Hand-written in vanilla HTML / CSS / JS"
  }
};
