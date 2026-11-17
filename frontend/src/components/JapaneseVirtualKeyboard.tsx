import { useState } from 'react';
import { Delete, CornerDownLeft, Space, X, Sparkles } from 'lucide-react';
import {
  HIRAGANA_SEION,
  HIRAGANA_DAKUON,
  HIRAGANA_HANDAKUON,
  HIRAGANA_YOON,
  KATAKANA_SEION,
  KATAKANA_DAKUON,
  KATAKANA_HANDAKUON,
  KATAKANA_YOON,
} from '../data/kanaData';

interface JapaneseVirtualKeyboardProps {
  isEn: boolean;
  onInsert: (text: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

type MainTab = 'hiragana' | 'katakana' | 'romaji' | 'kanji';
type KanaSubTab = 'seion' | 'dakuon' | 'yoon';

const SMALL_HIRAGANA = [
  { char: 'っ', romaji: 'tsu nhỏ' },
  { char: 'ゃ', romaji: 'ya nhỏ' },
  { char: 'ゅ', romaji: 'yu nhỏ' },
  { char: 'ょ', romaji: 'yo nhỏ' },
  { char: 'ぁ', romaji: 'a nhỏ' },
  { char: 'ぃ', romaji: 'i nhỏ' },
  { char: 'ぅ', romaji: 'u nhỏ' },
  { char: 'ぇ', romaji: 'e nhỏ' },
  { char: 'ぉ', romaji: 'o nhỏ' },
];

const SMALL_KATAKANA = [
  { char: 'ー', romaji: 'trường âm' },
  { char: 'ッ', romaji: 'tsu nhỏ' },
  { char: 'ャ', romaji: 'ya nhỏ' },
  { char: 'ュ', romaji: 'yu nhỏ' },
  { char: 'ョ', romaji: 'yo nhỏ' },
  { char: 'ァ', romaji: 'a nhỏ' },
  { char: 'ィ', romaji: 'i nhỏ' },
  { char: 'ゥ', romaji: 'u nhỏ' },
  { char: 'ェ', romaji: 'e nhỏ' },
  { char: 'ォ', romaji: 'o nhỏ' },
  { char: 'ヴ', romaji: 'vu' },
];

const JP_PUNCTUATION = ['。', '、', '「', '」', '？', '！', '〜', '・', '（', '）', '『', '』', '々'];

const COMMON_KANJI_GROUPS = [
  {
    labelVi: 'Hỏi & Đại từ',
    labelEn: 'Questions & Pronouns',
    items: [
      { text: '私', hint: 'watashi' },
      { text: '何', hint: 'nani' },
      { text: '誰', hint: 'dare' },
      { text: '人', hint: 'hito' },
      { text: '日本', hint: 'nihon' },
      { text: '日本語', hint: 'nihongo' },
      { text: '先生', hint: 'sensei' },
      { text: '学生', hint: 'gakusei' },
      { text: '友達', hint: 'tomodachi' },
      { text: '意味', hint: 'imi' },
      { text: '言葉', hint: 'kotoba' },
      { text: '文法', hint: 'bunpou' },
      { text: '漢字', hint: 'kanji' },
      { text: '例文', hint: 'reibun' },
      { text: '違い', hint: 'chigai' },
    ],
  },
  {
    labelVi: 'Động từ thông dụng',
    labelEn: 'Common Verbs',
    items: [
      { text: '食べる', hint: 'taberu' },
      { text: '飲む', hint: 'nomu' },
      { text: '行く', hint: 'iku' },
      { text: '来る', hint: 'kuru' },
      { text: '帰る', hint: 'kaeru' },
      { text: '見る', hint: 'miru' },
      { text: '聞く', hint: 'kiku' },
      { text: '読む', hint: 'yomu' },
      { text: '書く', hint: 'kaku' },
      { text: '話す', hint: 'hanasu' },
      { text: '買う', hint: 'kau' },
      { text: '勉強する', hint: 'benkyou' },
      { text: '思う', hint: 'omou' },
      { text: '知る', hint: 'shiru' },
      { text: '使う', hint: 'tsukau' },
    ],
  },
  {
    labelVi: 'Thời gian & Đời sống',
    labelEn: 'Time & Daily Life',
    items: [
      { text: '今日', hint: 'kyou' },
      { text: '明日', hint: 'ashita' },
      { text: '昨日', hint: 'kinou' },
      { text: '毎日', hint: 'mainichi' },
      { text: '時間', hint: 'jikan' },
      { text: '学校', hint: 'gakkou' },
      { text: '会社', hint: 'kaisha' },
      { text: '仕事', hint: 'shigoto' },
      { text: '電車', hint: 'densha' },
      { text: '天気', hint: 'tenki' },
      { text: '元気', hint: 'genki' },
      { text: '好き', hint: 'suki' },
      { text: '上手', hint: 'jouzu' },
      { text: '大切', hint: 'taisetsu' },
      { text: '簡単', hint: 'kantan' },
    ],
  },
];

// Bảng quy đổi Romaji -> Hiragana chuẩn (hỗ trợ cả âm ghép, âm ngắt っ, ん)
const ROMAJI_TO_HIRA: Record<string, string> = {
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  tsu: 'つ', chi: 'ち', shi: 'し',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', si: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', ti: 'ち', tu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', nn: 'ん',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  '-': 'ー', '.': '。', ',': '、', '?': '？', '!': '！',
};

function convertRomaji(raw: string, toKatakana = false): string {
  const s = raw.toLowerCase();
  let out = '';
  let i = 0;

  while (i < s.length) {
    // Xử lý phụ âm đôi (âm ngắt っ), ví dụ: kk, tt, pp, ss, cc
    if (
      i + 1 < s.length &&
      s[i] === s[i + 1] &&
      /[bcdfghjklmpqrstvwxyz]/.test(s[i]) &&
      s[i] !== 'n'
    ) {
      out += 'っ';
      i += 1;
      continue;
    }

    // Thử khớp 3 ký tự -> 2 ký tự -> 1 ký tự
    const tri = s.slice(i, i + 3);
    if (tri.length === 3 && ROMAJI_TO_HIRA[tri]) {
      out += ROMAJI_TO_HIRA[tri];
      i += 3;
      continue;
    }

    const bi = s.slice(i, i + 2);
    if (bi.length === 2 && ROMAJI_TO_HIRA[bi]) {
      out += ROMAJI_TO_HIRA[bi];
      i += 2;
      continue;
    }

    // 'n' đứng trước phụ âm (trừ y) hoặc ở cuối chuỗi -> ん
    if (s[i] === 'n') {
      const next = s[i + 1];
      if (!next || (!/[aiueony]/.test(next) && /[a-z]/.test(next))) {
        out += 'ん';
        i += 1;
        continue;
      }
    }

    const uni = s[i];
    if (ROMAJI_TO_HIRA[uni]) {
      out += ROMAJI_TO_HIRA[uni];
    } else {
      out += raw[i];
    }
    i += 1;
  }

  if (!toKatakana) return out;
  return out.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

export function JapaneseVirtualKeyboard({
  isEn,
  onInsert,
  onBackspace,
  onClose,
}: JapaneseVirtualKeyboardProps) {
  const [mainTab, setMainTab] = useState<MainTab>('hiragana');
  const [subTab, setSubTab] = useState<KanaSubTab>('seion');
  const [romajiBuffer, setRomajiBuffer] = useState('');

  const hiraList =
    subTab === 'seion'
      ? HIRAGANA_SEION
      : subTab === 'dakuon'
        ? [...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON]
        : [...HIRAGANA_YOON, ...SMALL_HIRAGANA];

  const kataList =
    subTab === 'seion'
      ? KATAKANA_SEION
      : subTab === 'dakuon'
        ? [...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON]
        : [...KATAKANA_YOON, ...SMALL_KATAKANA];

  const hiraPreview = convertRomaji(romajiBuffer, false);
  const kataPreview = convertRomaji(romajiBuffer, true);

  return (
    <div className="mb-2 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl overflow-hidden z-30">
      {/* Top Header: Mode Tabs + Utility Buttons */}
      <div className="px-3 py-2 bg-surface-container-low border-b border-outline-variant/40 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => setMainTab('hiragana')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mainTab === 'hiragana'
                ? 'bg-primary text-on-primary shadow-2xs'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            あ Hiragana
          </button>
          <button
            type="button"
            onClick={() => setMainTab('katakana')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mainTab === 'katakana'
                ? 'bg-primary text-on-primary shadow-2xs'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            ア Katakana
          </button>
          <button
            type="button"
            onClick={() => setMainTab('romaji')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mainTab === 'romaji'
                ? 'bg-primary text-on-primary shadow-2xs'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {isEn ? 'A→あ Romaji IME' : 'A→あ Gõ Romaji'}
          </button>
          <button
            type="button"
            onClick={() => setMainTab('kanji')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mainTab === 'kanji'
                ? 'bg-primary text-on-primary shadow-2xs'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {isEn ? '漢 Kanji & Symbols' : '漢 Kanji & Dấu'}
          </button>
        </div>

        {/* Utility keys */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onInsert(' ')}
            className="px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium flex items-center gap-1 cursor-pointer"
            title={isEn ? 'Space' : 'Khoảng trắng'}
          >
            <Space size={13} />
            <span className="hidden sm:inline">{isEn ? 'Space' : 'Cách'}</span>
          </button>
          <button
            type="button"
            onClick={onBackspace}
            className="px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium flex items-center gap-1 cursor-pointer"
            title={isEn ? 'Backspace' : 'Xóa lùi'}
          >
            <Delete size={13} />
            <span className="hidden sm:inline">{isEn ? 'Delete' : 'Xóa'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
            title={isEn ? 'Close keyboard' : 'Đóng bàn phím'}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Sub-tabs for Hiragana / Katakana */}
      {(mainTab === 'hiragana' || mainTab === 'katakana') && (
        <div className="px-3 py-1.5 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSubTab('seion')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer ${
                subTab === 'seion'
                  ? 'bg-primary/12 text-primary'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              {isEn ? 'Basic (清音 46)' : 'Cơ bản (清音 46)'}
            </button>
            <button
              type="button"
              onClick={() => setSubTab('dakuon')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer ${
                subTab === 'dakuon'
                  ? 'bg-primary/12 text-primary'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              {isEn ? 'Voiced (が・ぱ)' : 'Biến âm (が・ぱ)'}
            </button>
            <button
              type="button"
              onClick={() => setSubTab('yoon')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer ${
                subTab === 'yoon'
                  ? 'bg-primary/12 text-primary'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              {isEn ? 'Combo & Small (きゃ・っ)' : 'Âm ghép & Nhỏ (きゃ・っ)'}
            </button>
          </div>

          {/* Quick Punctuation strip */}
          <div className="flex items-center gap-1">
            {['。', '、', '？', '「', '」', 'ー'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onInsert(p)}
                className="w-6 h-6 rounded bg-surface-container-low hover:bg-primary/12 hover:text-primary text-xs font-jp font-bold text-on-surface flex items-center justify-center cursor-pointer border border-outline-variant/30"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="p-2.5 max-h-56 overflow-y-auto">
        {(mainTab === 'hiragana' || mainTab === 'katakana') && (
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
            {(mainTab === 'hiragana' ? hiraList : kataList).map((item, idx) => (
              <button
                key={`${item.char}-${idx}`}
                type="button"
                onClick={() => onInsert(item.char)}
                className="py-1.5 px-1 rounded-lg bg-surface-container-low hover:bg-primary/12 hover:border-primary/40 border border-outline-variant/30 flex flex-col items-center justify-center transition-colors cursor-pointer group"
              >
                <span className="font-jp font-bold text-sm text-on-surface group-hover:text-primary leading-tight">
                  {item.char}
                </span>
                <span className="text-[9px] text-outline font-mono leading-tight mt-0.5">
                  {item.romaji}
                </span>
              </button>
            ))}
          </div>
        )}

        {mainTab === 'romaji' && (
          <div className="space-y-2.5 p-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={romajiBuffer}
                onChange={(e) => setRomajiBuffer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && hiraPreview.trim()) {
                    e.preventDefault();
                    onInsert(hiraPreview);
                    setRomajiBuffer('');
                  }
                }}
                placeholder={
                  isEn
                    ? 'Type Romaji here (e.g. watashi, sensei, konnichiha, gakkou)...'
                    : 'Gõ chữ cái Romaji tại đây (vd: watashi, sensei, konnichiha, gakkou)...'
                }
                className="flex-1 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none"
                autoFocus
              />
              {romajiBuffer && (
                <button
                  type="button"
                  onClick={() => setRomajiBuffer('')}
                  className="px-2 py-1.5 text-xs text-outline hover:text-error cursor-pointer"
                >
                  {isEn ? 'Clear' : 'Xóa'}
                </button>
              )}
            </div>

            {romajiBuffer.trim() ? (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onInsert(hiraPreview);
                    setRomajiBuffer('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-primary/12 border border-primary/30 hover:bg-primary hover:text-on-primary text-primary text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CornerDownLeft size={13} />
                  <span>Hiragana: </span>
                  <span className="font-jp text-sm">{hiraPreview}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onInsert(kataPreview);
                    setRomajiBuffer('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/50 hover:border-primary/40 hover:text-primary text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Katakana: </span>
                  <span className="font-jp text-sm">{kataPreview}</span>
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-outline">
                {isEn
                  ? 'Tip: Type Latin letters above and press Enter to insert Hiragana, or click Katakana.'
                  : 'Mẹo: Gõ phiên âm Romaji vào ô trên rồi bấm Enter để chèn nhanh Hiragana (hoặc bấm nút Katakana).'}
              </p>
            )}
          </div>
        )}

        {mainTab === 'kanji' && (
          <div className="space-y-2.5">
            {COMMON_KANJI_GROUPS.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="text-[10px] font-bold text-outline uppercase tracking-wider px-0.5">
                  {isEn ? grp.labelEn : grp.labelVi}
                </div>
                <div className="flex flex-wrap gap-1">
                  {grp.items.map((item) => (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => onInsert(item.text)}
                      className="px-2 py-1 rounded-lg bg-surface-container-low hover:bg-primary/12 border border-outline-variant/30 hover:border-primary/40 flex items-baseline gap-1 cursor-pointer group"
                    >
                      <span className="font-jp font-bold text-xs text-on-surface group-hover:text-primary">
                        {item.text}
                      </span>
                      <span className="text-[9px] text-outline font-mono">{item.hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-1">
              <div className="text-[10px] font-bold text-outline uppercase tracking-wider px-0.5">
                {isEn ? 'Japanese Punctuation' : 'Dấu câu tiếng Nhật'}
              </div>
              <div className="flex flex-wrap gap-1">
                {JP_PUNCTUATION.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onInsert(p)}
                    className="w-7 h-7 rounded-lg bg-surface-container-low hover:bg-primary/12 border border-outline-variant/30 font-jp font-bold text-xs text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
