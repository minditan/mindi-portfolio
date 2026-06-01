import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune, flatten } from "@gltf-transform/functions";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KEEP = new Set(["drawers", "miffy_drawers", "drawers_inside"]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = "/Users/minditan/Desktop/portfolio_color1.glb";
const output = path.resolve(__dirname, "../public/drawers.glb");

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const document = await io.read(input);
const root = document.getRoot();

for (const scene of root.listScenes()) {
  for (const node of [...scene.listChildren()]) {
    if (!KEEP.has(node.getName())) {
      scene.removeChild(node);
    }
  }
}

await document.transform(prune(), flatten());
await io.write(output, document);
console.log(`Wrote ${output}`);
