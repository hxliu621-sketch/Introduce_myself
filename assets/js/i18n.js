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
    "meta.roles": ["计算机专业应届生", "在准备专转本", "前端 + 视觉 AI 学习者", "把手上的模型跑通的人"],

    "nav.home": "首页",
    "nav.about": "关于",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.contact": "联系",

    "hero.eyebrow": "你好，我是",
    "hero.desc": "计算机专业专科应届生，2027 年 6 月毕业，正在准备专转本。前端写过 Vue、uni-app、鸿蒙和安卓，后端用过若依，也在做机器学习与视觉 AI 的实验。",
    "hero.cta1": "看看我的项目",
    "hero.cta2": "联系我",
    "hero.scroll": "向下滚动",

    "stats.years": "年学习",
    "stats.skills": "技能方向",
    "stats.tags": "技术标签",

    "about.title": "关于我",
    "about.sub": "先把东西跑通，再谈做得好不好。",
    "about.c1.title": "写前端",
    "about.c1.text": "Vue、uni-app、鸿蒙、安卓都上手写过，能从零把页面搭到能跑、能交互。",
    "about.c2.title": "搭后端",
    "about.c2.text": "用若依（RuoYi）框架跑通增删改查，理解一套业务从表结构到接口的走法。",
    "about.c3.title": "跑实验",
    "about.c3.text": "用 scikit-learn 做过回归与聚类实验，知道常见算法适合什么场景、会在哪出问题。",
    "about.c4.title": "训模型",
    "about.c4.text": "ResNet18 从数据集加载、网络搭建到前向传播、loss 反向传播与推理；YOLO 用 Ultralytics 做标注、加载预训练权重、训练与部署。",

    "skills.title": "技能",
    "skills.sub": "会什么写什么，不夸大。数值可以自己调。",

    "projects.title": "项目",
    "projects.sub": "真正跑通过、能复现的东西。",
    "projects.p1.title": "个人主页",
    "projects.p1.text": "你现在看到的这个页面：零依赖、中英实时切换、双主题，全部手写。",
    "projects.p2.title": "YOLO 目标检测实践",
    "projects.p2.text": "从数据集标注、加载预训练权重到模型训练与推理部署，把目标检测的流程完整跑了一遍。",
    "projects.p3.title": "ResNet18 图像分类实验",
    "projects.p3.text": "自己写数据集加载类、搭网络，跑通前向传播与 loss 反向传播，完成训练和推理。",
    "projects.view": "查看",

    "time.title": "经历",
    "time.sub": "一条往前的线，每一步都算数。",
    "time.t1.title": "开始学前端",
    "time.t1.text": "从 HTML / CSS / JavaScript 起步，然后是 Vue，第一次把页面做到自己满意。",
    "time.t2.title": "技术面铺开",
    "time.t2.text": "uni-app、鸿蒙、安卓都试了一遍；后端用若依跑通第一个管理端。",
    "time.t3.title": "转向机器学习与视觉",
    "time.t3.text": "先用 scikit-learn 做回归、聚类实验，接着自己搭 ResNet18，用 Ultralytics 训 YOLO。",
    "time.t4.title": "准备专转本，2027 年 6 月毕业",
    "time.t4.text": "一边复习考试，一边把手上的模型和项目做完整、写清楚。",
    "time.now": "现在",

    "contact.title": "一起做点什么？",
    "contact.text": "有项目想一起做、有页面要改、或者想聊聊模型训练，都可以直接找我。",
    "contact.mail": "发邮件",

    "footer.built": "用原生 HTML / CSS / JS 手写"
  },

  /* ---------------- English ---------------- */
  en: {
    "meta.title": "{name} · Introduction",
    "meta.roles": ["CS Graduate-to-be", "Preparing for the Upgrade Exam", "Front-end & Vision AI Learner", "Someone who ships the model"],

    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Hi, I'm",
    "hero.desc": "A computer science vocational graduate, class of June 2027, preparing for the top-up degree exam. Front-ends in Vue, uni-app, HarmonyOS and Android, back-ends on RuoYi — plus ongoing ML / CV experiments.",
    "hero.cta1": "See my work",
    "hero.cta2": "Get in touch",
    "hero.scroll": "Scroll down",

    "stats.years": "Years learning",
    "stats.skills": "Skill areas",
    "stats.tags": "Tech tags",

    "about.title": "About me",
    "about.sub": "Make it run first. Then make it good.",
    "about.c1.title": "Front-end",
    "about.c1.text": "I have built with Vue, uni-app, HarmonyOS and Android — from an empty file to something that runs and reacts.",
    "about.c2.title": "Back-end",
    "about.c2.text": "Shipped CRUD on the RuoYi framework, and I understand how one feature travels from table design to working endpoints.",
    "about.c3.title": "ML experiments",
    "about.c3.text": "Ran regression and clustering experiments with scikit-learn — I know which algorithm fits where, and where it breaks.",
    "about.c4.title": "Training models",
    "about.c4.text": "ResNet18 end to end: dataloaders, network, forward pass, loss backprop, inference. YOLO with Ultralytics: labeling, pretrained weights, training, deployment.",

    "skills.title": "Skills",
    "skills.sub": "Only what I actually use — no inflation. Numbers are yours to change.",

    "projects.title": "Projects",
    "projects.sub": "Things I have actually run end to end and can reproduce.",
    "projects.p1.title": "Personal Homepage",
    "projects.p1.text": "The page you are looking at: zero dependencies, instant ZH/EN switching, dual theme, all hand-written.",
    "projects.p2.title": "YOLO Detection Practice",
    "projects.p2.text": "A full pass over object detection: dataset labeling, loading pretrained weights, training, and inference deployment.",
    "projects.p3.title": "ResNet18 Classification",
    "projects.p3.text": "Wrote the dataset loader and the network myself, ran the forward pass and loss backprop, then trained and inferred.",
    "projects.view": "View",

    "time.title": "Journey",
    "time.sub": "One line forward, every step counts.",
    "time.t1.title": "Started with front-end",
    "time.t1.text": "Began with HTML / CSS / JavaScript, then Vue — the first time a page came out the way I wanted.",
    "time.t2.title": "Widened the stack",
    "time.t2.text": "Tried uni-app, HarmonyOS and Android; shipped my first admin panel on RuoYi.",
    "time.t3.title": "Turned to ML and vision",
    "time.t3.text": "Regression and clustering with scikit-learn first, then built ResNet18 myself and trained YOLO with Ultralytics.",
    "time.t4.title": "Preparing for the upgrade exam, graduating June 2027",
    "time.t4.text": "Studying for the exam while finishing and documenting the models and projects I already started.",
    "time.now": "Now",

    "contact.title": "Let's build something",
    "contact.text": "A project to build together, a page to fix, or just a chat about training models — reach out anytime.",
    "contact.mail": "Send email",

    "footer.built": "Hand-written in vanilla HTML / CSS / JS"
  }
};
