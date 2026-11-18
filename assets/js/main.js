/* ============================================================
   main.js — 渲染 + 交互（静态页，无任何跳转）
   ============================================================ */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var PROFILE = window.PROFILE || {};

  /* ==========================================================
     0. 身份信息写入 DOM
     ========================================================== */
  (function renderProfile() {
    var P = PROFILE;
    $$("[data-profile]").forEach(function (el) {
      var key = el.getAttribute("data-profile");
      if (key === "name" && P.name) el.textContent = P.name;
      if (key === "initial" && P.initial) el.textContent = P.initial;
      if (key === "email" && P.email) el.textContent = P.email;
      if (key === "github" && P.github) el.textContent = P.github;
      if (key === "handle" && P.handle) el.textContent = P.handle;
    });
  })();

  /* ==========================================================
     1. 语言切换
     ========================================================== */
  var LS_LANG = "yg.lang";
  var LS_THEME = "yg.theme";
  var currentLang = "zh";
  var typeTimer = null;
  var lastHintKey = "contact.copyHint";

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
    if (saved === "zh" || saved === "en") return saved;
    var nav = (navigator.language || "zh").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function applyLang(lang, animate) {
    currentLang = lang;
    var dict = (window.I18N && window.I18N[lang]) || {};

    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-CN");

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    if (dict["meta.title"]) {
      document.title = dict["meta.title"].replace(/\{name\}/g, PROFILE.name || "");
    }

    $$(".lang-opt").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}

    var roles = (PROFILE.roles && PROFILE.roles[lang]) || dict["meta.roles"] || [];
    restartTypewriter(roles);

    // 复制提示若正被临时占用，切语言时恢复默认文案
    var hint = $(".copy-hint");
    if (hint && hint.dataset.temp !== "1") hint.textContent = dict["contact.copyHint"] || hint.textContent;

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
  var twIndex = 0, twChar = 0, twDeleting = false;

  function restartTypewriter(roles) {
    if (!twEl) return;
    clearTimeout(typeTimer);
    twIndex = 0; twChar = 0; twDeleting = false;
    twEl.textContent = "";

    if (reduceMotion) { twEl.textContent = roles[0] || ""; return; }
    if (!roles.length) return;

    (function tick() {
      var word = roles[twIndex % roles.length] || "";
      if (!twDeleting) {
        twChar++;
        twEl.textContent = word.slice(0, twChar);
        if (twChar >= word.length) { twDeleting = true; typeTimer = setTimeout(tick, 1600); return; }
        typeTimer = setTimeout(tick, 72 + Math.random() * 46);
      } else {
        twChar--;
        twEl.textContent = word.slice(0, twChar);
        if (twChar <= 0) { twDeleting = false; twIndex++; typeTimer = setTimeout(tick, 320); return; }
        typeTimer = setTimeout(tick, 32);
      }
    })();
  }

  /* ==========================================================
     3. 主题
     ========================================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(LS_THEME, theme); } catch (e) {}
  }
  var themeSwitch = $("#themeSwitch");
  if (themeSwitch) {
    themeSwitch.addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (e) {}
    if (saved === "dark" || saved === "light") { applyTheme(saved); return; }
    applyTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  })();

  /* ==========================================================
     4. 滚动进度 + 顶栏状态
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

  /* ==========================================================
     5. 滚动进场
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
        setTimeout(function () { el.classList.add("tilt-ready"); }, 1000);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // 首屏元素直接显示，不等观察器
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

    // 兜底
    setTimeout(function () {
      $$(".reveal:not(.in)").forEach(function (el) {
        el.style.transitionDelay = "0ms";
        el.classList.add("in");
      });
    }, 4000);
  })();

  /* ==========================================================
     6. 卡片 3D 倾斜
     ========================================================== */
  (function initTilt() {
    if (reduceMotion) return;
    $$("[data-tilt]").forEach(function (card) {
      var raf = null, rx = 0, ry = 0, ty = 0;

      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        rx = (0.5 - py) * 7;
        ry = (px - 0.5) * 9;
        ty = -4;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        if (!raf) raf = requestAnimationFrame(function () {
          raf = null;
          card.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(" + ty + "px)";
        });
      });

      card.addEventListener("mouseleave", function () {
        rx = 0; ry = 0; ty = 0;
        card.style.transform = "";
      });
    });
  })();

  /* ==========================================================
     7. 鼠标光晕
     ========================================================== */
  var glowEl = $("#cursorGlow");
  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

  if (glowEl && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
      document.body.classList.add("has-pointer");
      glowEl.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    }, { passive: true });
    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("has-pointer");
    });
  }

  /* ==========================================================
     8. 点击复制（不发请求、不跳转）
     ========================================================== */
  (function initCopy() {
    var hint = $(".copy-hint");
    var hintTimer = null;

    function flashHint(text) {
      if (!hint) return;
      hint.textContent = text;
      hint.dataset.temp = "1";
      clearTimeout(hintTimer);
      hintTimer = setTimeout(function () {
        hint.dataset.temp = "0";
        var dict = (window.I18N && window.I18N[currentLang]) || {};
        hint.textContent = dict["contact.copyHint"] || "";
      }, 1800);
    }

    function legacyCopy(text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }

    $$("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = (btn.textContent || "").trim();
        if (!text) return;
        var dict = (window.I18N && window.I18N[currentLang]) || {};
        var okText = dict["contact.copied"] || "copied";

        var done = function () {
          btn.classList.add("copied");
          flashHint(okText);
          setTimeout(function () { btn.classList.remove("copied"); }, 1200);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
        } else {
          legacyCopy(text);
          done();
        }
      });
    });
  })();

  /* ==========================================================
     9. 背景粒子
     ========================================================== */
  (function initParticles() {
    var canvas = $("#bg-canvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, dots = [];
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

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var light = document.documentElement.getAttribute("data-theme") === "light";
      var dotColor = light ? "rgba(72,83,122," : "rgba(190,205,255,";
      var lineColor = light ? "rgba(96,80,220," : "rgba(124,150,255,";

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < -20) d.x = w + 20; else if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20; else if (d.y > h + 20) d.y = -20;

        var dx = d.x - mouseX, dy = d.y - mouseY;
        var dist2 = dx * dx + dy * dy;
        if (dist2 < 18000 && dist2 > 0.01) {
          var f = (1 - dist2 / 18000) * 0.55;
          var len = Math.sqrt(dist2);
          d.x += (dx / len) * f;
          d.y += (dy / len) * f;
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
            ctx.beginPath();
            ctx.moveTo(dots[a].x, dots[a].y);
            ctx.lineTo(dots[b].x, dots[b].y);
            ctx.strokeStyle = lineColor + ((1 - dd / (LINK * LINK)) * 0.22).toFixed(3) + ")";
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
     10. 启动
     ========================================================== */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  applyLang(detectLang(), false);
  onScroll();
})();
