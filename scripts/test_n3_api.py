# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import json

# 1. Test roadmap
req = urllib.request.urlopen('http://localhost:8080/api/v1/kanji/n3/roadmap')
res = json.loads(req.read().decode('utf-8'))['data']
print('=== ROADMAP ===')
print('Level:', res['level'])
print('Total chapters:', res['totalChapters'])
print('Total kanji:', res['totalKanji'])
print('Chapters count:', len(res['chapters']))
print('Achievement tests count:', len(res['achievementTests']))
for at in res['achievementTests']:
    print(f"  Stage {at['stage']}: {at['title']}")

# 2. Test chapter 1 detail by chapterNumber (1)
req2 = urllib.request.urlopen('http://localhost:8080/api/v1/kanji/n3/chapters/1')
res2 = json.loads(req2.read().decode('utf-8'))['data']
print('\n=== CHAPTER 1 DETAIL (using chapter number 1) ===')
print('Chapter title:', res2['chapter']['titleJa'], '-', res2['chapter']['titleVi'])
print('Kanjis count:', len(res2['kanjis']))
print('Vocab count:', len(res2['vocabularies']))
print('Reading exercises:', len(res2['readingExercises']))
print('Writing exercises:', len(res2['writingExercises']))
print('Minigames:', len(res2['minigames']))

# 3. Test submit test for chapter 1
submit_data = json.dumps({'score': 90, 'totalQuestions': 5, 'correctCount': 5, 'answers': {}}).encode('utf-8')
post_req = urllib.request.Request('http://localhost:8080/api/v1/kanji/n3/chapters/1/submit', data=submit_data, headers={'Content-Type': 'application/json'})
res3 = json.loads(urllib.request.urlopen(post_req).read().decode('utf-8'))['data']
print('\n=== SUBMIT RESULT ===')
print('Score:', res3['score'])
print('Passed:', res3['isPassed'])
print('Unlocked next:', res3['unlockedNextChapter'])
print('Next chap:', res3['nextChapterNumber'])
print('Message:', res3['message'])
