import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import aboutPhotoUrl from "./assets/about-photo.jpg?url";
import roomfolioWorkspaceUrl from "./assets/roomfolio-workspace.jpg?url";
import roomfolioRoomUrl from "./assets/roomfolio-room.jpg?url";
import roomfolioPegboardUrl from "./assets/roomfolio-pegboard.jpg?url";
import roomfolioDeskUrl from "./assets/roomfolio-desk.jpg?url";
import roomfolioShelfUrl from "./assets/roomfolio-shelf.jpg?url";
import nasaProposalUrl from "./assets/nasa-proposal.jpg?url";
import nasaTeamUrl from "./assets/nasa-team.jpg?url";
import blenderIconUrl from "./assets/icons/blender.png?url";
import nasaIconUrl from "./assets/icons/nasa.png?url";
import shareteaIconUrl from "./assets/icons/sharetea.png?url";
import pinkWhiteUrl from "./assets/music/pink-white.mp3?url";
import sweetDispositionUrl from "./assets/music/sweet-disposition.mp3?url";
import coldWaterUrl from "./assets/music/cold-water.mp3?url";
import clarityUrl from "./assets/music/clarity.mp3?url";
import scaredToBeLonelyUrl from "./assets/music/scared-to-be-lonely.mp3?url";
import aboutIconUrl from "./assets/icons/about.png?url";
import electricalIconUrl from "./assets/icons/electrical.png?url";
import ecen325SumAmpUrl from "./assets/ecen-lab/ecen325-sum-amp.png?url";
import ecen325DiffAmpUrl from "./assets/ecen-lab/ecen325-diff-amp.png?url";
import ecen325BjtCurveUrl from "./assets/ecen-lab/ecen325-bjt-curve.png?url";
import ecen248InvertAmpBodeUrl from "./assets/ecen-lab/ecen248-invert-amp-bode.png?url";
import ecen454MosfetSchematicUrl from "./assets/ecen-lab/ecen454-mosfet-schematic.png?url";
import ecen314BodeHpUrl from "./assets/ecen-lab/ecen314-bode-hp.png?url";
import ecen314BandpassTimeUrl from "./assets/ecen-lab/ecen314-bandpass-time.png?url";
import ecen314OscilloscopeUrl from "./assets/ecen-lab/ecen314-oscilloscope.png?url";
import ecenHeroChipUrl from "./assets/ecen-hero-chip.png?url";
import introBunnyStickerUrl from "./assets/intro-bunny-sticker.png?url";
import introBunnyStickerLeftUrl from "./assets/intro-bunny-sticker-left.png?url";
const intro = document.getElementById("intro");
const introStatus = document.getElementById("intro-status");
const introEnter = document.getElementById("intro-enter");
const introEnterLabel = document.getElementById("intro-enter-label");
const introEnterRow = document.getElementById("intro-enter-row");
const backBtn = document.getElementById("back");
const chairCursor = document.getElementById("chair-cursor");
const monitorCursor = document.getElementById("monitor-cursor");
const hint = document.getElementById("hint");
const monitorScreen = document.getElementById("monitor-screen");
const monitorScreenFrame = document.getElementById("monitor-screen-frame");
const recordCursor = document.getElementById("record-cursor");
const musicPlaylist = document.getElementById("music-playlist");
const musicTrackList = document.getElementById("music-track-list");
const roomMusicBar = document.getElementById("room-music-bar");
const roomMusicNowPlaying = document.getElementById("room-music-now-playing");
const musicControlsTemplate = document.getElementById("music-controls-template");
const musicPlaylistControls = document.getElementById("music-playlist-controls");
const roomMusicControls = document.getElementById("room-music-controls");
const introBunnyStickerRight = document.querySelector(".intro-bunny-sticker--right");
const introBunnyStickerLeft = document.querySelector(".intro-bunny-sticker--left");
const introBunnyStickers = document.querySelectorAll(".intro-bunny-sticker");

if (introBunnyStickerRight) {
  introBunnyStickerRight.src = introBunnyStickerUrl;
}

if (introBunnyStickerLeft) {
  introBunnyStickerLeft.src = introBunnyStickerLeftUrl;
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.24;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.sortObjects = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a2118);

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

// Soft warm daylight — bright room with gentle shadows
const ambient = new THREE.AmbientLight(0xfff8f2, 0.54);
scene.add(ambient);

const hemi = new THREE.HemisphereLight(0xfff8f0, 0x8a7260, 0.58);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffead8, 1.45);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0001;
sun.shadow.normalBias = 0.016;
sun.shadow.radius = 5.5;
scene.add(sun);
scene.add(sun.target);

const windowSpill = new THREE.DirectionalLight(0xfff4e8, 0.34);
scene.add(windowSpill);
scene.add(windowSpill.target);

const bounce = new THREE.DirectionalLight(0xfff8f2, 0.16);
scene.add(bounce);
scene.add(bounce.target);

const fill = new THREE.DirectionalLight(0xe8e0d8, 0.1);
scene.add(fill);
scene.add(fill.target);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let room = null;
let deskZone = null;
let pinkChairGroup = null;
let pinkChairHideObjects = [];
let pinkChairRestoreList = [];
let chairClickMesh = null;
let chairAnchor = null;
let chairSpinPivot = null;
let chairEnterStartTime = null;
let recordPlayerAnchor = null;
let recordSpinPivot = null;
let recordSpinAxis = "y";
let pcFanSpins = [];
let monitorDesktop = null;
let mouseClickMesh = null;

let isDeskView = false;
let isMonitorCloseUpView = false;
let isAnimating = false;
let cameraTween = null;

const roomView = {
  position: new THREE.Vector3(),
  target: new THREE.Vector3(),
};

const heroView = {
  position: new THREE.Vector3(),
  target: new THREE.Vector3(),
};

const deskView = {
  position: new THREE.Vector3(),
  target: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
};

const monitorCloseUpView = {
  position: new THREE.Vector3(),
  target: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
};

const chairHintWorld = new THREE.Vector3();
const recordHintWorld = new THREE.Vector3();
const monitorHintWorld = new THREE.Vector3();
const CHAIR_SPIN_AMPLITUDE = Math.PI / 14;
const CHAIR_SPIN_SPEED = 0.00045;
const RECORD_VINYL_NODE_NAMES = new Set(["Cylinder.195", "Cylinder195"]);
const RECORD_SPIN_RPS = 45 / 60;
const PC_FAN_HORIZONTAL_NODES = new Set(["Plane.1151", "Plane.1156", "Plane.1157"]);
const PC_FAN_VERTICAL_NODES = new Set(["Plane.1159"]);
const PC_FAN_NODE_NAMES = new Set([
  ...PC_FAN_HORIZONTAL_NODES,
  ...PC_FAN_VERTICAL_NODES,
]);
const PC_FAN_SPIN_RPS = 2;
const pcFanSpinAxisVector = new THREE.Vector3();
const CAMERA_TWEEN_MS = 900;
const ENTER_REVEAL_MS = 1500;

const CLICK_NAMES = /desk|monitor|screen|keyboard|mouse|computer|pc|case|display/i;
const MONITOR_NAMES = /monitor|screen|display|laptop|lcd|imac|panel/i;
const BUILD_VERSION = "v385";
const INTRO_HINT = "drag to look around · click the pink chair to sit!";
const ROOM_HINT =
  "Click the chair to learn more about my portfolio and experiences!";

const MUSIC_TRACKS = [
  {
    id: "pink-white",
    title: "Pink + White",
    artist: "Frank Ocean",
    url: pinkWhiteUrl,
  },
  {
    id: "sweet-disposition",
    title: "Sweet Disposition (Live @ KEXP)",
    artist: "The Temper Trap",
    url: sweetDispositionUrl,
  },
  {
    id: "cold-water",
    title: "Cold Water",
    artist: "Major Lazer feat. Justin Bieber & MØ",
    url: coldWaterUrl,
  },
  {
    id: "clarity",
    title: "Clarity",
    artist: "Zedd feat. Foxes",
    url: clarityUrl,
  },
  {
    id: "scared-to-be-lonely",
    title: "Scared To Be Lonely",
    artist: "Martin Garrix & Dua Lipa",
    url: scaredToBeLonelyUrl,
  },
];

const introNavHintEl = document.getElementById("intro-nav-hint");
if (introNavHintEl) introNavHintEl.textContent = INTRO_HINT;

const RECORD_CURSOR_OFFSET_X = -42;
const RECORD_CURSOR_OFFSET_Y = 68;

const RECORD_PLAYER_NODE_NAMES = new Set([
  "Cylinder.195",
  "Cylinder195",
  "Cylinder.196",
  "Cylinder196",
  "Cylinder.197",
  "Cylinder197",
  "Cylinder.198",
  "Cylinder198",
  "Cylinder.193",
  "Cylinder193",
]);

function showIntroBunnySticker() {
  introBunnyStickers.forEach((sticker) => {
    sticker.hidden = false;
    requestAnimationFrame(() => sticker.classList.add("is-visible"));
  });
}

let introReady = false;
let pendingDockItem = null;

function setIntroStatus(statusText) {
  if (statusText && introStatus) {
    introStatus.innerHTML = statusText;
  }
}

function showIntroEnterGate() {
  if (!intro || introReady) return;
  introReady = true;

  introStatus?.classList.add("is-done");

  if (introEnterRow) {
    introEnterRow.hidden = false;
    requestAnimationFrame(() => introEnterRow.classList.add("is-visible"));
  } else if (introEnter) {
    introEnter.hidden = false;
    requestAnimationFrame(() => introEnter.classList.add("is-visible"));
  }

  showIntroBunnySticker();
}

function postOpenDockItem(id) {
  monitorScreenFrame?.contentWindow?.postMessage({ type: "open-dock-item", id }, "*");
}

function playEnterReveal() {
  if (!intro || intro.classList.contains("is-leaving")) return;

  musicPlayer.wasPlayingBeforeHide = true;
  document.body.classList.add("is-room-active");
  intro.classList.add("is-leaving");
  chairEnterStartTime = performance.now();

  window.setTimeout(() => {
    intro.style.display = "none";
    intro.remove();
  }, 900);

  if (!room) {
    hint?.classList.remove("is-hidden");
    showRoomMusicBar();
    startRoomMusic();
    return;
  }

  animateCameraTo(roomView, () => {
    hint?.classList.remove("is-hidden");
  }, { duration: ENTER_REVEAL_MS });

  showRoomMusicBar();
  startRoomMusic();
}

function dismissIntro() {
  playEnterReveal();
}

introEnter?.addEventListener("click", () => {
  if (introEnter?.dataset.state === "retry") {
    window.location.reload();
    return;
  }
  dismissIntro();
});
introEnter?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (introEnter?.dataset.state === "retry") {
      window.location.reload();
      return;
    }
    dismissIntro();
  }
});

const musicPlayer = {
  audio: new Audio(),
  currentIndex: 0,
  volume: 0.65,
  muted: false,
  isPlaying: false,
  playlistOpen: false,
  wasPlayingBeforeHide: false,
};

function getCurrentTrack() {
  return MUSIC_TRACKS[musicPlayer.currentIndex] ?? MUSIC_TRACKS[0];
}

function getTrackAudioUrl(track) {
  return track?.url || "";
}

function syncMusicControlUi() {
  document.querySelectorAll('[data-action="toggle-play"]').forEach((button) => {
    button.classList.toggle("is-playing", musicPlayer.isPlaying);
    button.setAttribute("aria-label", musicPlayer.isPlaying ? "Pause" : "Play");
  });

  document.querySelectorAll('[data-action="toggle-mute"]').forEach((button) => {
    button.classList.toggle("is-muted", musicPlayer.muted);
    button.setAttribute("aria-label", musicPlayer.muted ? "Unmute audio" : "Mute audio");
    button.setAttribute("title", musicPlayer.muted ? "Unmute" : "Mute");
  });

  musicTrackList?.querySelectorAll("[data-track-index]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      Number(button.dataset.trackIndex) === musicPlayer.currentIndex
    );
  });

  if (roomMusicNowPlaying) {
    const track = getCurrentTrack();
    const titleEl = roomMusicNowPlaying.querySelector(".room-music-bar__track-title");
    const artistEl = roomMusicNowPlaying.querySelector(".room-music-bar__track-artist");
    if (titleEl) titleEl.textContent = track?.title || "Select a song";
    if (artistEl) artistEl.textContent = track?.artist || "";
  }
}

function loadMusicTrack(index, { autoplay = false } = {}) {
  if (!MUSIC_TRACKS.length) return;

  musicPlayer.currentIndex = (index + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  const track = getCurrentTrack();
  musicPlayer.audio.src = getTrackAudioUrl(track);
  musicPlayer.audio.load();
  syncMusicControlUi();

  if (autoplay) {
    void musicPlayer.audio.play().then(() => {
      musicPlayer.isPlaying = true;
      musicPlayer.wasPlayingBeforeHide = true;
      syncMusicControlUi();
    }).catch((err) => {
      musicPlayer.isPlaying = false;
      syncMusicControlUi();
      console.warn(`[portfolio ${BUILD_VERSION}] music play failed`, err);
    });
  } else {
    musicPlayer.isPlaying = false;
    syncMusicControlUi();
  }
}

function pauseRoomMusic() {
  if (!musicPlayer.audio.src) {
    musicPlayer.isPlaying = false;
    syncMusicControlUi();
    return;
  }

  musicPlayer.audio.pause();
  musicPlayer.isPlaying = false;
  syncMusicControlUi();
}

function stopMusicOnSiteExit() {
  musicPlayer.wasPlayingBeforeHide = false;
  pauseRoomMusic();
}

function resumeRoomMusicIfNeeded() {
  if (
    !document.body.classList.contains("is-room-active") ||
    musicPlayer.muted ||
    !musicPlayer.wasPlayingBeforeHide
  ) {
    return;
  }

  startRoomMusic();
}

function toggleMusicPlayback() {
  if (!musicPlayer.audio.src) {
    loadMusicTrack(musicPlayer.currentIndex, { autoplay: true });
    return;
  }

  if (musicPlayer.isPlaying) {
    musicPlayer.audio.pause();
    musicPlayer.isPlaying = false;
    musicPlayer.wasPlayingBeforeHide = false;
  } else {
    void musicPlayer.audio.play().then(() => {
      musicPlayer.isPlaying = true;
      musicPlayer.wasPlayingBeforeHide = true;
      syncMusicControlUi();
    }).catch((err) => {
      musicPlayer.isPlaying = false;
      syncMusicControlUi();
      console.warn(`[portfolio ${BUILD_VERSION}] music play failed`, err);
    });
  }

  syncMusicControlUi();
}

function startRoomMusic() {
  if (musicPlayer.muted) return;

  if (!musicPlayer.audio.src) {
    loadMusicTrack(musicPlayer.currentIndex, { autoplay: true });
    return;
  }

  if (musicPlayer.isPlaying) return;

  void musicPlayer.audio.play().then(() => {
    musicPlayer.isPlaying = true;
    musicPlayer.wasPlayingBeforeHide = true;
    syncMusicControlUi();
  }).catch((err) => {
    console.warn(`[portfolio ${BUILD_VERSION}] music autoplay failed`, err);
  });
}

function playPreviousTrack() {
  loadMusicTrack(musicPlayer.currentIndex - 1, { autoplay: true });
}

function playNextTrack() {
  loadMusicTrack(musicPlayer.currentIndex + 1, { autoplay: true });
}

function setMusicMuted(muted) {
  musicPlayer.muted = muted;
  musicPlayer.audio.muted = muted;
  syncMusicControlUi();
}

function toggleMusicMuted() {
  setMusicMuted(!musicPlayer.muted);
}

function openMusicPlaylist() {
  if (!musicPlaylist) return;
  musicPlayer.playlistOpen = true;
  musicPlaylist.hidden = false;
}

function closeMusicPlaylist() {
  if (!musicPlaylist) return;
  musicPlayer.playlistOpen = false;
  musicPlaylist.hidden = true;
}

function toggleMusicPlaylist() {
  if (musicPlayer.playlistOpen) closeMusicPlaylist();
  else openMusicPlaylist();
}

function showRoomMusicBar() {
  if (roomMusicBar) roomMusicBar.hidden = false;
}

function mountMusicControls(host) {
  if (!host || !musicControlsTemplate) return;
  host.appendChild(musicControlsTemplate.content.cloneNode(true));
}

function renderMusicTrackList() {
  if (!musicTrackList) return;

  musicTrackList.innerHTML = MUSIC_TRACKS.map(
    (track, index) => `
      <li>
        <button
          type="button"
          class="music-track-item"
          data-track-index="${index}"
        >
          <span class="music-track-item__title">${track.title}</span>
          <span class="music-track-item__artist">${track.artist}</span>
        </button>
      </li>
    `
  ).join("");
}

function handleMusicControlAction(action, target) {
  if (action === "prev") {
    playPreviousTrack();
    return;
  }
  if (action === "next") {
    playNextTrack();
    return;
  }
  if (action === "toggle-play") {
    toggleMusicPlayback();
    return;
  }
  if (action === "toggle-mute") {
    toggleMusicMuted();
    return;
  }
}

function initMusicPlayer() {
  mountMusicControls(musicPlaylistControls);
  mountMusicControls(roomMusicControls);
  renderMusicTrackList();

  musicPlayer.audio.preload = "metadata";
  musicPlayer.audio.volume = musicPlayer.volume;
  loadMusicTrack(0);

  musicPlayer.audio.addEventListener("play", () => {
    musicPlayer.isPlaying = true;
    syncMusicControlUi();
  });
  musicPlayer.audio.addEventListener("pause", () => {
    musicPlayer.isPlaying = false;
    syncMusicControlUi();
  });
  musicPlayer.audio.addEventListener("ended", () => {
    playNextTrack();
  });

  document.addEventListener("click", (event) => {
    const trackButton = event.target.closest("[data-track-index]");
    if (trackButton && musicTrackList?.contains(trackButton)) {
      loadMusicTrack(Number(trackButton.dataset.trackIndex), { autoplay: true });
      return;
    }

    const control = event.target.closest("[data-action]");
    if (!control) return;

    const action = control.dataset.action;
    if (
      action === "prev" ||
      action === "next" ||
      action === "toggle-play" ||
      action === "toggle-mute"
    ) {
      handleMusicControlAction(action, control);
    }
  });

  document.querySelectorAll("[data-close-playlist]").forEach((button) => {
    button.addEventListener("click", closeMusicPlaylist);
  });

  window.addEventListener("pagehide", stopMusicOnSiteExit);
  window.addEventListener("beforeunload", stopMusicOnSiteExit);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      musicPlayer.wasPlayingBeforeHide = musicPlayer.isPlaying;
      pauseRoomMusic();
      return;
    }

    resumeRoomMusicIfNeeded();
  });

  recordCursor?.addEventListener("click", (event) => {
    event.stopPropagation();
    openMusicPlaylist();
  });

  syncMusicControlUi();
}

initMusicPlayer();

const MONITOR_ASSET_PAYLOAD = {
  aboutPhoto: aboutPhotoUrl,
  roomfolioImages: [
    {
      src: roomfolioWorkspaceUrl,
      alt: "Blender workspace scene in the 3D viewport",
      caption: "Blender workspace scene",
    },
    {
      src: roomfolioRoomUrl,
      alt: "Full Blender room layout with desk and pegboard",
      caption: "Full room layout in Blender",
    },
    {
      src: roomfolioPegboardUrl,
      alt: "Maker pegboard workstation with tools and test equipment",
      caption: "Maker pegboard workstation",
    },
    {
      src: roomfolioDeskUrl,
      alt: "Dual-monitor desk setup with PC build",
      caption: "Dual-monitor desk setup",
    },
    {
      src: roomfolioShelfUrl,
      alt: "Blender shelf styling with decor and record player",
      caption: "Shelf styling & decor details",
    },
  ],
  nasaImages: [
    {
      src: nasaProposalUrl,
      alt: "SABS proposal summary slide for Team SOLARA",
      caption: "Full proposal summary slide",
    },
    {
      src: nasaTeamUrl,
      alt: "Team SOLARA group photo at Zachry Engineering Education Complex",
      caption: "Team SOLARA at Zachry Complex",
    },
  ],
  ecenImages: [
    {
      key: "ecen325-sum-amp",
      src: ecen325SumAmpUrl,
      alt: "Summing amplifier circuit simulation output",
      caption: "ECEN 325 · summing amplifier analysis",
    },
    {
      key: "ecen325-diff-amp",
      src: ecen325DiffAmpUrl,
      alt: "Differential amplifier circuit simulation output",
      caption: "ECEN 325 · differential amplifier analysis",
    },
    {
      key: "ecen325-bjt-curve",
      src: ecen325BjtCurveUrl,
      alt: "BJT characteristic curve plot from lab measurements",
      caption: "ECEN 325 · BJT curve measurements",
    },
    {
      key: "ecen248-invert-amp-bode",
      src: ecen248InvertAmpBodeUrl,
      alt: "Inverting amplifier Bode plot from digital systems lab",
      caption: "ECEN 248 · inverting amplifier Bode plot",
    },
    {
      key: "ecen454-mosfet-schematic",
      src: ecen454MosfetSchematicUrl,
      alt: "MOSFET digital circuit schematic",
      caption: "ECEN 454 · MOSFET circuit schematic",
    },
    {
      key: "ecen314-bode-hp",
      src: ecen314BodeHpUrl,
      alt: "High-pass filter Bode plot from signals lab",
      caption: "ECEN 314 · high-pass Bode plot",
    },
    {
      key: "ecen314-bandpass-time",
      src: ecen314BandpassTimeUrl,
      alt: "Band-pass filter time-domain response",
      caption: "ECEN 314 · band-pass time-domain response",
    },
    {
      key: "ecen314-oscilloscope",
      src: ecen314OscilloscopeUrl,
      alt: "Oscilloscope capture of sinusoidal waveforms and measurements",
      caption: "ECEN 314 · oscilloscope lab capture",
    },
  ],
  ecenHeroImage: ecenHeroChipUrl,
  dockIcons: {
    about: aboutIconUrl,
    blender: blenderIconUrl,
    nasa: nasaIconUrl,
    sharetea: shareteaIconUrl,
    ecen: electricalIconUrl,
  },
};

function postMonitorAssets() {
  monitorScreenFrame?.contentWindow?.postMessage(
    { type: "monitor-assets", assets: MONITOR_ASSET_PAYLOAD },
    "*"
  );
}

monitorScreenFrame?.addEventListener("load", postMonitorAssets);
window.addEventListener("message", (event) => {
  if (
    event.source === monitorScreenFrame?.contentWindow &&
    event.data?.type === "monitor-ready"
  ) {
    postMonitorAssets();
    if (pendingDockItem && isDeskView) {
      postOpenDockItem(pendingDockItem);
      pendingDockItem = null;
    }
  }
});
const VERTICAL_MONITOR_RESUME_NODES = new Set(["Plane.014"]);
const VERTICAL_MONITOR_RESUME_MESHES = new Set(["Plane014"]);
const MAIN_MONITOR_WALLPAPER_URL = "/monitor-wallpaper.jpg";
const MAIN_MONITOR_SCREEN_NODES = new Set(["Plane.013", "Plane.994", "Plane.780"]);
const MAIN_MONITOR_SCREEN_MESHES = new Set(["Plane013", "Plane994", "Plane780"]);
const VERTICAL_MONITOR_FALLBACK_COLOR = 0x111111;
const MAIN_MONITOR_NAMES = new Set([
  "Plane.013",
  "Plane.994",
  "Plane.780",
  "Plane.149",
  "Plane.132",
]);
const MONITOR_SCREEN_INSET = 0.94;
const MONITOR_DESKTOP_PX = { width: 1126, height: 688 };
const DESK_MONITOR_OVERLAY = {
  left: 0.309,
  top: 0.488,
  width: 0.283,
  height: 0.296,
};
const DESK_CAMERA_POSITION = new THREE.Vector3(86, 38.4, -4);
const DESK_CAMERA_ROTATION_DEG = [0, 90, 0];
const DESK_RAYCAST_SKIP_NAMES = new Set([
  "Plane.033",
  "Plane.193",
  "Plane.129",
  "Cylinder.030",
  "Cylinder.019_1",
  "Cylinder.019_2",
  "Cylinder.019_3",
]);
const KEYBOARD_NODE_PATTERN = /^Plane\.02[0-9]$|^Plane\.03[01]$/;
const DESK_LAMP_NODE_LABELS = new Set([
  "Plane.126",
  "Plane.128",
  "BézierCurve.067",
]);
const PINK_CHAIR_OBJECT_NAME = "Cylinder.214";
// Only Cylinder.214 is the pink chair; Plane.208 is a pegboard pliers handle.
const PINK_CHAIR_BASE_NAMES = new Set([]);
const WHITE_CHAIR_NODE_NAMES = new Set(["Plane.543", "Plane.1111"]);
const LAPTOP_SCREEN_LABELS = new Set([
  "Plane.130",
  "Plane.131",
  "Plane.061",
  "Plane.062",
]);
const FALLBACK_DESK_MOUSE_CURSOR = new THREE.Vector3(22.05, 33.75, 1.75);
const DESK_MOUSE_CURSOR_SCREEN = {
  x: 0.528,
  y: 0.902,
};
const DESK_KEYBOARD_NODE_NAMES = ["Plane.1063", "Plane1063"];
const MONITOR_CLICK_LABELS = new Set([
  ...LAPTOP_SCREEN_LABELS,
  "Plane.132",
  "Plane.063",
  "Plane.149",
  "Plane.080",
  "Plane.013",
  "Plane.994",
  "wall001",
  "wall.001",
]);
const ROOM_FOV = 45;
const DESK_FOV = 17;
const MONITOR_CLOSEUP_FOV = 15.3;
const MONITOR_CLOSEUP_CAMERA_FACTOR = 0.58;
const MONITOR_CLOSEUP_VIEW_SHIFT_X = -3.5;
const MONITOR_CLOSEUP_VIEW_SHIFT_Y = -0.55;
const MONITOR_CLOSEUP_OVERLAY_SHIFT_X = 38;
const MONITOR_CLOSEUP_OVERLAY_SHIFT_Y = -10;
const MONITOR_CLOSEUP_OVERLAY_COVERAGE = 0.975;
const MONITOR_CLOSEUP_SCREEN_INSET = 0.9;
const ROOM_MIN_DISTANCE = 15;
const ROOM_MAX_DISTANCE = 120;
const DESK_MIN_DISTANCE = 1;
const DESK_MAX_DISTANCE = 8;

const FALLBACK_DESK_CAMERA = DESK_CAMERA_POSITION.clone();
const FALLBACK_DESK_TARGET = new THREE.Vector3(27.94, 40.9, -23.2);
const CHAIR_CURSOR_WORLD = new THREE.Vector3(15, 12, -19);
const FALLBACK_CHAIR_CURSOR = CHAIR_CURSOR_WORLD.clone();

function meshLabels(object) {
  if (!object) return [];
  const labels = [];
  if (object.name) labels.push(object.name);
  if (object.parent?.name) labels.push(object.parent.name);
  return labels;
}

function matchesMeshLabel(object, labels) {
  return meshLabels(object).some((name) => labels.has(name));
}

function normalizeGltfName(name = "") {
  if (/^Plane\d/.test(name)) return name.replace(/^Plane(\d)/, "Plane.$1");
  if (/^Cylinder\d/.test(name)) return name.replace(/^Cylinder(\d)/, "Cylinder.$1");
  return name;
}

function isPinkChairObjectName(name) {
  if (!name) return false;
  const normalized = normalizeGltfName(name);
  return (
    normalized === PINK_CHAIR_OBJECT_NAME ||
    PINK_CHAIR_BASE_NAMES.has(normalized)
  );
}

function isPinkChairSpinObjectName(name) {
  const normalized = normalizeGltfName(name);
  return (
    normalized === PINK_CHAIR_OBJECT_NAME ||
    PINK_CHAIR_BASE_NAMES.has(normalized)
  );
}

function isInPinkChairHierarchy(object) {
  let current = object;
  while (current) {
    if (isPinkChairObjectName(current.name)) return true;
    current = current.parent;
  }
  return false;
}

function isPinkChairHideTarget(object) {
  if (!object) return false;
  if (object.isMesh && isPinkChairObjectName(object.name)) return true;
  return isInPinkChairHierarchy(object);
}

function isPinkChairMesh(objectOrName) {
  if (typeof objectOrName === "string") {
    return isPinkChairObjectName(objectOrName);
  }
  if (!objectOrName?.isMesh) return false;
  const nodeName = getGltfNodeName(objectOrName);
  return isPinkChairObjectName(nodeName) || isInPinkChairHierarchy(objectOrName);
}

function collectPinkChairHideObjects(root = room) {
  pinkChairHideObjects = [];
  if (!root) return pinkChairHideObjects;

  root.traverse((child) => {
    if (child.isMesh && isPinkChairHideTarget(child)) {
      pinkChairHideObjects.push(child);
    }
  });

  return pinkChairHideObjects;
}

function findPinkChairObject(root = room) {
  if (!root) return null;

  let primaryMesh = null;
  let fallback = null;
  root.traverse((child) => {
    if (!isPinkChairObjectName(child.name)) return;
    fallback = child;
    if (child.isMesh && normalizeGltfName(child.name) === PINK_CHAIR_OBJECT_NAME) {
      primaryMesh = child;
    }
  });

  return primaryMesh || fallback;
}

function getPinkChairObject() {
  return pinkChairGroup || findPinkChairObject();
}

function getGltfNodeName(object) {
  const ownName = normalizeGltfName(object?.name || "");
  if (ownName.startsWith("Plane.") || ownName.startsWith("Cylinder.")) {
    return ownName;
  }

  let current = object?.parent;
  while (current) {
    const name = normalizeGltfName(current.name || "");
    if (name.startsWith("Plane.") || name.startsWith("Cylinder.")) {
      return name;
    }
    current = current.parent;
  }
  return normalizeGltfName(object?.parent?.name || "");
}

function setupPinkChairFromScene(sceneRoot) {
  const pinkChair = findPinkChairObject(sceneRoot);
  if (!pinkChair) {
    console.warn(
      `[portfolio ${BUILD_VERSION}] Pink chair "${PINK_CHAIR_OBJECT_NAME}" not found in room.glb`
    );
    return false;
  }

  pinkChairGroup = pinkChair;
  collectPinkChairHideObjects(sceneRoot);
  for (const mesh of pinkChairHideObjects) preparePinkChair(mesh);
  setPinkChairVisible(true);
  console.info(`[portfolio ${BUILD_VERSION} pink-chair]`, {
    root: pinkChair.name,
    hideMeshes: pinkChairHideObjects.map((mesh) => mesh.name),
  });
  return true;
}

function isLaptopScreenMesh(object) {
  if (!object?.isMesh || !object.visible) return false;
  if (getGltfNodeName(object) === "Plane.497") return false;

  const nodeName = getGltfNodeName(object);
  if (nodeName === "Plane.130" || nodeName === "Plane.131") return true;
  if (!matchesMeshLabel(object, LAPTOP_SCREEN_LABELS)) return false;

  const center = new THREE.Box3()
    .setFromObject(object)
    .getCenter(new THREE.Vector3());
  return center.x <= 40;
}

function isMainMonitorMesh(object) {
  if (!object?.isMesh || !object.visible) return false;
  return MAIN_MONITOR_NAMES.has(getGltfNodeName(object));
}

function isKeyboardMesh(object) {
  if (!object?.isMesh || !object.visible) return false;
  const nodeName = getGltfNodeName(object);
  return KEYBOARD_NODE_PATTERN.test(nodeName);
}

function isDeskLampMesh(object) {
  if (!object?.isMesh || !object.visible) return false;
  return DESK_LAMP_NODE_LABELS.has(getGltfNodeName(object));
}

function isDeskFramingMesh(object) {
  return (
    isLaptopScreenMesh(object) ||
    isKeyboardMesh(object) ||
    isDeskLampMesh(object)
  );
}

function setPointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function getProjectedFaceRect(mesh, viewCamera = camera) {
  const quad = getMeshScreenFaceQuad(mesh, viewCamera);
  if (!quad) return null;
  return quad.rect;
}

function getLocalFaceNormalTowardCamera(mesh, viewCamera = camera) {
  mesh.updateMatrixWorld(true);
  if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
  const worldCenter = mesh.geometry.boundingBox
    .getCenter(new THREE.Vector3())
    .applyMatrix4(mesh.matrixWorld);
  const toCamera = viewCamera.position.clone().sub(worldCenter).normalize();
  const inverseQuaternion = mesh.getWorldQuaternion(new THREE.Quaternion()).invert();
  const localToCamera = toCamera.clone().applyQuaternion(inverseQuaternion);

  const localNormals = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
  ];

  let bestNormal = localNormals[0];
  let bestDot = -Infinity;
  for (const normal of localNormals) {
    const dot = normal.dot(localToCamera);
    if (dot > bestDot) {
      bestDot = dot;
      bestNormal = normal;
    }
  }

  return bestNormal;
}

function getLocalFaceCorners(localBox, faceNormalLocal) {
  const { min, max } = localBox;
  const axis = Math.abs(faceNormalLocal.x) > 0.9
    ? "x"
    : Math.abs(faceNormalLocal.y) > 0.9
      ? "y"
      : "z";
  const positive = (axis === "x" ? faceNormalLocal.x : axis === "y" ? faceNormalLocal.y : faceNormalLocal.z) > 0;
  const faceValue = axis === "x" ? (positive ? max.x : min.x) : axis === "y" ? (positive ? max.y : min.y) : positive ? max.z : min.z;

  const pairs =
    axis === "x"
      ? [
          [min.y, min.z],
          [max.y, min.z],
          [max.y, max.z],
          [min.y, max.z],
        ]
      : axis === "y"
        ? [
            [min.x, min.z],
            [max.x, min.z],
            [max.x, max.z],
            [min.x, max.z],
          ]
        : [
            [min.x, min.y],
            [max.x, min.y],
            [max.x, max.y],
            [min.x, max.y],
          ];

  return pairs.map(([a, b]) => {
    const corner = new THREE.Vector3();
    if (axis === "x") corner.set(faceValue, a, b);
    else if (axis === "y") corner.set(a, faceValue, b);
    else corner.set(a, b, faceValue);
    return corner;
  });
}

function getMeshScreenFaceQuad(mesh, viewCamera = camera, coverage = 0.9) {
  if (!mesh?.isMesh) return null;

  const canvasRect = renderer.domElement.getBoundingClientRect();
  mesh.updateMatrixWorld(true);
  if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();

  const localBox = mesh.geometry.boundingBox;
  const faceNormalLocal = getLocalFaceNormalTowardCamera(mesh, viewCamera);
  const localCorners = getLocalFaceCorners(localBox, faceNormalLocal);
  const faceCenter = new THREE.Vector3();
  for (const corner of localCorners) faceCenter.add(corner);
  faceCenter.multiplyScalar(1 / localCorners.length);

  const shrunkCorners = localCorners.map((corner) =>
    faceCenter.clone().add(corner.clone().sub(faceCenter).multiplyScalar(coverage))
  );

  const screenCorners = shrunkCorners.map((corner) => {
    const worldCorner = corner.clone().applyMatrix4(mesh.matrixWorld);
    const projected = worldCorner.project(viewCamera);
    if (projected.z < -1 || projected.z > 1) return null;
    return {
      x: canvasRect.left + (projected.x * 0.5 + 0.5) * canvasRect.width,
      y: canvasRect.top + (-projected.y * 0.5 + 0.5) * canvasRect.height,
    };
  });

  if (screenCorners.some((corner) => !corner)) return null;

  const [topLeft, topRight, bottomRight, bottomLeft] = screenCorners;
  const minX = Math.min(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
  const maxX = Math.max(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
  const minY = Math.min(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
  const maxY = Math.max(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);

  return {
    corners: screenCorners,
    rect: {
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY,
    },
    width: Math.hypot(topRight.x - topLeft.x, topRight.y - topLeft.y),
    height: Math.hypot(bottomLeft.x - topLeft.x, bottomLeft.y - topLeft.y),
    angle:
      (Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180) /
      Math.PI,
  };
}

function trimRectToAspect(rect, aspect, coverage = 0.9) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let width = rect.width * coverage;
  let height = width / aspect;

  if (height > rect.height * coverage) {
    height = rect.height * coverage;
    width = height * aspect;
  }

  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
  };
}

function quadToScreenOverlay(quad, coverage = 1) {
  if (!quad) return null;

  const { left, top, width, height } = quad.rect;
  const fitWidth = width * coverage;
  const fitHeight = height * coverage;

  return {
    left: left + (width - fitWidth) / 2,
    top: top + (height - fitHeight) / 2,
    width: fitWidth,
    height: fitHeight,
    angle: 0,
  };
}

function setMonitorDesktopInteractive(active) {
  if (!monitorScreen) return;
  monitorScreen.classList.toggle("is-active", active);
  if (!active) {
    monitorScreen.hidden = true;
  }
}

function updateMonitorScreenOverlay() {
  if (!monitorScreen || !monitorScreenFrame) return;

  if (!isDeskView || isAnimating) {
    monitorScreen.hidden = true;
    monitorScreen.style.transform = "";
    return;
  }

  const canvasRect = renderer.domElement.getBoundingClientRect();
  const fallback = {
    left: canvasRect.left + canvasRect.width * DESK_MONITOR_OVERLAY.left,
    top: canvasRect.top + canvasRect.height * DESK_MONITOR_OVERLAY.top,
    width: canvasRect.width * DESK_MONITOR_OVERLAY.width,
    height: canvasRect.height * DESK_MONITOR_OVERLAY.height,
    angle: 0,
  };
  const screenInset = isMonitorCloseUpView
    ? MONITOR_CLOSEUP_SCREEN_INSET
    : MONITOR_SCREEN_INSET;
  const overlayCoverage = isMonitorCloseUpView
    ? MONITOR_CLOSEUP_OVERLAY_COVERAGE
    : 1;
  const quad = monitorDesktop?.screenMesh
    ? getMeshScreenFaceQuad(
        monitorDesktop.screenMesh,
        camera,
        screenInset
      )
    : null;
  const overlay = quadToScreenOverlay(quad, overlayCoverage) || fallback;
  const scaleX = overlay.width / MONITOR_DESKTOP_PX.width;
  const scaleY = overlay.height / MONITOR_DESKTOP_PX.height;

  monitorScreen.hidden = false;
  monitorScreen.style.left = `${overlay.left}px`;
  monitorScreen.style.top = `${overlay.top}px`;
  monitorScreen.style.width = `${overlay.width}px`;
  monitorScreen.style.height = `${overlay.height}px`;
  monitorScreen.style.transform = isMonitorCloseUpView
    ? `translate(${MONITOR_CLOSEUP_OVERLAY_SHIFT_X}px, ${MONITOR_CLOSEUP_OVERLAY_SHIFT_Y}px)`
    : "";
  monitorScreenFrame.style.transform = `scale(${scaleX}, ${scaleY})`;
}

function isMainMonitorScreenMesh(mesh) {
  if (!mesh?.isMesh) return false;
  const nodeName = getGltfNodeName(mesh);
  const meshName = normalizeGltfName(mesh.name || "");
  return (
    MAIN_MONITOR_SCREEN_NODES.has(nodeName) ||
    MAIN_MONITOR_SCREEN_MESHES.has(meshName)
  );
}

function scoreMainMonitorScreenMesh(mesh) {
  const sourceMaterial = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  const textured = hasUsableScreenTexture(sourceMaterial);
  const nodeName = getGltfNodeName(mesh);
  const meshName = normalizeGltfName(mesh.name || "");
  return (
    (textured ? 100 : 0) +
    (nodeName === "Plane.013" || meshName === "Plane013" ? 15 : 0) +
    (MAIN_MONITOR_SCREEN_NODES.has(nodeName) ? 5 : 0)
  );
}

function isVerticalMonitorScreenMesh(mesh) {
  if (!mesh?.isMesh) return false;
  const nodeName = getGltfNodeName(mesh);
  const meshName = normalizeGltfName(mesh.name || "");

  if (
    VERTICAL_MONITOR_RESUME_NODES.has(nodeName) ||
    VERTICAL_MONITOR_RESUME_MESHES.has(meshName)
  ) {
    return true;
  }

  if (nodeName === "Plane.014" || meshName === "Plane014") {
    const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    return hasUsableScreenTexture(mat);
  }

  return false;
}

function isPaletteStripMap(map) {
  const image = map?.image;
  if (!image) return false;
  const height = image.height || 0;
  const width = image.width || 0;
  return height > 0 && height <= 8 && width >= 64;
}

function isPaletteMaterial(material) {
  return /palette/i.test(material?.name || "");
}

function hasRealScreenTexture(material) {
  return (
    material?.map &&
    !(isPaletteMaterial(material) && isPaletteStripMap(material.map))
  );
}

function hasUsableScreenTexture(material) {
  if (!material?.map?.image) return false;
  if (isPaletteMaterial(material) && isPaletteStripMap(material.map)) return false;
  const { width = 0, height = 0 } = material.map.image;
  return width > 32 && height > 32;
}

function configureScreenMap(map, maxAnisotropy) {
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAnisotropy;
  map.minFilter = THREE.LinearFilter;
  map.magFilter = THREE.LinearFilter;
  map.generateMipmaps = true;
  map.needsUpdate = true;
  renderer.initTexture(map);
  return map;
}

function makeScreenMaterial({ map = null, color = null, maxAnisotropy }) {
  if (map) {
    configureScreenMap(map, maxAnisotropy);
    return new THREE.MeshBasicMaterial({
      map,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
  }

  if (color === null) return null;

  return new THREE.MeshBasicMaterial({
    color,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
}

function applyScreenMaterial(mesh, options, maxAnisotropy) {
  const material = makeScreenMaterial({ ...options, maxAnisotropy });
  if (!material) return false;
  mesh.material = material;
  return true;
}

function prepareVerticalMonitorScreen(root) {
  let screenMesh = null;
  let bestScore = -1;
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  root.traverse((child) => {
    if (!isVerticalMonitorScreenMesh(child)) return;

    const sourceMaterial = Array.isArray(child.material)
      ? child.material[0]
      : child.material;
    const textured = hasUsableScreenTexture(sourceMaterial);
    const nodeName = getGltfNodeName(child);
    const score =
      (textured ? 100 : 0) +
      (VERTICAL_MONITOR_RESUME_NODES.has(nodeName) ? 10 : 0) +
      (VERTICAL_MONITOR_RESUME_MESHES.has(normalizeGltfName(child.name || ""))
        ? 5
        : 0);

    if (score < bestScore) return;
    bestScore = score;

    applyScreenMaterial(
      child,
      textured
        ? { map: sourceMaterial.map }
        : { color: VERTICAL_MONITOR_FALLBACK_COLOR },
      maxAnisotropy
    );
    child.userData.monitorScreenMode = textured ? "textured" : "black-fallback";
    screenMesh = child;
  });

  console.info(`[portfolio ${BUILD_VERSION} vertical-monitor-screen]`, {
    mesh: screenMesh?.name || null,
    node: screenMesh ? getGltfNodeName(screenMesh) : null,
    mode: screenMesh?.userData?.monitorScreenMode || "missing",
    anisotropy: maxAnisotropy,
  });

  return screenMesh;
}

async function prepareBakedMonitorScreen(root) {
  let screenMesh = null;
  let bestScore = -1;
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const textureLoader = new THREE.TextureLoader();

  root.traverse((child) => {
    if (!isMainMonitorScreenMesh(child)) return;

    const score = scoreMainMonitorScreenMesh(child);
    if (score < bestScore) return;
    bestScore = score;
    screenMesh = child;
  });

  if (!screenMesh) {
    console.warn(`[portfolio ${BUILD_VERSION}] Main monitor screen mesh not found`);
    return null;
  }

  const sourceMaterial = Array.isArray(screenMesh.material)
    ? screenMesh.material[0]
    : screenMesh.material;
  let mode = "fallback-image";

  if (hasRealScreenTexture(sourceMaterial)) {
    applyScreenMaterial(screenMesh, { map: sourceMaterial.map }, maxAnisotropy);
    mode = "glb-texture";
  } else {
    try {
      const map = await textureLoader.loadAsync(
        `${MAIN_MONITOR_WALLPAPER_URL}?v=${BUILD_VERSION}`
      );
      applyScreenMaterial(screenMesh, { map }, maxAnisotropy);
    } catch (err) {
      console.warn(
        `[portfolio ${BUILD_VERSION}] Main monitor wallpaper failed`,
        err
      );
    }
  }

  console.info(`[portfolio ${BUILD_VERSION} monitor-screen]`, {
    mesh: screenMesh.name,
    node: getGltfNodeName(screenMesh),
    mode,
    anisotropy: maxAnisotropy,
  });

  return screenMesh;
}

const MINI_DESK_MESH_NAMES = new Set(["Plane081", "Plane.081"]);

function isMiniDeskMesh(mesh) {
  if (!mesh?.isMesh) return false;
  return (
    MINI_DESK_MESH_NAMES.has(mesh.name) ||
    getGltfNodeName(mesh) === "Plane.081"
  );
}

function isDeskCandleGlassMesh(mesh) {
  if (!mesh?.isMesh) return false;
  const nodeName = getGltfNodeName(mesh);
  return DESK_CANDLE_GLASS_NAMES.has(nodeName);
}

function setupMiniDesk(root) {
  root.traverse((child) => {
    if (!isMiniDeskMesh(child)) return;

    child.visible = true;
    child.renderOrder = 0;
    applySmoothShading(child);
  });

  console.info(`[portfolio ${BUILD_VERSION} mini-desk]`, {
    mesh: "Plane.081",
    mode: "blender-export",
  });
}

function setupDeskCandleGlass(root) {
  let count = 0;
  root.traverse((child) => {
    if (!isDeskCandleGlassMesh(child)) return;
    if (child.geometry) child.geometry.computeVertexNormals();
    child.material = makeDeskCandleGlassMaterial();
    child.renderOrder = 6;
    child.visible = true;
    count += 1;
  });

  console.info(`[portfolio ${BUILD_VERSION} desk-candle-glass]`, {
    meshes: count,
    targets: [...DESK_CANDLE_GLASS_NAMES],
  });
}

function meshMatchesNodeName(mesh, name) {
  if (!mesh?.isMesh) return false;
  const normalized = normalizeGltfName(mesh.name || "");
  return (
    getGltfNodeName(mesh) === name ||
    normalized === name ||
    mesh.name === name ||
    mesh.name === name.replace(".", "")
  );
}

function findDeskKeyboardMesh(root) {
  if (!root) return null;

  for (const name of DESK_KEYBOARD_NODE_NAMES) {
    let found = null;
    root.traverse((child) => {
      if (found || !child.isMesh) return;
      if (meshMatchesNodeName(child, name)) found = child;
    });
    if (found) return found;
  }

  let fallback = null;
  root.traverse((child) => {
    if (fallback || !child.isMesh) return;
    if (isKeyboardMesh(child)) fallback = child;
  });
  return fallback;
}

function getDeskKeyboardMesh() {
  if (monitorDesktop?.keyboardMesh) return monitorDesktop.keyboardMesh;
  if (!room) return null;

  const keyboardMesh = findDeskKeyboardMesh(room);
  if (keyboardMesh && monitorDesktop) {
    monitorDesktop.keyboardMesh = keyboardMesh;
  }
  return keyboardMesh;
}

function findDeskMouseMesh(root) {
  if (!root) return null;

  let found = null;
  root.traverse((child) => {
    if (found || !child.isMesh) return;
    if (getGltfNodeName(child) === "Plane.1136") found = child;
  });
  return found;
}

function getDeskMouseMesh() {
  if (monitorDesktop?.mouseMesh) return monitorDesktop.mouseMesh;
  if (!room) return null;

  const mouseMesh = findDeskMouseMesh(room);
  if (mouseMesh && monitorDesktop) {
    monitorDesktop.mouseMesh = mouseMesh;
  }
  return mouseMesh;
}

function isPlausibleDeskMouseAnchor(anchor) {
  return (
    anchor.x > 20.5 &&
    anchor.x < 24 &&
    anchor.y > 31.5 &&
    anchor.y < 34.5 &&
    anchor.z > 0 &&
    anchor.z < 3.5
  );
}

function getDeskMouseAnchorWorld() {
  const mouseMesh = getDeskMouseMesh();
  if (mouseMesh) {
    mouseMesh.updateMatrixWorld(true);
    const mouseBox = new THREE.Box3().setFromObject(mouseMesh);
    const mouseCenter = mouseBox.getCenter(new THREE.Vector3());
    const anchor = new THREE.Vector3(
      mouseCenter.x,
      mouseBox.max.y + 0.05,
      mouseCenter.z
    );
    if (isPlausibleDeskMouseAnchor(anchor)) return anchor;
  }

  return FALLBACK_DESK_MOUSE_CURSOR.clone();
}

function getDeskMouseScreenCenter() {
  const rect = renderer.domElement.getBoundingClientRect();

  return {
    x: rect.left + rect.width * DESK_MOUSE_CURSOR_SCREEN.x,
    y: rect.top + rect.height * DESK_MOUSE_CURSOR_SCREEN.y,
  };
}

function attachMouseClickMesh() {
  if (!room) return;

  if (mouseClickMesh) {
    mouseClickMesh.removeFromParent();
    mouseClickMesh.geometry.dispose();
    mouseClickMesh = null;
  }

  const anchor = getDeskMouseAnchorWorld();
  if (!anchor) return;

  mouseClickMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.55, 0.95),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  mouseClickMesh.name = "deskMouseClickMesh";
  mouseClickMesh.position.copy(worldToRoomLocal(anchor));
  room.add(mouseClickMesh);
}

function syncMouseClickMesh() {
  if (!mouseClickMesh || !room) return;

  const anchor = getDeskMouseAnchorWorld();
  if (!anchor) return;

  mouseClickMesh.position.copy(worldToRoomLocal(anchor));
}

function setupMainMonitorDesktop(root) {
  let screenMesh = null;
  const preferred = ["Plane.013", "Plane.994", "Plane.780", "Plane.149", "Plane.132"];
  for (const preferredName of preferred) {
    root.traverse((child) => {
      if (screenMesh || !child.isMesh) return;
      if (getGltfNodeName(child) === preferredName) {
        screenMesh = child;
      }
    });
  }

  if (!screenMesh) {
    console.warn(
      `[portfolio ${BUILD_VERSION}] Main monitor mesh not found for desktop UI`
    );
    return null;
  }

  if (monitorScreenFrame) {
    monitorScreenFrame.src = `/monitor-desktop.html?v=${BUILD_VERSION}`;
    postMonitorAssets();
  }

  const keyboardMesh = findDeskKeyboardMesh(root);
  const mouseMesh = findDeskMouseMesh(root);
  monitorDesktop = {
    screenMesh,
    keyboardMesh,
    mouseMesh,
  };
  attachMouseClickMesh();

  if (!monitorDesktop.mouseMesh) {
    console.warn(
      `[portfolio ${BUILD_VERSION}] Desk mouse mesh not found; using fallback mouse cursor position`
    );
  } else if (!monitorDesktop.keyboardMesh) {
    console.warn(
      `[portfolio ${BUILD_VERSION}] Desk keyboard mesh not found; using fallback mouse cursor position`
    );
  }

  console.info(`[portfolio ${BUILD_VERSION} monitor-desktop]`, {
    mesh: screenMesh.name,
    keyboardMesh: monitorDesktop.keyboardMesh?.name || null,
    mouseMesh: monitorDesktop.mouseMesh?.name || null,
    mouseAnchor: getDeskMouseAnchorWorld()?.toArray() || null,
    mode: "screen-overlay",
  });

  return monitorDesktop;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function setControlsInteractive(enabled) {
  controls.enableRotate = enabled;
  controls.enablePan = enabled;
  controls.enableZoom = enabled;
}

function setOrbitDistanceLimits(min, max) {
  controls.minDistance = min;
  controls.maxDistance = max;
}

function showPinkChairInScene() {
  for (const { object, parent } of pinkChairRestoreList) {
    parent.add(object);
    object.visible = true;
    object.traverse((child) => {
      child.visible = true;
    });
  }
  pinkChairRestoreList = [];

  for (const mesh of pinkChairHideObjects) {
    mesh.visible = true;
  }

  if (!chairSpinPivot?.parent && pinkChairHideObjects.length) {
    setupChairSpin();
  }
}

function hidePinkChairFromScene() {
  if (pinkChairRestoreList.length > 0) return;

  if (!pinkChairHideObjects.length) {
    collectPinkChairHideObjects();
  }

  if (chairSpinPivot?.parent) {
    pinkChairRestoreList.push({
      object: chairSpinPivot,
      parent: chairSpinPivot.parent,
    });
    chairSpinPivot.parent.remove(chairSpinPivot);
  }

  for (const mesh of pinkChairHideObjects) {
    if (mesh.parent === chairSpinPivot) continue;
    if (!mesh.parent) continue;
    if (pinkChairRestoreList.some((entry) => entry.object === mesh)) continue;

    mesh.visible = false;
    pinkChairRestoreList.push({ object: mesh, parent: mesh.parent });
    mesh.parent.remove(mesh);
  }
}

function setPinkChairVisible(visible) {
  if (!room) return;
  if (visible) showPinkChairInScene();
  else hidePinkChairFromScene();
}

function setDeskViewUi(active) {
  isDeskView = active;
  if (!active) isMonitorCloseUpView = false;

  backBtn.hidden = !active;
  chairCursor.hidden = true;
  recordCursor.hidden = true;
  monitorCursor.hidden = !active || isMonitorCloseUpView;
  hint.classList.toggle("is-hidden", active);
  hint.textContent = active
    ? isMonitorCloseUpView
      ? "Click the desktop icons"
      : "Click the mouse to zoom into the monitor"
    : ROOM_HINT;

  setMonitorDesktopInteractive(active && isMonitorCloseUpView);

  if (!active) setPinkChairVisible(true);

  if (active) {
    controls.enabled = false;
    if (isMonitorCloseUpView) lockMonitorCloseUpCamera();
    else lockDeskCamera();
    setOrbitDistanceLimits(DESK_MIN_DISTANCE, DESK_MAX_DISTANCE);
    setControlsInteractive(false);
    return;
  }

  controls.enabled = true;
  setOrbitDistanceLimits(ROOM_MIN_DISTANCE, ROOM_MAX_DISTANCE);
  setControlsInteractive(true);
}

function setMonitorCloseUpUi(active) {
  isMonitorCloseUpView = active;
  monitorCursor.hidden = active;
  hint.textContent = active
    ? "Click the desktop icons"
    : "Click the mouse to zoom into the monitor";
  setMonitorDesktopInteractive(active);
  applyMonitorCloseUpCamera();
}

function animateCameraTo(destination, onComplete, { endFov = null, duration = CAMERA_TWEEN_MS } = {}) {
  if (cameraTween) cancelAnimationFrame(cameraTween);

  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const endPosition = destination.position;
  const endTarget = destination.target;
  const startQuaternion = camera.quaternion.clone();
  const endQuaternion = destination.quaternion?.clone();
  const startFov = camera.fov;
  const targetFov = endFov ?? startFov;
  const startedAt = performance.now();
  isAnimating = true;
  controls.enabled = false;
  setControlsInteractive(false);
  chairCursor.hidden = true;
  monitorCursor.hidden = true;

  const step = (now) => {
    const raw = Math.min((now - startedAt) / duration, 1);
    const t = easeInOutCubic(raw);

    camera.position.lerpVectors(startPosition, endPosition, t);
    camera.fov = THREE.MathUtils.lerp(startFov, targetFov, t);
    camera.updateProjectionMatrix();

    if (endQuaternion) {
      camera.quaternion.slerpQuaternions(startQuaternion, endQuaternion, t);
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(camera.quaternion)
        .normalize();
      controls.target.copy(camera.position.clone().add(forward));
    } else {
      controls.target.lerpVectors(startTarget, endTarget, t);
      camera.lookAt(controls.target);
    }

    if (raw < 1) {
      cameraTween = requestAnimationFrame(step);
      return;
    }

    camera.position.copy(endPosition);
    camera.fov = targetFov;
    camera.updateProjectionMatrix();
    if (endQuaternion) {
      camera.quaternion.copy(endQuaternion);
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(camera.quaternion)
        .normalize();
      controls.target.copy(camera.position.clone().add(forward));
    } else {
      controls.target.copy(endTarget);
      camera.lookAt(endTarget);
    }
    isAnimating = false;
    cameraTween = null;
    onComplete?.();
  };

  cameraTween = requestAnimationFrame(step);
}

function getLaptopScreenCenters(roomObject) {
  const screens = [];

  roomObject.traverse((child) => {
    if (!isLaptopScreenMesh(child)) return;
    screens.push(
      new THREE.Box3().setFromObject(child).getCenter(new THREE.Vector3())
    );
  });

  return screens;
}

function findDeskFramingBox(roomObject) {
  let framingBox = null;

  roomObject.traverse((child) => {
    if (!isDeskFramingMesh(child)) return;

    const box = new THREE.Box3().setFromObject(child);
    framingBox = framingBox ? framingBox.union(box) : box.clone();
  });

  return framingBox;
}

function applyDeskCameraPreset() {
  deskView.position.copy(DESK_CAMERA_POSITION);

  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(DESK_CAMERA_ROTATION_DEG[0]),
    THREE.MathUtils.degToRad(DESK_CAMERA_ROTATION_DEG[1]),
    THREE.MathUtils.degToRad(DESK_CAMERA_ROTATION_DEG[2]),
    "XYZ"
  );
  deskView.quaternion.setFromEuler(euler);

  const forward = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(deskView.quaternion)
    .normalize();
  deskView.target.copy(deskView.position.clone().add(forward.multiplyScalar(20)));
}

function applyDeskCamera(roomObject) {
  applyDeskCameraPreset();
}

function findLaptopScreenBox(roomObject) {
  let screenBox = null;

  roomObject.traverse((child) => {
    if (!isLaptopScreenMesh(child)) return;

    const box = new THREE.Box3().setFromObject(child);
    screenBox = screenBox ? screenBox.union(box) : box.clone();
  });

  return screenBox;
}

function applyMonitorDeskCamera(roomObject) {
  applyDeskCamera(roomObject);
}

function applyMonitorDeskZone(roomObject) {
  const screenBox = findLaptopScreenBox(roomObject);
  if (!screenBox) return;

  deskZone = {
    min: new THREE.Vector3(
      screenBox.min.x - 4,
      screenBox.min.y - 4,
      screenBox.min.z - 3
    ),
    max: new THREE.Vector3(
      screenBox.max.x + 4,
      screenBox.max.y + 4,
      screenBox.max.z + 3
    ),
  };
}

function applyMonitorCloseUpCamera() {
  applyDeskCameraPreset();

  const screenMesh = monitorDesktop?.screenMesh;
  if (!screenMesh) {
    monitorCloseUpView.position.copy(deskView.position);
    monitorCloseUpView.quaternion.copy(deskView.quaternion);
    monitorCloseUpView.target.copy(deskView.target);
    return;
  }

  room.updateMatrixWorld(true);
  screenMesh.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(screenMesh);
  const center = box.getCenter(new THREE.Vector3());
  const viewRight = new THREE.Vector3(1, 0, 0)
    .applyQuaternion(deskView.quaternion)
    .normalize();
  const viewUp = new THREE.Vector3(0, 1, 0)
    .applyQuaternion(deskView.quaternion)
    .normalize();
  const viewDir = center.clone().sub(deskView.position).normalize();
  const deskToScreen = deskView.position.distanceTo(center);
  const closeOffset = Math.max(deskToScreen * MONITOR_CLOSEUP_CAMERA_FACTOR, 10);

  monitorCloseUpView.position
    .copy(center)
    .sub(viewDir.multiplyScalar(closeOffset))
    .add(viewRight.multiplyScalar(MONITOR_CLOSEUP_VIEW_SHIFT_X))
    .sub(viewUp.multiplyScalar(MONITOR_CLOSEUP_VIEW_SHIFT_Y));
  monitorCloseUpView.quaternion.copy(deskView.quaternion);

  const forward = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(monitorCloseUpView.quaternion)
    .normalize();
  monitorCloseUpView.target.copy(
    monitorCloseUpView.position.clone().add(forward.multiplyScalar(20))
  );
}

function applyLaptopDeskView(roomObject) {
  roomObject.updateMatrixWorld(true);
  applyMonitorDeskCamera(roomObject);
  applyMonitorDeskZone(roomObject);
}

function lockDeskCamera() {
  camera.position.copy(deskView.position);
  camera.quaternion.copy(deskView.quaternion);
  const forward = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(deskView.quaternion)
    .normalize();
  controls.target.copy(deskView.position.clone().add(forward));
}

function lockMonitorCloseUpCamera() {
  camera.position.copy(monitorCloseUpView.position);
  camera.quaternion.copy(monitorCloseUpView.quaternion);
  const forward = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(monitorCloseUpView.quaternion)
    .normalize();
  controls.target.copy(monitorCloseUpView.position.clone().add(forward));
}

function goToDeskView() {
  if (isDeskView || isAnimating || !room) return;
  setPinkChairVisible(false);
  applyLaptopDeskView(room);
  console.info(`[portfolio ${BUILD_VERSION} monitor-cam]`, {
    camera: deskView.position.toArray(),
    target: deskView.target.toArray(),
    quaternion: deskView.quaternion.toArray(),
  });
  animateCameraTo(deskView, () => {
    setDeskViewUi(true);
    setMonitorCloseUpUi(false);
    if (pendingDockItem) {
      postOpenDockItem(pendingDockItem);
      pendingDockItem = null;
    }
  }, { endFov: DESK_FOV });
}

function goToMonitorCloseUpView() {
  if (!isDeskView || isMonitorCloseUpView || isAnimating || !room) return;

  applyMonitorCloseUpCamera();
  console.info(`[portfolio ${BUILD_VERSION} monitor-closeup-cam]`, {
    camera: monitorCloseUpView.position.toArray(),
    target: monitorCloseUpView.target.toArray(),
    quaternion: monitorCloseUpView.quaternion.toArray(),
  });

  animateCameraTo(monitorCloseUpView, () => {
    setMonitorCloseUpUi(true);
  }, { endFov: MONITOR_CLOSEUP_FOV, duration: CAMERA_TWEEN_MS });
}

function goToDeskViewFromCloseUp() {
  if (!isMonitorCloseUpView || isAnimating) return;

  animateCameraTo(deskView, () => {
    setMonitorCloseUpUi(false);
  }, { endFov: DESK_FOV });
}

function goToRoomView() {
  if (!isDeskView || isAnimating || isMonitorCloseUpView) return;
  animateCameraTo(roomView, () => setDeskViewUi(false), { endFov: ROOM_FOV });
}

function handleBackNavigation() {
  if (isMonitorCloseUpView) goToDeskViewFromCloseUp();
  else if (isDeskView) goToRoomView();
}

function isInsideDeskZone(point) {
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

function worldToRoomLocal(worldPosition) {
  const local = worldPosition.clone();
  room.worldToLocal(local);
  return local;
}

function findMeshWorldBox(roomObject, matcher) {
  let result = null;
  roomObject.traverse((child) => {
    if (!child.isMesh || !child.visible || !matcher(child)) return;
    const box = new THREE.Box3().setFromObject(child);
    result = result ? result.union(box) : box.clone();
  });
  return result;
}

function getPinkChairWorldBox() {
  if (!pinkChairGroup) return null;

  pinkChairGroup.updateMatrixWorld(true);
  let chairMesh = null;
  pinkChairGroup.traverse((child) => {
    if (child.isMesh && child.visible && isPinkChairMesh(child)) {
      chairMesh = child;
    }
  });
  if (!chairMesh) return null;

  chairMesh.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(chairMesh);
}

function getPinkChairCursorWorld() {
  return CHAIR_CURSOR_WORLD.clone();
}

function attachChairCursorAnchor(chairCursorWorld) {
  if (!room) return;

  if (chairAnchor) chairAnchor.removeFromParent();
  room.updateMatrixWorld(true);
  chairAnchor = new THREE.Object3D();
  chairAnchor.position.copy(worldToRoomLocal(chairCursorWorld));
  room.add(chairAnchor);
}

function setupInteractionViews(roomObject) {
  roomObject.updateMatrixWorld(true);

  const chairCursorWorld = getPinkChairCursorWorld();
  applyLaptopDeskView(roomObject);

  attachChairCursorAnchor(chairCursorWorld);
  if (chairAnchor) chairAnchor.getWorldPosition(chairHintWorld);
  else chairHintWorld.copy(chairCursorWorld);

  if (chairClickMesh) {
    chairClickMesh.removeFromParent();
    chairClickMesh.geometry.dispose();
    chairClickMesh = null;
  }

  chairClickMesh = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 2.5),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  chairClickMesh.position.copy(worldToRoomLocal(chairCursorWorld));
  room.add(chairClickMesh);

  hint.textContent = ROOM_HINT;
  console.info(`[portfolio ${BUILD_VERSION}]`, {
    chairCursor: chairCursorWorld.toArray(),
    deskTarget: deskView.target.toArray(),
    deskCamera: deskView.position.toArray(),
  });
}

function getPinkChairSpinMeshes() {
  return pinkChairHideObjects.filter((mesh) =>
    isPinkChairSpinObjectName(mesh.name)
  );
}

function getChairSpinRotationY(time) {
  if (!document.body.classList.contains("is-room-active")) return 0;

  if (chairEnterStartTime !== null) {
    // Same angular speed as idle sway; π/2 phase starts facing outward (+A).
    return (
      Math.sin((time - chairEnterStartTime) * CHAIR_SPIN_SPEED + Math.PI / 2) *
      CHAIR_SPIN_AMPLITUDE
    );
  }

  return Math.sin(time * CHAIR_SPIN_SPEED) * CHAIR_SPIN_AMPLITUDE;
}

function setupChairSpin() {
  if (!room || !pinkChairHideObjects.length) return;

  if (chairSpinPivot) {
    chairSpinPivot.removeFromParent();
    chairSpinPivot = null;
  }

  const spinMeshes = getPinkChairSpinMeshes();
  if (!spinMeshes.length) return;

  const box = new THREE.Box3();
  for (const mesh of spinMeshes) {
    mesh.updateMatrixWorld(true);
    box.union(new THREE.Box3().setFromObject(mesh));
  }
  if (box.isEmpty()) return;

  chairSpinPivot = new THREE.Object3D();
  chairSpinPivot.name = "pinkChairSpinPivot";
  room.add(chairSpinPivot);

  const spinCenter = box.getCenter(new THREE.Vector3());
  spinCenter.y = box.min.y + (box.max.y - box.min.y) * 0.35;
  room.updateMatrixWorld(true);
  chairSpinPivot.position.copy(room.worldToLocal(spinCenter));

  for (const mesh of spinMeshes) {
    chairSpinPivot.attach(mesh);
  }
}

function intersectPinkChair() {
  if (!room) return [];

  return raycaster
    .intersectObject(room, true)
    .filter((hit) => isPinkChairMesh(hit.object));
}

function getDeskMouseCursorWorld() {
  return getDeskMouseAnchorWorld();
}

function intersectDeskMouse() {
  if (!room || !mouseClickMesh) return [];
  return raycaster.intersectObject(mouseClickMesh, false);
}

function getMainMonitorCursorWorld() {
  const screenMesh = monitorDesktop?.screenMesh;
  if (!screenMesh) return null;

  screenMesh.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(screenMesh).getCenter(new THREE.Vector3());
}

function intersectMainMonitor() {
  const screenMesh = monitorDesktop?.screenMesh;
  if (!room || !screenMesh) return [];
  return raycaster.intersectObject(screenMesh, false);
}

function isRecordPlayerObjectName(name) {
  if (!name) return false;
  const normalized = normalizeGltfName(name);
  return RECORD_PLAYER_NODE_NAMES.has(name) || RECORD_PLAYER_NODE_NAMES.has(normalized);
}

function isRecordPlayerMesh(mesh) {
  if (!mesh?.isMesh) return false;
  if (isRecordPlayerObjectName(mesh.name)) return true;

  let current = mesh.parent;
  while (current) {
    if (isRecordPlayerObjectName(current.name)) return true;
    current = current.parent;
  }

  return false;
}

function setupRecordPlayerAnchor(roomObject) {
  if (!roomObject) return;

  roomObject.updateMatrixWorld(true);
  const box = new THREE.Box3();
  let found = false;

  roomObject.traverse((child) => {
    if (!child.isMesh || !isRecordPlayerMesh(child)) return;
    child.updateMatrixWorld(true);
    box.union(new THREE.Box3().setFromObject(child));
    found = true;
  });

  if (!found || box.isEmpty()) {
    console.warn(`[portfolio ${BUILD_VERSION}] Record player mesh not found`);
    return;
  }

  if (recordPlayerAnchor) recordPlayerAnchor.removeFromParent();
  recordPlayerAnchor = new THREE.Object3D();
  recordPlayerAnchor.name = "recordPlayerAnchor";
  const center = box.getCenter(new THREE.Vector3());
  center.y = box.min.y + (box.max.y - box.min.y) * 0.62;
  recordPlayerAnchor.position.copy(roomObject.worldToLocal(center));
  roomObject.add(recordPlayerAnchor);

  console.info(`[portfolio ${BUILD_VERSION} record-player]`, {
    anchor: center.toArray(),
  });
}

function isRecordVinylObjectName(name) {
  const normalized = normalizeGltfName(name);
  return RECORD_VINYL_NODE_NAMES.has(name) || RECORD_VINYL_NODE_NAMES.has(normalized);
}

function findRecordVinylMesh(root = room) {
  if (!root) return null;

  let vinylMesh = null;
  root.traverse((child) => {
    if (child.isMesh && isRecordVinylObjectName(child.name)) vinylMesh = child;
  });

  return vinylMesh;
}

function getRecordSpinAxisFromBox(box) {
  const size = box.getSize(new THREE.Vector3());
  if (size.x <= size.y && size.x <= size.z) return "x";
  if (size.z <= size.y && size.z <= size.x) return "z";
  return "y";
}

function setupRecordSpin() {
  if (!room) return;

  if (recordSpinPivot) {
    recordSpinPivot.removeFromParent();
    recordSpinPivot = null;
  }

  const vinylMesh = findRecordVinylMesh();
  if (!vinylMesh) {
    console.warn(`[portfolio ${BUILD_VERSION}] Record vinyl mesh not found`);
    return;
  }

  vinylMesh.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(vinylMesh);
  if (box.isEmpty()) return;

  recordSpinAxis = getRecordSpinAxisFromBox(box);
  recordSpinPivot = new THREE.Object3D();
  recordSpinPivot.name = "recordSpinPivot";
  room.add(recordSpinPivot);

  const spinCenter = box.getCenter(new THREE.Vector3());
  room.updateMatrixWorld(true);
  recordSpinPivot.position.copy(room.worldToLocal(spinCenter));
  recordSpinPivot.attach(vinylMesh);

  console.info(`[portfolio ${BUILD_VERSION} record-spin]`, {
    mesh: vinylMesh.name,
    axis: recordSpinAxis,
  });
}

function updateRecordSpin(time) {
  if (!recordSpinPivot || isDeskView) return;

  const spinAngle = -(time / 1000) * RECORD_SPIN_RPS * Math.PI * 2;
  recordSpinPivot.rotation.set(0, 0, 0);
  recordSpinPivot.rotation[recordSpinAxis] = spinAngle;
}

function isPcFanMesh(mesh) {
  if (!mesh?.isMesh) return false;

  const nodeName = getGltfNodeName(mesh);
  const normalized = normalizeGltfName(mesh.name || "");
  return (
    PC_FAN_NODE_NAMES.has(nodeName) ||
    PC_FAN_NODE_NAMES.has(normalized) ||
    PC_FAN_NODE_NAMES.has(mesh.name)
  );
}

function setupPcFanSpins() {
  if (!room) return;

  pcFanSpins = [];

  room.traverse((child) => {
    if (!isPcFanMesh(child)) return;

    const nodeName = getGltfNodeName(child);
    pcFanSpins.push({
      mesh: child,
      mode: PC_FAN_VERTICAL_NODES.has(nodeName) ? "vertical" : "horizontal",
      baseQuaternion: child.quaternion.clone(),
      name: child.name,
    });
  });

  if (!pcFanSpins.length) {
    console.warn(`[portfolio ${BUILD_VERSION}] PC fan meshes not found`);
    return;
  }

  console.info(`[portfolio ${BUILD_VERSION} pc-fan-spin]`, {
    fans: pcFanSpins.map(({ name, mode }) => ({ name, mode })),
    rps: PC_FAN_SPIN_RPS,
  });
}

function updatePcFanSpins(time) {
  if (!pcFanSpins.length) return;

  const spinAngle = -(time / 1000) * PC_FAN_SPIN_RPS * Math.PI * 2;
  for (const { mesh, baseQuaternion } of pcFanSpins) {
    mesh.quaternion.copy(baseQuaternion);
    // Blade normal is local Y; horizontal vs vertical mounts differ only in world orientation.
    pcFanSpinAxisVector.set(0, 1, 0);
    mesh.rotateOnAxis(pcFanSpinAxisVector, spinAngle);
  }
}

function intersectRecordPlayer() {
  if (!room) return [];
  return raycaster.intersectObject(room, true).filter((hit) => isRecordPlayerMesh(hit.object));
}

function updateRecordCursor() {
  const roomActive = document.body.classList.contains("is-room-active");
  if (!room || !recordCursor || !roomActive || isDeskView || isAnimating || !recordPlayerAnchor) {
    if (recordCursor) recordCursor.hidden = true;
    return;
  }

  recordPlayerAnchor.getWorldPosition(recordHintWorld);
  const projected = recordHintWorld.clone().project(camera);
  if (projected.z < -1 || projected.z > 1) {
    recordCursor.hidden = true;
    return;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  const x =
    rect.left + ((projected.x + 1) / 2) * rect.width + RECORD_CURSOR_OFFSET_X;
  const y =
    rect.top + ((-projected.y + 1) / 2) * rect.height + RECORD_CURSOR_OFFSET_Y;

  recordCursor.style.left = `${x}px`;
  recordCursor.style.top = `${y}px`;
  recordCursor.hidden = false;
}

function updateMonitorCursor() {
  if (!room || !isDeskView || isMonitorCloseUpView || isAnimating) {
    if (monitorCursor) monitorCursor.hidden = true;
    return;
  }

  syncMouseClickMesh();
  const screenCenter = getDeskMouseScreenCenter();
  if (!screenCenter || !monitorCursor) {
    if (monitorCursor) monitorCursor.hidden = true;
    return;
  }

  monitorCursor.style.left = `${screenCenter.x}px`;
  monitorCursor.style.top = `${screenCenter.y}px`;
  monitorCursor.hidden = false;
}

function updateChairCursor() {
  if (!room || isDeskView || isAnimating) {
    chairCursor.hidden = true;
    return;
  }

  if (chairAnchor) chairAnchor.getWorldPosition(chairHintWorld);

  const projected = chairHintWorld.clone().project(camera);
  if (projected.z < -1 || projected.z > 1) {
    chairCursor.hidden = true;
    return;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  const x = rect.left + ((projected.x + 1) / 2) * rect.width;
  const y = rect.top + ((-projected.y + 1) / 2) * rect.height;

  chairCursor.style.left = `${x}px`;
  chairCursor.style.top = `${y}px`;
  chairCursor.hidden = false;
}

function isChairHit(object) {
  if (!object) return false;
  if (object === chairClickMesh) return true;
  return isPinkChairMesh(object);
}

backBtn.addEventListener("click", handleBackNavigation);
chairCursor.addEventListener("click", goToDeskView);
monitorCursor?.addEventListener("click", goToMonitorCloseUpView);

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && musicPlayer.playlistOpen) {
    closeMusicPlaylist();
    return;
  }

  if (event.code === "Escape" && (isDeskView || isMonitorCloseUpView)) {
    handleBackNavigation();
  }
});

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!room || isAnimating) {
    renderer.domElement.style.cursor = "default";
    return;
  }

  setPointer(event);
  raycaster.setFromCamera(pointer, camera);

  if (isDeskView) {
    if (isMonitorCloseUpView) {
      renderer.domElement.style.cursor = "default";
      return;
    }

    const monitorHits = intersectMainMonitor();
    const mouseHits = intersectDeskMouse();
    renderer.domElement.style.cursor =
      monitorHits.length > 0 || mouseHits.length > 0 ? "pointer" : "default";
    return;
  }

  const chairHits = chairClickMesh
    ? raycaster.intersectObject(chairClickMesh, false)
    : [];
  const pinkChairHits = intersectPinkChair();
  const recordHits = intersectRecordPlayer();
  const hoveringChair = chairHits.length > 0 || pinkChairHits.length > 0;
  const hoveringRecord = recordHits.length > 0;
  renderer.domElement.style.cursor =
    hoveringChair || hoveringRecord ? "pointer" : "default";
});

renderer.domElement.addEventListener("click", (event) => {
  if (!room || isAnimating) return;
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);

  if (!isDeskView) {
    const chairHits = chairClickMesh
      ? raycaster.intersectObject(chairClickMesh, false)
      : [];
    const pinkChairHits = intersectPinkChair();
    if (chairHits.length || pinkChairHits.length) {
      goToDeskView();
      return;
    }

    if (intersectRecordPlayer().length) {
      openMusicPlaylist();
    }
    return;
  }

  if (
    !isMonitorCloseUpView &&
    (intersectMainMonitor().length || intersectDeskMouse().length)
  ) {
    goToMonitorCloseUpView();
  }
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
const WINDOW_MESH_NAMES = new Set([
  "Cube.002",
  "Cube002",
  "blinds_cream",
  BROKEN_BLINDS_IN_ROOM,
]);
// Floor rug meshes baked into room.glb (also stripped by scripts/remove-floor-rug.mjs)
const HIDDEN_ROOM_OBJECTS = new Set(["greenthing.048", "Cylinder.431"]);

function hideRoomObjects(object) {
  if (!object?.traverse) return;

  object.traverse((child) => {
    const name = child.name || child.userData?.name || "";
    if (!HIDDEN_ROOM_OBJECTS.has(name)) return;
    child.visible = false;
    if (typeof child.traverse === "function") {
      child.traverse((descendant) => {
        descendant.visible = false;
      });
    }
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
    color: 0xf8fbff,
    metalness: 0,
    roughness: 0.22,
    transmission: 0.92,
    thickness: 0.45,
    ior: 1.45,
    specularIntensity: 0.25,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

const GLASS_MESH_NAMES = new Set([
  "Plane.150",
  "Plane.678",
  "Plane.703",
  "Cube.117",
  "Cube.118",
  "Cube.119",
  "Cube.120",
  "Cube.121",
  "Cube.122",
]);

const DESK_CANDLE_GLASS_NAMES = new Set(["Cylinder.509", "Cylinder509"]);

function makeDeskCandleGlassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xf2d0d8,
    metalness: 0,
    roughness: 0.28,
    transmission: 0.82,
    thickness: 0.35,
    ior: 1.45,
    specularIntensity: 0.2,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function applyGlassMaterial(mesh) {
  if (!mesh?.isMesh) return;
  if (mesh.geometry) mesh.geometry.computeVertexNormals();
  mesh.material = makePcGlassMaterial();
  mesh.renderOrder = 5;
  mesh.visible = true;
}

function preparePcGlass(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    const name = child.name || "";
    const verts = child.geometry?.attributes?.position?.count ?? 0;
    if (verts < 200 && !GLASS_MESH_NAMES.has(name)) {
      child.visible = false;
      return;
    }

    applyGlassMaterial(child);
  });
}

function shouldSkipMatteMaterial(mesh) {
  if (!mesh?.isMesh) return true;
  const name = mesh.name || "";
  const normalized = normalizeGltfName(name);
  if (isPcCaseShell(mesh)) return true;
  if (PC_INTERNAL_NAMES.has(name)) return true;
  if (GLASS_MESH_NAMES.has(name) || DESK_CANDLE_GLASS_NAMES.has(name)) return true;
  if (DESK_CANDLE_GLASS_NAMES.has(normalized)) return true;

  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  return materials.some((mat) => mat?.isMeshBasicMaterial);
}

const WOOD_MATERIAL_PATTERN =
  /floor|plank|shelf|wood|record|rp_|ladder|drawer|blind|cream|beige|wall|outside|trim|Material\.051|Material\.013|Material\.031|Material\.032|Material\.041|Material\.042|Material\.043/i;

const ROOF_FRAME_NODE_NAMES = new Set([
  "Plane.159",
  "Plane.160",
  "Plane.171",
  "Plane.172",
  "Plane.173",
  "Plane.174",
  "Plane.175",
  "Plane.176",
  "Plane.177",
  "Plane.178",
  "Plane.179",
  "Plane.180",
  "Plane.181",
  "Plane.080",
  "Plane080",
  "greenthing.071",
]);

function isRoofFrameMesh(mesh) {
  if (!mesh?.isMesh) return false;
  const name = mesh.name || "";
  const normalized = normalizeGltfName(name);
  return ROOF_FRAME_NODE_NAMES.has(name) || ROOF_FRAME_NODE_NAMES.has(normalized);
}

function applyMatteOnly(mat) {
  if (!mat || mat.isMeshBasicMaterial) return;

  mat.metalness = 0;
  mat.roughness = 1;
  mat.flatShading = false;
  if ("specularIntensity" in mat) mat.specularIntensity = 0;
  if ("clearcoat" in mat) mat.clearcoat = 0;
  if ("sheen" in mat) mat.sheen = 0;
  if ("envMap" in mat) mat.envMap = null;
  if ("envMapIntensity" in mat) mat.envMapIntensity = 0;
  if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
}

function darkenRoofFrameMaterial(mat) {
  if (!mat?.color) return;

  if (mat.map) {
    mat.color.setRGB(0.86, 0.8, 0.72);
    return;
  }

  mat.color.r *= 0.82;
  mat.color.g *= 0.8;
  mat.color.b *= 0.76;
}

function prepareRoofFrameMaterials(object) {
  object.traverse((child) => {
    if (!child.isMesh || !isRoofFrameMesh(child)) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    const darkened = materials.map((mat) => {
      if (!mat) return mat;
      const clone = mat.clone();
      applyMatteOnly(clone);
      darkenRoofFrameMaterial(clone);
      return clone;
    });

    child.material = Array.isArray(child.material) ? darkened : darkened[0];
  });
}

function brightenWoodMaterial(mat) {
  if (!mat?.color || mat.isMeshBasicMaterial) return;

  const materialName = mat.name || "";
  if (!WOOD_MATERIAL_PATTERN.test(materialName)) return;

  if (mat.map) {
    mat.color.setRGB(1.32, 1.24, 1.14);
    return;
  }

  mat.color.r = Math.min(mat.color.r * 1.2, 1);
  mat.color.g = Math.min(mat.color.g * 1.18, 1);
  mat.color.b = Math.min(mat.color.b * 1.14, 1);
}

function applyMatteMaterialLook(mat) {
  if (!mat || mat.isMeshBasicMaterial) return;

  mat.metalness = 0;
  mat.roughness = 1;
  mat.flatShading = false;
  if ("specularIntensity" in mat) mat.specularIntensity = 0;
  if ("clearcoat" in mat) mat.clearcoat = 0;
  if ("sheen" in mat) mat.sheen = 0;
  if ("envMap" in mat) mat.envMap = null;
  if ("envMapIntensity" in mat) mat.envMapIntensity = 0;
  if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
  brightenWoodMaterial(mat);
}

function prepareMaterials(object) {
  object.traverse((child) => {
    if (!child.isMesh || shouldSkipMatteMaterial(child)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const mat of materials) {
      if (!mat) continue;
      applyMatteMaterialLook(mat);
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

function applySmoothShading(mesh) {
  if (!mesh?.isMesh) return;

  // Blender "shade smooth" — fixes blocky/rectangle look
  if (mesh.geometry) {
    mesh.geometry.computeVertexNormals();
  }

  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  for (const mat of mats) {
    applyMatteMaterialLook(mat);
  }
}

function preparePinkChair(object) {
  object.traverse((child) => {
    if (child.isMesh) applySmoothShading(child);
  });
}

function prepareStool(object) {
  preparePinkChair(object);
}

function prepareWhiteChair(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    if (WHITE_CHAIR_NODE_NAMES.has(getGltfNodeName(child))) {
      applySmoothShading(child);
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

function getWindowWorldCenter(object) {
  const centers = [];
  object.traverse((child) => {
    if (!child.isMesh || !child.visible) return;
    const name = child.name || "";
    const normalized = normalizeGltfName(name);
    if (!WINDOW_MESH_NAMES.has(name) && !WINDOW_MESH_NAMES.has(normalized)) return;
    const box = new THREE.Box3().setFromObject(child);
    centers.push(box.getCenter(new THREE.Vector3()));
  });
  if (!centers.length) return null;

  const avg = new THREE.Vector3();
  for (const center of centers) avg.add(center);
  return avg.divideScalar(centers.length);
}

function setupRoomShadows(object) {
  object.traverse((child) => {
    if (!child.isMesh || !child.visible) return;
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function setupRoomLighting(object) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const shadowSpan = Math.max(size.x, size.y, size.z) * 0.95;
  const windowCenter = getWindowWorldCenter(object);
  const intoRoom = windowCenter
    ? center.clone().sub(windowCenter).normalize()
    : new THREE.Vector3(0.35, -0.08, 0.92).normalize();
  const windowPoint = windowCenter ?? center.clone().add(intoRoom.clone().multiplyScalar(-size.z * 0.35));

  sun.position
    .copy(windowPoint)
    .sub(intoRoom.clone().multiplyScalar(Math.max(size.x, size.z) * 0.42));
  sun.position.y += size.y * 0.22;
  sun.target.position.copy(center);
  sun.updateMatrixWorld();
  sun.target.updateMatrixWorld();

  windowSpill.position.copy(windowPoint).add(intoRoom.clone().multiplyScalar(-size.z * 0.08));
  windowSpill.position.y += size.y * 0.08;
  windowSpill.target.position.set(center.x, center.y + size.y * 0.02, center.z);
  windowSpill.updateMatrixWorld();
  windowSpill.target.updateMatrixWorld();

  bounce.position.set(
    center.x + size.x * 0.22,
    center.y - size.y * 0.1,
    center.z + size.z * 0.24
  );
  bounce.target.position.set(center.x, center.y + size.y * 0.06, center.z);
  bounce.updateMatrixWorld();
  bounce.target.updateMatrixWorld();

  fill.position.set(
    center.x + size.x * 0.48,
    center.y + size.y * 0.24,
    center.z + size.z * 0.42
  );
  fill.target.position.copy(center);
  fill.updateMatrixWorld();
  fill.target.updateMatrixWorld();

  sun.shadow.camera.left = -shadowSpan;
  sun.shadow.camera.right = shadowSpan;
  sun.shadow.camera.top = shadowSpan;
  sun.shadow.camera.bottom = -shadowSpan;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = Math.max(size.x, size.y, size.z) * 3.5;
  sun.shadow.camera.updateProjectionMatrix();

  console.info(`[portfolio ${BUILD_VERSION} room-lighting]`, {
    windowCenter: windowCenter?.toArray() ?? null,
    sun: sun.position.toArray(),
    target: center.toArray(),
  });
}

function fitCameraToRoom(object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 1.62;

  controls.target.set(center.x, center.y + size.y * 0.04, center.z);
  camera.position.set(
    center.x + distance * 0.92,
    center.y + distance * 0.42,
    center.z + distance * 0.92
  );
  controls.update();

  roomView.position.copy(camera.position);
  roomView.target.copy(controls.target);

  const pullBack = new THREE.Vector3()
    .subVectors(camera.position, center)
    .normalize()
    .multiplyScalar(maxDim * 0.38);
  heroView.target.copy(controls.target);
  heroView.position.copy(camera.position).add(pullBack);
  heroView.position.y += maxDim * 0.08;

  camera.position.copy(heroView.position);
  controls.target.copy(heroView.target);
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
        const pctLabel = Math.round((event.loaded / event.total) * 100);
        const status =
          label === "room"
            ? `Loading<span class="intro-dots"><span>.</span><span>.</span><span>.</span></span> ${pctLabel}%`
            : `Loading<span class="intro-dots"><span>.</span><span>.</span><span>.</span></span>`;
        setIntroStatus(status);
      },
      reject
    );
  });
}

let roomLoadStarted = false;

async function loadRoom() {
  if (roomLoadStarted) return;
  roomLoadStarted = true;

  const loader = new GLTFLoader();
  await MeshoptDecoder.ready;
  loader.setMeshoptDecoder(MeshoptDecoder);

  try {
    setIntroStatus('Loading<span class="intro-dots"><span>.</span><span>.</span><span>.</span></span>');
    const roomGltf = await loadGltf(
      loader,
      `/room.glb?build=${BUILD_VERSION}`,
      "room"
    );
    if (!roomGltf?.scene) {
      throw new Error("room.glb loaded without a scene");
    }

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
    let roomHasPinkChair = false;
    roomGltf.scene.traverse((child) => {
      if (isPinkChairObjectName(child.name)) roomHasPinkChair = true;
    });
    if (!roomHasPinkChair) {
      try {
        stoolGltf = await loadGltf(loader, "/stool.glb");
      } catch {
        console.warn("stool.glb not loaded — run fix_stool_export.py in Blender");
      }
    }
    try {
      pcGlassGltf = await loadGltf(loader, `/pc_glass.glb?build=${BUILD_VERSION}`);
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
    prepareWhiteChair(roomGltf.scene);
    preparePcInternals(roomGltf.scene);
    hideBrokenPegboard(roomGltf.scene);
    hideRoomObjects(roomGltf.scene);

    if (drawerGltf?.scene) {
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

    prepareBlinds(roomGltf.scene, { hideBrokenRoomBlinds: Boolean(blindGltf?.scene) });
    room.add(roomGltf.scene);

    if (!setupPinkChairFromScene(roomGltf.scene) && stoolGltf?.scene) {
      prepareStool(stoolGltf.scene);
      pinkChairGroup = stoolGltf.scene;
      room.add(stoolGltf.scene);
    }

    if (blindGltf?.scene) {
      prepareBlinds(blindGltf.scene);
      room.add(blindGltf.scene);
    }

    hidePcCaseShells(roomGltf.scene);

    if (pcGlassGltf?.scene) {
      preparePcGlass(pcGlassGltf.scene);
      room.add(pcGlassGltf.scene);
    }

    if (pegboardGltf?.scene) {
      prepareMaterials(pegboardGltf.scene);
      preparePegboardAddon(pegboardGltf.scene);
      room.add(pegboardGltf.scene);
    }

    scene.add(room);
    setupRoomShadows(room);
    setupRoomLighting(room);
    setupPinkChairFromScene(room);
    setupChairSpin();
    fitCameraToRoom(room);
    setupInteractionViews(room);
    setupRecordPlayerAnchor(room);
    setupRecordSpin();
    setupMiniDesk(room);
    setupDeskCandleGlass(room);
    await prepareBakedMonitorScreen(roomGltf.scene);
    prepareVerticalMonitorScreen(roomGltf.scene);
    setupMainMonitorDesktop(roomGltf.scene);
    applyMonitorCloseUpCamera();
    prepareMaterials(room);
    prepareRoofFrameMaterials(room);

    showIntroEnterGate();
  } catch (err) {
    setIntroStatus(`Failed to load room (${err?.message || err})`);
    if (introEnterRow) {
      introEnterRow.hidden = false;
      introEnterRow.classList.add("is-visible");
    }
    showIntroBunnySticker();
    if (introEnterLabel) {
      introEnterLabel.textContent = "Retry";
    } else if (introEnter) {
      introEnter.textContent = "Retry";
    }
    if (introEnter) {
      introEnter.dataset.state = "retry";
    }
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

function animate(time = 0) {
  requestAnimationFrame(animate);

  if (chairSpinPivot && !isDeskView) {
    chairSpinPivot.rotation.set(0, getChairSpinRotationY(time), 0);
  }

  updateRecordSpin(time);

  if (!isAnimating) {
    updateChairCursor();
    updateRecordCursor();
    updateMonitorCursor();
  }

  if (isMonitorCloseUpView && !isAnimating) {
    lockMonitorCloseUpCamera();
  } else if (isDeskView && !isAnimating) {
    lockDeskCamera();
  } else if (!isAnimating) {
    controls.update();
  }

  renderer.render(scene, camera);
  updateMonitorScreenOverlay();
}

animate();
