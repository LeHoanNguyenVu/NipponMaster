import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Kịch bản test tải nhẹ cho endpoint Dịch nhanh (/api/v1/translate/fast).
 * Chạy thử: k6 run docs/k6-translate-load-test.js
 */
export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<1000'],
  },
};

const BASE_URL = __ENV.API_BASE_URL || 'http://localhost:8088';

const SAMPLES = [
  { text: '先生', sourceLang: 'ja', targetLang: 'vi' },
  { text: '毎日日本語を勉強しています。', sourceLang: 'ja', targetLang: 'vi' },
  { text: '学校に行きます。', sourceLang: 'ja', targetLang: 'vi' },
  { text: 'Hôm nay trời rất đẹp.', sourceLang: 'vi', targetLang: 'ja' },
];

export default function () {
  const payload = JSON.stringify(SAMPLES[Math.floor(Math.random() * SAMPLES.length)]);
  const res = http.post(`${BASE_URL}/api/v1/translate/fast`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
    'has translatedText when 200': (r) =>
      r.status !== 200 || Boolean(r.json('data.translatedText')),
  });

  sleep(1);
}

