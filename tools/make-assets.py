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


def mono(size):
    for f in ("consolab.ttf", "consola.ttf", "cour.ttf"):
        p = FONTS / f
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


ACCENT = (25, 184, 255)  # sampled from the app icon


def og(lang, line1, line2, sub, readout, out):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (7, 8, 12))
    d = ImageDraw.Draw(img)
    for gx in range(20, W, 28):  # faint dot grid, like the site hero
        for gy in range(20, H, 28):
            d.point((gx, gy), fill=(30, 33, 42))
    ic = icon.resize((72, 72), Image.LANCZOS)
    img.paste(ic, (72, 64), ic)
    d.text((166, 80), "VYRO", font=font(True, 38), fill=(238, 240, 246))
    d.text((72, 190), line1, font=font(True, 76), fill=(238, 240, 246))
    d.text((72, 276), line2, font=font(True, 76), fill=ACCENT)
    d.text((72, 392), sub, font=font(False, 30), fill=(160, 169, 186))
    # readout panel
    d.rectangle((72, 460, 72 + 640, 460 + 96), fill=(13, 17, 24))
    d.line((72, 460, 72 + 18, 460), fill=ACCENT, width=3)
    d.line((72, 460, 72, 460 + 18), fill=ACCENT, width=3)
    d.text((96, 482), readout[0], font=mono(44), fill=(125, 134, 153))
    x = 96 + d.textlength(readout[0], font=mono(44))
    d.text((x + 16, 482), "->", font=mono(44), fill=(125, 134, 153))
    d.text((x + 80, 482), readout[1], font=mono(44), fill=ACCENT)
    img.save(out, optimize=True)


og("es", "Tus videos merecen", "verse mejor.", "Hechos para sobrevivir a la compresión de WhatsApp", ("519 MB", "27,9 MB"), ASSETS / "og.png")
og("en", "Your videos deserve", "to look better.", "Built to survive WhatsApp’s compression", ("519 MB", "27.9 MB"), ASSETS / "og-en.png")
print("assets ok")
