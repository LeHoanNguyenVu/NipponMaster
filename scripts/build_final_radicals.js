// build_final_radicals.js - Script kiểm tra và xuất file kanjiRadicals214.ts
const fs = require('fs');
const path = require('path');

const part1 = require('./radicals_part1');
const part2 = require('./radicals_part2');
const part3 = require('./radicals_part3');
const part4 = require('./radicals_part4');

const allRadicals = [...part1, ...part2, ...part3, ...part4];

console.log(`Đã nạp tổng cộng: ${allRadicals.length} bộ thủ.`);

// 1. Kiểm tra số lượng
if (allRadicals.length !== 214) {
  console.error(`LỖI: Số lượng bộ thủ không đúng 214! (Hiện tại: ${allRadicals.length})`);
  process.exit(1);
}

// 2. Kiểm tra tính liên tục của ID và dữ liệu từng bộ
const seenIds = new Set();
for (let i = 0; i < allRadicals.length; i++) {
  const r = allRadicals[i];
  const expectedId = i + 1;
  if (r.id !== expectedId) {
    console.error(`LỖI: Sai lệch ID tại vị trí ${i}! Kỳ vọng ${expectedId}, nhận được ${r.id}`);
    process.exit(1);
  }
  if (seenIds.has(r.id)) {
    console.error(`LỖI: Trùng lặp ID ${r.id}`);
    process.exit(1);
  }
  seenIds.add(r.id);

  if (!r.character || !r.hanViet || !r.meaning || !r.strokeCount || !r.reading || !r.position || !r.examples) {
    console.error(`LỖI: Bộ thủ ID ${r.id} thiếu dữ liệu bắt buộc!`, r);
    process.exit(1);
  }
}

console.log('✅ Kiểm tra tính toàn vẹn 214 bộ thủ: THÀNH CÔNG 100%!');

// 3. Chuẩn bị nội dung file TypeScript
const tsContent = `/**
 * kanjiRadicals214.ts — Bộ dữ liệu chuẩn 214 Bộ Thủ Khang Hy (Kangxi Radicals - 康熙部首)
 * Đầy đủ từ Bộ 1 (Nhất 一) đến Bộ 214 (Dược 龠)
 * 
 * Mỗi bản ghi bao gồm:
 * - id: 1 - 214
 * - character: Ký tự bộ thủ gốc
 * - variants: Danh sách biến thể (ví dụ: 亻, 氵, 忄, 扌, 艹, v.v.)
 * - hanViet: Tên gọi Hán Việt chuẩn
 * - meaning: Ý nghĩa tiếng Việt cốt lõi
 * - strokeCount: Số nét viết (1 - 17 nét)
 * - reading: Phiên âm tiếng Nhật ({ hiragana, romaji })
 * - position: Vị trí bộ thủ trong chữ Hán (hen, tsukuri, kanmuri, ashi, kamae, tare, nyoo, isolated)
 * - positionNameVi: Tên phân loại vị trí bằng tiếng Việt
 * - examples: Mảng chữ Kanji ví dụ điển hình kèm Hán Việt và nghĩa
 * - description: Giải thích nguồn gốc tượng hình và mẹo ghi nhớ
 */

export type RadicalPosition =
  | 'hen'       // Bên trái (偏 - Hen)
  | 'tsukuri'   // Bên phải (旁 - Tsukuri)
  | 'kanmuri'   // Ở trên (冠 - Kanmuri)
  | 'ashi'      // Ở dưới (脚 - Ashi)
  | 'kamae'     // Bao quanh (構 - Kamae)
  | 'tare'      // Góc trên bên trái (垂 - Tare)
  | 'nyoo'      // Góc dưới bên trái (繞 - Nyoo)
  | 'isolated'; // Toàn thân / Độc lập (cả chữ là bộ thủ)

export interface RadicalExample {
  kanji: string;
  hanViet: string;
  meaning: string;
  hiragana?: string;
}

export interface Radical214 {
  id: number;
  character: string;
  variants: string[];
  hanViet: string;
  meaning: string;
  strokeCount: number;
  reading: {
    hiragana: string;
    romaji: string;
  };
  position: RadicalPosition;
  positionNameVi: string;
  examples: RadicalExample[];
  description?: string;
}

export const RADICAL_POSITIONS: { key: RadicalPosition; nameVi: string; nameJa: string }[] = [
  { key: 'hen', nameVi: 'Bên trái (Hen)', nameJa: '偏 (へん)' },
  { key: 'tsukuri', nameVi: 'Bên phải (Tsukuri)', nameJa: '旁 (つくり)' },
  { key: 'kanmuri', nameVi: 'Ở trên (Kanmuri)', nameJa: '冠 (かんむり)' },
  { key: 'ashi', nameVi: 'Ở dưới (Ashi)', nameJa: '脚 (あし)' },
  { key: 'kamae', nameVi: 'Bao quanh (Kamae)', nameJa: '構 (かまえ)' },
  { key: 'tare', nameVi: 'Góc trên trái (Tare)', nameJa: '垂 (たれ)' },
  { key: 'nyoo', nameVi: 'Góc dưới trái (Nyoo)', nameJa: '繞 (にょう)' },
  { key: 'isolated', nameVi: 'Toàn thân (Độc lập)', nameJa: '独体 (どくたい)' },
];

export const RADICAL_STROKE_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export const KANJI_RADICALS_214: Radical214[] = ${JSON.stringify(allRadicals, null, 2)};

// ══════════════════════════════════════════════════════
// HELPER UTILITIES
// ══════════════════════════════════════════════════════

/** Lấy bộ thủ theo ID (1 - 214) */
export function getRadicalById(id: number): Radical214 | undefined {
  return KANJI_RADICALS_214.find(r => r.id === id);
}

/** Lọc bộ thủ theo số nét viết */
export function filterRadicalsByStroke(strokeCount: number): Radical214[] {
  return KANJI_RADICALS_214.filter(r => r.strokeCount === strokeCount);
}

/** Lọc bộ thủ theo vị trí trong chữ Hán */
export function filterRadicalsByPosition(position: RadicalPosition): Radical214[] {
  return KANJI_RADICALS_214.filter(r => r.position === position);
}

/** Xóa dấu tiếng Việt phục vụ tìm kiếm mềm */
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/** Tìm kiếm đa năng theo chữ Hán, biến thể, tên Hán Việt, nghĩa, Romaji */
export function searchRadicals(query: string): Radical214[] {
  if (!query || !query.trim()) return KANJI_RADICALS_214;
  const cleanQuery = removeVietnameseTones(query.trim());
  const rawQuery = query.trim().toLowerCase();

  return KANJI_RADICALS_214.filter(r => {
    // 1. Khớp chữ Hán hoặc biến thể
    if (r.character.includes(rawQuery)) return true;
    if (r.variants.some(v => v.includes(rawQuery))) return true;

    // 2. Khớp Hán Việt (có dấu hoặc không dấu)
    const cleanHanViet = removeVietnameseTones(r.hanViet);
    if (cleanHanViet.includes(cleanQuery)) return true;

    // 3. Khớp nghĩa tiếng Việt
    const cleanMeaning = removeVietnameseTones(r.meaning);
    if (cleanMeaning.includes(cleanQuery)) return true;

    // 4. Khớp romaji hoặc hiragana
    if (r.reading.romaji.toLowerCase().includes(rawQuery)) return true;
    if (r.reading.hiragana.includes(rawQuery)) return true;

    // 5. Khớp chữ Kanji ví dụ
    if (r.examples.some(ex => ex.kanji.includes(rawQuery) || removeVietnameseTones(ex.hanViet).includes(cleanQuery))) {
      return true;
    }

    return false;
  });
}

/** Random ngẫu nhiên N bộ thủ (phục vụ quiz) */
export function getRandomRadicals(count: number, excludeIds: number[] = []): Radical214[] {
  const pool = KANJI_RADICALS_214.filter(r => !excludeIds.includes(r.id));
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
`;

const targetPath = path.resolve(__dirname, '../frontend/src/data/kanjiRadicals214.ts');
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log(`🎉 Đã xuất thành công file: ${targetPath}`);
console.log(`Kích thước file: ${(fs.statSync(targetPath).size / 1024).toFixed(2)} KB`);
