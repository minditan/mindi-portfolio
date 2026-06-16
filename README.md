# Room Folio

My portfolio is a 3D room you can walk around — not a PDF resume stapled to a landing page.

I modeled the workspace in **Blender**, exported it for the web, and built the interaction layer with **Three.js**. You sit in a pink chair, zoom into the monitor, and browse projects from a little desktop UI inside the scene. It started as a way to show both sides of what I do: computer engineering coursework *and* the visual, hands-on building I actually enjoy.

**Live site:** [mindi-portfolio.vercel.app](https://mindi-portfolio.vercel.app)

## Why I built it this way

Most portfolios list projects in a grid. That works, but it doesn't say much about how someone thinks. I wanted something that felt like my desk — pegboard tools, dual monitors, a record player, the messy details — because that's closer to how I work than a hero section with three cards.

The technical challenge was making a Blender scene that still loads in a browser. That meant UV unwrapping, baking textures, cutting geometry where I could, exporting glTF, and then fighting with Three.js until the lighting, camera, and monitor overlay felt right. The monitor UI (`public/monitor-desktop.js`) is regular HTML/CSS sitting on top of the 3D screen — projects, resume preview, ECEN lab work, NASA proposal slides, all open from a dock inside the scene.

## Stack

- **Blender** — room modeling, materials, lighting, glTF export
- **Three.js** — scene loading, camera controls, click interactions
- **Vite** — dev server and production build
- **Vercel** — deployment

## What's inside the room

- Interactive 3D environment (drag to look around, click the chair to sit)
- Monitor desktop with project write-ups for Room Folio, NASA Team SOLARA, Sharetea POS, and ECEN lab work
- Ambient music player tied to the record player mesh
- Resume PDF preview and download from the qualifications tab

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), wait for the room to load, then click **Enter**.

**Controls**
1. Drag to look around the room
2. Click the pink chair → desk view
3. Click the mouse → zoom into the monitor
4. Use the dock icons to open projects

Place your resume at `public/resume.pdf` if you want the download button to work with your own file.

## Build & deploy

```bash
npm run build
```

Upload the `dist/` folder to Vercel (or any static host). Large assets (`room.glb`, textures, audio) live in `public/`.

## Related repo

The Sharetea POS system shown inside the monitor is here: [github.com/minditan/sharetea-pos](https://github.com/minditan/sharetea-pos)
