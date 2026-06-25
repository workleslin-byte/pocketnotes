/* Pocket Notes — shared essay behaviour.
   Replaces the per-essay inline <script> (cursor, mobile nav, newsletter
   subscribe, view counter). The view-counter slug is derived from the URL,
   so no per-page configuration is needed. Every DOM lookup is guarded, so
   pages missing an element (e.g. no custom cursor) simply skip that block. */
(function () {
  // ---- Custom cursor (dot + trailing ring) ----
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (dot && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
    });
  }

  // ---- Mobile nav toggle ----
  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Newsletter subscribe ----
  var subForm = document.getElementById('subscribeForm');
  var note = document.getElementById('subscribeNote');
  if (subForm && note) {
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('emailInput');
      var email = input ? input.value.trim() : '';
      if (!email) return;
      note.textContent = 'Subscribing...';
      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email })
      }).then(function (res) {
        subForm.style.display = 'none';
        note.textContent = res.ok
          ? 'Noted. The newsletter will arrive in your inbox.'
          : 'Something went wrong. Try again.';
        note.style.opacity = '1';
        note.style.fontFamily = "'Fraunces',serif";
        note.style.fontStyle = 'italic';
        note.style.fontSize = '1.1rem';
        note.style.color = res.ok ? 'var(--mustard)' : 'var(--coral)';
      }).catch(function () {
        subForm.style.display = 'none';
        note.textContent = 'Something went wrong. Try again.';
        note.style.opacity = '1';
      });
    });
  }

  // ---- View counter (slug derived from URL) ----
  var numEl = document.getElementById('viewCountNum');
  if (numEl) {
    var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    if (slug) {
      var sessionKey = 'viewed:' + slug;
      var show = function (n) { numEl.textContent = n + ' reads'; };
      var fail = function () { numEl.textContent = '—'; };
      if (sessionStorage.getItem(sessionKey)) {
        fetch('/api/view?slug=' + slug)
          .then(function (r) { return r.json(); })
          .then(function (d) { show(d.count); })
          .catch(fail);
      } else {
        fetch('/api/view?slug=' + slug, { method: 'POST' })
          .then(function (r) { return r.json(); })
          .then(function (d) { sessionStorage.setItem(sessionKey, '1'); show(d.count); })
          .catch(fail);
      }
    }
  }
})();
