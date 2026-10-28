# -*- coding: utf-8 -*-
"""
Kanji Master N2 - All 18 Chapters Combined Kanjis Dataset
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_n2_kanjis_part1 import KANJIS_PART1
from generate_kanji_details import KANJIS_REST as KANJIS_CH4_5
from data_n2_kanjis_ch6_10 import KANJIS_CH6_10
from data_n2_kanjis_ch11_18 import KANJIS_CH11_18

KANJIS_DATA = KANJIS_PART1 + KANJIS_CH4_5 + KANJIS_CH6_10 + KANJIS_CH11_18

if __name__ == '__main__':
    print(f"Total N2 Kanjis combined: {len(KANJIS_DATA)}")
    chars = [k[2] for k in KANJIS_DATA]
    print(f"Unique characters: {len(set(chars))}")
    by_chap = {}
    for k in KANJIS_DATA:
        by_chap[k[0]] = by_chap.get(k[0], 0) + 1
    for ch in sorted(by_chap.keys()):
        print(f"  Chapter {ch}: {by_chap[ch]} kanjis")
