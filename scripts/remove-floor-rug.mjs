import { NodeIO } from "@gltf-transform/core";
import { prune } from "@gltf-transform/functions";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roomPath = path.resolve(__dirname, "../public/room.glb");

const HIDDEN_NAMES = new Set(["greenthing.048", "Cylinder.431"]);

const io = new NodeIO();
const doc = await io.read(roomPath);
const root = doc.getRoot();

let removed = 0;

function removeNamedNodes(node) {
  for (const child of [...node.listChildren()]) {
    removeNamedNodes(child);
  }
  if (HIDDEN_NAMES.has(node.getName())) {
    node.dispose();
    removed += 1;
  }
}

for (const scene of root.listScenes()) {
  removeNamedNodes(scene);
}

if (removed === 0) {
  console.log("No rug nodes found in room.glb (already removed).");
  process.exit(0);
}

await doc.transform(prune());
await io.write(roomPath, doc);
console.log(`Removed ${removed} rug node(s) from room.glb`);
