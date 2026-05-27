/**
 * EcoSwap — High-End 3D Interactive & Scroll Engine
 * Architectural Code Framework for script.js
 */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger safely inside the engine
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. PRELOADER INTRO TIMER PIPELINE ---
  const introScreen = document.getElementById("intro-screen");
  const introLogo = document.getElementById("introLogo");
  const introBar = document.getElementById("introBar");
  const firstTextBox = document.getElementById("box1");

  // Step-by-step luxury preloader reveal triggers
  setTimeout(() => { if (introLogo) introLogo.classList.add("reveal"); }, 300);
  setTimeout(() => { if (introBar) introBar.classList.add("stretch"); }, 600);
  
  // Dissolve preloader screen and drop hero text into view gracefully
  setTimeout(() => { 
    if (introScreen) introScreen.classList.add("vanish");
    if (firstTextBox) firstTextBox.classList.add("visible");
  }, 2300);

  // --- 2. THREE.JS LUXURY ENVIRONMENT INITIALIZATION ---
  const container = document.getElementById('canvas-viewport');
  if (!container) return; // Safety cutoff if container layout node is missing

  const scene = new THREE.Scene();

  // Dense fog setup to emulate premium depth studio atmosphere shadows
  scene.background = new THREE.Color(0x050c08);
  scene.fog = new THREE.FogExp2(0x050c08, 0.14);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // --- 3. DYNAMIC STUDIO LIGHTING CONFIGURATION ---
  const ambient = new THREE.AmbientLight(0xffffff, 0.12);
  scene.add(ambient);

  // Golden Key Directional Light (Warm highlight angle)
  const keySpot = new THREE.DirectionalLight(0xe5c263, 2.5);
  keySpot.position.set(5, 6, 5);
  keySpot.castShadow = true;
  keySpot.shadow.mapSize.width = 2048;
  keySpot.shadow.mapSize.height = 2048;
  scene.add(keySpot);

  // Deep Jungle Emerald Fill Light (Balances harsh shadows smoothly)
  const forestFill = new THREE.DirectionalLight(0x224931, 1.8);
  forestFill.position.set(-5, -2, 3);
  scene.add(forestFill);

  // White Rim Contour Light (Creates an elegant outline illumination pop effect)
  const rimRay = new THREE.DirectionalLight(0xffffff, 2.8);
  rimRay.position.set(0, 3, -6);
  scene.add(rimRay);

  // --- 4. ANATOMIC 3D MESH RECONSTRUCTION ---
  const pandaGroup = new THREE.Group();

  // Premium Matte and High-Gloss Materials configurations
  const blackFur = new THREE.MeshStandardMaterial({ color: 0x0c0d0c, roughness: 0.82, metalness: 0.1 });
  const whiteFur = new THREE.MeshStandardMaterial({ color: 0xe5e1d7, roughness: 0.72, metalness: 0.05 });
  const hyperGloss = new THREE.MeshStandardMaterial({ color: 0x020302, roughness: 0.08, metalness: 0.95 });

  // Cranium Oval Core Base Mesh
  const craniumGeo = new THREE.SphereGeometry(1.4, 64, 64);
  craniumGeo.scale(1.1, 1, 1);
  const head = new THREE.Mesh(craniumGeo, whiteFur);
  head.castShadow = true;
  pandaGroup.add(head);

  // Muzzle Snout Assembly Zone
  const muzzleGeo = new THREE.SphereGeometry(0.52, 32, 32);
  muzzleGeo.scale(1, 0.78, 1.15);
  const muzzle = new THREE.Mesh(muzzleGeo, whiteFur);
  muzzle.position.set(0, -0.32, 1.25);
  pandaGroup.add(muzzle);

  // Glossy Nose Component Node
  const noseGeo = new THREE.SphereGeometry(0.13, 16, 16);
  noseGeo.scale(1.3, 0.9, 1);
  const nose = new THREE.Mesh(noseGeo, hyperGloss);
  nose.position.set(0, -0.25, 1.72);
  pandaGroup.add(nose);

  // Left and Right Ears Structure Assemblies
  const earGeo = new THREE.SphereGeometry(0.48, 32, 32);
  earGeo.scale(1.15, 1.15, 0.55);
  
  const leftEar = new THREE.Mesh(earGeo, blackFur);
  leftEar.position.set(-1.25, 1.15, -0.15);
  leftEar.rotation.set(0.15, 0.35, 0.45);
  pandaGroup.add(leftEar);

  const rightEar = leftEar.clone();
  rightEar.position.x = 1.25;
  rightEar.rotation.set(0.15, -0.35, -0.45);
  pandaGroup.add(rightEar);

  // Tilted Black Eyepatch Insets
  const patchGeo = new THREE.SphereGeometry(0.35, 32, 32);
  patchGeo.scale(1, 1.35, 0.35);

  const leftPatch = new THREE.Mesh(patchGeo, blackFur);
  leftPatch.position.set(-0.58, 0.08, 1.22);
  leftPatch.rotation.set(0.12, 0.28, -0.28);
  pandaGroup.add(leftPatch);

  const rightPatch = leftPatch.clone();
  rightPatch.position.x = 0.58;
  rightPatch.rotation.set(0.12, -0.28, 0.28);
  pandaGroup.add(rightPatch);

  // Reflective Eye Pupils
  const pupilGeo = new THREE.SphereGeometry(0.075, 16, 16);
  const leftEye = new THREE.Mesh(pupilGeo, hyperGloss);
  leftEye.position.set(-0.52, 0.08, 1.5);
  pandaGroup.add(leftEye);

  const rightEye = leftEye.clone();
  rightEye.position.x = 0.52;
  rightEye.rotation.set(0.075, -0.28, 0.28);
  pandaGroup.add(rightEye);

  // Initial target alignment on the right side of the desktop screens
  pandaGroup.position.set(2.2, -0.4, 0); 
  scene.add(pandaGroup);

  // --- 5. SCROLLTRIGGER CINEMATIC ANCHORS ---
  
  // Transition 1: Moves smoothly from right side to left side during viewport scroll
  gsap.to(pandaGroup.position, {
    scrollTrigger: {
      trigger: "#hero-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    },
    x: -2.2, y: -0.2, z: -0.5
  });

  gsap.to(pandaGroup.rotation, {
    scrollTrigger: {
      trigger: "#hero-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    },
    y: 0.9 // Swivels look orientation automatically towards text panels
  });

  // Transition 2: Centers and scales deep behind into the product matrix section background
  gsap.to(pandaGroup.position, {
    scrollTrigger: {
      trigger: "#details-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    },
    x: 0, y: 1.8, z: -3.5
  });

  gsap.to(pandaGroup.rotation, {
    scrollTrigger: {
      trigger: "#details-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    },
    y: 6.28, // Performs a clean 360-degree rotation spin
    x: 0.2
  });

  // --- 6. TEXT OVERLAY ACCENT SCROLL REVEALS ---
  ScrollTrigger.create({
    trigger: "#details-trigger",
    start: "top 65%",
    onEnter: () => document.getElementById("box2").classList.add("visible")
  });

  ScrollTrigger.create({
    trigger: "#collection-trigger",
    start: "top 65%",
    onEnter: () => document.getElementById("box3").classList.add("visible")
  });

  // --- 7. POINTER TRACKING INTERPOLATION MATRICES (LERP) ---
  let pointerX = 0, pointerY = 0;
  window.addEventListener('mousemove', (e) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const clock = new THREE.Clock();

  // --- 8. ENGINE RUNTIME TICK RENDER LOOP ---
  function renderTick() {
    requestAnimationFrame(renderTick);
    const time = clock.getElapsedTime();
    
    // Slow organic micro-breathing scale loop simulation mechanics equations
    const breath = Math.sin(time * 1.4) * 0.012;
    pandaGroup.scale.set(1 + breath, 1 + breath, 1 + breath);

    // Blends real-time mouse coordinate tracking smoothly on top of scrolling operations
    pandaGroup.rotation.y += (pointerX * 0.25 - pandaGroup.rotation.y) * 0.04;
    pandaGroup.rotation.x += (pointerY * 0.18 - pandaGroup.rotation.x) * 0.04;
    
    renderer.render(scene, camera);
  }
  renderTick(); // Launch engine script logic cycles

  // --- 9. ADAPTIVE VIEWPORT SCALING ADJUSTMENTS ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
