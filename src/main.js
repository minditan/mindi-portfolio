import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const RESUME_URL = "/resume.pdf";

const loading = document.getElementById("loading");
const overlay = document.getElementById("overlay");
const resumeFrame = document.getElementById("resume-frame");
const closeBtn = document.getElementById("close");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.sortObjects = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b2118);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 15;
controls.maxDistance = 120;
controls.target.set(0, 8, 0);

// Real-time warm lighting (unbaked model — colors from Blender materials)
const ambient = new THREE.AmbientLight(0xffe8d6, 0.55);
scene.add(ambient);

const hemi = new THREE.HemisphereLight(0xfff0e8, 0x8b5e4a, 0.65);
scene.add(hemi);

const key = new THREE.DirectionalLight(0xffd4b8, 0.85);
key.position.set(12, 20, 10);
scene.add(key);

const fill = new THREE.DirectionalLight(0xffe8d6, 0.35);
fill.position.set(-10, 12, 8);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xfff5ee, 0.2);
rim.position.set(0, 8, -14);
scene.add(rim);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let room = null;
let deskZone = null;

const CLICK_NAMES = /desk|monitor|screen|keyboard|mouse|computer|pc|case|display/i;

function setPointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function isDeskClick(point, object) {
  if (object?.name && CLICK_NAMES.test(object.name)) return true;
  if (!deskZone) return false;
  return (
    point.x >= deskZone.min.x &&
    point.x <= deskZone.max.x &&
    point.y >= deskZone.min.y &&
    point.y <= deskZone.max.y &&
    point.z >= deskZone.min.z &&
    point.z <= deskZone.max.z
  );
}

function openResume() {
  resumeFrame.src = RESUME_URL;
  overlay.hidden = false;
}

function closeResume() {
  overlay.hidden = true;
  resumeFrame.src = "";
}

closeBtn.addEventListener("click", closeResume);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeResume();
});

renderer.domElement.addEventListener("click", (event) => {
  if (!room) return;
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(room, true);
  if (!hits.length) return;
  const hit = hits[0];
  if (isDeskClick(hit.point, hit.object)) openResume();
});

// Broken drawer shards in room.glb — real drawers are Plane.669 (re-exported as drawers.glb)
const BROKEN_DRAWER_IN_ROOM = new Set([
  "Plane.669",
  "Plane.673",
  "Plane.679",
]);

const BLIND_CREAM = 0xf0dfcb;

// Broken export of Cube.002 in room.glb (24 verts, no material, huge scale)
const BROKEN_BLINDS_IN_ROOM = "Cube.002";
const BROKEN_STOOL_IN_ROOM = "Plane.543";

// Floor rug meshes baked into room.glb (also stripped by scripts/remove-floor-rug.mjs)
const HIDDEN_ROOM_OBJECTS = new Set(["greenthing.048", "Cylinder.431"]);

function hideRoomObjects(object) {
  object.traverse((child) => {
    const name = child.name || child.userData?.name || "";
    if (!HIDDEN_ROOM_OBJECTS.has(name)) return;
    child.visible = false;
    child.traverse((descendant) => {
      descendant.visible = false;
    });
  });
}

// Opaque white case panels — delete these in Blender, or we hide them here
const PC_CASE_SHELL = new Set([
  "Cube.117",
  "Cube.118",
  "Cube.119",
  "Cube.120",
  "Cube.121",
  "Cube.122",
  "Plane.150",
  "Plane.678",
]);

const PC_INTERNAL_NAMES = new Set([
  "Cube.031",
  "Cube.059",
  "Cube.066",
  "Cube.069",
  "Cube.077",
]);

function isPcCaseShell(child) {
  return child.isMesh && PC_CASE_SHELL.has(child.name);
}

function hidePcCaseShells(object) {
  object.traverse((child) => {
    if (!isPcCaseShell(child)) return;
    child.visible = false;
  });
}

function preparePcInternals(object) {
  object.traverse((child) => {
    if (!child.isMesh || !PC_INTERNAL_NAMES.has(child.name)) return;

    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!mat) continue;
      // Keep glowing fans/lights, drop the white outer hull texture
      mat.map = null;
      mat.color.set(0x000000);
      if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      mat.emissiveIntensity = Math.max(mat.emissiveIntensity ?? 1, 2);
    }
  });
}

function makePcGlassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 0.35,
    ior: 1.45,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function preparePcGlass(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    const verts = child.geometry?.attributes?.position?.count ?? 0;
    // Skip broken tiny panels (Plane.150 / Plane.678 exports)
    if (verts < 200) {
      child.visible = false;
      return;
    }

    child.material = makePcGlassMaterial();
    child.renderOrder = 5;
  });
}

function prepareMaterials(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    if (isPcCaseShell(child)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const mat of materials) {
      if (!mat) continue;
      mat.roughness = 1;
      mat.metalness = 0;
      if ("envMapIntensity" in mat) mat.envMapIntensity = 0;
      if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
      if (
        mat.color?.r < 0.02 &&
        mat.color?.g < 0.02 &&
        mat.color?.b < 0.02 &&
        !mat.map &&
        !mat.emissiveMap &&
        (mat.emissiveIntensity ?? 0) < 0.05
      ) {
        mat.visible = false;
      }
    }
  });
}

function makeBlindMaterial() {
  return new THREE.MeshStandardMaterial({
    color: BLIND_CREAM,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  });
}

function prepareBlinds(object, { hideBrokenRoomBlinds = false } = {}) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    const name = child.name || "";

    if (name === BROKEN_BLINDS_IN_ROOM) {
      child.visible = !hideBrokenRoomBlinds;
      if (!hideBrokenRoomBlinds) {
        child.material = makeBlindMaterial();
      }
      return;
    }

    // Proper blinds export from Blender (Cube.002 re-exported)
    if (name === "Cube.002" || name === "blinds_cream") {
      child.material = makeBlindMaterial();
    }
  });
}

function prepareStool(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    // Blender "shade smooth" — fixes blocky/rectangle look
    if (child.geometry) {
      child.geometry.computeVertexNormals();
    }

    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!mat) continue;
      mat.flatShading = false;
      mat.roughness = 1;
      mat.metalness = 0;
      if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
    }
  });
}

// Pegboard in room.glb has corrupted geometry (same broken-export issue as blinds/stool)
const BROKEN_PEGBOARD_IN_ROOM = new Set([
  "Plane.712",
  "Plane.713",
  "Plane.714",
  "Plane.564",
  "Plane.565",
  "Plane.566",
  "Plane.567",
  "Plane.568",
  "Plane.569",
  "Cylinder.237",
  "Cylinder.238",
  "Cylinder.239",
  "Cylinder.240",
]);

// Bunny pegboard tiles from Blender (Plane.565 is the main board)
const PEGBOARD_TILE_NAMES = new Set([
  "Plane.564",
  "Plane.565",
  "Plane.566",
  "Plane.567",
  "Plane.568",
  "Plane.569",
]);

const OLD_PEGBOARD_PLANES = new Set(["Plane.712", "Plane.713", "Plane.714"]);

function hideBrokenPegboard(object) {
  object.traverse((child) => {
    if (!child.isMesh || !BROKEN_PEGBOARD_IN_ROOM.has(child.name)) return;
    child.visible = false;
  });
}

const pegboardTileMat = new THREE.MeshBasicMaterial({
  color: 0xf5f3ee,
  side: THREE.DoubleSide,
});

function preparePegboardAddon(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    if (OLD_PEGBOARD_PLANES.has(child.name)) {
      child.visible = false;
      return;
    }

    if (PEGBOARD_TILE_NAMES.has(child.name)) {
      child.material = pegboardTileMat;
      child.renderOrder = 2;
      child.position.x += 0.35;
      return;
    }

    if (child.geometry) {
      child.geometry.computeVertexNormals();
    }

    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!mat) continue;
      mat.side = THREE.DoubleSide;
      mat.roughness = 1;
      mat.metalness = 0;
      if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
    }

    child.renderOrder = 4;
  });
}

function prepareBigDrawers(object) {
  const drawerMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f0,
    roughness: 1,
    metalness: 0,
  });

  object.traverse((child) => {
    if (!child.isMesh) return;
    child.material = drawerMat;
  });
}

function fitCameraToRoom(object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 1.35;

  controls.target.copy(center);
  camera.position.set(
    center.x + distance * 0.85,
    center.y + distance * 0.55,
    center.z + distance * 0.85
  );
  controls.update();

  // Desk / computer click zone (center-back of room, no rename needed)
  deskZone = {
    min: new THREE.Vector3(
      center.x - size.x * 0.22,
      center.y - size.y * 0.05,
      center.z - size.z * 0.35
    ),
    max: new THREE.Vector3(
      center.x + size.x * 0.22,
      center.y + size.y * 0.35,
      center.z + size.z * 0.05
    ),
  };
}

function loadGltf(loader, url, label = "model") {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      resolve,
      (event) => {
        if (!event.total) return;
        const pct = Math.round((event.loaded / event.total) * 100);
        loading.textContent = `Loading ${label}… ${pct}%`;
      },
      reject
    );
  });
}

async function loadRoom() {
  const loader = new GLTFLoader();
  await MeshoptDecoder.ready;
  loader.setMeshoptDecoder(MeshoptDecoder);

  try {
    loading.textContent = "Loading room… 0%";
    const roomGltf = await loadGltf(loader, "/room.glb", "room");

    let drawerGltf = null;
    let blindGltf = null;
    let stoolGltf = null;
    let pcGlassGltf = null;
    let pegboardGltf = null;
    try {
      drawerGltf = await loadGltf(loader, "/drawers.glb");
    } catch {
      console.warn("drawers.glb not loaded — run fix_drawers_export.py in Blender");
    }
    try {
      blindGltf = await loadGltf(loader, "/blinds.glb");
    } catch {
      console.warn("blinds.glb not loaded — run fix_blinds_export.py in Blender");
    }
    try {
      stoolGltf = await loadGltf(loader, "/stool.glb");
    } catch {
      console.warn("stool.glb not loaded — run fix_stool_export.py in Blender");
    }
    try {
      pcGlassGltf = await loadGltf(loader, "/pc_glass.glb");
    } catch {
      console.warn("pc_glass.glb not loaded — export glass from Blender");
    }
    try {
      pegboardGltf = await loadGltf(loader, "/pegboard.glb", "pegboard");
    } catch (err) {
      console.warn(
        "pegboard.glb not loaded — restart npm run dev (use the URL it prints) or run: node scripts/extract-pegboard.mjs",
        err
      );
    }
    room = new THREE.Group();
    prepareMaterials(roomGltf.scene);
    preparePcInternals(roomGltf.scene);
    hideBrokenPegboard(roomGltf.scene);
    hideRoomObjects(roomGltf.scene);

    if (drawerGltf) {
      roomGltf.scene.traverse((child) => {
        if (child.isMesh && BROKEN_DRAWER_IN_ROOM.has(child.name)) {
          child.visible = false;
        }
      });
      prepareBigDrawers(drawerGltf.scene);
      room.add(drawerGltf.scene);
    } else {
      roomGltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Plane.669") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xf5f5f0,
            roughness: 1,
            metalness: 0,
          });
        }
      });
    }

    if (stoolGltf) {
      roomGltf.scene.traverse((child) => {
        if (child.isMesh && child.name === BROKEN_STOOL_IN_ROOM) {
          child.visible = false;
        }
      });
      prepareStool(stoolGltf.scene);
      room.add(stoolGltf.scene);
    }

    prepareBlinds(roomGltf.scene, { hideBrokenRoomBlinds: Boolean(blindGltf) });
    room.add(roomGltf.scene);

    if (blindGltf) {
      prepareBlinds(blindGltf.scene);
      room.add(blindGltf.scene);
    }

    hidePcCaseShells(roomGltf.scene);

    if (pcGlassGltf) {
      preparePcGlass(pcGlassGltf.scene);
      room.add(pcGlassGltf.scene);
    }

    if (pegboardGltf?.scene) {
      prepareMaterials(pegboardGltf.scene);
      preparePegboardAddon(pegboardGltf.scene);
      room.add(pegboardGltf.scene);
    }

    scene.add(room);
    fitCameraToRoom(room);
    loading.style.display = "none";
  } catch (err) {
    loading.style.display = "block";
    loading.textContent =
      `Failed to load room (${err?.message || err}). Try: pkill -f vite && cd ~/Projects/mindi-portfolio && npm run dev — then open the URL it prints.`;
    console.error("GLB load error:", err);
  }
}

loadRoom();

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
