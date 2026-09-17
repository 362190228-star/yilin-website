from pathlib import Path
import re
import sys

sys.path.insert(0, "/private/tmp/codex-webp-tools")
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
PUBLIC_ASSETS = Path(__file__).resolve().parents[1] / "public" / "assets"

GROUPS = {
    ROOT / "个人项目" / "glm" / "glm": PUBLIC_ASSETS / "projects" / "autoglm",
    ROOT / "个人项目" / "codex组件库" / "codex组件库": PUBLIC_ASSETS / "projects" / "jd-ai-kit",
    ROOT / "个人项目" / "灵境" / "灵境": PUBLIC_ASSETS / "projects" / "aigc-platform",
    ROOT / "个人项目" / "自如ai找房" / "自如ai找房": PUBLIC_ASSETS / "projects" / "ziru-home-search",
    ROOT / "个人项目" / "音浪" / "音浪": PUBLIC_ASSETS / "projects" / "yinlang",
    ROOT / "个人项目" / "SGM项目" / "SGM项目": PUBLIC_ASSETS / "projects" / "app-performance-monitoring",
    ROOT / "兴趣爱好" / "摄影": PUBLIC_ASSETS / "hobbies" / "photography",
    ROOT / "兴趣爱好" / "旅游": PUBLIC_ASSETS / "hobbies" / "travel",
    ROOT / "兴趣爱好" / "美食": PUBLIC_ASSETS / "hobbies" / "food",
    ROOT / "个人荣誉": PUBLIC_ASSETS / "honors",
}


def natural_key(path: Path):
    return [int(part) if part.isdigit() else part.casefold() for part in re.split(r"(\d+)", path.name)]


converted = 0
for source_dir, destination_dir in GROUPS.items():
    destination_dir.mkdir(parents=True, exist_ok=True)
    sources = sorted(
        (path for path in source_dir.iterdir() if path.suffix.casefold() in {".jpg", ".jpeg"}),
        key=natural_key,
    )
    for source in sources:
        destination = destination_dir / f"{source.stem}.webp"
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.save(destination, "WEBP", quality=84, method=6)
        converted += 1
    print(f"{source_dir.name}: {len(sources)}")

print(f"Converted {converted} JPG files into {PUBLIC_ASSETS}")
