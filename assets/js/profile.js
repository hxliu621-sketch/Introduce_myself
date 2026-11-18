/* ============================================================
   profile.js — 全站唯一「个人资料」数据源
   ------------------------------------------------------------
   想改成别的，只动这个文件：
     name / initial / avatar   → 名字、头像字母、头像图
     email / github            → 联系方式
     roles.zh / roles.en       → 首屏打字机循环的角色词
     stats                     → 首屏三个数字（value 数字，key 文案键）
     skills                    → 技能条，level 0–100，想加几条加几条
     tags                      → 技能标签
     projects                  → 三个项目卡的缩略图与链接
   ============================================================ */

window.PROFILE = {

  name: "lhx",
  initial: "L",                          // 头像 / logo 上的字母
  handle: "lhx",
  avatar: "assets/images/avatar.svg",    // 换头像改这里

  email: "hxliu621@gmail.com",
  github: "https://github.com/",         // ← 换成你的主页地址

  roles: {
    zh: ["计算机专业应届生", "在准备专转本", "前端 + 视觉 AI 学习者", "把手上的模型跑通的人"],
    en: ["CS Graduate-to-be", "Preparing for the Upgrade Exam", "Front-end & Vision AI Learner", "Someone who ships the model"]
  },

  // value = 数字，suffix = 后缀，key = i18n 文案键
  // 这三个都是能对得上的数：2024–2027 三年、9 条技能方向、14 个技术标签
  stats: [
    { value: 3,  suffix: "", key: "stats.years" },
    { value: 9,  suffix: "", key: "stats.skills" },
    { value: 14, suffix: "", key: "stats.tags" }
  ],

  // 技能条：name 直接显示（技术名词不翻译），level 0–100
  skills: [
    { name: "HTML / CSS / JavaScript", level: 78 },
    { name: "Vue",                     level: 68 },
    { name: "uni-app / 鸿蒙 / 安卓",    level: 62 },
    { name: "Python",                  level: 72 },
    { name: "Java",                    level: 55 },
    { name: "RuoYi 若依",              level: 58 },
    { name: "scikit-learn",            level: 58 },
    { name: "PyTorch / ResNet18",      level: 62 },
    { name: "YOLO / Ultralytics",      level: 70 }
  ],

  tags: [
    "HTML5", "CSS3", "JavaScript", "Vue", "uni-app", "HarmonyOS", "Android",
    "Python", "Java", "RuoYi", "scikit-learn", "PyTorch", "YOLO", "Git"
  ],

  // 三个项目卡：thumb 是缩略图，url 是「查看」跳转
  projects: [
    { thumb: "assets/images/thumb-1.svg", url: "#projects" },
    { thumb: "assets/images/thumb-2.svg", url: "#projects" },
    { thumb: "assets/images/thumb-3.svg", url: "#projects" }
  ]
};
