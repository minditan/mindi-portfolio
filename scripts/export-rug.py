"""Export Miffy floor rug (Cylinder.431) from b4bake_copy.blend — run in Blender."""
import bpy
import os

BLEND = os.path.expanduser("~/b4bake_copy.blend")
OUTPUT = os.path.expanduser("~/Desktop/rug_fixed.glb")

CANDIDATES = [
    "Cylinder.431",
    "greenthing.048",
    "Cylinder.022",
    "Cylinder.222",
]


def main():
    if bpy.data.filepath != BLEND:
        bpy.ops.wm.open_mainfile(filepath=BLEND)

    obj = None
    for name in CANDIDATES:
        candidate = bpy.data.objects.get(name)
        if candidate and candidate.type == "MESH":
            obj = candidate
            print(f"Using rug object: {name}")
            break

    if not obj:
        print("ERROR: No rug object found. Names tried:", CANDIDATES)
        return

    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    if obj.parent:
        bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")

    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

    for mod in list(obj.modifiers):
        try:
            bpy.ops.object.modifier_apply(modifier=mod.name)
        except RuntimeError:
            print(f"  Could not apply modifier: {mod.name}")

    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="MEDIAN")
    bpy.ops.object.location_clear(clear_delta=False)
    bpy.ops.object.shade_smooth()

    try:
        bpy.ops.file.pack_all()
    except RuntimeError:
        print("  Could not pack external files")

    print(f"{obj.name}: {len(obj.data.vertices)} vertices")

    bpy.ops.export_scene.gltf(
        filepath=OUTPUT,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_image_format="AUTO",
    )
    print(f"DONE -> {OUTPUT}")


main()
