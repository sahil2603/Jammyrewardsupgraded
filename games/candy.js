/* ═══════════════════════════════════════════════════════════════════════════
   JAMMMY CANDY WORLD — shared effects for every Jammmy Game.
   - twinkling sugar sparkles behind the page (CSS only, transform/opacity)
   - one effects canvas that only runs while something is flying
       CANDY.burst(x, y, opts)  sugar sparkles (gems, keno hits)
       CANDY.confetti(n, gold)  candy confetti (wins)
       CANDY.splat(x, y)        jam splash (mines)
       CANDY.pop(x, y, text)    floating "+2.4×" text
   - watches the game's own elements (tiles, result banner), so the games
     only need this file and candy.css: no changes to how they play.
   - optional ChatGPT art in games/art/: bg.webp, gem.webp, bomb.webp
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MOBILE = window.matchMedia && matchMedia('(max-width: 900px)').matches;
  var COLS = ['#ff4fb8', '#9b6bff', '#4ce68a', '#4cc3ff', '#ffb35c', '#ff5d73', '#ffd34d', '#ffffff'];
  document.body.classList.add('candy');

  /* ── sky: a few twinkling sparkles (no JS animation at all) ── */
  if (!REDUCE) {
    var sky = document.createElement('div'); sky.className = 'cd-sky'; sky.setAttribute('aria-hidden', 'true');
    var out = '';
    for (var i = 0; i < 22; i++) {
      var star = i % 5 === 0;
      out += '<i class="' + (star ? 'st' : '') + '" style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 100).toFixed(1) + '%;--s:' + (2 + Math.random() * 2.5).toFixed(1) + 'px;--d:' + (3 + Math.random() * 4).toFixed(1) + 's;--dl:' + (-Math.random() * 6).toFixed(1) + 's"></i>';
    }
    sky.innerHTML = out; document.body.insertBefore(sky, document.body.firstChild);
  }

  /* ── optional art (games/art/*.webp from ChatGPT) ── */
  /* list a file here once it's uploaded to games/art/ (so the games never ask for art that isn't there) */
  var ART_FILES = { bg: true, gem: true, bomb: true, splat: false };
  var ART = {};
  function tryArt(name, done) { if (!ART_FILES[name]) return; var im = new Image(); im.onload = function () { ART[name] = im.src; if (done) done(im.src); }; im.src = 'art/' + name + '.webp?v=20261126'; }
  tryArt('bg', function (src) { document.body.style.setProperty('--candy-bg', 'url("' + src + '")'); document.body.classList.add('has-bg'); });
  tryArt('gem'); tryArt('bomb'); tryArt('splat');
  /* Mines / Keno draw their icons with icon(kind): use the painted art when it's there */
  var _icon = window.icon;
  if (typeof _icon === 'function') window.icon = function (kind) { return ART[kind] ? '<img src="' + ART[kind] + '" alt="" draggable="false">' : _icon(kind); };

  /* ── effects canvas: runs only while particles are alive ── */
  var cv = null, cx = null, P = [], raf = 0, W = 0, H = 0, DPR = 1;
  function ensure() {
    if (cv) return;
    cv = document.createElement('canvas'); cv.className = 'cd-fx'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv); cx = cv.getContext('2d'); size();
    window.addEventListener('resize', size);
  }
  function size() { if (!cv) return; DPR = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; }
  function loop(t) {
    cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H);
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.life -= 1;
      if (p.life <= 0 || p.y > H + 40) { P.splice(i, 1); continue; }
      p.vx *= p.drag; p.vy = p.vy * p.drag + p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      var a = Math.min(1, p.life / p.fade);
      cx.globalAlpha = a; cx.fillStyle = p.c;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      if (p.k === 'conf') { cx.scale(1, Math.cos(p.r * 2.2)); cx.fillRect(-p.s, -p.s * 0.45, p.s * 2, p.s * 0.9); }
      else if (p.k === 'drop') { cx.beginPath(); cx.arc(0, 0, p.s, 0, 6.29); cx.fill(); cx.globalAlpha = a * 0.5; cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(-p.s * 0.3, -p.s * 0.35, p.s * 0.3, 0, 6.29); cx.fill(); }
      else { /* sugar: a little four-point sparkle */
        var s = p.s; cx.beginPath(); cx.moveTo(0, -s); cx.quadraticCurveTo(s * 0.18, -s * 0.18, s, 0); cx.quadraticCurveTo(s * 0.18, s * 0.18, 0, s); cx.quadraticCurveTo(-s * 0.18, s * 0.18, -s, 0); cx.quadraticCurveTo(-s * 0.18, -s * 0.18, 0, -s); cx.fill();
      }
      cx.restore();
    }
    cx.globalAlpha = 1;
    if (P.length) raf = requestAnimationFrame(loop); else { raf = 0; cx.clearRect(0, 0, W, H); }
  }
  function go() { if (!raf) raf = requestAnimationFrame(loop); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  var CAP = MOBILE ? 160 : 320;

  function burst(x, y, o) {
    if (REDUCE) return; o = o || {}; ensure();
    var n = Math.min(o.n || 16, CAP - P.length), sp = o.speed || 6, cols = o.colors || COLS;
    for (var i = 0; i < n; i++) {
      var ang = Math.random() * Math.PI * 2, v = sp * (0.35 + Math.random() * 0.75);
      P.push({ k: o.kind || 'sugar', x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - (o.lift || 1.5), g: o.g != null ? o.g : 0.18, drag: 0.94,
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, s: (o.size || 5) * (0.6 + Math.random() * 0.8), c: pick(cols), life: o.life || 48 + Math.random() * 18, fade: 18 });
    }
    go();
  }
  function confetti(n, gold) {
    if (REDUCE) return; ensure();
    n = Math.min(n || 60, CAP - P.length);
    var cols = gold ? ['#ffd34d', '#ffb35c', '#fff1b8', '#ff4fb8', '#ffffff'] : COLS;
    for (var i = 0; i < n; i++) {
      var left = i % 2 === 0, x = left ? W * 0.08 : W * 0.92, ang = (left ? -0.35 : -Math.PI + 0.35) - Math.random() * 0.9 * (left ? 1 : -1);
      var v = 9 + Math.random() * 9;
      P.push({ k: 'conf', x: x, y: H * 0.78, vx: Math.cos(ang) * v * (left ? 1 : 1), vy: -Math.abs(Math.sin(ang) * v) - 6, g: 0.28, drag: 0.975,
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35, s: 4 + Math.random() * 4, c: pick(cols), life: 120 + Math.random() * 50, fade: 30 });
    }
    go();
  }
  function splat(x, y) {
    if (REDUCE) return;
    var d = document.createElement('div'); d.className = 'cd-splat'; d.style.left = x + 'px'; d.style.top = y + 'px';
    if (ART.splat) d.innerHTML = '<img src="' + ART.splat + '" alt="" style="width:100%;height:100%;object-fit:contain">';
    else d.innerHTML = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="cdj" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ff8fa3"/><stop offset=".55" stop-color="#ff3f6b"/><stop offset="1" stop-color="#a3123d"/></radialGradient></defs>'
      + '<path fill="url(#cdj)" d="M100 38c14 0 18 18 30 14s24-10 26 4-12 18-6 30 24 10 20 24-22 6-26 18 8 26-6 32-20-12-36-10-20 22-34 14 2-24-10-32-32 2-34-12 18-16 16-30-22-20-10-30 24 4 32-6-2-26 12-30 14 4 16 4z"/>'
      + '<circle cx="34" cy="40" r="7" fill="#ff3f6b"/><circle cx="170" cy="150" r="9" fill="#ff3f6b"/><circle cx="160" cy="34" r="5" fill="#ff8fa3"/><circle cx="40" cy="168" r="6" fill="#ff8fa3"/>'
      + '<ellipse cx="82" cy="78" rx="16" ry="9" fill="#fff" opacity=".35" transform="rotate(-25 82 78)"/></svg>';
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1200);
    burst(x, y, { n: 26, kind: 'drop', colors: ['#ff3f6b', '#ff8fa3', '#d81b4f', '#ffb35c'], speed: 9, size: 4, g: 0.32, lift: 3 });
  }
  function pop(x, y, text) {
    if (REDUCE) return;
    var d = document.createElement('div'); d.className = 'cd-pop'; d.textContent = text; d.style.left = x + 'px'; d.style.top = y + 'px';
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 950);
  }
  function center(el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  function buzz(p) { try { if (navigator.vibrate && localStorage.getItem('jo_vib') !== '0') navigator.vibrate(p); } catch (e) {} }
  window.CANDY = { burst: burst, confetti: confetti, splat: splat, pop: pop, art: ART };

  /* ── watch the games' own elements ── */
  if (window.MutationObserver) {
    var seen = new WeakMap();
    function has(cls, c) { return (' ' + cls + ' ').indexOf(' ' + c + ' ') >= 0; }
    var mo = new MutationObserver(function (list) {
      list.forEach(function (m) {
        var el = m.target; if (m.type !== 'attributes' || !el.classList) return;
        var before = seen.get(el) || m.oldValue || '', now = el.className;
        seen.set(el, now);
        /* Mines tile opened */
        if (el.classList.contains('t') && !has(before, 'open') && el.classList.contains('open') && !el.classList.contains('ghost')) {
          var c = center(el);
          if (el.classList.contains('hit')) { buzz([40, 30, 70]); }
          else if (el.classList.contains('gem')) { burst(c.x, c.y, { n: MOBILE ? 12 : 18, speed: 5.5, size: 5 }); buzz(8); }
        }
        /* Keno number matched */
        if (el.classList.contains('kt') && !has(before, 'hit') && el.classList.contains('hit')) { var k = center(el); burst(k.x, k.y, { n: MOBILE ? 10 : 14, speed: 5, size: 4.5 }); buzz(6); }
        /* result banner */
        if (el.id === 'banner' && !has(before, 'show') && el.classList.contains('show')) {
          if (el.classList.contains('bj')) { confetti(MOBILE ? 90 : 150, true); }
          else if (el.classList.contains('win')) { confetti(MOBILE ? 40 : 70, false); }
        }
      });
    });
    function watch() {
      ['mgrid', 'kgrid', 'banner'].forEach(function (id) {
        var el = document.getElementById(id); if (!el || el._cdW) return; el._cdW = 1;
        mo.observe(el, { attributes: true, attributeFilter: ['class'], subtree: true, attributeOldValue: true });
      });
    }
    watch(); document.addEventListener('DOMContentLoaded', watch); window.addEventListener('load', watch);
  }

  /* ── tiny squish on the small controls when tapped ── */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.seg button, .q, .sbtn, .ibtn, .kpick');
    if (!b || b.disabled) return;
    b.classList.remove('cd-squish'); void b.offsetWidth; b.classList.add('cd-squish');
    setTimeout(function () { b.classList.remove('cd-squish'); }, 420);
  }, true);

  /* ── candy dropdowns: replace the plain browser list (Mines count, Plinko rows) with a grid of chips ── */
  function enhanceSelect(sel) {
    if (sel._cd) return; sel._cd = 1;
    var wrap = sel.parentNode; wrap.classList.add('cd-sel');
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cd-sel-btn';
    btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-label', sel.getAttribute('aria-label') || 'Choose');
    wrap.appendChild(btn);
    sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
    var pop = document.createElement('div'); pop.className = 'cd-sel-pop'; pop.setAttribute('role', 'listbox');
    document.body.appendChild(pop);
    var last = '';
    function paint() {
      var o = sel.options[sel.selectedIndex], key = sel.value + '|' + sel.disabled;
      if (key === last) return; last = key;
      btn.innerHTML = '<span>' + (o ? o.textContent : '') + '</span><i aria-hidden="true"></i>';
      btn.disabled = sel.disabled;
    }
    function open() {
      var n = sel.options.length, cols = n > 12 ? 6 : n > 6 ? 5 : n;
      pop.style.setProperty('--cols', cols);
      pop.innerHTML = Array.prototype.map.call(sel.options, function (o) {
        return '<button type="button" role="option" data-v="' + o.value + '" aria-selected="' + (o.value === sel.value) + '" class="' + (o.value === sel.value ? 'on' : '') + '">' + o.textContent + '</button>';
      }).join('');
      var r = btn.getBoundingClientRect(), w = Math.max(r.width, Math.min(cols * 50 + 20, innerWidth - 16));
      pop.style.width = w + 'px';
      pop.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px';
      pop.classList.add('show');
      var below = innerHeight - r.bottom, h = pop.offsetHeight;
      pop.style.top = (below > h + 12 || below > r.top ? r.bottom + 6 : r.top - h - 6) + 'px';
      btn.setAttribute('aria-expanded', 'true');
      var on = pop.querySelector('.on') || pop.firstChild; if (on) on.focus({ preventScroll: true });
    }
    function close(focusBtn) { if (!pop.classList.contains('show')) return; pop.classList.remove('show'); btn.setAttribute('aria-expanded', 'false'); if (focusBtn) btn.focus(); }
    btn.onclick = function (e) { e.stopPropagation(); pop.classList.contains('show') ? close() : open(); };
    pop.onclick = function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (sel.value !== b.dataset.v) { sel.value = b.dataset.v; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      paint(); close(true);
    };
    pop.onkeydown = function (e) {
      var list = Array.prototype.slice.call(pop.children), i = list.indexOf(document.activeElement), cols = +pop.style.getPropertyValue('--cols') || 1;
      var mv = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
      if (mv) { e.preventDefault(); var t = list[Math.max(0, Math.min(list.length - 1, i + mv))]; if (t) t.focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') close();
    };
    document.addEventListener('click', function (e) { if (!pop.contains(e.target) && e.target !== btn) close(); });
    window.addEventListener('resize', function () { close(); });
    window.addEventListener('scroll', function () { close(); }, true);
    sel.addEventListener('change', paint);
    setInterval(paint, 300);   /* the games also change the value and lock it in code */
    paint();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.sel select'), enhanceSelect);

  /* Mines deals its board with a stagger */
  var g = document.getElementById('mgrid'); if (g) Array.prototype.forEach.call(g.children, function (t, i) { t.style.setProperty('--i', i); });
})();
