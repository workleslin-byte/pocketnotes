/* ============================================================
   Pocket Notes — shared MOBILE experience layer (behaviour)
   Builds the bottom action bar, reading progress, sticky mini-
   header, image lightbox, in-context newsletter prompt, touch
   ripple, grain, and scroll-reveal. Desktop is untouched: the
   structural pieces gate on (max-width:768px); ripple gates on
   coarse pointer; reveal respects prefers-reduced-motion.
   No dependencies. Fails safe.
   ============================================================ */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  root.classList.add("pn-js");

  var isMobile = window.matchMedia("(max-width:768px)").matches;
  var coarse = window.matchMedia("(pointer:coarse)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  var path = location.pathname.replace(/\/+$/, "") || "/";
  var isEssaysIndex = /\/essays$/.test(path);
  var isEssay = !isEssaysIndex && !!doc.querySelector(".article-body") && !!doc.querySelector(".article-title");

  function el(tag, cls, html) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function ready(fn) {
    if (doc.readyState !== "loading") fn();
    else doc.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- icons ---- */
  var IC = {
    essays: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H11v15H4.5A1.5 1.5 0 0 1 3 17.5z"/><path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H13v15h6.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
    shop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>'
  };

  /* ============================================================
     Bottom action bar (mobile, every page)
     ============================================================ */
  function bottomBar() {
    if (doc.querySelector(".pn-bottombar")) return;
    var onEssays = /\/essays/.test(path);
    var onShop = /\/shop/.test(path);
    var bar = el("div", "pn-bottombar");
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "Quick navigation");
    bar.innerHTML =
      '<a href="/essays" class="' + (onEssays ? "pn-active" : "") + '">' + IC.essays + "<span>Essays</span></a>" +
      '<a href="/shop" class="' + (onShop ? "pn-active" : "") + '">' + IC.shop + "<span>Shop</span></a>" +
      '<button type="button" class="pn-menu-btn">' + IC.menu + "<span>Menu</span></button>";
    doc.body.appendChild(bar);
    doc.body.classList.add("pn-has-bar");

    // Menu reuses the existing hamburger/full-screen menu
    bar.querySelector(".pn-menu-btn").addEventListener("click", function () {
      var burger = doc.getElementById("navHamburger");
      if (burger) { burger.click(); return; }
      var menu = doc.getElementById("navMobileMenu");
      if (menu) menu.classList.toggle("open");
    });
    return bar;
  }

  /* ============================================================
     Reading progress + sticky mini-header (essays, mobile)
     ============================================================ */
  function readingChrome() {
    var bar = el("div", "pn-progress");
    doc.body.appendChild(bar);

    var titleEl = doc.querySelector(".article-title");
    var title = titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : (doc.title || "");
    var head = el("div", "pn-minihead",
      '<a class="pn-back" href="/essays" aria-label="All essays">&larr;</a><span class="pn-t"></span>');
    head.querySelector(".pn-t").textContent = title;
    doc.body.appendChild(head);

    var titleBottom = 360;
    function measure() {
      if (titleEl) titleBottom = titleEl.getBoundingClientRect().bottom + window.scrollY - 8;
    }
    measure();
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    var docEl = doc.documentElement;
    function onScroll() {
      var st = window.scrollY || docEl.scrollTop;
      var h = docEl.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
      head.classList.toggle("show", st > titleBottom);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ============================================================
     Bottom-bar hide-on-scroll-down / show-on-scroll-up (mobile)
     ============================================================ */
  function autoHideBar(bar) {
    if (!bar) return;
    var last = window.scrollY, ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > last + 6 && y > 120) bar.classList.add("pn-hide");
        else if (y < last - 6) bar.classList.remove("pn-hide");
        last = y; ticking = false;
      });
    }, { passive: true });
  }

  /* ============================================================
     Image lightbox (essays, all widths)
     ============================================================ */
  function lightbox() {
    var imgs = doc.querySelectorAll(".article-img img");
    if (!imgs.length) return;
    var box = el("div", "pn-lightbox", '<button class="pn-lb-close" aria-label="Close">&times;</button><img alt="">');
    var big = box.querySelector("img");
    function close() { box.classList.remove("show"); doc.body.style.overflow = ""; }
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("pn-lb-close")) close(); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    doc.body.appendChild(box);
    imgs.forEach(function (im) {
      im.addEventListener("click", function () {
        big.src = im.currentSrc || im.src;
        big.alt = im.alt || "";
        box.classList.add("show");
        doc.body.style.overflow = "hidden";
      });
    });
  }

  /* ============================================================
     In-context newsletter prompt (essays, mobile, ~70% scroll)
     ============================================================ */
  function subPrompt() {
    var form = doc.getElementById("subscribeForm");
    var input = doc.getElementById("emailInput");
    if (!form) return;
    var key = "pn-subprompt-dismissed";
    if (sessionStorage.getItem(key)) return;

    var p = el("div", "pn-subprompt");
    p.innerHTML =
      "<p>Essays on how writers actually work — in your inbox.</p>" +
      '<button class="pn-cta" type="button">Subscribe</button>' +
      '<button class="pn-x" type="button" aria-label="Dismiss">&times;</button>';
    doc.body.appendChild(p);

    var shown = false, done = false;
    function dismiss(remember) {
      p.classList.remove("show");
      if (remember) sessionStorage.setItem(key, "1");
      done = true;
    }
    p.querySelector(".pn-x").addEventListener("click", function () { dismiss(true); });
    p.querySelector(".pn-cta").addEventListener("click", function () {
      dismiss(true);
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      if (input) setTimeout(function () { input.focus(); }, reduce ? 0 : 500);
    });
    // hide once the real form is reached
    form.addEventListener("focusin", function () { dismiss(true); });

    var docEl = doc.documentElement;
    window.addEventListener("scroll", function () {
      if (done) return;
      var st = window.scrollY, h = docEl.scrollHeight - window.innerHeight;
      var pct = h > 0 ? st / h : 0;
      // show after 65%, but hide again if the subscribe form is already on screen
      var formTop = form.getBoundingClientRect().top;
      if (!shown && pct > 0.65 && formTop > window.innerHeight) { p.classList.add("show"); shown = true; }
      else if (shown && formTop < window.innerHeight) { p.classList.remove("show"); }
      else if (shown && formTop > window.innerHeight && pct > 0.65) { p.classList.add("show"); }
    }, { passive: true });
  }

  /* ============================================================
     Grain overlay (mobile) — restore the paper texture cheaply
     ============================================================ */
  function grain() {
    if (doc.querySelector(".pn-grain")) return;
    doc.body.appendChild(el("div", "pn-grain"));
  }

  /* ============================================================
     Touch ripple — the dot+ring, reborn for fingers (coarse pointer)
     ============================================================ */
  function ripple() {
    var SEL = "a,button,.essay-card,.product,.read-next-card,.article-tag,.filter-pill,.strip-button,.subscribe-btn,.pn-bottombar a,.pn-bottombar button";
    doc.addEventListener("touchstart", function (e) {
      var t = e.target.closest(SEL);
      if (!t) return;
      var touch = e.touches[0]; if (!touch) return;
      var r = t.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 1.6;
      var rip = el("span", "pn-ripple");
      rip.style.width = rip.style.height = size + "px";
      rip.style.left = touch.clientX + "px";
      rip.style.top = touch.clientY + "px";
      doc.body.appendChild(rip);
      requestAnimationFrame(function () { rip.classList.add("pn-go"); });
      setTimeout(function () { rip.remove(); }, 560);
    }, { passive: true });
  }

  /* ============================================================
     Scroll-reveal for essay structural beats (mobile, motion-ok)
     ============================================================ */
  function reveal() {
    if (reduce || !("IntersectionObserver" in window)) return;
    var beats = doc.querySelectorAll(".article-body h2, .article-body figure, .article-body .pull-quote, .article-body .section-break");
    if (!beats.length) return;
    beats.forEach(function (b) { b.classList.add("pn-reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("pn-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
    beats.forEach(function (b) { io.observe(b); });
    // safety: never leave a beat hidden
    setTimeout(function () { beats.forEach(function (b) { b.classList.add("pn-in"); }); }, 2000);
  }

  /* ============================================================
     init
     ============================================================ */
  ready(function () {
    try {
      if (isMobile || coarse) lightbox(); // keep desktop (custom cursor) untouched
      if (coarse && !reduce) ripple();
      if (isMobile) {
        grain();
        var bar = bottomBar();
        autoHideBar(bar);
        if (isEssay) { readingChrome(); subPrompt(); reveal(); }
      }
    } catch (err) {
      // fail safe: make sure nothing stays hidden
      [].forEach.call(doc.querySelectorAll(".pn-reveal"), function (b) { b.classList.add("pn-in"); });
      if (window.console) console.warn("pn mobile layer:", err);
    }
  });
})();
