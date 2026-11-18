/* ============================================================
   profile.js — 身份信息（只放不会随语言变化的东西）
   ------------------------------------------------------------
   名字、首字母、邮箱、GitHub、头像都在这；文案在 i18n.js。
   ============================================================ */

window.PROFILE = {

  name: "lhx",
  initial: "L",                       // logo 上的字母
  handle: "lhx",

  email: "hxliu621@gmail.com",
  github: "github.com/lhx",           // ← 换成你的 GitHub 用户名

  // 首屏打字机循环的角色词
  roles: {
    zh: ["计算机专业应届生", "在准备专转本", "前端 + 视觉 AI 学习者", "把手上的模型跑通的人"],
    en: ["CS Graduate-to-be", "Preparing for the Upgrade Exam", "Front-end & Vision AI Learner", "Someone who ships the model"]
  }
};
