const T = window.I18N ? window.I18N.t : (k) => k;

const ARTHUR_STORY = [
  { p: 0.0, label: "story.b1.label", sub: "story.b1.sub", interp: "story.b1.interp" },
  { p: 0.18, label: "story.b2.label", sub: "story.b2.sub", interp: "story.b2.interp" },
  { p: 0.3, label: "story.b3.label", sub: "story.b3.sub", interp: "story.b3.interp" },
  { p: 0.45, label: "story.b4.label", sub: "story.b4.sub", interp: "story.b4.interp" },
  { p: 0.62, label: "story.b5.label", sub: "story.b5.sub", interp: "story.b5.interp" },
  { p: 0.82, label: "story.b6.label", sub: "story.b6.sub", interp: "story.b6.interp" },
  { p: 1.0, label: "story.b7.label", sub: "story.b7.sub", interp: "story.b7.interp" }
];

const HR_KEY = [
  [0.0, 62], [0.18, 62], [0.3, 132], [0.42, 120], [0.55, 105], [0.7, 85], [0.85, 68], [1.0, 64]
];

const CONF_KEY = [
  [0.0, 0.91], [0.18, 0.91], [0.3, 0.94], [0.45, 0.97], [0.62, 0.96], [0.82, 0.95], [1.0, 0.98]
];

function sampleKey(arr, p) {
  for (let i = 0; i < arr.length - 1; i++) {
    const [p0, v0] = arr[i];
    const [p1, v1] = arr[i + 1];
    if (p >= p0 && p <= p1) {
      const f = (p - p0) / (p1 - p0);
      return v0 + (v1 - v0) * f;
    }
  }
  return arr[arr.length - 1][1];
}

function initTimeline() {
  const section = document.getElementById("story");
  if (!section) return;
  const canvas = section.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const hrEl = section.querySelector(".story-hr");
  const confEl = section.querySelector(".story-conf");
  const interpEl = section.querySelector(".story-interp");
  const captionEl = section.querySelector(".story-caption");
  const subEl = section.querySelector(".story-sub");
  const doorEl = section.querySelector(".story-door");
  const payoff = section.querySelector(".story-payoff");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const T_TOTAL = 44;
  const WINDOW = 12;
  let width = 0, height = 0;
  let cachedTop = 0, sectionH = 0, vh = window.innerHeight;
  let lastP = -1;
  let storyT = 0;
  let payoffShown = false;

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
    const hr = sampleKey(HR_KEY, p);
    const conf = sampleKey(CONF_KEY, p);
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
    confEl.textContent = T("story.conf") + " " + conf.toFixed(2);
    interpEl.textContent = T("story.interp") + ": " + T(beat.interp);
    captionEl.textContent = T(beat.label);
    subEl.textContent = T(beat.sub);
    const locked = p >= 0.45 && p < 0.82;
    doorEl.textContent = T(locked ? "story.door.locked" : (p > 0.82 ? "story.door.unlocked" : "story.door.armed"));
    doorEl.className = "story-door " + (locked ? "on" : "off");

    section.classList.toggle("story-monitoring", p > 0.001 && p < 0.999);
    if (!payoffShown && p >= 0.999) {
      payoffShown = true;
      if (payoff) payoff.classList.add("show");
    }
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

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
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
  window.addEventListener("nw:lang", () => render(lastP));

  measure();
  render(0);
  requestAnimationFrame(tick);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTimeline);
} else {
  initTimeline();
}
