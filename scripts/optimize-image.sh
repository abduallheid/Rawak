#!/usr/bin/env bash
# Optimise one source image for the site.
#   scripts/optimize-image.sh <source-image> <output-prefix>
#   e.g. scripts/optimize-image.sh ~/Desktop/dashboard.png assets/img/projects/my-project/cover
# Writes:
#   <prefix>-sm.webp  640px wide  (cards, phones)
#   <prefix>-lg.webp  1280px wide (case-study hero, desktop) - never upscaled
#   <prefix>-og.jpg   1200x630    (Open Graph / Twitter card; JPEG for widest support)
# and prints dimensions to paste into front matter (image.width / image.height = the lg size).
# Requires ImageMagick 6+ with WebP support (apt install imagemagick webp / brew install imagemagick).
set -euo pipefail
src="$1"; prefix="$2"
mkdir -p "$(dirname "$prefix")"
webp() { convert "$src[0]" -auto-orient -strip -resize "$1x>" -quality 78 -define webp:method=6 "$2"; }
webp 640  "$prefix-sm.webp"
webp 1280 "$prefix-lg.webp"
convert "$src[0]" -auto-orient -strip -resize 1200x630^ -gravity north -extent 1200x630 -quality 82 -interlace JPEG "$prefix-og.jpg"
for f in "$prefix-sm.webp" "$prefix-lg.webp" "$prefix-og.jpg"; do
  echo "$f  $(identify -format '%wx%h' "$f")  $(du -h "$f" | cut -f1)"
done
