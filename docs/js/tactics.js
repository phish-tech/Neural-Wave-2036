const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const T = window.I18N ? window.I18N.t : (k) => k;

function ecgWaveform(t, rate) {
  const period = 1.0 / rate;
  const tc = ((t % period) + period) % period;
  const p = 0.05 * Math.exp(-Math.pow(tc - 0.1 * period, 2) / (2 * 0.01 * 0.01));
  const q = -0.05 * Math.exp(-Math.pow(tc - 0.23 * period, 2) / (2 * 0.002 * 0.002));
  const r = 0.5 * Math.exp(-Math.pow(tc - 0.25 * period, 2) / (2 * 0.004 * 0.004));
  const s = -0.05 * Math.exp(-Math.pow(tc - 0.27 * period, 2) / (2 * 0.002 * 0.002));
  const tw = 0.12 * Math.exp(-Math.pow(tc - 0.5 * period, 2) / (2 * 0.02 * 0.02));
  return p + q + r + s + tw;
}

function wobble(t) {
  return Math.sin(t * 7.31) * Math.sin(t * 13.7);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 48) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
  for (let y = 0; y <= h; y += 36) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
  ctx.stroke();
}

function drawTrace(ctx, points, color, w, h, maxAmp) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const x = i;
    const y = h / 2 - (points[i] / maxAmp) * (h / 2 - 8);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function createDemo(root) {
  const canvas = root.querySelector("canvas");
  const statusEl = root.querySelector(".demo-status");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const demo = { canvas, ctx, statusEl, width: 2, height: 2, _running: true, _last: performance.now() };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    demo.width = Math.max(2, Math.floor(rect.width));
    demo.height = Math.max(2, Math.floor(rect.height));
    canvas.width = demo.width * dpr;
    canvas.height = demo.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, demo.width, demo.height);
  }

  demo._setRunning = (v) => { demo._running = v; if (v) demo._last = performance.now(); };
  window.addEventListener("resize", resize);
  resize();
  return demo;
}

function animate(demo, draw, advance) {
  let reducedAcc = 0;
  function frame(now) {
    const dt = Math.min((now - demo._last) / 1000, 0.05);
    demo._last = now;
    if (demo._running) {
      if (REDUCED_MOTION) {
        reducedAcc += dt;
        if (reducedAcc < 0.25) {
          requestAnimationFrame(frame);
          return;
        }
        reducedAcc = 0;
      }
      if (advance) advance(dt, now);
      const { ctx, width, height } = demo;
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, dt, now);
    }
    requestAnimationFrame(frame);
  }
  demo._last = performance.now();
  requestAnimationFrame(frame);
}

function initExplainer(el) {
  const steps = el.querySelectorAll(".exhibit-step");
  if (!steps.length) return;
  const n = steps.length;
  let top = 0, h = 0, active = false;
  const vh = window.innerHeight;

  function measure() {
    const r = el.getBoundingClientRect();
    top = r.top + window.scrollY;
    h = r.height;
  }
  function update() {
    const p = clamp((window.scrollY - top) / Math.max(1, h - vh), 0, 1);
    const count = Math.min(n, 1 + Math.floor(p * n));
    steps.forEach((s, i) => s.classList.toggle("active", i < count));
  }

  measure();
  const io = new IntersectionObserver((e) => {
    active = e[0].isIntersecting;
    if (active) { measure(); update(); }
  }, { threshold: 0.1 });
  io.observe(el);
  window.addEventListener("scroll", () => { if (active) update(); }, { passive: true });
  window.addEventListener("resize", () => { measure(); update(); });
  update();
}

function initTactics() {
  const exhibits = document.querySelectorAll(".exhibit");
  for (const el of exhibits) initExplainer(el);
  initComply();
  initDegrade();
  initRefuse();
}

function initComply() {
  const root = document.getElementById("demo-comply");
  if (!root) return;
  const demo = createDemo(root);
  const ring = root.querySelector(".ring-progress");
  const ringLabel = root.querySelector(".ring-label");
  const door = root.querySelector(".door-state");
  const btn = root.querySelector("[data-action='begin']");
  const resetBtn = root.querySelector("[data-action='reset']");

  let state = "agitated";
  let progress = 0;
  let rate = 1.9, jit = 0.55, amp = 1.0;
  let doorLocked = true;
  let t = 0;

  const io = new IntersectionObserver((e) => {
    demo._setRunning(e[0].isIntersecting);
  }, { threshold: 0.2 });
  io.observe(root);

  function updateRing() {
    const C = 2 * Math.PI * 40;
    ring.style.strokeDasharray = `${C}`;
    ring.style.strokeDashoffset = `${C * (1 - progress)}`;
    ringLabel.textContent = Math.round(progress * 100) + "%";
  }

  function setDoor(locked) {
    doorLocked = locked;
    door.textContent = T(locked ? "t01.door.locked" : "t01.door.unlocked");
    door.className = "door-state " + (locked ? "on" : "off");
  }

  function setStatus(text, cls) {
    demo.statusEl.textContent = text;
    demo.statusEl.className = "demo-status " + (cls || "");
  }

  function refresh() {
    setDoor(doorLocked);
    if (state === "agitated") setStatus(T("t01.status.agitated"), "warn");
    else if (state === "stabilizing") setStatus(T("t01.status.stabilizing"), "");
    else setStatus(T("t01.status.stable"), "ok");
  }

  btn.addEventListener("click", () => {
    if (state === "agitated" || state === "stable") {
      if (state === "stable") {
        progress = 0;
        rate = 1.9; jit = 0.55; amp = 1.0;
        setDoor(true);
        resetBtn.disabled = true;
        updateRing();
      }
      state = "stabilizing";
      setStatus(T("t01.status.stabilizing"), "");
      btn.disabled = true;
    }
  });
  resetBtn.addEventListener("click", () => {
    state = "agitated";
    progress = 0;
    rate = 1.9; jit = 0.55; amp = 1.0;
    setStatus(T("t01.status.agitated"), "warn");
    setDoor(true);
    btn.disabled = false;
    resetBtn.disabled = true;
    updateRing();
  });

  window.addEventListener("nw:lang", refresh);
  refresh();
  updateRing();

  animate(demo, (ctx, w, h) => {
    const N = Math.floor(w);
    const trace = new Array(N);
    for (let i = 0; i < N; i++) {
      const tt = t - (N - i) * 0.01;
      let v = amp * ecgWaveform(tt, rate) + jit * 0.35 * wobble(tt);
      v += jit * 0.3 * (Math.sin(tt * 40) * 0.5 + 0.5) * Math.sin(tt * 2.7);
      trace[i] = clamp(v, -1.6, 1.6);
    }
    drawGrid(ctx, w, h);
    drawTrace(ctx, trace, state === "stable" ? "#5cffb0" : "#ffb45c", w, h, 1.8);
  }, (dt) => {
    t += dt;
    if (state === "stabilizing") {
      progress = Math.min(1, progress + dt / 4.5);
      rate = lerp(1.9, 0.8, progress);
      jit = lerp(0.55, 0.03, progress);
      amp = lerp(1.0, 0.5, progress);
      updateRing();
      if (progress >= 1) {
        state = "stable";
        setStatus(T("t01.status.stable"), "ok");
        setDoor(false);
        btn.disabled = false;
        resetBtn.disabled = false;
      }
    }
  });
}

function initDegrade() {
  const root = document.getElementById("demo-degrade");
  if (!root) return;
  const demo = createDemo(root);
  const meter = root.querySelector(".lock-bar");
  const meterLabel = root.querySelector(".lock-label");
  const statusEl = root.querySelector(".demo-status");
  const btn = root.querySelector("[data-action='toggle']");
  let phantomOn = false;
  let lock = 0;
  let t = 0;

  const io = new IntersectionObserver((e) => {
    demo._setRunning(e[0].isIntersecting);
  }, { threshold: 0.2 });
  io.observe(root);

  function paintStatus() {
    if (phantomOn && lock > 0.9) {
      statusEl.textContent = T("t02.status.full");
      statusEl.className = "demo-status";
    } else if (phantomOn) {
      statusEl.textContent = T("t02.status.on");
      statusEl.className = "demo-status";
    } else {
      statusEl.textContent = T("t02.status.off");
      statusEl.className = "demo-status warn";
    }
  }

  function refresh() {
    btn.textContent = T(phantomOn ? "t02.toggle.on" : "t02.toggle.off");
    btn.className = "btn " + (phantomOn ? "primary" : "");
    btn.setAttribute("aria-pressed", phantomOn ? "true" : "false");
    meterLabel.textContent = T("t02.priority") + " " + Math.round(lock * 100) + "%";
    paintStatus();
  }

  btn.addEventListener("click", () => {
    phantomOn = !phantomOn;
    refresh();
  });

  window.addEventListener("nw:lang", refresh);
  refresh();

  animate(demo, (ctx, w, h) => {
    const N = Math.floor(w);
    const human = new Array(N);
    const machine = new Array(N);
    for (let i = 0; i < N; i++) {
      const tt = t - (N - i) * 0.008;
      human[i] = 0.22 * ecgWaveform(tt, 1.2) + 0.06 * wobble(tt);
      machine[i] = 1.0 * Math.sin(2 * Math.PI * 0.8 * tt) + 0.4 * Math.sin(2 * Math.PI * 1.6 * tt + Math.PI / 2.5);
    }
    drawGrid(ctx, w, h);
    ctx.save();
    ctx.globalAlpha = phantomOn ? 0.25 : 0.9;
    drawTrace(ctx, human, "#d8dee4", w, h, 1.8);
    ctx.restore();
    if (phantomOn) {
      drawTrace(ctx, machine, "#5cffb0", w, h, 1.8);
    }
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "10px Consolas, monospace";
    ctx.fillText(T(phantomOn ? "t02.sensor.phantom" : "t02.sensor.subject"), 8, 14);
  }, (dt) => {
    t += dt;
    lock = clamp(lock + (phantomOn ? dt / 1.2 : -dt / 1.2), 0, 1);
    meter.style.width = (lock * 100) + "%";
    meterLabel.textContent = T("t02.priority") + " " + Math.round(lock * 100) + "%";
    paintStatus();
  });
}

function initRefuse() {
  const root = document.getElementById("demo-refuse");
  if (!root) return;
  const demo = createDemo(root);
  const statusEl = root.querySelector(".demo-status");
  const btn = root.querySelector("[data-action='toggle']");
  let shielded = false;
  let t = 0;

  const io = new IntersectionObserver((e) => {
    demo._setRunning(e[0].isIntersecting);
  }, { threshold: 0.2 });
  io.observe(root);

  function refresh() {
    btn.textContent = T(shielded ? "t03.toggle.on" : "t03.toggle.off");
    btn.className = "btn " + (shielded ? "primary" : "");
    btn.setAttribute("aria-pressed", shielded ? "true" : "false");
    statusEl.textContent = T(shielded ? "t03.status.on" : "t03.status.off");
    statusEl.className = "demo-status " + (shielded ? "ok" : "warn");
  }

  btn.addEventListener("click", () => {
    shielded = !shielded;
    refresh();
  });

  window.addEventListener("nw:lang", refresh);
  refresh();

  animate(demo, (ctx, w, h) => {
    const N = Math.floor(w);
    const trace = new Array(N);
    for (let i = 0; i < N; i++) {
      const tt = t - (N - i) * 0.01;
      trace[i] = shielded ? 0 : (0.9 * ecgWaveform(tt, 1.1) + 0.12 * wobble(tt));
    }
    drawGrid(ctx, w, h);
    drawTrace(ctx, trace, shielded ? "#7c8792" : "#5cffb0", w, h, 1.6);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "10px Consolas, monospace";
    ctx.fillText(T(shielded ? "t03.sensor.null" : "t03.sensor.active"), 8, 14);
  }, (dt) => {
    t += dt;
    if (shielded) {
      statusEl.textContent = T("t03.status.on");
      statusEl.className = "demo-status ok";
    } else {
      statusEl.textContent = T("t03.status.off");
      statusEl.className = "demo-status warn";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTactics);
} else {
  initTactics();
}
