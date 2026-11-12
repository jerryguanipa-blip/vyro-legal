"""Generate site raster assets from the app's own 1024 icon (no stock art, no fabricated screenshots).

usage: python tools/make-assets.py [path/to/icon_1024.png]
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
ICON = Path(sys.argv[1] if len(sys.argv) > 1 else "D:/dev/vyro/assets/icon/icon_1024.png")
FONTS = Path("C:/Windows/Fonts")

icon = Image.open(ICON).convert("RGBA")
for name, size in (("logo-96.png", 96), ("logo-512.png", 512), ("apple-touch-icon.png", 180), ("favicon.png", 64)):
    icon.resize((size, size), Image.LANCZOS).save(ASSETS / name, optimize=True)


def font(bold, size):
    for f in (("segoeuib.ttf" if bold else "segoeui.ttf"), "arialbd.ttf" if bold else "arial.ttf"):
        p = FONTS / f
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def og(lang, line1, line2, sub, out):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (7, 8, 12))
    glow = Image.new("RGB", (W, H), (7, 8, 12))
    d = ImageDraw.Draw(glow)
    d.ellipse((560, -260, 1360, 540), fill=(70, 80, 220))
    d.ellipse((-200, 300, 520, 900), fill=(40, 70, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(150))
    img = Image.blend(img, glow, 0.55)
    d = ImageDraw.Draw(img)
    # icon on the right
    ic = icon.resize((330, 330), Image.LANCZOS)
    img.paste(ic, (800, 150), ic)
    d.text((72, 86), "VYRO", font=font(True, 34), fill=(238, 240, 246))
    d.text((72, 190), line1, font=font(True, 66), fill=(238, 240, 246))
    # gradient-ish second line: blue
    d.text((72, 270), line2, font=font(True, 66), fill=(120, 150, 255))
    d.text((72, 390), sub, font=font(False, 30), fill=(163, 170, 187))
    d.rounded_rectangle((72, 480, 72 + 270, 480 + 56), radius=28, outline=(120, 150, 255), width=2)
    d.text((72 + 28, 491), "Full HD · Android", font=font(True, 26), fill=(190, 205, 255))
    img.save(out, optimize=True)


og("es", "Tus videos merecen", "verse mejor.", "Optimiza tus videos para Estados de WhatsApp", ASSETS / "og.png")
og("en", "Your videos deserve", "to look better.", "Optimize your videos for WhatsApp Status", ASSETS / "og-en.png")
print("assets ok")
