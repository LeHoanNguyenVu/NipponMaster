# -*- coding: utf-8 -*-
"""
Builder script to generate:
- scripts/data_n2_kanjis.py (All 500 N2 kanjis with full metadata)
- scripts/data_n2_exercises.py (Exercises, Minigames, Achievement Tests)
- backend/src/main/resources/db/migration/V23__seed_kanji_n2_data.sql
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json

from data_n2_chapters import CHAPTERS_DATA, CHAPTER_VOCABS
from n2_kanji_source import CHAPTER_KANJIS_MAP
from data_n2_kanjis_part1 import KANJIS_PART1

print(f"Loaded existing {len(KANJIS_PART1)} kanjis from part 1")
