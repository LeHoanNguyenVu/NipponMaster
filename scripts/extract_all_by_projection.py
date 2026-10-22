import sys
import os
import numpy as np
from PIL import Image
from scipy import ndimage

sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = 'frontend/public/assets/kanji/n4/illustrations'
os.makedirs(OUTPUT_DIR, exist_ok=True)

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

def extract_sublesson_projection(strip_path, chars):
    im = Image.open(strip_path)
    w, h = im.size
    
    y1 = int(h * 0.40)
    y2 = int(h * 0.85)
    
    zone = im.crop((0, y1, w, y2))
    zg = np.array(zone.convert('L'))
    dark_cols = (zg < 165).sum(axis=0)
    
    is_dark = dark_cols > 5
    blocks = []
    in_b = False
    b_start = 0
    for x, val in enumerate(is_dark):
        if val and not in_b:
            in_b = True
            b_start = x
        elif not val and in_b:
            in_b = False
            if x - b_start > 15:
                blocks.append((b_start, x))
    if in_b and (len(is_dark) - b_start > 15):
        blocks.append((b_start, len(is_dark)))
        
    merged = []
    for b in blocks:
        if not merged:
            merged.append(b)
        else:
            if b[0] - merged[-1][1] <= 32:
                merged[-1] = (merged[-1][0], b[1])
            else:
                merged.append(b)
                
    results = {}
    if len(merged) == len(chars):
        char_boxes = merged
    else:
        # Fallback to even-step
        step = (w * 0.92 - w * 0.05) / float(len(chars))
        char_boxes = []
        for i in range(len(chars)):
            char_boxes.append((int(w * 0.05 + i * step), int(w * 0.05 + (i + 1) * step)))
            
    for ch, (bx1, bx2) in zip(chars, char_boxes):
        pad_x = 12
        slot = im.crop((max(0, bx1 - pad_x), y1 - 10, min(w, bx2 + pad_x), y2 + 10))
        sg = np.array(slot.convert('L'))
        dark_mask = sg < 165
        
        labeled, num_features = ndimage.label(dark_mask)
        clean_mask = np.zeros_like(dark_mask)
        for feat_idx in range(1, num_features + 1):
            feat_mask = (labeled == feat_idx)
            feat_y, feat_x = np.where(feat_mask)
            fh = feat_y.max() - feat_y.min()
            fw = feat_x.max() - feat_x.min()
            # Border lines have fh <= 4 or fw <= 4
            if fh > 8 and fw > 8:
                clean_mask[feat_mask] = True
                
        dark_y, dark_x = np.where(clean_mask)
        if len(dark_x) > 0:
            min_x = max(0, dark_x.min() - 8)
            max_x = min(slot.width, dark_x.max() + 8)
            min_y = max(0, dark_y.min() - 8)
            max_y = min(slot.height, dark_y.max() + 8)
            
            slot_rgb = np.array(slot)
            slot_rgb[~clean_mask] = [255, 255, 255]
            clean = Image.fromarray(slot_rgb).crop((min_x, min_y, max_x, max_y))
            
            side = max(clean.width, clean.height) + 32
            sq = Image.new('RGB', (side, side), 'white')
            sq.paste(clean, ((side - clean.width) // 2, (side - clean.height) // 2))
            results[ch] = sq.resize((300, 300), Image.Resampling.LANCZOS)
            
    return results

total_saved = 0
for chap, sub_list in CHAPTERS_SPEC.items():
    for sub_info in sub_list:
        sub = sub_info["sub"]
        chars = sub_info["chars"]
        strip_p = sub_info["strip"]
        if not os.path.exists(strip_p):
            strip_p = f"tmp_full_strips/chap{chap}_sub{sub}_strip.png"
            
        res = extract_sublesson_projection(strip_p, chars)
        for ch, im in res.items():
            out_p = os.path.join(OUTPUT_DIR, f"kanji_n4_{ch}.webp")
            im.save(out_p, "WEBP", quality=95)
            total_saved += 1
        print(f"Chap {chap}-{sub} ({len(chars)} chars): extracted {len(res)}/{len(chars)}")

print(f"\nTotal characters saved: {total_saved} / 185")
