# -*- coding: utf-8 -*-
"""
Kanji Master N3 - All 376 Kanjis Combined
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_n3_kanjis_part1 import KANJIS_PART1
from data_n3_kanjis_part2 import KANJIS_PART2

KANJIS_DATA = KANJIS_PART1 + KANJIS_PART2

if __name__ == '__main__':
    print(f"Total N3 Kanjis combined: {len(KANJIS_DATA)}")
    chars = [k[2] for k in KANJIS_DATA]
    print(f"Unique characters: {len(set(chars))}")
