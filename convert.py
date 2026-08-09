import os
from PIL import Image
import glob

public_dir = "public"
large_pngs = []

for f in os.listdir(public_dir):
    if f.endswith('.png'):
        path = os.path.join(public_dir, f)
        if os.path.getsize(path) > 1000000: # greater than 1MB
            large_pngs.append(f)
            
# also add grabme if not > 1MB? wait, grabme is 2.3MB, so it will be included.
# Add some smaller ones if we want, but audit says "large PNG files"

for f in large_pngs:
    path = os.path.join(public_dir, f)
    webp_path = os.path.join(public_dir, f.replace('.png', '.webp'))
    try:
        img = Image.open(path)
        img.save(webp_path, 'webp', quality=85)
        print(f"Converted {f} to {webp_path}")
    except Exception as e:
        print(f"Failed to convert {f}: {e}")

# print what was converted so we can update references
print(", ".join(large_pngs))
