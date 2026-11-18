/* ============================================================
   main.js — 交互与动画
   依赖：i18n.js 先加载
   ============================================================ */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================
     0. 渲染个人资料（profile.js → DOM）
     必须在下面所有观察器之前执行，否则技能条/数字没有目标节点
     ========================================================== */
  var PROFILE = window.PROFILE || {};

  (function renderProfile() {
    var P = PROFILE;

    // 名字 / 首字母 / 邮箱
    $$("[data-profile]").forEach(function (el) {
      var key = el.getAttribute("data-profile");
      if (key === "name" && P.name) el.textContent = P.name;
      if (key === "initial" && P.initial) el.textContent = P.initial;
      if (key === "email" && P.email) el.textContent = P.email;
      if (key === "handle" && P.handle) el.textContent = P.handle;
    });

    // 头像：没配 avatar 就保留 HTML 里已有的默认图，绝不隐藏容器
    var avatar = $("#avatarImg");
    if (avatar) {
      if (P.avatar) avatar.src = P.avatar;
      avatar.alt = (P.name || "avatar") + " avatar";
    }

    // 联系方式
    var mailBtn = $("#mailBtn");
    if (mailBtn && P.email) mailBtn.href = "mailto:" + P.email;
    var ghBtn = $("#githubBtn");
    if (ghBtn && P.github) ghBtn.href = P.github;

    // 首屏数字
    var statsList = $("#statsList");
    if (statsList && P.stats && P.stats.length) {
      statsList.innerHTML = P.stats.map(function (s) {
        return '<li><b class="count" data-count="' + (s.value || 0) + '" data-suffix="' + (s.suffix || "") + '">0</b>' +
               '<span data-i18n="' + s.key + '"></span></li>';
      }).join("");
    }

    // 技能条
    var bars = $("#skillBars");
    if (bars && P.skills && P.skills.length) {
      bars.innerHTML = P.skills.map(function (s) {
        var lv = Math.max(0, Math.min(100, s.level || 0));
        return '<div class="skill" data-level="' + lv + '">' +
                 '<div class="skill-top"><span>' + s.name + '</span><em>' + lv + '%</em></div>' +
                 '<div class="bar"><i></i></div>' +
               '</div>';
      }).join("");
    }

    // 技能标签
    var tags = $("#skillTags");
    if (tags && P.tags && P.tags.length) {
      tags.innerHTML = P.tags.map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join("");
    }

    // 项目缩略图与链接
    (P.projects || []).forEach(function (pr, i) {
      var img = document.querySelector('[data-profile-thumb="' + i + '"]');
      if (img && pr.thumb) img.src = pr.thumb;
      var link = document.querySelector('[data-profile-link="' + i + '"]');
      if (link && pr.url) {
        link.href = pr.url;
        if (/^https?:/.test(pr.url)) {
          link.target = "_blank";
          link.rel = "noopener";
        }
      }
    });
  })();

  /* ==========================================================
     1. 语言切换
     ========================================================== */
  var LS_LANG = "yg.lang";
  var LS_THEME = "yg.theme";
  var currentLang = "zh";
  var typeTimer = null;

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
    if (saved === "zh" || saved === "en") return saved;
    var nav = (navigator.language || "zh").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function t(key) {
    var dict = (window.I18N && window.I18N[currentLang]) || {};
    return dict[key];
  }

  function applyLang(lang, animate) {
    currentLang = lang;
    var dict = (window.I18N && window.I18N[lang]) || {};

    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-CN");

    // 文本节点
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // 文档标题（支持 {name} 占位）
    if (dict["meta.title"]) {
      document.title = dict["meta.title"].replace(/\{name\}/g, PROFILE.name || "");
    }

    // 开关态
    $$(".lang-opt").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}

    // 打字机跟随语言重启（角色词优先取 profile.js）
    var roles = (PROFILE.roles && PROFILE.roles[lang]) || dict["meta.roles"] || [];
    restartTypewriter(roles);

    // 切换时的模糊淡入
    if (animate && !reduceMotion) {
      document.body.classList.remove("lang-anim");
      void document.body.offsetWidth;
      document.body.classList.add("lang-anim");
      setTimeout(function () { document.body.classList.remove("lang-anim"); }, 600);
    }
  }

  var langSwitch = $("#langSwitch");
  if (langSwitch) {
    langSwitch.addEventListener("click", function () {
      applyLang(currentLang === "zh" ? "en" : "zh", true);
    });
  }
  $$(".lang-opt").forEach(function (opt) {
    opt.addEventListener("click", function (e) {
      e.stopPropagation();
      var lang = opt.getAttribute("data-lang");
      if (lang !== currentLang) applyLang(lang, true);
    });
  });

  /* ==========================================================
     2. 打字机
     ========================================================== */
  var twEl = $("#typewriter");
  var twIndex = 0;
  var twChar = 0;
  var twDeleting = false;

  function restartTypewriter(roles) {
    if (!twEl) return;
    clearTimeout(typeTimer);
    twIndex = 0; twChar = 0; twDeleting = false;
    twEl.textContent = "";

    if (reduceMotion) {
      twEl.textContent = roles[0] || "";
      return;
    }
    if (!roles.length) return;

    (function tick() {
      var word = roles[twIndex % roles.length] || "";
      if (!twDeleting) {
        twChar++;
        twEl.textContent = word.slice(0, twChar);
        if (twChar >= word.length) {
          twDeleting = true;
          typeTimer = setTimeout(tick, 1600);
          return;
        }
        typeTimer = setTimeout(tick, 72 + Math.random() * 46);
      } else {
        twChar--;
        twEl.textContent = word.slice(0, twChar);
        if (twChar <= 0) {
          twDeleting = false;
          twIndex++;
          typeTimer = setTimeout(tick, 320);
          return;
        }
        typeTimer = setTimeout(tick, 32);
      }
    })();
  }

  /* ==========================================================
     3. 主题切换
     ========================================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(LS_THEME, theme); } catch (e) {}
  }
  var themeSwitch = $("#themeSwitch");
  if (themeSwitch) {
    themeSwitch.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (e) {}
    if (saved === "dark" || saved === "light") { applyTheme(saved); return; }
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  })();

  /* ==========================================================
     4. 导航：滚动态 / 进度条 / 高亮
     ========================================================== */
  var nav = $("#nav");
  var progressBar = $("#progressBar");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", y > 24);

    if (progressBar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // 当前区块高亮
  var sections = $$("main section[id]");
  var navLinks = $$(".nav-link");
  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  // 移动端菜单
  var burger = $("#burger");
  var navLinksBox = $("#navLinks");
  if (burger && navLinksBox) {
    burger.addEventListener("click", function () {
      var open = navLinksBox.classList.toggle("open");
      burger.classList.toggle("open", open);
    });
    navLinksBox.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinksBox.classList.remove("open");
        burger.classList.remove("open");
      }
    });
  }

  /* ==========================================================
     5. 滚动进场 reveal
     ========================================================== */
  (function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (n) {
          return n.classList.contains("reveal");
        });
        var idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 80, 400) + "ms";
        el.classList.add("in");
        obs.unobserve(el);
        // 进场过渡结束后再让 tilt 接管 transform，避免互相拖慢
        setTimeout(function () { el.classList.add("tilt-ready"); }, 1000);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // 首屏元素直接显示，不等观察器（避免任何触发时序导致白屏）
    var vh = window.innerHeight || document.documentElement.clientHeight;
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add("in");
        setTimeout(function () { el.classList.add("tilt-ready"); }, 1000);
      } else {
        obs.observe(el);
      }
    });

    // 兜底：万一观察器没回调，4 秒后全部显示
    setTimeout(function () {
      $$(".reveal:not(.in)").forEach(function (el) {
        el.style.transitionDelay = "0ms";
        el.classList.add("in");
      });
    }, 4000);
  })();

  /* ==========================================================
     6. 技能条
     观察整个容器而不是每一条：一次全部一起填充，
     不会因为某一条恰好落在视口边缘而漏动画
     ========================================================== */
  (function initBars() {
    var skills = $$(".skill");
    if (!skills.length) return;

    function fill(el) {
      var level = parseInt(el.getAttribute("data-level"), 10) || 0;
      var bar = el.querySelector(".bar i");
      var label = el.querySelector(".skill-top em");
      if (bar) {
        requestAnimationFrame(function () { bar.style.width = level + "%"; });
      }
      if (label && !reduceMotion) {
        var t0 = performance.now();
        (function step(now) {
          var p = Math.min(1, (now - t0) / 1200);
          var eased = 1 - Math.pow(1 - p, 3);
          label.textContent = Math.round(level * eased) + "%";
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      }
    }

    function fillAll() { skills.forEach(fill); }

    if (!("IntersectionObserver" in window)) { fillAll(); return; }

    var target = $("#skillBars") || skills[0].parentElement;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        fillAll();
        obs.disconnect();
      });
    }, { threshold: 0.15 });
    obs.observe(target);

    // 兜底：滚动到技能区附近但观察器没回调时，直接填充
    window.addEventListener("scroll", function once() {
      if (target.getBoundingClientRect().top < window.innerHeight) {
        fillAll();
        obs.disconnect();
        window.removeEventListener("scroll", once);
      }
    }, { passive: true });
  })();

  /* ==========================================================
     7. 数字滚动
     ========================================================== */
  (function initCounters() {
    var nums = $$(".count");
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) { el.textContent = target + suffix; return; }
      var t0 = performance.now();
      var dur = 1500;
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }

    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        run(en.target);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { obs.observe(n); });
  })();

  /* ==========================================================
     8. 卡片 3D 倾斜 + 光斑
     ========================================================== */
  (function initTilt() {
    if (reduceMotion) return;
    var cards = $$("[data-tilt]");

    cards.forEach(function (card) {
      var raf = null;
      var tx = 0, ty = 0, rx = 0, ry = 0;

      function render() {
        raf = null;
        card.style.transform =
          "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(" + ty.toFixed(2) + "px)";
      }

      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        rx = (0.5 - py) * 8;
        ry = (px - 0.5) * 10;
        ty = -4;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        if (!raf) raf = requestAnimationFrame(render);
      });

      card.addEventListener("mouseleave", function () {
        rx = 0; ry = 0; ty = 0;
        card.style.transform = "";
      });
    });
  })();

  /* ==========================================================
     9. 鼠标光晕
     ========================================================== */
  var glowEl = $("#cursorGlow");
  var glowTarget = glowEl !== null;
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var glowX = mouseX;
  var glowY = mouseY;

  if (glowEl && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!document.body.classList.contains("has-pointer")) {
        document.body.classList.add("has-pointer");
        glowX = mouseX; glowY = mouseY;
      }
      glowEl.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("has-pointer");
    });
  }

  /* ==========================================================
     10. 背景粒子
     ========================================================== */
  (function initParticles() {
    var canvas = $("#bg-canvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;
    var dots = [];
    var LINK = 130;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(90, Math.round((w * h) / 20000));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.6 + 0.5
        });
      }
    }

    function isLight() {
      return document.documentElement.getAttribute("data-theme") === "light";
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var light = isLight();
      var dotColor = light ? "rgba(72,83,122," : "rgba(190,205,255,";
      var lineColor = light ? "rgba(96,80,220," : "rgba(124,150,255,";

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;

        if (d.x < -20) d.x = w + 20; else if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20; else if (d.y > h + 20) d.y = -20;

        // 鼠标附近的粒子轻微排斥
        if (glowTarget) {
          var dx = d.x - mouseX, dy = d.y - mouseY;
          var dist2 = dx * dx + dy * dy;
          if (dist2 < 18000 && dist2 > 0.01) {
            var f = (1 - dist2 / 18000) * 0.55;
            var len = Math.sqrt(dist2);
            d.x += (dx / len) * f;
            d.y += (dy / len) * f;
          }
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + "0.55)";
        ctx.fill();
      }

      for (var a = 0; a < dots.length; a++) {
        for (var b = a + 1; b < dots.length; b++) {
          var ax = dots[a].x - dots[b].x;
          var ay = dots[a].y - dots[b].y;
          var dd = ax * ax + ay * ay;
          if (dd < LINK * LINK) {
            var alpha = (1 - dd / (LINK * LINK)) * 0.22;
            ctx.beginPath();
            ctx.moveTo(dots[a].x, dots[a].y);
            ctx.lineTo(dots[b].x, dots[b].y);
            ctx.strokeStyle = lineColor + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  })();

  /* ==========================================================
     11. 页脚年份
     ========================================================== */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================
     12. 启动
     ========================================================== */
  applyLang(detectLang(), false);
  onScroll();
})();
