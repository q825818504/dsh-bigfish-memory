"""
把大肥鱼形象图处理成插件可用的资源。

做什么：
  1. 裁掉四周透明留白（人物贴边）
  2. 缩放到 320×320（面板里显示约 200px，2x 屏够用）
  3. 导出为 WebP（比 PNG 小很多，且保留透明）

用法：
  python prep-mascot.py <源图> <输出路径>
"""
import sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]

img = Image.open(src).convert('RGBA')
print(f'源图: {img.size[0]}x{img.size[1]}')

# 1. 裁掉透明留白：用 alpha 通道的包围盒
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
    print(f'裁剪后: {img.size[0]}x{img.size[1]}  (bbox={bbox})')

# 2. 缩放到 320 见方，保持比例
target = 320
img.thumbnail((target, target), Image.LANCZOS)
print(f'缩放后: {img.size[0]}x{img.size[1]}')

# 3. 导出 WebP（quality 88，带 alpha）
img.save(dst, 'WEBP', quality=88, method=6)
import os
print(f'输出: {dst}  {os.path.getsize(dst):,} 字节')
