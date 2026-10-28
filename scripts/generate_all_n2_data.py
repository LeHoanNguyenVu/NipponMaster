# -*- coding: utf-8 -*-
"""
Full Dataset Generator for Kanji Master N2
Creates:
1. data_n2_kanjis.py (All 18 chapters, 500 kanjis)
2. data_n2_exercises.py (Exercises, Minigames, Achievement Tests)
3. V23__seed_kanji_n2_data.sql (Flyway migration)
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import psycopg2

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, 'scripts')
MIGRATION_PATH = os.path.join(BASE_DIR, 'backend', 'src', 'main', 'resources', 'db', 'migration', 'V23__seed_kanji_n2_data.sql')

# Chapter definitions
from data_n2_chapters import CHAPTERS_DATA, CHAPTER_VOCABS

print(f"Loaded {len(CHAPTERS_DATA)} chapters from data_n2_chapters.py")
