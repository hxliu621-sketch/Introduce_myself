/* ============================================================
   profile.js — 全站唯一「个人资料」数据源
   ------------------------------------------------------------
   想换成你自己的介绍，只改这个文件就够了：
     1) name / initial / handle   → 名字、头像首字母、页脚署名
     2) email / github            → 联系方式
     3) roles.zh / roles.en       → 首屏打字机循环的角色词
     4) stats                     → 首屏三个数字（value 是数字，key 是文案键）
     5) skills                    → 技能条，level 0–100，想加几条加几条
     6) tags                      → 技能标签，随便加
     7) projects                  → 三个项目卡的缩略图与链接
   ============================================================ */

window.PROFILE = {

  name: "lhx",
  initial: "L",                 // 头像上的字母 / logo 字母
  handle: "lhx",
  avatar: "assets/images/avatar.svg",   // 换头像就改这里

  email: "hxliu621@gmail.com",
  github: "https://github.com/",   // 换成你的主页地址

  roles: {
    zh: ["Python 脚本开发者", "Web 前端爱好者", "自动化工具作者", "喜欢拆解协议的人"],
    en: ["Python Scripter", "Web Front-end Hobbyist", "Automation Tool Author", "Protocol Tinkerer"]
  },

  // value = 数字，suffix = 后缀，key = i18n 里的文案键
  stats: [
    { value: 3,  suffix: "+", key: "stats.years" },
    { value: 12, suffix: "+", key: "stats.projects" },
    { value: 6,  suffix: "",  key: "stats.skills" }
  ],

  // 技能条：name 直接显示（技术名词不翻译），level 0–100
  skills: [
    { name: "Python",           level: 88 },
    { name: "JavaScript",       level: 82 },
    { name: "HTML / CSS",       level: 86 },
    { name: "PowerShell / Shell", level: 76 },
    { name: "HTTP / 抓包调试",   level: 80 },
    { name: "Git",              level: 78 }
  ],

  tags: [
    "Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "Node.js",
    "PowerShell", "Linux", "Git", "Docker", "SQLite", "Playwright"
  ],

  // 三个项目卡：thumb 是缩略图，url 是「查看」跳转
  projects: [
    { thumb: "assets/images/thumb-1.svg", url: "#projects" },
    { thumb: "assets/images/thumb-2.svg", url: "#projects" },
    { thumb: "assets/images/thumb-3.svg", url: "#projects" }
  ]
};
