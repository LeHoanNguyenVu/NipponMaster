import sys
import os
import numpy as np
from PIL import Image
from scipy import ndimage

sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = 'frontend/public/assets/kanji/n4/illustrations'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Complete 9 Chapters specification for N4
CHAPTERS_SPEC = {
    2: [
        {"sub": 1, "chars": ['店', '客', '親', '切', '売', '当', '品'], "strip": "tmp_strips/strip_p19.png"},
        {"sub": 2, "chars": ['便', '利', '使', '銀', '白', '黒', '紙'], "strip": "tmp_full_strips/chap2_sub2_strip.png"},
        {"sub": 3, "chars": ['朝', '晩', '昼', '夜', '前', '後', '午', '早'], "strip": "tmp_strips/strip_p24.png"},
    ],
    3: [
        {"sub": 1, "chars": ['荷', '送', '宅', '急', '速', '遅', '重', '軽'], "strip": "tmp_full_strips/chap3_sub1_strip.png"},
        {"sub": 2, "chars": ['住', '所', '様', '主', '番', '地', '号'], "strip": "tmp_strips/strip_p37.png"},
        {"sub": 3, "chars": ['京', '都', '道', '府', '県', '市', '区', '村'], "strip": "tmp_full_strips/chap3_sub3_strip.png"},
    ],
    4: [
        {"sub": 1, "chars": ['毎', '週', '映', '画', '図', '館', '公', '園'], "strip": "tmp_full_strips/chap4_sub1_strip.png"},
        {"sub": 2, "chars": ['夫', '妻', '特', '思', '料', '理', '有'], "strip": "tmp_full_strips/chap4_sub2_strip.png"},
        {"sub": 3, "chars": ['洋', '服', '衣', '短', '毛', '糸', '玉', '光'], "strip": "tmp_full_strips/chap4_sub3_strip.png"},
    ],
    5: [
        {"sub": 1, "chars": ['駅', '鉄', '乗', '降', '開', '閉', '発', '着'], "strip": "tmp_full_strips/chap5_sub1_strip.png"},
        {"sub": 2, "chars": ['交', '通', '台', '止', '色', '赤', '黄', '青'], "strip": "tmp_full_strips/chap5_sub2_strip.png"},
        {"sub": 3, "chars": ['病', '院', '医', '科', '薬', '待', '合', '計'], "strip": "tmp_full_strips/chap5_sub3_strip.png"},
    ],
    6: [
        {"sub": 1, "chars": ['研', '究', '語', '文', '英', '化', '数', '心'], "strip": "tmp_full_strips/chap6_sub1_strip.png"},
        {"sub": 2, "chars": ['若', '集', '知', '酒', '歌', '声', '楽'], "strip": "tmp_full_strips/chap6_sub2_strip.png"},
        {"sub": 3, "chars": ['味', '油', '太', '細', '皿', '飯', '麦'], "strip": "tmp_full_strips/chap6_sub3_strip.png"},
    ],
    7: [
        {"sub": 1, "chars": ['春', '夏', '秋', '冬', '空', '星', '雲', '去'], "strip": "tmp_full_strips/chap7_sub1_strip.png"},
        {"sub": 2, "chars": ['天', '晴', '雪', '風', '強', '弱', '暑', '寒'], "strip": "tmp_full_strips/chap7_sub2_strip.png"},
        {"sub": 3, "chars": ['旅', '持', '世', '界', '写', '真', '船'], "strip": "tmp_full_strips/chap7_sub3_strip.png"},
    ],
    8: [
        {"sub": 1, "chars": ['勉', '漢', '宿', '題', '質', '問', '教', '室'], "strip": "tmp_full_strips/chap8_sub1_strip.png"},
        {"sub": 2, "chars": ['試', '験', '答', '考', '正', '丸', '不', '同'], "strip": "tmp_full_strips/chap8_sub2_strip.png"},
        {"sub": 3, "chars": ['政', '治', '経', '済', '歴', '史', '国', '王'], "strip": "tmp_full_strips/chap8_sub3_strip.png"},
    ],
    9: [
        {"sub": 1, "chars": ['運', '動', '練', '習', '走', '歩', '泳', '才'], "strip": "tmp_full_strips/chap9_sub1_strip.png"},
        {"sub": 2, "chars": ['自', '然', '草', '原', '湖', '谷', '海', '辺'], "strip": "tmp_full_strips/chap9_sub2_strip.png"},
        {"sub": 3, "chars": ['里', '野', '奥', '池', '虫', '羽', '鳴', '馬'], "strip": "tmp_full_strips/chap9_sub3_strip.png"},
    ]
}

def clean_and_crop_kanji(slot_img):
    """
    Extract the central kanji from a slot, clean background, center in 300x300.
    """
    sw, sh = slot_img.size
    g = np.array(slot_img.convert('L'))
    
    # Ignore top 15% and bottom 10% to completely eliminate any horizontal border line remnants
    y_start = int(sh * 0.12)
    y_end = int(sh * 0.90)
    
    inner_g = g[y_start:y_end, :]
    dark_mask = inner_g < 165
    
    labeled, num_features = ndimage.label(dark_mask)
    if num_features == 0:
        return None
        
    cleaned_mask = np.zeros_like(dark_mask)
    for feat_idx in range(1, num_features + 1):
        feat_mask = (labeled == feat_idx)
        feat_y, feat_x = np.where(feat_mask)
        if len(feat_x) == 0:
            continue
        fw = feat_x.max() - feat_x.min()
        fh = feat_y.max() - feat_y.min()
        # Discard horizontal border lines (thin horizontal line)
        if (fw > 0.25 * sw and fh < 14) or (fh < 10 and (feat_y.mean() < 35 or feat_y.mean() > sh - 35)):
            continue
        # Discard vertical border lines
        if (fh > 0.25 * sh and fw < 14) or (fw < 10 and (feat_x.mean() < 25 or feat_x.mean() > sw - 25)):
            continue
        # Filter: center of mass x should be in middle 75% of slot
        if 0.10 * sw <= feat_x.mean() <= 0.90 * sw:
            if len(feat_x) > 15:
                cleaned_mask[feat_mask] = True
                
    dark_y, dark_x = np.where(cleaned_mask)
    if len(dark_x) < 20:
        return None
        
    min_x = max(0, dark_x.min() - 10)
    max_x = min(sw, dark_x.max() + 10)
    min_y = max(0, dark_y.min() - 10) + y_start
    max_y = min(sh, dark_y.max() + 10) + y_start
    
    slot_rgb = np.array(slot_img)
    # Background whitening: anything with gray > 175 -> white
    slot_gray = np.array(slot_img.convert('L'))
    slot_rgb[slot_gray > 175] = [255, 255, 255]
    
    tight = Image.fromarray(slot_rgb).crop((min_x, min_y, max_x, max_y))
    side = max(tight.width, tight.height) + 36
    sq = Image.new('RGB', (side, side), 'white')
    sq.paste(tight, ((side - tight.width) // 2, (side - tight.height) // 2))
    return sq.resize((300, 300), Image.Resampling.LANCZOS)

def process_sublesson(strip_path, chars):
    img = Image.open(strip_path)
    w, h = img.size
    
    # Detect the left and right border if present, else use 4% to 96%
    g = np.array(img.convert('L'))
    col_dark = (g < 155).sum(axis=0)
    v_lines = np.where(col_dark > (h * 0.25))[0]
    
    left_x = v_lines[0] + 8 if len(v_lines) > 0 and v_lines[0] < w * 0.08 else int(w * 0.04)
    right_x = v_lines[-1] - 8 if len(v_lines) > 0 and v_lines[-1] > w * 0.94 else int(w * 0.96)
    
    box = img.crop((left_x, 0, right_x, h))
    bw, bh = box.size
    n = len(chars)
    step = bw / float(n)
    
    res = {}
    for i, ch in enumerate(chars):
        x1 = int(i * step)
        x2 = int((i + 1) * step)
        slot = box.crop((x1, 0, x2, bh))
        cropped = clean_and_crop_kanji(slot)
        if cropped:
            res[ch] = cropped
    return res

all_cropped = {}
missing_all = []

for chap, sub_list in CHAPTERS_SPEC.items():
    for sub_info in sub_list:
        sub = sub_info["sub"]
        chars = sub_info["chars"]
        strip_p = sub_info["strip"]
        
        # fallback if strip not found
        if not os.path.exists(strip_p):
            strip_p = f"tmp_full_strips/chap{chap}_sub{sub}_strip.png"
            
        cropped_dict = process_sublesson(strip_p, chars)
        for ch, im in cropped_dict.items():
            all_cropped[ch] = im
            im.save(os.path.join(OUTPUT_DIR, f"kanji_n4_{ch}.webp"), "WEBP", quality=95)
            
        for ch in chars:
            if ch not in cropped_dict:
                missing_all.append((chap, sub, ch))
        print(f"Chap {chap}-{sub} ({len(chars)} chars): extracted {len(cropped_dict)}/{len(chars)}")

print("\n=== EXTRACTION SUMMARY ===")
print(f"Total kanji cropped: {len(all_cropped)}")
if missing_all:
    print(f"Missing ({len(missing_all)}):", missing_all)
else:
    print("ALL CHARACTERS EXTRACTED WITH ZERO MISSING!")
