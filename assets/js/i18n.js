/* ============================================================
   i18n.js — 中英字符串表
   ------------------------------------------------------------
   名字、技能、联系方式在 profile.js 里改；
   这里只放「文案」。新增语言：复制一份 + 在 index.html 加按钮。
   ============================================================ */

window.I18N = {

  /* ---------------- 简体中文 ---------------- */
  zh: {
    "meta.title": "{name} · 个人介绍",
    "meta.roles": ["Python 脚本开发者", "Web 前端爱好者", "自动化工具作者", "喜欢拆解协议的人"],

    "nav.home": "首页",
    "nav.about": "关于",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.contact": "联系",

    "hero.eyebrow": "你好，我是",
    "hero.desc": "自己做工具，也做页面。喜欢从代码和协议两头拆问题——把重复的事写成脚本，把想说的话写成页面。",
    "hero.cta1": "看看我的项目",
    "hero.cta2": "联系我",
    "hero.scroll": "向下滚动",

    "stats.years": "年经验",
    "stats.projects": "个项目",
    "stats.skills": "项技能",

    "about.title": "关于我",
    "about.sub": "把重复的事交给脚本，把想说的话做成页面。",
    "about.c1.title": "写代码",
    "about.c1.text": "语义化的 HTML、可维护的 CSS、不依赖框架也能跑的原生 JavaScript。",
    "about.c2.title": "写脚本",
    "about.c2.text": "Python 与 PowerShell，把每天重复的操作固化成一键跑完的小工具。",
    "about.c3.title": "拆协议",
    "about.c3.text": "抓包、看请求、还原接口，弄清一个功能到底是怎么通信的，而不是停在表面。",
    "about.c4.title": "重细节",
    "about.c4.text": "间距、对比、焦点态、日志与错误处理——这些看不见的地方才决定好不好用。",

    "skills.title": "技能",
    "skills.sub": "用得上、拿得出手的那几样。数值可以随便改。",

    "projects.title": "项目",
    "projects.sub": "自己做完、并且还在用的东西。",
    "projects.p1.title": "个人主页",
    "projects.p1.text": "你现在看到的这个页面：零依赖、中英实时切换、双主题，全部手写。",
    "projects.p2.title": "自动化脚本集",
    "projects.p2.text": "一批日常小工具：批处理、文件整理、接口巡检，命令行里一条命令跑完。",
    "projects.p3.title": "接口实验场",
    "projects.p3.text": "抓包与请求重放的练习场，用来验证参数、状态与会话是怎么串起来的。",
    "projects.view": "查看",

    "time.title": "经历",
    "time.sub": "一条往前的线，每一步都算数。",
    "time.t1.title": "第一个页面上了线",
    "time.t1.text": "从 GitHub Pages 开始，理解了「能跑」和「能被访问」之间的差距。",
    "time.t2.title": "开始用脚本解决问题",
    "time.t2.text": "把手工点来点去的流程写成脚本，第一次体会到自动化的省力。",
    "time.t3.title": "扎进接口与协议",
    "time.t3.text": "开始抓包、读请求、重放参数，明白页面背后真正发生了什么。",
    "time.t4.title": "持续输出，持续重构",
    "time.t4.text": "把每一次重写都当成一次对自己的复盘。",
    "time.now": "现在",

    "contact.title": "一起做点什么？",
    "contact.text": "有想法、有页面要改、有流程想自动化，都可以直接找我聊。",
    "contact.mail": "发邮件",

    "footer.built": "用原生 HTML / CSS / JS 手写"
  },

  /* ---------------- English ---------------- */
  en: {
    "meta.title": "{name} · Introduction",
    "meta.roles": ["Python Scripter", "Web Front-end Hobbyist", "Automation Tool Author", "Protocol Tinkerer"],

    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Hi, I'm",
    "hero.desc": "I build tools, and I build pages. I like taking problems apart from both ends — turning repetitive work into scripts, and ideas into pages.",
    "hero.cta1": "See my work",
    "hero.cta2": "Get in touch",
    "hero.scroll": "Scroll down",

    "stats.years": "Years",
    "stats.projects": "Projects",
    "stats.skills": "Skill areas",

    "about.title": "About me",
    "about.sub": "Let scripts do the repetitive work, let pages do the talking.",
    "about.c1.title": "Writing code",
    "about.c1.text": "Semantic HTML, maintainable CSS, and vanilla JavaScript that runs without a framework.",
    "about.c2.title": "Writing scripts",
    "about.c2.text": "Python and PowerShell — turning the daily repetitive routine into one-command tools.",
    "about.c3.title": "Reading protocols",
    "about.c3.text": "Capturing traffic, inspecting requests, reconstructing APIs — figuring out how things actually talk.",
    "about.c4.title": "Sweating details",
    "about.c4.text": "Spacing, contrast, focus states, logs and error handling — the invisible parts decide usability.",

    "skills.title": "Skills",
    "skills.sub": "The ones I actually use. Numbers are yours to change.",

    "projects.title": "Projects",
    "projects.sub": "Things I finished and still use myself.",
    "projects.p1.title": "Personal Homepage",
    "projects.p1.text": "The page you are looking at: zero dependencies, instant ZH/EN switching, dual theme, all hand-written.",
    "projects.p2.title": "Automation Toolkit",
    "projects.p2.text": "Small daily tools — batch jobs, file cleanup, endpoint health checks, all in one command.",
    "projects.p3.title": "API Playground",
    "projects.p3.text": "A bench for capturing traffic and replaying requests, to verify how params, state and sessions fit together.",
    "projects.view": "View",

    "time.title": "Journey",
    "time.sub": "One line forward, every step counts.",
    "time.t1.title": "First page went live",
    "time.t1.text": "Started on GitHub Pages, where I learned the gap between “it runs” and “it is reachable”.",
    "time.t2.title": "Started solving things with scripts",
    "time.t2.text": "Turned click-by-click routines into scripts — the first real taste of automation.",
    "time.t3.title": "Dug into APIs and protocols",
    "time.t3.text": "Started capturing traffic, reading requests and replaying params to see what really happens behind a page.",
    "time.t4.title": "Keep shipping, keep refactoring",
    "time.t4.text": "Every rewrite is a review of the person who wrote the last one.",
    "time.now": "Now",

    "contact.title": "Let's build something",
    "contact.text": "An idea, a page to fix, or a workflow to automate — just reach out.",
    "contact.mail": "Send email",

    "footer.built": "Hand-written in vanilla HTML / CSS / JS"
  }
};
