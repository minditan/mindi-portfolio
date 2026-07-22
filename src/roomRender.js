import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const WARM_WOOD_PATTERN =
  /floor|plank|shelf|wood|record|rp_|ladder|drawer|blind|cream|beige|wall|outside|trim|Material\.051|Material\.013|Material\.031|Material\.032|Material\.041|Material\.042|Material\.043/i;

export function createBlenderWorldBackground() {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, "#d4a96a");
  gradient.addColorStop(0.38, "#7a5a42");
  gradient.addColorStop(1, "#241a14");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

export function setupWarmSceneBackground(scene) {
  scene.background = createBlenderWorldBackground();
  scene.fog = new THREE.FogExp2(0x3d2c22, 0.0016);
}

export function setupWarmSceneEnvironment(renderer, scene) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const roomEnvironment = new RoomEnvironment();
  const environmentMap = pmremGenerator.fromScene(roomEnvironment, 0.02).texture;
  roomEnvironment.dispose();

  scene.environment = environmentMap;

  return { pmremGenerator, environmentMap };
}

export function createRoomLights(scene) {
  const lights = {
    ambient: new THREE.AmbientLight(0xffe8d6, 0.22),
    hemi: new THREE.HemisphereLight(0xfff0e0, 0x5c4838, 0.48),
    sun: new THREE.DirectionalLight(0xffdcc0, 1.65),
    windowSpill: new THREE.DirectionalLight(0xfff0e0, 0.42),
    bounce: new THREE.DirectionalLight(0xffe8d0, 0.24),
    fill: new THREE.DirectionalLight(0xe8ddd0, 0.12),
    accents: [],
  };

  lights.sun.castShadow = true;
  lights.sun.shadow.mapSize.set(2048, 2048);
  lights.sun.shadow.bias = -0.0001;
  lights.sun.shadow.normalBias = 0.018;
  lights.sun.shadow.radius = 4;

  for (const light of Object.values(lights)) {
    if (light.isLight) scene.add(light);
    if (light.target) scene.add(light.target);
  }

  return lights;
}

export function createRoomRenderPipeline(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const ssaoPass = new SSAOPass(
    scene,
    camera,
    window.innerWidth,
    window.innerHeight
  );
  ssaoPass.kernelRadius = 12;
  ssaoPass.minDistance = 0.003;
  ssaoPass.maxDistance = 0.12;
  composer.addPass(ssaoPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.22,
    0.38,
    0.88
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  return { composer, ssaoPass, bloomPass };
}

export function resizeRoomRenderPipeline(pipeline, width, height) {
  pipeline.composer.setSize(width, height);
  pipeline.ssaoPass.setSize(width, height);
  pipeline.bloomPass.setSize(width, height);
}

export function applyRenderedMaterialLook(mat, { isWood = false } = {}) {
  if (!mat || mat.isMeshBasicMaterial) return;

  mat.metalness = Math.min(mat.metalness ?? 0, 0.04);
  mat.roughness = THREE.MathUtils.clamp(mat.roughness ?? 0.84, 0.68, 0.94);
  mat.flatShading = false;

  if ("specularIntensity" in mat) {
    mat.specularIntensity = isWood ? 0.08 : 0.14;
  }
  if ("clearcoat" in mat) mat.clearcoat = 0;
  if ("sheen" in mat) mat.sheen = 0;
  if ("envMapIntensity" in mat) mat.envMapIntensity = isWood ? 0.28 : 0.36;
  if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;

  if (isWood && mat.color) {
    mat.color.r = Math.min(mat.color.r * 1.06, 1);
    mat.color.g = Math.min(mat.color.g * 1.04, 1);
    mat.color.b = Math.min(mat.color.b * 1.02, 1);
  }
}

export function applyRenderedMaterialLookForMesh(mat) {
  const isWood = WARM_WOOD_PATTERN.test(mat?.name || "");
  applyRenderedMaterialLook(mat, { isWood });
}

export function enhanceEmissiveMeshes(root) {
  const boosted = [];

  root.traverse((child) => {
    if (!child.isMesh) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const mat of materials) {
      if (!mat || mat.isMeshBasicMaterial) continue;

      const emissiveSum =
        (mat.emissive?.r ?? 0) +
        (mat.emissive?.g ?? 0) +
        (mat.emissive?.b ?? 0);

      const isBright = emissiveSum > 0.45 || Boolean(mat.emissiveMap);
      if (!isBright && emissiveSum < 0.22) continue;

      mat.emissiveIntensity = Math.max(mat.emissiveIntensity ?? 1, isBright ? 2.8 : 2);
      mat.toneMapped = !isBright;
      boosted.push(child.name || mat.name || "emissive");
    }
  });

  return boosted;
}

export function setupRoomAccentLighting(room, scene, lights) {
  for (const light of lights.accents) scene.remove(light);
  lights.accents.length = 0;

  room.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(room);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const backWallZ = center.z - size.z * 0.36;

  const stringStrip = new THREE.PointLight(0xffc890, 1.5, size.x * 0.8, 1.7);
  stringStrip.position.set(center.x, center.y + size.y * 0.2, backWallZ);
  scene.add(stringStrip);
  lights.accents.push(stringStrip);

  for (let i = -2; i <= 2; i += 1) {
    const bulb = new THREE.PointLight(0xffd8a8, 0.38, size.x * 0.18, 2.1);
    bulb.position.set(
      center.x + i * size.x * 0.07,
      center.y + size.y * 0.2,
      backWallZ + size.z * 0.02
    );
    scene.add(bulb);
    lights.accents.push(bulb);
  }

  const deskGlow = new THREE.PointLight(0xffa8d0, 0.95, size.x * 0.45, 1.85);
  deskGlow.position.set(
    center.x + size.x * 0.14,
    center.y + size.y * 0.05,
    center.z + size.z * 0.08
  );
  scene.add(deskGlow);
  lights.accents.push(deskGlow);

  const shelfWarmth = new THREE.PointLight(0xffdcb0, 0.9, size.x * 0.55, 2);
  shelfWarmth.position.set(
    center.x - size.x * 0.26,
    center.y + size.y * 0.12,
    center.z - size.z * 0.04
  );
  scene.add(shelfWarmth);
  lights.accents.push(shelfWarmth);
}

export function aimRoomSunLights(room, scene, lights) {
  room.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(room);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const shadowSpan = Math.max(size.x, size.y, size.z) * 0.95;

  const windowCenter = new THREE.Vector3(
    center.x,
    center.y + size.y * 0.08,
    center.z - size.z * 0.34
  );
  const intoRoom = new THREE.Vector3(0.2, -0.04, 0.96).normalize();

  lights.sun.position
    .copy(windowCenter)
    .sub(intoRoom.clone().multiplyScalar(Math.max(size.x, size.z) * 0.5));
  lights.sun.position.y += size.y * 0.18;
  lights.sun.target.position.copy(center);
  lights.sun.updateMatrixWorld();
  lights.sun.target.updateMatrixWorld();

  lights.windowSpill.position
    .copy(windowCenter)
    .add(intoRoom.clone().multiplyScalar(-size.z * 0.06));
  lights.windowSpill.position.y += size.y * 0.06;
  lights.windowSpill.target.position.set(
    center.x,
    center.y + size.y * 0.02,
    center.z
  );
  lights.windowSpill.updateMatrixWorld();
  lights.windowSpill.target.updateMatrixWorld();

  lights.bounce.position.set(
    center.x + size.x * 0.2,
    center.y - size.y * 0.08,
    center.z + size.z * 0.22
  );
  lights.bounce.target.position.set(center.x, center.y + size.y * 0.05, center.z);
  lights.bounce.updateMatrixWorld();
  lights.bounce.target.updateMatrixWorld();

  lights.fill.position.set(
    center.x + size.x * 0.42,
    center.y + size.y * 0.22,
    center.z + size.z * 0.38
  );
  lights.fill.target.position.copy(center);
  lights.fill.updateMatrixWorld();
  lights.fill.target.updateMatrixWorld();

  lights.sun.shadow.camera.left = -shadowSpan;
  lights.sun.shadow.camera.right = shadowSpan;
  lights.sun.shadow.camera.top = shadowSpan;
  lights.sun.shadow.camera.bottom = -shadowSpan;
  lights.sun.shadow.camera.near = 0.5;
  lights.sun.shadow.camera.far = Math.max(size.x, size.y, size.z) * 3.5;
  lights.sun.shadow.camera.updateProjectionMatrix();

  setupRoomAccentLighting(room, scene, lights);
}
