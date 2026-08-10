import { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { teacherCmsApi, type CreateVocabularyPayload, type CreateKanjiPayload, type CreateGrammarPayload } from '../../api/teacherCmsApi';

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;

export default function ContentCmsStudio() {
  const [activeTab, setActiveTab] = useState<'vocab' | 'kanji' | 'grammar'>('vocab');
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<any[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [vocabForm, setVocabForm] = useState<CreateVocabularyPayload>({
    word: '',
    reading: '',
    meaning: '',
    exampleSentence: '',
    exampleMeaning: '',
    jlptLevel: 'N5',
    wordType: 'NOUN',
    topic: 'GENERAL',
  });

  const [kanjiForm, setKanjiForm] = useState<CreateKanjiPayload>({
    character: '',
    meaning: '',
    onReading: '',
    kunReading: '',
    strokeCount: 5,
    radical: '',
    relatedWords: '',
    jlptLevel: 'N5',
  });

  const [grammarForm, setGrammarForm] = useState<CreateGrammarPayload>({
    title: '',
    structure: '',
    meaning: '',
    usageNotes: '',
    exampleSentences: '',
    jlptLevel: 'N5',
  });

  // Fetch Items according to active Tab
  const fetchData = async () => {
    try {
      setLoading(true);
      setDataList([]);
      let endpoint = '/vocabulary/search';
      if (activeTab === 'kanji') endpoint = '/kanjis/search';
      if (activeTab === 'grammar') endpoint = '/grammar/search';

      const res = await axiosClient.get(endpoint, {
        params: { level: selectedLevel, keyword: searchQuery, size: 100 },
      });

      let items = [];
      if (res.data?.page?.content) items = res.data.page.content;
      else if (res.data?.content) items = res.data.content;
      else if (Array.isArray(res.data)) items = res.data;

      setDataList(items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, selectedLevel]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setVocabForm({ word: '', reading: '', meaning: '', exampleSentence: '', exampleMeaning: '', jlptLevel: selectedLevel, wordType: 'NOUN', topic: 'GENERAL' });
    setKanjiForm({ character: '', meaning: '', onReading: '', kunReading: '', strokeCount: 5, radical: '', relatedWords: '', jlptLevel: selectedLevel });
    setGrammarForm({ title: '', structure: '', meaning: '', usageNotes: '', exampleSentences: '', jlptLevel: selectedLevel });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'vocab') {
      setVocabForm({
        word: item.word || '',
        reading: item.reading || '',
        meaning: item.meaning || '',
        exampleSentence: item.exampleSentence || '',
        exampleMeaning: item.exampleMeaning || '',
        jlptLevel: item.jlptLevel || selectedLevel,
        wordType: item.wordType || 'NOUN',
        topic: item.topic || 'GENERAL',
      });
    } else if (activeTab === 'kanji') {
      setKanjiForm({
        character: item.character || '',
        meaning: item.meaning || '',
        onReading: item.onReading || '',
        kunReading: item.kunReading || '',
        strokeCount: item.strokeCount || 5,
        radical: item.radical || '',
        relatedWords: item.relatedWords || '',
        jlptLevel: item.jlptLevel || selectedLevel,
      });
    } else {
      setGrammarForm({
        title: item.pattern || item.title || '',
        structure: item.structure || '',
        meaning: item.meaning || '',
        usageNotes: item.notes || item.usageNotes || '',
        exampleSentences: item.exampleSentence || item.exampleSentences || '',
        jlptLevel: item.jlptLevel || selectedLevel,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      if (activeTab === 'vocab') {
        if (editingItem) {
          await teacherCmsApi.updateVocabulary(editingItem.id, vocabForm);
          setMessage({ type: 'success', text: `Đã cập nhật từ vựng [${vocabForm.word}] thành công!` });
        } else {
          await teacherCmsApi.createVocabulary(vocabForm);
          setMessage({ type: 'success', text: `Đã tạo mới từ vựng [${vocabForm.word}] thành công!` });
        }
      } else if (activeTab === 'kanji') {
        if (editingItem) {
          await teacherCmsApi.updateKanji(editingItem.id, kanjiForm);
          setMessage({ type: 'success', text: `Đã cập nhật Kanji [${kanjiForm.character}] thành công!` });
        } else {
          await teacherCmsApi.createKanji(kanjiForm);
          setMessage({ type: 'success', text: `Đã tạo mới Kanji [${kanjiForm.character}] thành công!` });
        }
      } else {
        if (editingItem) {
          await teacherCmsApi.updateGrammar(editingItem.id, grammarForm);
          setMessage({ type: 'success', text: `Đã cập nhật Ngữ Pháp [${grammarForm.title}] thành công!` });
        } else {
          await teacherCmsApi.createGrammar(grammarForm);
          setMessage({ type: 'success', text: `Đã tạo mới Ngữ Pháp [${grammarForm.title}] thành công!` });
        }
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Có lỗi xảy ra khi lưu nội dung.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, titleStr: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa [${titleStr}]?`)) return;
    try {
      if (activeTab === 'vocab') await teacherCmsApi.deleteVocabulary(id);
      if (activeTab === 'kanji') await teacherCmsApi.deleteKanji(id);
      if (activeTab === 'grammar') await teacherCmsApi.deleteGrammar(id);

      setMessage({ type: 'success', text: `Đã xóa [${titleStr}] khỏi hệ thống.` });
      fetchData();
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Không thể xóa mục này.' });
    }
  };

  const filteredItems = dataList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    if (activeTab === 'vocab') return item.word?.toLowerCase().includes(q) || item.meaning?.toLowerCase().includes(q) || item.reading?.toLowerCase().includes(q);
    if (activeTab === 'kanji') return item.character?.includes(q) || item.meaning?.toLowerCase().includes(q);
    return (item.pattern || item.title)?.toLowerCase().includes(q) || item.meaning?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-primary/10 via-surface-container-low to-secondary/10 p-6 rounded-3xl border border-outline-variant/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={16} />
            <span>Studio Biên Soạn Nội Dung Giảng Viên (Content CMS)</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface">Quản Lý Thư Viện Bài Học</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-medium">
            Thêm mới, cập nhật từ vựng, Hán tự Kanji và cấu trúc ngữ pháp cho toàn bộ cấp độ N5 - N1.
          </p>
        </div>

        <Button onClick={handleOpenAddModal} icon={<Plus size={18} />} className="shadow-md shadow-primary/20">
          Tạo Nội Dung Mới
        </Button>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-semibold ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Control Bar: Tabs, Level Filter, Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
        {/* Module Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'vocab' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <BookOpen size={15} />
            Từ Vựng
          </button>
          <button
            onClick={() => setActiveTab('kanji')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kanji' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Layers size={15} />
            Hán Tự Kanji
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'grammar' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <FileText size={15} />
            Ngữ Pháp
          </button>
        </div>

        {/* Level Pills & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Level Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
            {JLPT_LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={16} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài học..."
              className="pl-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="animate-spin text-primary" size={36} />
          <span className="text-xs font-semibold text-on-surface-variant">Đang nạp dữ liệu bài học...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <Card padding="lg" className="text-center py-12">
          <span className="text-4xl block mb-2">📚</span>
          <h3 className="text-base font-bold text-on-surface">Chưa có bài học nào</h3>
          <p className="text-xs text-on-surface-variant mt-1">Bấm "Tạo Nội Dung Mới" để biên soạn bài học đầu tiên.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const titleStr = activeTab === 'vocab' ? item.word : activeTab === 'kanji' ? item.character : item.pattern || item.title;
            const subtitleStr = activeTab === 'vocab' ? `【${item.reading}】` : activeTab === 'kanji' ? `Âm On: ${item.onReading || '-'} | Kun: ${item.kunReading || '-'}` : item.structure;

            return (
              <Card key={item.id} padding="md" className="flex flex-col justify-between hover:border-primary/40 transition-all shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="crimson">{item.jlptLevel || selectedLevel}</Badge>
                    {activeTab === 'vocab' && item.wordType && <Badge variant="secondary">{item.wordType}</Badge>}
                    {activeTab === 'kanji' && <Badge variant="primary">{item.strokeCount || 5} nét</Badge>}
                  </div>

                  <div>
                    <h3 className="text-2xl font-jp font-bold text-on-surface flex items-center gap-2">
                      {titleStr}
                    </h3>
                    <p className="text-xs text-primary font-medium mt-0.5">{subtitleStr}</p>
                  </div>

                  <p className="text-xs text-on-surface font-semibold line-clamp-2 pt-2 border-t border-outline-variant/30">
                    {item.meaning}
                  </p>

                  {item.exampleSentence && (
                    <div className="bg-surface-container-low p-2 rounded-xl text-[11px] text-on-surface-variant italic font-jp">
                      "{item.exampleSentence}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30 mt-3">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 rounded-lg hover:bg-primary/10 text-primary text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit2 size={14} /> Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, titleStr)}
                    className="p-1.5 rounded-lg hover:bg-error/10 text-error text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal Form Tạo / Sửa Nội Dung */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                {editingItem ? <Edit2 className="text-primary" size={20} /> : <Plus className="text-primary" size={20} />}
                <span>{editingItem ? 'Chỉnh Sửa Bài Học' : 'Tạo Bài Học Mới'}</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4">
              {/* Level Selector */}
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Cấp Độ JLPT</label>
                <select
                  value={activeTab === 'vocab' ? vocabForm.jlptLevel : activeTab === 'kanji' ? kanjiForm.jlptLevel : grammarForm.jlptLevel}
                  onChange={(e: any) => {
                    const lvl = e.target.value;
                    if (activeTab === 'vocab') setVocabForm({ ...vocabForm, jlptLevel: lvl });
                    else if (activeTab === 'kanji') setKanjiForm({ ...kanjiForm, jlptLevel: lvl });
                    else setGrammarForm({ ...grammarForm, jlptLevel: lvl });
                  }}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs font-bold text-on-surface"
                >
                  {JLPT_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* VOCAB FORM FIELDS */}
              {activeTab === 'vocab' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Từ Vựng Tiếng Nhật (*)</label>
                    <Input value={vocabForm.word} onChange={(e) => setVocabForm({ ...vocabForm, word: e.target.value })} placeholder="Ví dụ: 食べる, 学校..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Cách Đọc Hiragana / Katakana (*)</label>
                    <Input value={vocabForm.reading} onChange={(e) => setVocabForm({ ...vocabForm, reading: e.target.value })} placeholder="Ví dụ: たべる, がっこう..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Ý Nghĩa Tiếng Việt (*)</label>
                    <Input value={vocabForm.meaning} onChange={(e) => setVocabForm({ ...vocabForm, meaning: e.target.value })} placeholder="Ví dụ: Ăn, Trường học..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Câu Ví Dụ Minh Họa</label>
                    <Input value={vocabForm.exampleSentence || ''} onChange={(e) => setVocabForm({ ...vocabForm, exampleSentence: e.target.value })} placeholder="Ví dụ: 毎日ご飯を食べる。" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Nghĩa Của Câu Ví Dụ</label>
                    <Input value={vocabForm.exampleMeaning || ''} onChange={(e) => setVocabForm({ ...vocabForm, exampleMeaning: e.target.value })} placeholder="Ví dụ: Hàng ngày tôi đều ăn cơm." />
                  </div>
                </>
              )}

              {/* KANJI FORM FIELDS */}
              {activeTab === 'kanji' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant block mb-1">Chữ Hán Kanji (*)</label>
                      <Input value={kanjiForm.character} onChange={(e) => setKanjiForm({ ...kanjiForm, character: e.target.value })} placeholder="Ví dụ: 船, 日..." required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant block mb-1">Số Nét Vẽ (*)</label>
                      <Input type="number" value={kanjiForm.strokeCount} onChange={(e) => setKanjiForm({ ...kanjiForm, strokeCount: Number(e.target.value) })} required />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Ý Nghĩa Hán Việt / Tiếng Việt (*)</label>
                    <Input value={kanjiForm.meaning} onChange={(e) => setKanjiForm({ ...kanjiForm, meaning: e.target.value })} placeholder="Ví dụ: Thuyền (tàu thuyền)..." required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant block mb-1">Âm ON (Katakana)</label>
                      <Input value={kanjiForm.onReading || ''} onChange={(e) => setKanjiForm({ ...kanjiForm, onReading: e.target.value })} placeholder="Ví dụ: セン" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant block mb-1">Âm KUN (Hiragana)</label>
                      <Input value={kanjiForm.kunReading || ''} onChange={(e) => setKanjiForm({ ...kanjiForm, kunReading: e.target.value })} placeholder="Ví dụ: ふね" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Bộ Thủ Mẫu</label>
                    <Input value={kanjiForm.radical || ''} onChange={(e) => setKanjiForm({ ...kanjiForm, radical: e.target.value })} placeholder="Ví dụ: 舟" />
                  </div>
                </>
              )}

              {/* GRAMMAR FORM FIELDS */}
              {activeTab === 'grammar' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Tên Mẫu Ngữ Pháp (*)</label>
                    <Input value={grammarForm.title} onChange={(e) => setGrammarForm({ ...grammarForm, title: e.target.value })} placeholder="Ví dụ: ～てから, ～ほうがいい..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Cấu Trúc Kết Hợp (*)</label>
                    <Input value={grammarForm.structure} onChange={(e) => setGrammarForm({ ...grammarForm, structure: e.target.value })} placeholder="Ví dụ: V-て + から..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Ý Nghĩa & Cách Dùng (*)</label>
                    <Input value={grammarForm.meaning} onChange={(e) => setGrammarForm({ ...grammarForm, meaning: e.target.value })} placeholder="Ví dụ: Sau khi làm V thì..." required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Ghi Chú Phân Biệt</label>
                    <Input value={grammarForm.usageNotes || ''} onChange={(e) => setGrammarForm({ ...grammarForm, usageNotes: e.target.value })} placeholder="Ví dụ: Chú ý hành động 1 diễn ra trước..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant block mb-1">Ví Dụ Minh Họa</label>
                    <Input value={grammarForm.exampleSentences || ''} onChange={(e) => setGrammarForm({ ...grammarForm, exampleSentences: e.target.value })} placeholder="Ví dụ: 手を洗ってからご飯を食べる。" />
                  </div>
                </>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-outline-variant/30">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} icon={saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}>
                  {editingItem ? 'Lưu Thay Đổi' : 'Tạo Bài Học'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
