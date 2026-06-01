import { Document, NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { copyToDocument, prune } from "@gltf-transform/functions";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PREFERRED = ["Cylinder.431", "greenthing.048"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(__dirname, "../public/rug.glb");
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

async function readSource(input) {
  const document = await io.read(input);
  const names = new Set(document.getRoot().listNodes().map((node) => node.getName()));
  return { document, names, input };
}

const sources = [
  "/Users/minditan/Desktop/rug_fixed.glb",
  "/Users/minditan/Desktop/portfolio_color1.glb",
  "/Users/minditan/Desktop/b4bake_copy.glb",
];

let source = null;
for (const input of sources) {
  try {
    const candidate = await readSource(input);
    const keepName = PREFERRED.find((name) => candidate.names.has(name));
    if (!keepName) {
      if (input.endsWith("rug_fixed.glb")) {
        console.warn(`Skip ${input}: export Cylinder.431 from Blender first`);
      }
      continue;
    }
    source = { ...candidate, keepName };
    console.log(`Using ${input} (${keepName})`);
    break;
  } catch (err) {
    console.warn(`Skip ${input}:`, err.message);
  }
}

if (!source) {
  throw new Error("No rug source found");
}

const srcNode = source.document
  .getRoot()
  .listNodes()
  .find((node) => node.getName() === source.keepName);

const outDoc = new Document();
const targetScene = outDoc.createScene("Scene");

await copyToDocument(outDoc, source.document, [srcNode]);
const rugNode = outDoc
  .getRoot()
  .listNodes()
  .find((node) => node.getName() === source.keepName);

targetScene.addChild(rugNode);
rugNode.setTranslation([0, 0, 0]);
rugNode.setRotation([0, 0, 0, 1]);
rugNode.setScale([1, 1, 1]);

await outDoc.transform(prune());
await io.write(output, outDoc);
console.log(`Wrote ${output}`);
