/* ============================================================
   Pocket Notes — shared MOBILE experience layer (behaviour)
   ONE nav: the top brand pill, reworked for mobile (auto-hide on
   scroll, normalized full-screen menu that works on old + new
   essays). Plus reading progress, image lightbox, touch ripple,
   grain, and scroll-reveal. Desktop untouched. No dependencies.
   Fails safe.
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

  /* ============================================================
     Normalize the mobile menu + hamburger on EVERY page
     Clones the hamburger to strip any stale per-page listeners,
     then attaches ONE consistent toggle — so old and new essays
     behave identically and the leaked-links bug stays fixed.
     ============================================================ */
  var menu = doc.getElementById("navMobileMenu");
  function normalizeMenu() {
    var burger = doc.getElementById("navHamburger");
    if (!burger || !menu) return;
    var fresh = burger.cloneNode(true);
    burger.parentNode.replaceChild(fresh, burger);
    burger = fresh;
    function close() {
      menu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      doc.body.style.overflow = "";
    }
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ============================================================
     Auto-hide the top nav on scroll-down, reveal on scroll-up
     (recede while reading). Never hide while the menu is open.
     ============================================================ */
  function autoHideNav() {
    var nav = doc.querySelector("nav");
    if (!nav) return;
    var last = window.scrollY, ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (menu && menu.classList.contains("open")) { last = y; ticking = false; return; }
        if (y > last + 6 && y > 120) nav.classList.add("pn-nav-hidden");
        else if (y < last - 6) nav.classList.remove("pn-nav-hidden");
        last = y; ticking = false;
      });
    }, { passive: true });
  }

  /* ============================================================
     Reading progress bar (essays, mobile)
     ============================================================ */
  function progress() {
    var bar = el("div", "pn-progress");
    doc.body.appendChild(bar);
    var docEl = doc.documentElement;
    function onScroll() {
      var st = window.scrollY || docEl.scrollTop;
      var h = docEl.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ============================================================
     Image lightbox (essays)
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
    var SEL = "a,button,.essay-card,.product,.read-next-card,.article-tag,.filter-pill,.strip-button,.subscribe-btn";
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
    setTimeout(function () { beats.forEach(function (b) { b.classList.add("pn-in"); }); }, 2000);
  }

  /* ============================================================
     init
     ============================================================ */
  ready(function () {
    try {
      normalizeMenu();               // every page — fixes leaked links + consistent menu
      if (isMobile || coarse) lightbox();
      if (coarse && !reduce) ripple();
      if (isMobile) {
        grain();
        autoHideNav();
        if (isEssay) { progress(); reveal(); }
      }
    } catch (err) {
      [].forEach.call(doc.querySelectorAll(".pn-reveal"), function (b) { b.classList.add("pn-in"); });
      if (window.console) console.warn("pn mobile layer:", err);
    }
  });
})();
