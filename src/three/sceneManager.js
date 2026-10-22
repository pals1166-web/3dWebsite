import * as THREE from 'three';

// Utility to create procedural textures
function createLatteArtTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Rich crema base
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, '#5a341b');
  grad.addColorStop(0.6, '#7d4a27');
  grad.addColorStop(0.9, '#9d6338');
  grad.addColorStop(1, '#4a2812');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Micro-foam texture flecks
  ctx.fillStyle = 'rgba(255, 235, 210, 0.15)';
  for (let i = 0; i < 200; i++) {
    const rx = Math.random() * 256;
    const ry = Math.random() * 256;
    ctx.beginPath();
    ctx.arc(rx, ry, Math.random() * 2 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Steamed Milk Rosetta Foam Art
  ctx.strokeStyle = '#fbf0de';
  ctx.fillStyle = '#fbf0de';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Central stem
  ctx.beginPath();
  ctx.moveTo(128, 205);
  ctx.quadraticCurveTo(128, 110, 128, 55);
  ctx.stroke();

  // Rosetta side leaves
  const leaves = [
    { y: 175, spread: 28, r: 12 },
    { y: 150, spread: 34, r: 14 },
    { y: 125, spread: 38, r: 16 },
    { y: 100, spread: 34, r: 15 },
    { y: 80, spread: 26, r: 13 },
    { y: 65, spread: 18, r: 10 }
  ];

  leaves.forEach(leaf => {
    // Left leaf
    ctx.beginPath();
    ctx.ellipse(128 - leaf.spread, leaf.y, leaf.r, leaf.r * 0.6, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Right leaf
    ctx.beginPath();
    ctx.ellipse(128 + leaf.spread, leaf.y, leaf.r, leaf.r * 0.6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Leaf connectors to stem
    ctx.beginPath();
    ctx.moveTo(128, leaf.y + 4);
    ctx.lineTo(128 - leaf.spread + 4, leaf.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(128, leaf.y + 4);
    ctx.lineTo(128 + leaf.spread - 4, leaf.y);
    ctx.stroke();
  });

  // Top heart
  ctx.beginPath();
  ctx.arc(122, 52, 9, 0, Math.PI * 2);
  ctx.arc(134, 52, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(114, 56);
  ctx.lineTo(128, 72);
  ctx.lineTo(142, 56);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Procedural wood texture for table and balcony
function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2b1a11';
  ctx.fillRect(0, 0, 512, 512);

  // Grain lines
  for (let i = 0; i < 512; i += 3) {
    const alpha = 0.08 + Math.random() * 0.12;
    ctx.strokeStyle = Math.random() > 0.5 ? `rgba(65, 42, 28, ${alpha})` : `rgba(22, 13, 8, ${alpha})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.bezierCurveTo(170, i + Math.sin(i * 0.02) * 15, 340, i - Math.sin(i * 0.02) * 15, 512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// Procedural pizza surface texture
function createPizzaSurfaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Rich tomato sauce base
  ctx.fillStyle = '#9b2c16';
  ctx.fillRect(0, 0, 256, 256);

  // Melted mozzarella patches
  for (let i = 0; i < 24; i++) {
    const x = 50 + Math.random() * 156;
    const y = 50 + Math.random() * 156;
    const r = 16 + Math.random() * 22;
    ctx.fillStyle = 'rgba(255, 246, 220, 0.88)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Toasted golden blister center
    if (Math.random() > 0.4) {
      ctx.fillStyle = 'rgba(180, 100, 30, 0.7)';
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Oregano and herb flakes
  ctx.fillStyle = 'rgba(35, 60, 25, 0.75)';
  for (let i = 0; i < 120; i++) {
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function initThreeScene(container, { onLoaded } = {}) {
  let animationFrameId = null;
  let isDisposed = false;

  // View targets
  const views = {
    balcony: {
      position: new THREE.Vector3(0, 2.5, 4.8),
      target: new THREE.Vector3(0, 1.4, -10),
      fov: 46
    },
    tabletop: {
      position: new THREE.Vector3(0.52, 1.92, 1.42),
      target: new THREE.Vector3(0, 1.32, 0),
      fov: 40
    },
    lake: {
      position: new THREE.Vector3(-1.7, 1.4, 2.8),
      target: new THREE.Vector3(-4.0, 0.8, -16),
      fov: 48
    }
  };

  let currentViewName = 'balcony';
  let targetCamPos = views.balcony.position.clone();
  let targetCamLook = views.balcony.target.clone();
  let currentCamLook = views.balcony.target.clone();

  // Mouse parallax
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // SCENE & FOG
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080f1d);
  scene.fog = new THREE.FogExp2(0x0a1424, 0.024);

  // CAMERA
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;
  const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 800);
  camera.position.copy(targetCamPos);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  // Cap devicePixelRatio at 1.5 as specified for smooth mobile performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ==========================================
  // LIGHTING
  // ==========================================
  const ambientLight = new THREE.AmbientLight(0x273656, 0.7);
  scene.add(ambientLight);

  // Distant moonlight over the mountains
  const moonLight = new THREE.DirectionalLight(0x7ea3db, 0.9);
  moonLight.position.set(-18, 24, -15);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.width = 1024;
  moonLight.shadow.mapSize.height = 1024;
  moonLight.shadow.bias = -0.0005;
  scene.add(moonLight);

  // Warm Edison Bulb Lamp Lights
  const bulbLightTable = new THREE.PointLight(0xff9d47, 2.8, 8, 1.2);
  bulbLightTable.position.set(0, 2.45, 0.2);
  bulbLightTable.castShadow = true;
  bulbLightTable.shadow.bias = -0.001;
  scene.add(bulbLightTable);

  const bulbLightLeft = new THREE.PointLight(0xffa153, 1.4, 7, 1.4);
  bulbLightLeft.position.set(-2.4, 2.1, 0.6);
  scene.add(bulbLightLeft);

  const bulbLightRight = new THREE.PointLight(0xffa153, 1.4, 7, 1.4);
  bulbLightRight.position.set(2.4, 2.1, 0.6);
  scene.add(bulbLightRight);

  // Soft cyan water reflection fill
  const lakeFillLight = new THREE.PointLight(0x19455e, 1.8, 25, 1.5);
  lakeFillLight.position.set(0, -0.4, -8);
  scene.add(lakeFillLight);

  // ==========================================
  // TWILIGHT SKY & STARS
  // ==========================================
  // Twilight Sky Dome Gradient
  const skyGeo = new THREE.SphereGeometry(250, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
  const skyMat = new THREE.MeshBasicMaterial({
    color: 0x091428,
    side: THREE.BackSide
  });
  const skyMesh = new THREE.Mesh(skyGeo, skyMat);
  scene.add(skyMesh);

  // Twinkling Himalayan Stars
  const starsCount = 450;
  const starPositions = new Float32Array(starsCount * 3);
  const starColors = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * (Math.PI * 0.35); // upper sky
    const radius = 220 + Math.random() * 20;

    starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = radius * Math.cos(phi) + 15;
    starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    const warmTint = Math.random() > 0.7;
    starColors[i * 3] = warmTint ? 1.0 : 0.85;
    starColors[i * 3 + 1] = warmTint ? 0.9 : 0.92;
    starColors[i * 3 + 2] = warmTint ? 0.75 : 1.0;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const starMat = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // ==========================================
  // HIMALAYAN MOUNTAIN SILHOUETTES
  // ==========================================
  const mountainGroup = new THREE.Group();

  function createMountainRidge({ distance, height, peakCount, color, segments = 64 }) {
    const ridgeShape = new THREE.Shape();
    const width = 280;
    const startX = -width / 2;

    ridgeShape.moveTo(startX, -5);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = startX + t * width;

      // Compound sine & cosine peaks
      const peak1 = Math.sin(t * Math.PI * peakCount) * height;
      const peak2 = Math.cos(t * Math.PI * (peakCount * 1.8) + 1.2) * (height * 0.45);
      const peak3 = Math.sin(t * Math.PI * 0.9) * (height * 0.6);
      const y = Math.max(0, peak1 + peak2 + peak3 + 4);

      ridgeShape.lineTo(x, y);
    }

    ridgeShape.lineTo(width / 2, -5);
    ridgeShape.closePath();

    const extrudeSettings = {
      depth: 6,
      bevelEnabled: false
    };

    const geom = new THREE.ExtrudeGeometry(ridgeShape, extrudeSettings);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = distance;
    mesh.position.y = -1;
    return mesh;
  }

  // Back highest Himalayan jagged ridge
  const backRidge = createMountainRidge({
    distance: -130,
    height: 38,
    peakCount: 4.2,
    color: 0x091428
  });
  mountainGroup.add(backRidge);

  // Mid pine-covered ridge with hillside resort lights
  const midRidge = createMountainRidge({
    distance: -85,
    height: 24,
    peakCount: 5.5,
    color: 0x071120
  });
  mountainGroup.add(midRidge);

  // Foreground lake-framing ridge
  const frontRidge = createMountainRidge({
    distance: -45,
    height: 14,
    peakCount: 3.2,
    color: 0x050c18
  });
  mountainGroup.add(frontRidge);

  // Nainital Lakeside hillside village lights (twinkling amber/gold dots on the mid ridge)
  const townLightsCount = 60;
  const townLightPositions = new Float32Array(townLightsCount * 3);
  const townLightColors = new Float32Array(townLightsCount * 3);

  for (let i = 0; i < townLightsCount; i++) {
    townLightPositions[i * 3] = (Math.random() - 0.5) * 90;
    townLightPositions[i * 3 + 1] = 2.5 + Math.random() * 11;
    townLightPositions[i * 3 + 2] = -82 + (Math.random() - 0.5) * 10;

    // Amber Edison cottage lights and occasional turquoise window
    const isAmber = Math.random() > 0.15;
    townLightColors[i * 3] = isAmber ? 1.0 : 0.4;
    townLightColors[i * 3 + 1] = isAmber ? 0.72 : 0.8;
    townLightColors[i * 3 + 2] = isAmber ? 0.35 : 0.9;
  }

  const townLightGeo = new THREE.BufferGeometry();
  townLightGeo.setAttribute('position', new THREE.BufferAttribute(townLightPositions, 3));
  townLightGeo.setAttribute('color', new THREE.BufferAttribute(townLightColors, 3));
  const townLightMat = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: false
  });
  const townLights = new THREE.Points(townLightGeo, townLightMat);
  mountainGroup.add(townLights);

  scene.add(mountainGroup);

  // ==========================================
  // LAKE NAINI WATER PLANE WITH WAVES
  // ==========================================
  const waterGeo = new THREE.PlaneGeometry(160, 160, 48, 48);
  waterGeo.rotateX(-Math.PI / 2);

  // Store original positions for animated sinusoidal wave displacement
  const waterPosAttr = waterGeo.attributes.position;
  const waterOrigY = new Float32Array(waterPosAttr.count);
  for (let i = 0; i < waterPosAttr.count; i++) {
    waterOrigY[i] = waterPosAttr.getY(i);
  }

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0a1a2f,
    roughness: 0.16,
    metalness: 0.88,
    flatShading: false
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(0, -0.65, -30);
  waterMesh.receiveShadow = true;
  scene.add(waterMesh);

  // ==========================================
  // DRIFTING LOW-POLY CLOUDS & MIST PARTICLES
  // ==========================================
  const cloudGroup = new THREE.Group();
  const cloudCount = 22;
  const cloudPuffs = [];

  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0x768fae,
    roughness: 0.95,
    metalness: 0.0,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });

  // Layer 1: High Mountain Ridge Clouds
  for (let c = 0; c < cloudCount; c++) {
    const singleCloud = new THREE.Group();
    const puffCount = 4 + Math.floor(Math.random() * 5);

    for (let p = 0; p < puffCount; p++) {
      const radius = 1.8 + Math.random() * 2.5;
      const puffGeo = new THREE.DodecahedronGeometry(radius, 1);
      const puffMesh = new THREE.Mesh(puffGeo, cloudMaterial);
      puffMesh.position.set(
        (Math.random() - 0.5) * 5.2,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 3.5
      );
      puffMesh.scale.set(1.5, 0.65, 1.1);
      singleCloud.add(puffMesh);
    }

    singleCloud.position.set(
      (Math.random() - 0.5) * 75,
      2.0 + Math.random() * 8.0,
      -14 - Math.random() * 45
    );

    const speed = 0.35 + Math.random() * 0.4;
    cloudPuffs.push({ mesh: singleCloud, speed, baseY: singleCloud.position.y, seed: Math.random() * 10 });
    cloudGroup.add(singleCloud);
  }

  // Layer 2: Low-Lying Lake Water Mist Banks (Drifting softly over the lake surface)
  const lowMistBanks = [];
  const lowMistMaterial = new THREE.MeshStandardMaterial({
    color: 0x8ea8c7,
    roughness: 0.98,
    metalness: 0.0,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  for (let m = 0; m < 9; m++) {
    const mistBank = new THREE.Group();
    const clusterCount = 3 + Math.floor(Math.random() * 3);

    for (let cp = 0; cp < clusterCount; cp++) {
      const mGeo = new THREE.DodecahedronGeometry(2.4 + Math.random() * 2.2, 1);
      const mMesh = new THREE.Mesh(mGeo, lowMistMaterial);
      mMesh.position.set(
        (Math.random() - 0.5) * 6.0,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 4.0
      );
      mMesh.scale.set(2.2, 0.32, 1.2);
      mistBank.add(mMesh);
    }

    mistBank.position.set(
      (Math.random() - 0.5) * 65,
      -0.25 + Math.random() * 0.8,
      -8 - Math.random() * 24
    );

    const speed = 0.25 + Math.random() * 0.35;
    lowMistBanks.push({
      mesh: mistBank,
      speed,
      baseY: mistBank.position.y,
      baseScaleX: 1,
      seed: Math.random() * 20
    });
    cloudGroup.add(mistBank);
  }

  scene.add(cloudGroup);

  // ==========================================
  // PROCEDURAL NAINITAL WOODEN ROWING BOATS
  // ==========================================
  const boatGroup = new THREE.Group();
  const lakeBoats = [];

  function createNainitalBoat({
    hullColor = 0x3d2415,
    trimColor = 0xe6a15c,
    benchColor = 0x54361e,
    lanternColor = 0xffa044,
    hasPointLight = false,
    scale = 1
  }) {
    const boat = new THREE.Group();

    // 1. Boat Outer Hull Shape (tapered pointed bow and stern)
    const hullShape = new THREE.Shape();
    hullShape.moveTo(0, 1.6);
    hullShape.bezierCurveTo(0.5, 0.9, 0.5, -0.8, 0.3, -1.6);
    hullShape.lineTo(-0.3, -1.6);
    hullShape.bezierCurveTo(-0.5, -0.8, -0.5, 0.9, 0, 1.6);

    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06
    };

    const hullGeo = new THREE.ExtrudeGeometry(hullShape, extrudeSettings);
    hullGeo.rotateX(Math.PI / 2);

    const hullMat = new THREE.MeshStandardMaterial({
      color: hullColor,
      roughness: 0.6,
      metalness: 0.08
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    hullMesh.castShadow = true;
    boat.add(hullMesh);

    // 2. Interior dark floorboard
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, 1.45);
    innerShape.bezierCurveTo(0.38, 0.8, 0.38, -0.7, 0.22, -1.45);
    innerShape.lineTo(-0.22, -1.45);
    innerShape.bezierCurveTo(-0.38, -0.7, -0.38, 0.8, 0, 1.45);

    const floorGeo = new THREE.ShapeGeometry(innerShape);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x22140a,
      roughness: 0.85
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = 0.06;
    boat.add(floorMesh);

    // 3. Decorative painted gunwale rim (Nainital boat signature accent trim)
    const trimMat = new THREE.MeshStandardMaterial({
      color: trimColor,
      roughness: 0.35,
      metalness: 0.25
    });
    const rimPoints = hullShape.getPoints(24).map(p => new THREE.Vector3(p.x, 0.22, -p.y));
    const rimCurve = new THREE.CatmullRomCurve3(rimPoints, true);
    const rimGeo = new THREE.TubeGeometry(rimCurve, 24, 0.028, 6, true);
    const rimMesh = new THREE.Mesh(rimGeo, trimMat);
    boat.add(rimMesh);

    // 4. Wooden Thwarts / Cross Benches
    const benchGeo = new THREE.BoxGeometry(0.72, 0.035, 0.18);
    const benchMat = new THREE.MeshStandardMaterial({ color: benchColor, roughness: 0.65 });

    const bench1 = new THREE.Mesh(benchGeo, benchMat);
    bench1.position.set(0, 0.14, 0.25);
    boat.add(bench1);

    const bench2 = new THREE.Mesh(benchGeo, benchMat);
    bench2.position.set(0, 0.14, -0.5);
    bench2.scale.set(0.85, 1, 1);
    boat.add(bench2);

    // 5. Wooden Oars angled over the water
    const oarMat = new THREE.MeshStandardMaterial({ color: 0xb5783d, roughness: 0.5 });
    const oarShaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.6, 6);

    // Left oar
    const oarLeft = new THREE.Mesh(oarShaftGeo, oarMat);
    oarLeft.rotation.set(0.25, 0.15, 1.25);
    oarLeft.position.set(-0.68, 0.12, 0.1);
    boat.add(oarLeft);

    const bladeGeo = new THREE.BoxGeometry(0.012, 0.32, 0.08);
    const bladeLeft = new THREE.Mesh(bladeGeo, oarMat);
    bladeLeft.position.set(-1.3, -0.12, 0.18);
    bladeLeft.rotation.set(0.25, 0.15, 1.25);
    boat.add(bladeLeft);

    // Right oar
    const oarRight = new THREE.Mesh(oarShaftGeo, oarMat);
    oarRight.rotation.set(0.25, -0.15, -1.25);
    oarRight.position.set(0.68, 0.12, 0.1);
    boat.add(oarRight);

    const bladeRight = new THREE.Mesh(bladeGeo, oarMat);
    bladeRight.position.set(1.3, -0.12, 0.18);
    bladeRight.rotation.set(0.25, -0.15, -1.25);
    boat.add(bladeRight);

    // 6. Bow Lantern Post & Glowing Edison Lantern
    const postGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 6);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x181c22, roughness: 0.4, metalness: 0.8 });
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.set(0, 0.35, 1.42);
    boat.add(post);

    const lanternBoxGeo = new THREE.DodecahedronGeometry(0.075, 1);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffeedd,
      emissive: lanternColor,
      emissiveIntensity: 3.8,
      roughness: 0.2
    });
    const lanternMesh = new THREE.Mesh(lanternBoxGeo, lanternMat);
    lanternMesh.position.set(0, 0.58, 1.42);
    boat.add(lanternMesh);

    if (hasPointLight) {
      const pLight = new THREE.PointLight(lanternColor, 1.5, 9, 1.6);
      pLight.position.set(0, 0.65, 1.42);
      boat.add(pLight);
    }

    boat.scale.set(scale, scale, scale);
    return boat;
  }

  // Boat 1: Near Lake Promenade (Prominent in Balcony and Lake Mist Views)
  const boat1 = createNainitalBoat({
    hullColor: 0x452917,
    trimColor: 0xe6a15c,
    lanternColor: 0xffa044,
    hasPointLight: true,
    scale: 1.15
  });
  boat1.position.set(-4.8, -0.55, -10.5);
  boat1.rotation.y = 0.55;
  boatGroup.add(boat1);
  lakeBoats.push({
    group: boat1,
    baseY: -0.55,
    phase: 0.2,
    driftSpeed: 0.18,
    minX: -14,
    maxX: 12
  });

  // Boat 2: Mid-Lake with Teal Accent Trim (Gliding slowly)
  const boat2 = createNainitalBoat({
    hullColor: 0x301c12,
    trimColor: 0x229988,
    lanternColor: 0xffb85c,
    hasPointLight: true,
    scale: 0.95
  });
  boat2.position.set(7.5, -0.58, -17.5);
  boat2.rotation.y = -0.65;
  boatGroup.add(boat2);
  lakeBoats.push({
    group: boat2,
    baseY: -0.58,
    phase: 2.1,
    driftSpeed: -0.22,
    minX: -16,
    maxX: 15
  });

  // Boat 3: Far Shoreline Silhouette (Anchored near twinkling mountain lights)
  const boat3 = createNainitalBoat({
    hullColor: 0x24150d,
    trimColor: 0xd47738,
    lanternColor: 0xff9433,
    hasPointLight: false,
    scale: 0.75
  });
  boat3.position.set(-11.5, -0.60, -27.0);
  boat3.rotation.y = 1.1;
  boatGroup.add(boat3);
  lakeBoats.push({
    group: boat3,
    baseY: -0.60,
    phase: 4.3,
    driftSpeed: 0.1,
    minX: -18,
    maxX: 8
  });

  scene.add(boatGroup);

  // ==========================================
  // THE CAFE BALCONY & DECK
  // ==========================================
  const balconyGroup = new THREE.Group();

  // Wooden deck planks
  const woodTexture = createWoodTexture();
  const plankMat1 = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0x483222,
    roughness: 0.65,
    metalness: 0.05
  });
  const plankMat2 = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0x3d2919,
    roughness: 0.7,
    metalness: 0.05
  });

  const plankWidth = 0.38;
  const plankGap = 0.02;
  const deckLength = 12;
  const numPlanks = 16;

  for (let i = 0; i < numPlanks; i++) {
    const plankGeo = new THREE.BoxGeometry(deckLength, 0.12, plankWidth);
    const mat = i % 2 === 0 ? plankMat1 : plankMat2;
    const plank = new THREE.Mesh(plankGeo, mat);
    plank.position.set(0, 0, (i - numPlanks / 2) * (plankWidth + plankGap) + 2.5);
    plank.receiveShadow = true;
    balconyGroup.add(plank);
  }

  // Balcony Front Railing
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x181c22,
    roughness: 0.35,
    metalness: 0.85
  });
  const handrailMat = new THREE.MeshStandardMaterial({
    color: 0x51351e,
    roughness: 0.45,
    metalness: 0.1
  });

  // Top wooden banister handrail
  const topRailGeo = new THREE.BoxGeometry(11.5, 0.08, 0.22);
  const topRail = new THREE.Mesh(topRailGeo, handrailMat);
  topRail.position.set(0, 1.25, -0.9);
  topRail.castShadow = true;
  balconyGroup.add(topRail);

  // Bottom iron runner
  const bottomRailGeo = new THREE.BoxGeometry(11.5, 0.05, 0.08);
  const bottomRail = new THREE.Mesh(bottomRailGeo, ironMat);
  bottomRail.position.set(0, 0.15, -0.9);
  balconyGroup.add(bottomRail);

  // Vertical Balusters
  const numBalusters = 28;
  const balusterGeo = new THREE.CylinderGeometry(0.022, 0.022, 1.05, 8);
  for (let b = 0; b <= numBalusters; b++) {
    const baluster = new THREE.Mesh(balusterGeo, ironMat);
    const x = -5.4 + (b / numBalusters) * 10.8;
    baluster.position.set(x, 0.7, -0.9);
    baluster.castShadow = true;
    balconyGroup.add(baluster);
  }

  // Sturdy Balcony Posts
  const postGeo = new THREE.BoxGeometry(0.12, 1.28, 0.12);
  [-5.4, -2.7, 0, 2.7, 5.4].forEach(px => {
    const post = new THREE.Mesh(postGeo, ironMat);
    post.position.set(px, 0.68, -0.9);
    post.castShadow = true;
    balconyGroup.add(post);

    // Decorative brass cap on posts
    const capGeo = new THREE.ConeGeometry(0.08, 0.1, 4);
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd69e4e, roughness: 0.3, metalness: 0.9 });
    const cap = new THREE.Mesh(capGeo, brassMat);
    cap.position.set(px, 1.35, -0.9);
    cap.rotation.y = Math.PI / 4;
    balconyGroup.add(cap);
  });

  // Balcony Planter Boxes with greenery
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x241810, roughness: 0.7 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f3b23, roughness: 0.85 });

  [-3.8, 3.8].forEach(px => {
    const boxGeo = new THREE.BoxGeometry(2.2, 0.3, 0.32);
    const box = new THREE.Mesh(boxGeo, planterMat);
    box.position.set(px, 1.0, -0.9);
    balconyGroup.add(box);

    // Lush mountain foliage clusters
    for (let f = 0; f < 8; f++) {
      const bushGeo = new THREE.DodecahedronGeometry(0.2 + Math.random() * 0.1, 1);
      const bush = new THREE.Mesh(bushGeo, foliageMat);
      bush.position.set(px - 0.8 + f * 0.24, 1.22 + Math.random() * 0.08, -0.9);
      balconyGroup.add(bush);
    }
  });

  // Hanging Edison String Lights & Catenary Wire
  const wirePoints = [];
  for (let w = 0; w <= 30; w++) {
    const t = w / 30;
    const x = -5.4 + t * 10.8;
    const sag = Math.sin(t * Math.PI) * 0.45;
    wirePoints.push(new THREE.Vector3(x, 2.5 - sag, -0.7));
  }
  const wireCurve = new THREE.CatmullRomCurve3(wirePoints);
  const wireGeo = new THREE.TubeGeometry(wireCurve, 30, 0.012, 6, false);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  balconyGroup.add(wireMesh);

  // Hanging Edison Bulb Meshes
  const bulbPositions = [
    new THREE.Vector3(-3.5, 2.25, -0.7),
    new THREE.Vector3(-1.4, 2.12, -0.7),
    new THREE.Vector3(0, 2.35, 0.1), // Central warm table lamp
    new THREE.Vector3(1.4, 2.12, -0.7),
    new THREE.Vector3(3.5, 2.25, -0.7)
  ];

  const glassBulbMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    transmission: 0.85,
    ior: 1.45
  });

  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xffe6a3,
    emissive: 0xff9933,
    emissiveIntensity: 4.5,
    roughness: 0.2
  });

  bulbPositions.forEach(bPos => {
    // Drop wire
    const dropGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.4, 6);
    const drop = new THREE.Mesh(dropGeo, wireMat);
    drop.position.set(bPos.x, bPos.y + 0.2, bPos.z);
    balconyGroup.add(drop);

    // Socket
    const sockGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.08, 12);
    const sockMat = new THREE.MeshStandardMaterial({ color: 0xb5782c, roughness: 0.4, metalness: 0.8 });
    const sock = new THREE.Mesh(sockGeo, sockMat);
    sock.position.set(bPos.x, bPos.y, bPos.z);
    balconyGroup.add(sock);

    // Outer teardrop glass bulb
    const bulbGeo = new THREE.SphereGeometry(0.09, 16, 16);
    bulbGeo.scale(1, 1.35, 1);
    const bulbMesh = new THREE.Mesh(bulbGeo, glassBulbMat);
    bulbMesh.position.set(bPos.x, bPos.y - 0.1, bPos.z);
    balconyGroup.add(bulbMesh);

    // Inner glowing filament
    const filGeo = new THREE.TorusGeometry(0.03, 0.007, 8, 16);
    const filMesh = new THREE.Mesh(filGeo, filamentMat);
    filMesh.rotation.x = Math.PI / 2;
    filMesh.position.set(bPos.x, bPos.y - 0.1, bPos.z);
    balconyGroup.add(filMesh);
  });

  scene.add(balconyGroup);

  // ==========================================
  // FOREGROUND CAFE TABLE
  // ==========================================
  const tableGroup = new THREE.Group();

  // Round cedar wood tabletop
  const tableTopMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0x3d2716,
    roughness: 0.45,
    metalness: 0.08
  });
  const tableTopGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.07, 36);
  const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
  tableTop.position.set(0, 1.15, 0);
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  tableGroup.add(tableTop);

  // Table rim beveled band
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x9e6c38,
    roughness: 0.35,
    metalness: 0.65
  });
  const rimGeo = new THREE.TorusGeometry(0.95, 0.02, 12, 36);
  rimGeo.rotateX(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.set(0, 1.15, 0);
  tableGroup.add(rim);

  // Cast iron pedestal pillar and ornamental turned rings
  const pillarGeo = new THREE.CylinderGeometry(0.07, 0.08, 1.08, 16);
  const pillar = new THREE.Mesh(pillarGeo, ironMat);
  pillar.position.set(0, 0.58, 0);
  pillar.castShadow = true;
  tableGroup.add(pillar);

  // Cast iron tripod base feet
  const baseMat = ironMat;
  const baseCenterGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.08, 16);
  const baseCenter = new THREE.Mesh(baseCenterGeo, baseMat);
  baseCenter.position.set(0, 0.06, 0);
  tableGroup.add(baseCenter);

  for (let f = 0; f < 3; f++) {
    const angle = (f * Math.PI * 2) / 3;
    const footGeo = new THREE.BoxGeometry(0.12, 0.06, 0.52);
    const foot = new THREE.Mesh(footGeo, baseMat);
    foot.position.set(Math.cos(angle) * 0.28, 0.05, Math.sin(angle) * 0.28);
    foot.rotation.y = -angle;
    tableGroup.add(foot);
  }

  // Small Glass Table Lantern / Candle
  const candleGlassGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.16, 16, 1, true);
  const candleGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffeedd,
    transparent: true,
    opacity: 0.5,
    roughness: 0.15,
    transmission: 0.7
  });
  const candleGlass = new THREE.Mesh(candleGlassGeo, candleGlassMat);
  candleGlass.position.set(-0.48, 1.26, -0.28);
  tableGroup.add(candleGlass);

  // Flickering Candle Flame Mesh
  const flameGeo = new THREE.ConeGeometry(0.022, 0.06, 12);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });
  const flameMesh = new THREE.Mesh(flameGeo, flameMat);
  flameMesh.position.set(-0.48, 1.27, -0.28);
  tableGroup.add(flameMesh);

  // Warm candle light
  const candleLight = new THREE.PointLight(0xff9922, 0.9, 2.5, 1.5);
  candleLight.position.set(-0.48, 1.3, -0.28);
  tableGroup.add(candleLight);

  scene.add(tableGroup);

  // ==========================================
  // PROCEDURAL HERO FOOD & DRINK ITEMS
  // ==========================================
  const itemsContainer = new THREE.Group();
  itemsContainer.position.set(0, 1.185, 0); // Directly resting on tabletop

  // ------------------------------------------
  // ITEM 1: HAZELNUT LATTE
  // ------------------------------------------
  const latteItem = new THREE.Group();
  latteItem.name = 'Hazelnut Latte';

  // Artisan Ceramic Mug
  const mugPoints = [
    new THREE.Vector2(0.14, 0),
    new THREE.Vector2(0.18, 0.02),
    new THREE.Vector2(0.20, 0.12),
    new THREE.Vector2(0.22, 0.24),
    new THREE.Vector2(0.21, 0.26),
    new THREE.Vector2(0.18, 0.25)
  ];
  const mugGeo = new THREE.LatheGeometry(mugPoints, 32);
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xded5c8,
    roughness: 0.35,
    metalness: 0.12
  });
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.castShadow = true;
  mug.receiveShadow = true;
  latteItem.add(mug);

  // Mug Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.024, 12, 24, Math.PI * 1.1);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.rotation.z = -Math.PI / 2;
  handle.position.set(0.22, 0.13, 0);
  latteItem.add(handle);

  // Saucer
  const saucerPoints = [
    new THREE.Vector2(0.12, 0),
    new THREE.Vector2(0.22, 0.015),
    new THREE.Vector2(0.32, 0.045),
    new THREE.Vector2(0.34, 0.05),
    new THREE.Vector2(0.32, 0.04)
  ];
  const saucerGeo = new THREE.LatheGeometry(saucerPoints, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.castShadow = true;
  saucer.receiveShadow = true;
  latteItem.add(saucer);

  // Coffee foam surface with rosetta art
  const latteArtTex = createLatteArtTexture();
  const foamGeo = new THREE.CircleGeometry(0.19, 32);
  foamGeo.rotateX(-Math.PI / 2);
  const foamMat = new THREE.MeshStandardMaterial({
    map: latteArtTex,
    roughness: 0.6,
    metalness: 0.05
  });
  const foamMesh = new THREE.Mesh(foamGeo, foamMat);
  foamMesh.position.y = 0.24;
  latteItem.add(foamMesh);

  // Whole roasted hazelnuts & cinnamon stick props
  const nutMat = new THREE.MeshStandardMaterial({ color: 0x824922, roughness: 0.6 });
  const nut1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.032, 1), nutMat);
  nut1.position.set(0.24, 0.04, 0.12);
  nut1.castShadow = true;
  latteItem.add(nut1);

  const nut2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.028, 1), nutMat);
  nut2.position.set(0.27, 0.035, 0.08);
  latteItem.add(nut2);

  const cinnamonMat = new THREE.MeshStandardMaterial({ color: 0x4f2613, roughness: 0.8 });
  const cinnamon = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.26, 12), cinnamonMat);
  cinnamon.rotation.set(0.2, 0.5, 1.4);
  cinnamon.position.set(0.22, 0.04, -0.12);
  latteItem.add(cinnamon);

  // Steaming particles (procedural animated smoke/steam)
  const steamCount = 36;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  const steamSpeeds = new Float32Array(steamCount);

  for (let s = 0; s < steamCount; s++) {
    steamPos[s * 3] = (Math.random() - 0.5) * 0.12;
    steamPos[s * 3 + 1] = 0.25 + Math.random() * 0.45;
    steamPos[s * 3 + 2] = (Math.random() - 0.5) * 0.12;
    steamSpeeds[s] = 0.18 + Math.random() * 0.22;
  }

  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0xfaf4ec,
    size: 0.065,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const steamParticles = new THREE.Points(steamGeo, steamMat);
  latteItem.add(steamParticles);

  itemsContainer.add(latteItem);

  // ------------------------------------------
  // ITEM 2: FUDGE BROWNIE SHAKE
  // ------------------------------------------
  const shakeItem = new THREE.Group();
  shakeItem.name = 'Fudge Brownie Shake';

  // Tall cafe glass tumbler
  const glassGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.54, 16, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.32,
    roughness: 0.08,
    transmission: 0.88,
    ior: 1.5
  });
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.position.y = 0.27;
  glassMesh.castShadow = true;
  shakeItem.add(glassMesh);

  // Glass Base Foot
  const footGlassGeo = new THREE.CylinderGeometry(0.15, 0.17, 0.04, 16);
  const footGlass = new THREE.Mesh(footGlassGeo, glassMat);
  footGlass.position.y = 0.02;
  shakeItem.add(footGlass);

  // Rich chocolate shake liquid interior
  const shakeFillGeo = new THREE.CylinderGeometry(0.17, 0.11, 0.49, 16);
  const chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x3d2114,
    roughness: 0.35,
    metalness: 0.05
  });
  const shakeFill = new THREE.Mesh(shakeFillGeo, chocolateMat);
  shakeFill.position.y = 0.26;
  shakeItem.add(shakeFill);

  // Swirled Whipped Cream Topping (spiral toruses)
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfdf7ee,
    roughness: 0.55
  });
  const swirl1 = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.048, 12, 24), creamMat);
  swirl1.rotation.x = Math.PI / 2;
  swirl1.position.y = 0.53;
  shakeItem.add(swirl1);

  const swirl2 = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.042, 12, 24), creamMat);
  swirl2.rotation.x = Math.PI / 2;
  swirl2.position.y = 0.59;
  shakeItem.add(swirl2);

  const creamTip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 12), creamMat);
  creamTip.position.y = 0.65;
  shakeItem.add(creamTip);

  // Chocolate drizzle cascade drops
  const dripMat = new THREE.MeshStandardMaterial({ color: 0x1f0e07, roughness: 0.2 });
  for (let d = 0; d < 6; d++) {
    const angle = (d * Math.PI * 2) / 6;
    const drip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), dripMat);
    drip.scale.set(0.6, 1.8, 0.6);
    drip.position.set(Math.cos(angle) * 0.172, 0.42 - (d % 3) * 0.06, Math.sin(angle) * 0.172);
    shakeItem.add(drip);
  }

  // Artisan Paper Straw (Amber Striped)
  const strawGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.72, 12);
  const strawMat = new THREE.MeshStandardMaterial({ color: 0xe6a15c, roughness: 0.5 });
  const straw = new THREE.Mesh(strawGeo, strawMat);
  straw.rotation.set(0.25, 0, -0.32);
  straw.position.set(-0.06, 0.56, 0.04);
  shakeItem.add(straw);

  // Brownie Chunk on Rim
  const brownieMat = new THREE.MeshStandardMaterial({ color: 0x241108, roughness: 0.85 });
  const brownie = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.11), brownieMat);
  brownie.rotation.set(0.1, 0.4, 0.3);
  brownie.position.set(0.14, 0.56, 0.05);
  brownie.castShadow = true;
  shakeItem.add(brownie);

  itemsContainer.add(shakeItem);

  // ------------------------------------------
  // ITEM 3: WOOD-FIRED PIZZA
  // ------------------------------------------
  const pizzaItem = new THREE.Group();
  pizzaItem.name = 'Wood-Fired Pizza';

  // Wooden Pizza Peel / Board
  const boardGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.03, 32);
  const boardMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0x54361e,
    roughness: 0.65
  });
  const board = new THREE.Mesh(boardGeo, boardMat);
  board.castShadow = true;
  board.receiveShadow = true;
  pizzaItem.add(board);

  // Peel Handle
  const handleBoardGeo = new THREE.BoxGeometry(0.1, 0.028, 0.35);
  const handleBoard = new THREE.Mesh(handleBoardGeo, boardMat);
  handleBoard.position.set(0, 0, 0.58);
  pizzaItem.add(handleBoard);

  // Artisanal Neapolitan Bubbly Crust (Torus with irregular displaced vertices)
  const crustGeo = new THREE.TorusGeometry(0.38, 0.055, 12, 36);
  crustGeo.rotateX(Math.PI / 2);
  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xd99557,
    roughness: 0.75,
    metalness: 0.02
  });
  const crust = new THREE.Mesh(crustGeo, crustMat);
  crust.position.y = 0.035;
  crust.castShadow = true;
  pizzaItem.add(crust);

  // Pizza Sauce & Melted Mozzarella surface
  const pizzaTex = createPizzaSurfaceTexture();
  const pizzaTopGeo = new THREE.CircleGeometry(0.38, 32);
  pizzaTopGeo.rotateX(-Math.PI / 2);
  const pizzaTopMat = new THREE.MeshStandardMaterial({
    map: pizzaTex,
    roughness: 0.4,
    metalness: 0.05
  });
  const pizzaTop = new THREE.Mesh(pizzaTopGeo, pizzaTopMat);
  pizzaTop.position.y = 0.042;
  pizzaItem.add(pizzaTop);

  // Fresh Green Basil Leaves
  const basilMat = new THREE.MeshStandardMaterial({ color: 0x2e6b2c, roughness: 0.55 });
  for (let b = 0; b < 5; b++) {
    const angle = (b * Math.PI * 2) / 5 + 0.3;
    const r = 0.18 + Math.random() * 0.08;
    const leafGeo = new THREE.SphereGeometry(0.045, 8, 8);
    leafGeo.scale(1.4, 0.15, 0.7);
    const leaf = new THREE.Mesh(leafGeo, basilMat);
    leaf.rotation.set(0.1, angle, 0.2);
    leaf.position.set(Math.cos(angle) * r, 0.058, Math.sin(angle) * r);
    pizzaItem.add(leaf);
  }

  // Black Kalamata Olive Rings
  const oliveMat = new THREE.MeshStandardMaterial({ color: 0x181410, roughness: 0.4 });
  for (let o = 0; o < 7; o++) {
    const angle = (o * Math.PI * 2) / 7 + 0.7;
    const r = 0.14 + (o % 2) * 0.12;
    const oliveGeo = new THREE.TorusGeometry(0.028, 0.012, 8, 16);
    oliveGeo.rotateX(Math.PI / 2);
    const olive = new THREE.Mesh(oliveGeo, oliveMat);
    olive.position.set(Math.cos(angle) * r, 0.055, Math.sin(angle) * r);
    pizzaItem.add(olive);
  }

  // Sliced Cherry Tomatoes
  const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xc92b1a, roughness: 0.3 });
  for (let tm = 0; tm < 4; tm++) {
    const angle = tm * (Math.PI / 2) + 0.4;
    const r = 0.22;
    const sliceGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.018, 12);
    const slice = new THREE.Mesh(sliceGeo, tomatoMat);
    slice.position.set(Math.cos(angle) * r, 0.056, Math.sin(angle) * r);
    pizzaItem.add(slice);
  }

  itemsContainer.add(pizzaItem);
  scene.add(itemsContainer);

  // Active item tracking
  const heroItems = {
    'hazelnut-latte': latteItem,
    'fudge-shake': shakeItem,
    'wood-fired-pizza': pizzaItem
  };

  let activeItemKey = 'hazelnut-latte';

  // Initial visibility & scales
  Object.keys(heroItems).forEach(key => {
    const item = heroItems[key];
    if (key === activeItemKey) {
      item.visible = true;
      item.scale.set(1, 1, 1);
    } else {
      item.visible = false;
      item.scale.set(0.01, 0.01, 0.01);
    }
  });

  // ==========================================
  // EVENT LISTENERS & RESIZE
  // ==========================================
  function onPointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    mouse.targetX = Math.max(-1, Math.min(1, x));
    mouse.targetY = Math.max(-1, Math.min(1, y));
  }

  function onResize() {
    if (isDisposed || !container) return;
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }

  window.addEventListener('resize', onResize);
  container.addEventListener('pointermove', onPointerMove, { passive: true });
  container.addEventListener('touchmove', onPointerMove, { passive: true });

  // ==========================================
  // ANIMATION & RENDER LOOP
  // ==========================================
  const clock = new THREE.Clock();

  function animate() {
    if (isDisposed) return;
    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Smooth mouse parallax interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // 2. Camera position & lookAt lerping
    const parallaxOffsetX = mouse.x * 0.22;
    const parallaxOffsetY = mouse.y * 0.12;

    const dynamicCamPos = targetCamPos.clone();
    dynamicCamPos.x += parallaxOffsetX;
    dynamicCamPos.y += parallaxOffsetY;

    // Subtle breathing float for atmospheric realism
    dynamicCamPos.y += Math.sin(elapsedTime * 0.6) * 0.025;

    camera.position.lerp(dynamicCamPos, 0.045);
    currentCamLook.lerp(targetCamLook, 0.045);
    camera.lookAt(currentCamLook);

    // 3. Lake water gentle wave motion
    const waterPos = waterGeo.attributes.position;
    for (let i = 0; i < waterPos.count; i++) {
      const u = waterPos.getX(i);
      const v = waterPos.getZ(i);
      const wave1 = Math.sin(u * 0.14 + elapsedTime * 1.4) * 0.08;
      const wave2 = Math.cos(v * 0.12 + elapsedTime * 1.1) * 0.06;
      waterPos.setY(i, waterOrigY[i] + wave1 + wave2);
    }
    waterPos.needsUpdate = true;

    // 4. Drifting mountain clouds and low lake mist banks
    cloudPuffs.forEach(cloud => {
      cloud.mesh.position.x += cloud.speed * 0.035;
      cloud.mesh.position.y = cloud.baseY + Math.sin(elapsedTime * 0.45 + cloud.seed) * 0.18;
      if (cloud.mesh.position.x > 42) {
        cloud.mesh.position.x = -42;
      }
    });

    lowMistBanks.forEach(mist => {
      mist.mesh.position.x += mist.speed * 0.024;
      mist.mesh.scale.x = mist.baseScaleX + Math.sin(elapsedTime * 0.35 + mist.seed) * 0.12;
      if (mist.mesh.position.x > 40) {
        mist.mesh.position.x = -40;
      }
    });

    // 5. Lake Naini wooden boats rocking and gliding on waves
    lakeBoats.forEach(b => {
      // Bobbing up and down with wave crests
      b.group.position.y = b.baseY + Math.sin(elapsedTime * 1.5 + b.phase) * 0.035;
      // Gentle side roll and pitch
      b.group.rotation.z = Math.sin(elapsedTime * 1.2 + b.phase) * 0.038;
      b.group.rotation.x = Math.cos(elapsedTime * 0.9 + b.phase) * 0.022;
      // Slow lateral water drift
      b.group.position.x += b.driftSpeed * 0.012;
      if (b.driftSpeed > 0 && b.group.position.x > b.maxX) {
        b.group.position.x = b.minX;
      } else if (b.driftSpeed < 0 && b.group.position.x < b.minX) {
        b.group.position.x = b.maxX;
      }
    });

    // 5. Candle flame subtle flicker
    const flicker = Math.sin(elapsedTime * 9) * 0.12 + Math.cos(elapsedTime * 14) * 0.08;
    candleLight.intensity = 0.85 + flicker;
    flameMesh.scale.y = 1 + flicker * 0.5;

    // 6. Steaming coffee particles animation
    if (latteItem.visible) {
      const positions = steamGeo.attributes.position;
      for (let s = 0; s < steamCount; s++) {
        let y = positions.getY(s);
        y += steamSpeeds[s] * 0.012;
        if (y > 0.7) {
          y = 0.25;
          positions.setX(s, (Math.random() - 0.5) * 0.1);
          positions.setZ(s, (Math.random() - 0.5) * 0.1);
        } else {
          // Gentle curling drift
          const x = positions.getX(s) + Math.sin(elapsedTime * 3 + s) * 0.001;
          positions.setX(s, x);
        }
        positions.setY(s, y);
      }
      positions.needsUpdate = true;
    }

    // 7. Active item gentle rotation / presence
    const activeItem = heroItems[activeItemKey];
    if (activeItem) {
      // Gentle breathing idle rotation
      activeItem.rotation.y = Math.sin(elapsedTime * 0.4) * 0.08;

      // Scale transition lerp
      activeItem.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
    }

    // Shrink inactive items
    Object.keys(heroItems).forEach(key => {
      if (key !== activeItemKey) {
        const inactive = heroItems[key];
        if (inactive.scale.x > 0.02) {
          inactive.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.12);
        } else {
          inactive.visible = false;
        }
      }
    });

    renderer.render(scene, camera);
  }

  // Start loop
  animate();

  if (onLoaded) {
    onLoaded();
  }

  // ==========================================
  // PUBLIC CONTROLLER API
  // ==========================================
  return {
    setView(viewKey) {
      if (views[viewKey]) {
        currentViewName = viewKey;
        targetCamPos = views[viewKey].position.clone();
        targetCamLook = views[viewKey].target.clone();
      }
    },

    getCurrentView() {
      return currentViewName;
    },

    setActiveItem(itemKey) {
      if (heroItems[itemKey]) {
        activeItemKey = itemKey;
        const targetMesh = heroItems[itemKey];
        targetMesh.visible = true;
        targetMesh.scale.set(0.15, 0.15, 0.15); // bounce pop start
      }
    },

    getActiveItem() {
      return activeItemKey;
    },

    // Strict clean memory disposal as required
    dispose() {
      isDisposed = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);

      // Scene graph disposal traversal
      scene.traverse(object => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });

      if (latteArtTex) latteArtTex.dispose();
      if (woodTexture) woodTexture.dispose();
      if (pizzaTex) pizzaTex.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}
