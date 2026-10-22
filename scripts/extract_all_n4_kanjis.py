import sys
import os
import numpy as np
from PIL import Image
from scipy import ndimage

sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = 'frontend/public/assets/kanji/n4/illustrations'
os.makedirs(OUTPUT_DIR, exist_ok=True)

SUB_LESSONS_CONFIG = [
    # Chapter 2
    {"chap": 2, "sub": 1, "chars": ['店', '客', '親', '切', '売', '当', '品'], "scan_strip": 'tmp_strips/strip_p19.png'},
    {"chap": 2, "sub": 2, "chars": ['便', '利', '使', '銀', '白', '黒', '紙'], "full_strip": 'tmp_full_strips/chap2_sub2_strip.png'},
    {"chap": 2, "sub": 3, "chars": ['朝', '晩', '昼', '夜', '前', '後', '午', '早'], "scan_strip": 'tmp_strips/strip_p24.png'},

    # Chapter 3
    {"chap": 3, "sub": 1, "chars": ['荷', '送', '宅', '急', '速', '遅', '重', '軽'], "full_strip": 'tmp_full_strips/chap3_sub1_strip.png'},
    {"chap": 3, "sub": 2, "chars": ['住', '所', '様', '主', '番', '地', '号'], "scan_strip": 'tmp_strips/strip_p37.png'},
    {"chap": 3, "sub": 3, "chars": ['京', '都', '道', '府', '県', '市', '区', '村'], "scan_strip": 'tmp_strips/strip_p40.png'},

    # Chapter 4
    {"chap": 4, "sub": 1, "chars": ['毎', '週', '映', '画', '図', '館', '公', '園'], "full_strip": 'tmp_full_strips/chap4_sub1_strip.png'},
    {"chap": 4, "sub": 2, "chars": ['夫', '妻', '特', '思', '料', '理', '有'], "full_strip": 'tmp_full_strips/chap4_sub2_strip.png'},
    {"chap": 4, "sub": 3, "chars": ['洋', '服', '衣', '短', '毛', '糸', '玉', '光'], "full_strip": 'tmp_full_strips/chap4_sub3_strip.png'},

    # Chapter 5
    {"chap": 5, "sub": 1, "chars": ['駅', '鉄', '乗', '降', '開', '閉', '発', '着'], "full_strip": 'tmp_full_strips/chap5_sub1_strip.png'},
    {"chap": 5, "sub": 2, "chars": ['交', '通', '台', '止', '色', '赤', '黄', '青'], "full_strip": 'tmp_full_strips/chap5_sub2_strip.png'},
    {"chap": 5, "sub": 3, "chars": ['病', '院', '医', '科', '薬', '待', '合', '計'], "full_strip": 'tmp_full_strips/chap5_sub3_strip.png'},

    # Chapter 6
    {"chap": 6, "sub": 1, "chars": ['研', '究', '語', '文', '英', '化', '数', '心'], "full_strip": 'tmp_full_strips/chap6_sub1_strip.png'},
    {"chap": 6, "sub": 2, "chars": ['若', '集', '知', '酒', '歌', '声', '楽'], "full_strip": 'tmp_full_strips/chap6_sub2_strip.png'},
    {"chap": 6, "sub": 3, "chars": ['味', '油', '太', '細', '皿', '飯', '麦'], "full_strip": 'tmp_full_strips/chap6_sub3_strip.png'},

    # Chapter 7
    {"chap": 7, "sub": 1, "chars": ['春', '夏', '秋', '冬', '空', '星', '雲', '去'], "full_strip": 'tmp_full_strips/chap7_sub1_strip.png'},
    {"chap": 7, "sub": 2, "chars": ['天', '晴', '雪', '風', '強', '弱', '暑', '寒'], "scan_strip": 'tmp_strips/strip_p57.png'},
    {"chap": 7, "sub": 3, "chars": ['旅', '持', '世', '界', '写', '真', '船'], "full_strip": 'tmp_full_strips/chap7_sub3_strip.png'},

    # Chapter 8
    {"chap": 8, "sub": 1, "chars": ['勉', '漢', '宿', '題', '質', '問', '教', '室'], "full_strip": 'tmp_full_strips/chap8_sub1_strip.png'},
    {"chap": 8, "sub": 2, "chars": ['試', '験', '答', '考', '正', '丸', '不', '同'], "scan_strip": 'tmp_strips/strip_p70.png'},
    {"chap": 8, "sub": 3, "chars": ['政', '治', '経', '済', '歴', '史', '国', '王'], "full_strip": 'tmp_full_strips/chap8_sub3_strip.png'},

    # Chapter 9
    {"chap": 9, "sub": 1, "chars": ['運', '動', '練', '習', '走', '歩', '泳', '才'], "full_strip": 'tmp_full_strips/chap9_sub1_strip.png'},
    {"chap": 9, "sub": 2, "chars": ['自', '然', '草', '原', '湖', '谷', '海', '辺'], "scan_strip": 'tmp_strips/strip_p79.png'},
    {"chap": 9, "sub": 3, "chars": ['里', '野', '奥', '池', '虫', '羽', '鳴', '馬'], "full_strip": 'tmp_full_strips/chap9_sub3_strip.png'},
]

def extract_kanjis(strip_path, char_list):
    strip_img = Image.open(strip_path)
    w, h = strip_img.size
    g = np.array(strip_img.convert('L'))
    
    # Row dark counts
    row_dark = (g < 155).sum(axis=1)
    h_candidates = np.where(row_dark > (w * 0.22))[0]
    top_y = h_candidates[0] if len(h_candidates) > 0 else 0
    bot_y = h_candidates[-1] if len(h_candidates) > 0 else h - 1
    
    # Col dark counts
    col_dark = (g < 155).sum(axis=0)
    v_candidates = np.where(col_dark > (h * 0.22))[0]
    left_x = v_candidates[0] if len(v_candidates) > 0 else 0
    right_x = v_candidates[-1] if len(v_candidates) > 0 else w - 1
    
    # Inner box margin
    pad_y = max(8, int((bot_y - top_y) * 0.08))
    pad_x = max(8, int((right_x - left_x) * 0.015))
    
    inner_top = top_y + pad_y
    inner_bot = bot_y - pad_y
    inner_left = left_x + pad_x
    inner_right = right_x - pad_x
    
    box = strip_img.crop((inner_left, inner_top, inner_right, inner_bot))
    bw, bh = box.size
    n = len(char_list)
    step = bw / float(n)
    
    results = {}
    for i, ch in enumerate(char_list):
        x1 = int(i * step)
        x2 = int((i + 1) * step)
        char_slot = box.crop((x1, 0, x2, bh))
        sw, sh = char_slot.size
        
        cg = np.array(char_slot.convert('L'))
        dark_mask = cg < 165
        
        labeled, num_features = ndimage.label(dark_mask)
        if num_features > 0:
            cleaned_mask = np.zeros_like(dark_mask)
            for feat_idx in range(1, num_features + 1):
                feat_mask = (labeled == feat_idx)
                feat_y, feat_x = np.where(feat_mask)
                if len(feat_x) == 0:
                    continue
                mean_x = feat_x.mean()
                # Central region
                if 0.08 * sw <= mean_x <= 0.92 * sw:
                    cleaned_mask[feat_mask] = True
            
            dark_y, dark_x = np.where(cleaned_mask)
            if len(dark_x) > 0:
                pad = 12
                min_x = max(0, dark_x.min() - pad)
                max_x = min(sw, dark_x.max() + pad)
                min_y = max(0, dark_y.min() - pad)
                max_y = min(sh, dark_y.max() + pad)
                
                slot_rgb = np.array(char_slot)
                slot_rgb[~cleaned_mask] = [255, 255, 255]
                clean_slot = Image.fromarray(slot_rgb)
                
                tight = clean_slot.crop((min_x, min_y, max_x, max_y))
                
                side = max(tight.width, tight.height) + 36
                sq = Image.new('RGB', (side, side), 'white')
                sq.paste(tight, ((side - tight.width) // 2, (side - tight.height) // 2))
                sq = sq.resize((300, 300), Image.Resampling.LANCZOS)
                results[ch] = sq
    return results

total_saved = 0
for cfg in SUB_LESSONS_CONFIG:
    chap = cfg["chap"]
    sub = cfg["sub"]
    chars = cfg["chars"]
    strip_path = cfg.get("scan_strip")
    if not strip_path or not os.path.exists(strip_path):
        strip_path = cfg.get("full_strip")
        if not strip_path or not os.path.exists(strip_path):
            strip_path = f'tmp_full_strips/chap{chap}_sub{sub}_strip.png'
    
    if not os.path.exists(strip_path):
        print(f"ERROR: Strip not found for Chap {chap}-{sub}: {strip_path}")
        continue
    
    res = extract_kanjis(strip_path, chars)
    for ch, img in res.items():
        out_p = os.path.join(OUTPUT_DIR, f'kanji_n4_{ch}.webp')
        img.save(out_p, 'WEBP', quality=95)
        total_saved += 1
    
    missing = [c for c in chars if c not in res]
    if missing:
        print(f"WARNING: Chap {chap}-{sub} missing characters: {missing}")
    else:
        print(f"Chap {chap}-{sub} ({len(chars)} chars): OK (source: {os.path.basename(strip_path)})")

print(f"\nTotal kanjis cropped and saved: {total_saved}")
