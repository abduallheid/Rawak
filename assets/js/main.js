// Progressive enhancement only – every page works without this file.
(function () {
  var root = document.documentElement;

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
  }

  // Theme toggle: follows the OS until the visitor picks one.
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.hidden = false;
    var current = function () {
      return root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };
    var label = function () {
      themeBtn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    };
    label();
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  }

  // Filters are pure CSS (:has). JS only announces the visible count to screen readers.
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var status = group.querySelector('[role="status"]');
    var items = group.querySelectorAll('[data-tags]');
    if (!status) return;
    group.addEventListener('change', function () {
      var n = 0;
      items.forEach(function (el) { if (el.offsetParent !== null) n++; });
      status.textContent = 'Showing ' + n + ' of ' + items.length;
    });
  });
})();
