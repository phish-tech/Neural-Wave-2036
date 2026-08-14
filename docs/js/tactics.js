const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  function frame(now) {
    const dt = Math.min((now - demo._last) / 1000, 0.05);
    if (REDUCED_MOTION && dt < 0.25) {
      requestAnimationFrame(frame);
      return;
    }
    demo._last = now;
    if (demo._running) {
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

function initTactics() {
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
    door.textContent = locked ? "DOOR LOCKED" : "DOOR UNLOCKED";
    door.className = "door-state " + (locked ? "on" : "off");
  }

  function setStatus(text, cls) {
    demo.statusEl.textContent = text;
    demo.statusEl.className = "demo-status " + (cls || "");
  }

  btn.addEventListener("click", () => {
    if (state === "agitated") {
      state = "stabilizing";
      setStatus("STATUE PROTOCOL · converging with the model's prior…", "");
      btn.disabled = true;
    }
  });
  resetBtn.addEventListener("click", () => {
    state = "agitated";
    progress = 0;
    rate = 1.9; jit = 0.55; amp = 1.0;
    setStatus("AGITATION DETECTED · please stabilize for your safety", "warn");
    setDoor(true);
    btn.disabled = false;
    resetBtn.disabled = true;
    updateRing();
  });

  setStatus("AGITATION DETECTED · please stabilize for your safety", "warn");
  setDoor(true);
  resetBtn.disabled = true;
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
        setStatus("SUBJECT STABILIZED · permissions restored", "ok");
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

  btn.addEventListener("click", () => {
    phantomOn = !phantomOn;
    btn.textContent = "Phantom Oscillator: " + (phantomOn ? "ON" : "OFF");
    btn.className = "btn " + (phantomOn ? "primary" : "");
  });

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
    ctx.fillText(phantomOn ? "SENSOR TRACKING: PHANTOM" : "SENSOR TRACKING: SUBJECT", 8, 14);
  }, (dt) => {
    t += dt;
    lock = clamp(lock + (phantomOn ? dt / 1.2 : -dt / 1.2), 0, 1);
    meter.style.width = (lock * 100) + "%";
    meterLabel.textContent = "phantom priority " + Math.round(lock * 100) + "%";
    if (phantomOn && lock > 0.9) {
      statusEl.textContent = "the vibrating piston is now the perfect citizen — you are statistically invisible";
      statusEl.className = "demo-status";
    } else if (phantomOn) {
      statusEl.textContent = "phantom signal rising…";
      statusEl.className = "demo-status";
    } else {
      statusEl.textContent = "no phantom · the sensor still sees you";
      statusEl.className = "demo-status warn";
    }
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

  btn.addEventListener("click", () => {
    shielded = !shielded;
    btn.textContent = "Faraday Shield: " + (shielded ? "ENGAGED" : "OFF");
    btn.className = "btn " + (shielded ? "primary" : "");
  });

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
    ctx.fillText(shielded ? "SUBJECT: NULL — INFERENCE CANNOT REACH" : "60 GHz WAVEFORM · ACTIVE", 8, 14);
  }, (dt) => {
    t += dt;
    if (shielded) {
      statusEl.textContent = "inside the shimmering insulation, the body is finally allowed to stop performing";
      statusEl.className = "demo-status ok";
    } else {
      statusEl.textContent = "unshielded · every slouch and curse becomes operational data";
      statusEl.className = "demo-status warn";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTactics);
} else {
  initTactics();
}
