const ARTHUR_STORY = [
  { p: 0.0, label: "20:40 · the match", sub: "watching the final minutes of the game" },
  { p: 0.18, label: "stoppage time", sub: "the referee awards a penalty — Arthur leaps up and shouts" },
  { p: 0.3, label: "PRE-STROKE AGITATION", sub: "joy read as pathology. \"High stress detected.\"" },
  { p: 0.45, label: "safety lockdown mode", sub: "lights dim · the door locks · \"This feature is unavailable for your safety.\"" },
  { p: 0.62, label: "performing calm", sub: "the progress ring advances only when the body \"agrees\"" },
  { p: 0.82, label: "the match ends", sub: "he has missed the final minutes" },
  { p: 1.0, label: "door unlocks", sub: "logged as \"Successful Intervention: Subject Stabilized.\"" }
];

const HR_KEY = [
  [0.0, 62], [0.18, 62], [0.3, 132], [0.42, 120], [0.55, 105], [0.7, 85], [0.85, 68], [1.0, 64]
];

function sampleHR(p) {
  for (let i = 0; i < HR_KEY.length - 1; i++) {
    const [p0, v0] = HR_KEY[i];
    const [p1, v1] = HR_KEY[i + 1];
    if (p >= p0 && p <= p1) {
      const f = (p - p0) / (p1 - p0);
      return v0 + (v1 - v0) * f;
    }
  }
  return HR_KEY[HR_KEY.length - 1][1];
}

function initTimeline() {
  const section = document.getElementById("story");
  if (!section) return;
  const canvas = section.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const hrEl = section.querySelector(".story-hr");
  const captionEl = section.querySelector(".story-caption");
  const subEl = section.querySelector(".story-sub");
  const doorEl = section.querySelector(".story-door");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const T_TOTAL = 44;
  const WINDOW = 12;
  let width = 0, height = 0;
  let cachedTop = 0, sectionH = 0, vh = window.innerHeight;
  let lastP = -1;
  let storyT = 0;

  function measure() {
    const r = section.getBoundingClientRect();
    cachedTop = r.top + window.scrollY;
    sectionH = r.height;
    const cw = canvas.getBoundingClientRect();
    width = Math.max(2, Math.floor(cw.width));
    height = Math.max(2, Math.floor(cw.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function currentBeat(p) {
    let beat = ARTHUR_STORY[0];
    for (const b of ARTHUR_STORY) {
      if (p >= b.p) beat = b;
    }
    return beat;
  }

  function render(p) {
    const beat = currentBeat(p);
    const hr = sampleHR(p);
    const rate = hr / 60;
    const now = p * T_TOTAL;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 48) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, height); }
    for (let y = 0; y <= height; y += 32) { ctx.moveTo(0, y + 0.5); ctx.lineTo(width, y + 0.5); }
    ctx.stroke();

    const N = Math.floor(width);
    const trace = new Array(N);
    const maxAmp = 1.6;
    for (let i = 0; i < N; i++) {
      const tt = now - (N - i) * (WINDOW / N);
      let v = ecgTrace(tt, rate);
      v += (rate > 1.6 ? 0.28 : 0.05) * Math.sin(tt * 9) * Math.sin(tt * 2.3);
      v += 0.03 * Math.sin(tt * 41);
      trace[i] = clamp(v, -2, 2);
    }
    const alarmed = p >= 0.3 && p < 0.82;
    const color = alarmed ? "#ffb45c" : "#5cffb0";
    drawLine(ctx, trace, color, maxAmp);

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.moveTo(width - 1.5, 0);
    ctx.lineTo(width - 1.5, height);
    ctx.stroke();

    hrEl.textContent = Math.round(hr) + " BPM";
    hrEl.style.color = alarmed ? "#ffb45c" : "#5cffb0";
    captionEl.textContent = beat.label;
    subEl.textContent = beat.sub;
    const locked = p >= 0.45 && p < 0.82;
    doorEl.textContent = locked ? "LOCKED" : (p > 0.82 ? "UNLOCKED" : "ARMED");
    doorEl.className = "story-door " + (locked ? "on" : "off");
  }

  function ecgTrace(tt, rate) {
    const period = 1.0 / rate;
    const tc = ((tt % period) + period) % period;
    const p = 0.05 * Math.exp(-Math.pow(tc - 0.1 * period, 2) / (2 * 0.01 * 0.01));
    const q = -0.05 * Math.exp(-Math.pow(tc - 0.23 * period, 2) / (2 * 0.002 * 0.002));
    const r = 0.5 * Math.exp(-Math.pow(tc - 0.25 * period, 2) / (2 * 0.004 * 0.004));
    const s = -0.05 * Math.exp(-Math.pow(tc - 0.27 * period, 2) / (2 * 0.002 * 0.002));
    const tw = 0.12 * Math.exp(-Math.pow(tc - 0.5 * period, 2) / (2 * 0.02 * 0.02));
    return p + q + r + s + tw;
  }

  function drawLine(ctx, points, color, maxAmp) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = i;
      const y = height / 2 - (points[i] / maxAmp) * (height / 2 - 10);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function tick() {
    const p = clamp((window.scrollY - cachedTop) / Math.max(1, sectionH - vh), 0, 1);
    if (Math.abs(p - lastP) > 0.0005) {
      lastP = p;
      storyT = p * T_TOTAL;
      render(p);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) {
      measure();
      lastP = -1;
    }
  }, { threshold: 0.01 });
  io.observe(section);

  window.addEventListener("resize", () => {
    vh = window.innerHeight;
    measure();
    lastP = -1;
  });
  window.addEventListener("scroll", () => {
    const r = section.getBoundingClientRect();
    cachedTop = r.top + window.scrollY;
    sectionH = r.height;
  }, { passive: true });

  measure();
  render(0);
  requestAnimationFrame(tick);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTimeline);
} else {
  initTimeline();
}
