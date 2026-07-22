"""Bake combined diffuse lighting for the room — run inside Blender on b4bake_copy.blend.

This bakes Blender's Cycles lighting into vertex colors or textures so the web
export looks much closer to your rendered viewport.

Steps:
1. Open ~/b4bake_copy.blend in Blender
2. Scripting workspace → Open this file → Run Script
3. Re-export room.glb to public/room.glb
"""
import bpy
import os

BLEND = os.path.expanduser("~/b4bake_copy.blend")
OUTPUT_DIR = os.path.expanduser("~/Projects/mindi-portfolio/public/baked")


def ensure_cycles():
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 128
    scene.cycles.use_denoising = True
    if hasattr(scene.cycles, "preview_samples"):
        scene.cycles.preview_samples = 32


def bake_ao_for_selection():
  """Quick AO pass on selected room meshes — darkens corners like your render."""
  bpy.ops.object.select_all(action="DESELECT")
  for obj in bpy.data.objects:
    if obj.type != "MESH":
      continue
    if obj.name.startswith(("Light", "Camera")):
      continue
    obj.select_set(True)

  bpy.context.view_layer.objects.active = bpy.context.selected_objects[0]
  bpy.ops.object.bake(type="AO", margin=8, use_clear=True)
  print("AO bake complete for", len(bpy.context.selected_objects), "meshes")


def main():
    if bpy.data.filepath != BLEND and os.path.exists(BLEND):
        bpy.ops.wm.open_mainfile(filepath=BLEND)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    ensure_cycles()
    bake_ao_for_selection()
    print("Done. Inspect baked meshes, then export public/room.glb from Blender.")


main()
