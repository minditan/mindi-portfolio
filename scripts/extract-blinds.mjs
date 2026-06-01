import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune } from "@gltf-transform/functions";

const KEEP = new Set([
  "Plane.693",
  "Plane.729",
  "Plane.730",
  "Plane.731",
  "Plane.732",
  "Plane.775",
  "Plane.776",
  "Plane.777",
]);

const input = "/Users/minditan/Desktop/b4bake_copy.glb";
const output = "/Users/minditan/Projects/mindi-portfolio/public/blinds.glb";

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

await document.transform(prune());
await io.write(output, document);
console.log(`Wrote ${output}`);
