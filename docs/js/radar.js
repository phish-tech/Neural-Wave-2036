import * as THREE from "../assets/vendor/three.module.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeSweepTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, "rgba(92,255,176,0.55)");
  grad.addColorStop(0.85, "rgba(92,255,176,0.08)");
  grad.addColorStop(1, "rgba(92,255,176,0)");
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(256, 256);
  g.arc(256, 256, 256, -Math.PI / 7, Math.PI / 7);
  g.closePath();
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function makeRings() {
  const group = new THREE.Group();
  for (const r of [3, 5, 7, 9]) {
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x5cffb0, transparent: true, opacity: 0.12 });
    group.add(new THREE.Line(geo, mat));
  }
  return group;
}

function initRadar() {
  const host = document.createElement("div");
  host.id = "radar-bg";
  host.style.cssText = "position:fixed;inset:0;z-index:0;pointer-events:none;";
  document.body.prepend(host);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 6.5, 11);
  camera.lookAt(0, 0, 0);

  const world = new THREE.Group();
  scene.add(world);

  const count = Math.min(2600, Math.floor((window.innerWidth * window.innerHeight) / 900));
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 9.5;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(a) * r;
  }
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pmat = new THREE.PointsMaterial({
    color: 0x5cffb0,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const points = new THREE.Points(pgeo, pmat);
  world.add(points);

  const rings = makeRings();
  world.add(rings);

  const sweepTex = makeSweepTexture();
  const sweep = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 22),
    new THREE.MeshBasicMaterial({
      map: sweepTex,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  sweep.rotation.x = -Math.PI / 2;
  world.add(sweep);

  const clock = new THREE.Clock();
  let scrollY = window.scrollY;
  let velocity = 0;
  let pointerX = 0, pointerY = 0;
  let rotX = 0, rotY = 0;

  function onScroll() {
    const ny = window.scrollY;
    velocity = ny - scrollY;
    scrollY = ny;
  }
  function onPointer(e) {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  }
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("mousemove", onPointer, { passive: true });
  window.addEventListener("resize", onResize);

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    velocity *= Math.exp(-dt * 3);
    const spinBoost = 1 + Math.min(Math.abs(velocity) * 0.004, 1.2);
    sweep.rotation.y += dt * 0.6 * spinBoost;

    const targetRotX = 0.06 + pointerY * 0.04 + clamp(velocity * 0.00035, -0.25, 0.25);
    const targetRotY = pointerX * 0.05;
    rotX += (targetRotX - rotX) * Math.min(1, dt * 2);
    rotY += (targetRotY - rotY) * Math.min(1, dt * 2);
    world.rotation.x = rotX;
    world.rotation.y = rotY;

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  if (REDUCED_MOTION) {
    renderer.render(scene, camera);
    return;
  }
  requestAnimationFrame(frame);
}

function initReveal() {
  const sections = document.querySelectorAll("main .block, footer.block");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  for (const s of sections) io.observe(s);
}

function boot() {
  try {
    initRadar();
  } catch (err) {
    console.warn("radar background unavailable:", err);
  }
  initReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
