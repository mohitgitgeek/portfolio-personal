#!/usr/bin/env python3
"""
Download badge images and generate thumbnails.
Usage: python scripts/download_badges.py

This will create `public/assets/` and save images:
- public/assets/github_foundations.png
- public/assets/github_foundations_thumb.png
- public/assets/aws_generative_ai.png
- public/assets/aws_generative_ai_thumb.png
"""
import os
from pathlib import Path

def ensure_dir(p):
    os.makedirs(p, exist_ok=True)

ASSETS_DIR = Path(__file__).resolve().parents[1] / 'public' / 'assets'
ensure_dir(ASSETS_DIR)

BADGES = [
    {
        'name': 'github_foundations',
        'url': 'https://images.credly.com/size/680x680/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png'
    },
    {
        'name': 'aws_generative_ai',
        'url': 'https://images.credly.com/size/680x680/images/7fa09e71-4149-4d59-9066-14fc8a3e0f39/blob'
    }
]

# lazy import to keep requirements minimal until run
try:
    import requests
    from PIL import Image
    from io import BytesIO
except Exception as e:
    print('Missing dependencies. Please run: pip install requests pillow')
    raise

for b in BADGES:
    name = b['name']
    url = b['url']
    print('Downloading', url)
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    img = Image.open(BytesIO(r.content)).convert('RGBA')
    out_path = ASSETS_DIR / f"{name}.png"
    img.save(out_path)
    print('Saved', out_path)
    # create thumbnail (square 96x96)
    thumb = img.copy()
    thumb.thumbnail((96,96), Image.LANCZOS)
    thumb_path = ASSETS_DIR / f"{name}_thumb.png"
    thumb.save(thumb_path,optimize=True)
    print('Saved thumbnail', thumb_path)

print('All badges downloaded to', ASSETS_DIR)
