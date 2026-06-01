import { copyFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptEncoder } from "meshoptimizer";

const REMOVE = new Set([
  "Cube.117",
  "Cube.118",
  "Cube.119",
  "Cube.120",
  "Cube.121",
  "Cube.122",
  "Plane.150",
  "Plane.678",
]);

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(rootDir, "public/room.glb");
const backup = join(rootDir, "public/room.before-pc-shell-removal.glb");

copyFileSync(input, backup);

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready]);

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });

const document = await io.read(input);
const root = document.getRoot();

const removed = [];

function stripNamedChildren(parent) {
  for (const child of [...parent.listChildren()]) {
    stripNamedChildren(child);
    if (REMOVE.has(child.getName())) {
      parent.removeChild(child);
      removed.push(child.getName());
    }
  }
}

for (const scene of root.listScenes()) {
  stripNamedChildren(scene);
}

await document.transform(prune());
await io.write(input, document);

console.log(`Removed ${removed.length} nodes: ${removed.sort().join(", ")}`);
console.log(`Backup: ${backup}`);
console.log(`Updated: ${input}`);
