import sys
import numpy as np
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def crop_kanjis_from_strip(strip_img, char_list, border_pad_x=10, border_pad_y=8):
    w, h = strip_img.size
    gray = np.array(strip_img.convert('L'))
    
    # Find bounding box of the border rectangle if present
    # Look for horizontal lines
    row_dark = (gray < 160).sum(axis=1)
    h_lines = np.where(row_dark > (w * 0.4))[0]
    top_border = h_lines[0] if len(h_lines) > 0 else 0
    bottom_border = h_lines[-1] if len(h_lines) > 1 else h - 1
    
    # Look for vertical lines
    col_dark = (gray < 160).sum(axis=0)
    v_lines = np.where(col_dark > (h * 0.4))[0]
    left_border = v_lines[0] if len(v_lines) > 0 else 0
    right_border = v_lines[-1] if len(v_lines) > 1 else w - 1
    
    clean_box = strip_img.crop((left_border + border_pad_x, top_border + border_pad_y, right_border - border_pad_x, bottom_border - border_pad_y))
    w_box, h_box = clean_box.size
    n = len(char_list)
    step = w_box / float(n)
    
    results = {}
    for i, ch in enumerate(char_list):
        x1 = int(i * step)
        x2 = int((i + 1) * step)
        char_crop = clean_box.crop((x1, 0, x2, h_box))
        
        # Binarize / clean character
        cg = np.array(char_crop.convert('L'))
        # find dark ink
        dark_y, dark_x = np.where(cg < 170)
        if len(dark_x) > 0:
            pad = 20
            min_x = max(0, dark_x.min() - pad)
            max_x = min(char_crop.width, dark_x.max() + pad)
            min_y = max(0, dark_y.min() - pad)
            max_y = min(char_crop.height, dark_y.max() + pad)
            tight = char_crop.crop((min_x, min_y, max_x, max_y))
            
            # Clean background to pure white
            tight_gray = np.array(tight.convert('L'))
            # anything lighter than 185 becomes pure white
            clean_rgb = np.array(tight)
            mask = tight_gray >= 185
            clean_rgb[mask] = [255, 255, 255]
            clean_img = Image.fromarray(clean_rgb)
            
            side = max(clean_img.width, clean_img.height) + 40
            square_img = Image.new('RGB', (side, side), 'white')
            off_x = (side - clean_img.width) // 2
            off_y = (side - clean_img.height) // 2
            square_img.paste(clean_img, (off_x, off_y))
            square_img = square_img.resize((300, 300), Image.Resampling.LANCZOS)
            results[ch] = square_img
    return results

# Test Chapter 2
# 2-1: 店 客 親 切 売 当 品 from strip_p19.png
img_2_1 = Image.open('tmp_strips/strip_p19.png')
res_2_1 = crop_kanjis_from_strip(img_2_1, ['店', '客', '親', '切', '売', '当', '品'])
for ch, img in res_2_1.items():
    img.save(f'frontend/public/assets/kanji/n4/illustrations/kanji_n4_{ch}.webp', 'WEBP', quality=95)
    print(f"Saved kanji_n4_{ch}.webp")

# 2-2: 便 利 使 銀 白 黒 紙 from tmp_full_strips/chap2_sub2_strip.png
img_2_2 = Image.open('tmp_full_strips/chap2_sub2_strip.png')
res_2_2 = crop_kanjis_from_strip(img_2_2, ['便', '利', '使', '銀', '白', '黒', '紙'], border_pad_x=15, border_pad_y=12)
for ch, img in res_2_2.items():
    img.save(f'frontend/public/assets/kanji/n4/illustrations/kanji_n4_{ch}.webp', 'WEBP', quality=95)
    print(f"Saved kanji_n4_{ch}.webp")

# 2-3: 朝 晩 昼 夜 前 後 午 早 from strip_p24.png
img_2_3 = Image.open('tmp_strips/strip_p24.png')
res_2_3 = crop_kanjis_from_strip(img_2_3, ['朝', '晩', '昼', '夜', '前', '後', '午', '早'])
for ch, img in res_2_3.items():
    img.save(f'frontend/public/assets/kanji/n4/illustrations/kanji_n4_{ch}.webp', 'WEBP', quality=95)
    print(f"Saved kanji_n4_{ch}.webp")

print("Chapter 2 all 22 kanjis cropped successfully!")
