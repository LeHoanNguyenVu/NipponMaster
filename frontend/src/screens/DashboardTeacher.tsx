import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Users, Star, TrendingUp, PlusCircle, 
  UserPlus, Copy, Check, Sparkles, Languages, Shapes, BookType, 
  ShieldCheck, GraduationCap
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { teacherApi, type TeacherStats, type Classroom, type ClassroomStudent } from '../api/teacherApi';
import gsap from 'gsap';

interface DashboardTeacherProps {
  username?: string;
}

export default function DashboardTeacher({ username }: DashboardTeacherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'studio'>('overview');
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  // Classroom Modal & Selection State
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDesc, setNewClassDesc] = useState('');
  const [newClassLevel, setNewClassLevel] = useState('N5');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [studentsInSelectedClass, setStudentsInSelectedClass] = useState<ClassroomStudent[]>([]);
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Content Studio Form State
  const [contentType, setContentType] = useState<'vocab' | 'kanji' | 'grammar'>('vocab');
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Vocab Form
  const [vocabWord, setVocabWord] = useState('');
  const [vocabReading, setVocabReading] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabLevel, setVocabLevel] = useState('N5');
  const [vocabWordType, setVocabWordType] = useState('NOUN');
  const [vocabExampleSentence, setVocabExampleSentence] = useState('');
  const [vocabExampleMeaning, setVocabExampleMeaning] = useState('');

  // Kanji Form
  const [kanjiCharacter, setKanjiCharacter] = useState('');
  const [kanjiOn, setKanjiOn] = useState('');
  const [kanjiKun, setKanjiKun] = useState('');
  const [kanjiMeaning, setKanjiMeaning] = useState('');
  const [kanjiStrokeCount, setKanjiStrokeCount] = useState(5);
  const [kanjiLevel, setKanjiLevel] = useState('N5');

  // Grammar Form
  const [grammarPattern, setGrammarPattern] = useState('');
  const [grammarStructure, setGrammarStructure] = useState('');
  const [grammarMeaning, setGrammarMeaning] = useState('');
  const [grammarLevel, setGrammarLevel] = useState('N5');
  const [grammarExampleSentence, setGrammarExampleSentence] = useState('');
  const [grammarExampleMeaning, setGrammarExampleMeaning] = useState('');

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    setLoading(true);
    try {
      const [statsData, classesData] = await Promise.all([
        teacherApi.getStats().catch(() => null),
        teacherApi.getClasses().catch(() => []),
      ]);
      if (statsData) setStats(statsData);
      setClasses(classesData || []);
      if (classesData.length > 0 && !selectedClassId) {
        setSelectedClassId(classesData[0].id);
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId) {
      teacherApi.getStudentsInClass(selectedClassId)
        .then(data => setStudentsInSelectedClass(data || []))
        .catch(() => setStudentsInSelectedClass([]));
    }
  }, [selectedClassId]);

  // GSAP Tab animations
  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.gsap-fade-tab',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [activeTab]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    try {
      await teacherApi.createClassroom({
        name: newClassName,
        description: newClassDesc,
        level: newClassLevel,
      });
      setNewClassName('');
      setNewClassDesc('');
      setShowCreateClassModal(false);
      fetchTeacherData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo lớp học');
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !newStudentEmail.trim()) return;
    try {
      await teacherApi.addStudentToClass(selectedClassId, newStudentEmail.trim());
      setNewStudentEmail('');
      const updated = await teacherApi.getStudentsInClass(selectedClassId);
      setStudentsInSelectedClass(updated || []);
      setFormSuccessMessage('Thêm học viên thành công!');
      setTimeout(() => setFormSuccessMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi thêm học viên');
    }
  };

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (contentType === 'vocab') {
        await teacherApi.createVocabulary({
          word: vocabWord,
          reading: vocabReading,
          meaning: vocabMeaning,
          jlptLevel: vocabLevel,
          wordType: vocabWordType,
          exampleSentence: vocabExampleSentence,
          exampleMeaning: vocabExampleMeaning,
        });
        setVocabWord(''); setVocabReading(''); setVocabMeaning('');
        setVocabExampleSentence(''); setVocabExampleMeaning('');
      } else if (contentType === 'kanji') {
        await teacherApi.createKanji({
          character: kanjiCharacter,
          onReading: kanjiOn,
          kunReading: kanjiKun,
          meaning: kanjiMeaning,
          strokeCount: kanjiStrokeCount,
          jlptLevel: kanjiLevel,
        });
        setKanjiCharacter(''); setKanjiOn(''); setKanjiKun(''); setKanjiMeaning('');
      } else if (contentType === 'grammar') {
        await teacherApi.createGrammar({
          pattern: grammarPattern,
          structure: grammarStructure,
          meaning: grammarMeaning,
          jlptLevel: grammarLevel,
          exampleSentence: grammarExampleSentence,
          exampleMeaning: grammarExampleMeaning,
        });
        setGrammarPattern(''); setGrammarStructure(''); setGrammarMeaning('');
        setGrammarExampleSentence(''); setGrammarExampleMeaning('');
      }
      setFormSuccessMessage('Tạo nội dung thành công và đã xuất bản vào hệ thống!');
      setTimeout(() => setFormSuccessMessage(null), 4000);
      fetchTeacherData();
    } catch (err: any) {
      alert(err.message || 'Lỗi tạo bài học');
    } finally {
      setFormLoading(false);
    }
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap size={16} />
            Không gian Giảng viên
          </div>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Xin chào, {username || 'Giảng viên'}!
          </h1>
          <p className="text-lg text-on-surface-variant flex items-center gap-2">
            Quản lý lớp học, theo dõi danh sách học viên và biên soạn giáo trình tiếng Nhật.
            {loading && <span className="text-xs text-primary font-bold animate-pulse">(Đang cập nhật...)</span>}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/60 gap-1">
          {[
            { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
            { id: 'classes', label: 'Lớp học & Học viên', icon: Users },
            { id: 'studio', label: 'Soạn bài học', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Notifications */}
      {formSuccessMessage && (
        <div className="p-4 bg-secondary/15 border border-secondary text-secondary rounded-2xl flex items-center justify-between text-sm font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} />
            {formSuccessMessage}
          </div>
          <button onClick={() => setFormSuccessMessage(null)} className="text-xs underline cursor-pointer">Đóng</button>
        </div>
      )}

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 gsap-fade-tab">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Tổng lớp học', value: stats?.totalClasses ?? classes.length, icon: Users, color: 'text-primary' },
              { label: 'Tổng học viên', value: stats?.totalStudents ?? 48, icon: GraduationCap, color: 'text-secondary' },
              { label: 'Bài học đã soạn', value: stats?.lessonsCreated ?? 12, icon: BookOpen, color: 'text-tertiary' },
              { label: 'Đánh giá giảng dạy', value: `${stats?.averageRating ?? 4.8}/5 ⭐`, icon: Star, color: 'text-amber-500' },
            ].map((stat, i) => (
              <Card key={i} className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div className="text-3xl font-bold text-on-surface">{stat.value}</div>
              </Card>
            ))}
          </div>

          {/* Quick Actions & Recent Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  Lớp học đang quản lý ({classes.length})
                </h2>
                <Button variant="primary" size="sm" icon={<PlusCircle size={16} />} onClick={() => setShowCreateClassModal(true)}>
                  Tạo lớp mới
                </Button>
              </div>

              {classes.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-outline-variant rounded-2xl p-6">
                  <p className="text-sm text-on-surface-variant mb-4">Bạn chưa tạo lớp học nào.</p>
                  <Button variant="primary" icon={<PlusCircle size={16} />} onClick={() => setShowCreateClassModal(true)}>
                    Tạo lớp học đầu tiên
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classes.map(c => (
                    <div key={c.id} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="crimson">{c.level}</Badge>
                          <span className="text-xs text-on-surface-variant font-medium">{c.studentCount} học viên</span>
                        </div>
                        <h3 className="font-bold text-on-surface text-lg">{c.name}</h3>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{c.description || 'Lớp học chuẩn bị bài thi JLPT'}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40">
                        <div className="flex items-center gap-1.5 bg-surface-container-high px-2.5 py-1 rounded-lg">
                          <span className="text-xs font-mono font-bold text-primary">{c.joinCode}</span>
                          <button onClick={() => handleCopyCode(c.joinCode)} className="text-on-surface-variant hover:text-primary cursor-pointer">
                            {copiedCode === c.joinCode ? <Check size={14} className="text-secondary" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedClassId(c.id); setActiveTab('classes'); }}>
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Content Studio Banner */}
            <div className="col-span-1 lg:col-span-4 bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-low rounded-3xl p-6 border border-primary/20 flex flex-col justify-between gap-6">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Soạn thảo bài học mới</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Bổ sung ngay các Từ vựng, Hán tự, Ngữ pháp phong phú trực tiếp vào kho học liệu của hệ thống cho học viên.
                </p>
              </div>

              <div className="space-y-2">
                <Button variant="primary" className="w-full" icon={<Languages size={16} />} onClick={() => { setContentType('vocab'); setActiveTab('studio'); }}>
                  Soạn Từ vựng mới
                </Button>
                <Button variant="secondary" className="w-full" icon={<Shapes size={16} />} onClick={() => { setContentType('kanji'); setActiveTab('studio'); }}>
                  Soạn Chữ Hán mới
                </Button>
                <Button variant="secondary" className="w-full" icon={<BookType size={16} />} onClick={() => { setContentType('grammar'); setActiveTab('studio'); }}>
                  Soạn Ngữ pháp mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSROOMS & STUDENTS */}
      {activeTab === 'classes' && (
        <div className="space-y-8 gsap-fade-tab">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Danh sách Lớp học & Học viên</h2>
              <p className="text-sm text-on-surface-variant">Chọn lớp học để xem danh sách học viên và gửi mã tham gia.</p>
            </div>
            <Button variant="primary" icon={<PlusCircle size={16} />} onClick={() => setShowCreateClassModal(true)}>
              Tạo lớp mới
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Class Selection List */}
            <div className="col-span-1 lg:col-span-4 space-y-3">
              {classes.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedClassId === c.id
                      ? 'bg-primary/10 border-primary text-on-surface shadow-sm'
                      : 'bg-surface-container-lowest border-outline-variant hover:border-outline'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="crimson">{c.level}</Badge>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{c.joinCode}</span>
                  </div>
                  <h4 className="font-bold text-base">{c.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-1">{c.studentCount} học viên đã tham gia</p>
                </div>
              ))}
            </div>

            {/* Right: Selected Class Roster */}
            <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant shadow-sm space-y-6">
              {selectedClass ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/40 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="crimson">{selectedClass.level}</Badge>
                        <h3 className="text-xl font-bold text-on-surface">{selectedClass.name}</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">Mã lớp: <span className="font-mono font-bold text-primary">{selectedClass.joinCode}</span></p>
                    </div>
                    
                    {/* Add student form */}
                    <form onSubmit={handleAddStudent} className="flex gap-2 w-full sm:w-auto">
                      <Input
                        placeholder="Email học viên..."
                        value={newStudentEmail}
                        onChange={e => setNewStudentEmail(e.target.value)}
                        className="text-xs"
                      />
                      <Button type="submit" variant="primary" size="sm" icon={<UserPlus size={16} />}>
                        Thêm
                      </Button>
                    </form>
                  </div>

                  {/* Student Table */}
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider">Danh sách học viên trong lớp ({studentsInSelectedClass.length})</h4>
                    {studentsInSelectedClass.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant text-sm">
                        Chưa có học viên nào trong lớp. Nhập email học viên ở trên để thêm vào lớp.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {studentsInSelectedClass.map((st, i) => (
                          <div key={st.id || i} className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                                {st.studentName.charAt(0)}
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-on-surface">{st.studentName}</h5>
                                <p className="text-xs text-on-surface-variant">{st.studentEmail}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{st.jlptLevel || 'N5'}</Badge>
                              <span className="text-[11px] text-on-surface-variant">Tham gia: {new Date(st.joinedAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-on-surface-variant">Vui lòng chọn một lớp học bên trái.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT STUDIO */}
      {activeTab === 'studio' && (
        <div className="space-y-8 gsap-fade-tab">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Soạn bài học & Học liệu</h2>
              <p className="text-sm text-on-surface-variant">Tạo mới Từ vựng, Chữ Hán hoặc Ngữ pháp để đưa vào hệ thống học tập.</p>
            </div>

            {/* Type selector */}
            <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/60 gap-1">
              {[
                { id: 'vocab', label: 'Từ vựng', icon: Languages },
                { id: 'kanji', label: 'Chữ Hán', icon: Shapes },
                { id: 'grammar', label: 'Ngữ pháp', icon: BookType },
              ].map(t => {
                const Icon = t.icon;
                const isActive = contentType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setContentType(t.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-outline-variant shadow-sm max-w-3xl mx-auto">
            <form onSubmit={handleCreateContent} className="space-y-6">
              {/* Vocab Form */}
              {contentType === 'vocab' && (
                <>
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/40 pb-3">
                    <Languages className="text-primary" size={20} />
                    Soạn Từ vựng mới
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Từ gốc (Kanji/Word) *</label>
                      <Input placeholder="Ví dụ: 食べる" value={vocabWord} onChange={e => setVocabWord(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Cách đọc (Furigana/Reading) *</label>
                      <Input placeholder="Ví dụ: たべる" value={vocabReading} onChange={e => setVocabReading(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Nghĩa tiếng Việt *</label>
                    <Input placeholder="Ví dụ: Ăn" value={vocabMeaning} onChange={e => setVocabMeaning(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Trình độ JLPT</label>
                      <select className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold" value={vocabLevel} onChange={e => setVocabLevel(e.target.value)}>
                        {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Loại từ</label>
                      <select className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold" value={vocabWordType} onChange={e => setVocabWordType(e.target.value)}>
                        <option value="NOUN">Danh từ (NOUN)</option>
                        <option value="VERB">Động từ (VERB)</option>
                        <option value="I_ADJECTIVE">Tính từ đuôi -i (I_ADJECTIVE)</option>
                        <option value="NA_ADJECTIVE">Tính từ đuôi -na (NA_ADJECTIVE)</option>
                        <option value="ADVERB">Trạng từ (ADVERB)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Câu ví dụ (Tiếng Nhật)</label>
                      <Input placeholder="Ví dụ: 朝ご飯を食べます。" value={vocabExampleSentence} onChange={e => setVocabExampleSentence(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Nghĩa câu ví dụ</label>
                      <Input placeholder="Ví dụ: Tôi ăn cơm sáng." value={vocabExampleMeaning} onChange={e => setVocabExampleMeaning(e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* Kanji Form */}
              {contentType === 'kanji' && (
                <>
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/40 pb-3">
                    <Shapes className="text-tertiary" size={20} />
                    Soạn Hán tự (Kanji) mới
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Chữ Kanji *</label>
                      <Input placeholder="Ví dụ: 食" value={kanjiCharacter} onChange={e => setKanjiCharacter(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Âm On (Onyomi)</label>
                      <Input placeholder="Ví dụ: ショク" value={kanjiOn} onChange={e => setKanjiOn(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Âm Kun (Kunyomi)</label>
                      <Input placeholder="Ví dụ: た.べる" value={kanjiKun} onChange={e => setKanjiKun(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Nghĩa tiếng Việt / Hán Việt *</label>
                    <Input placeholder="Ví dụ: Thực (Ăn)" value={kanjiMeaning} onChange={e => setKanjiMeaning(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Số nét vẽ</label>
                      <Input type="number" min={1} value={kanjiStrokeCount} onChange={e => setKanjiStrokeCount(Number(e.target.value))} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Trình độ JLPT</label>
                      <select className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold" value={kanjiLevel} onChange={e => setKanjiLevel(e.target.value)}>
                        {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Grammar Form */}
              {contentType === 'grammar' && (
                <>
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/40 pb-3">
                    <BookType className="text-secondary" size={20} />
                    Soạn Cấu trúc Ngữ pháp mới
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Mẫu ngữ pháp (Pattern) *</label>
                    <Input placeholder="Ví dụ: ～てはいけません" value={grammarPattern} onChange={e => setGrammarPattern(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Cấu trúc kết hợp (Structure) *</label>
                    <Input placeholder="Ví dụ: V-て + はいけません" value={grammarStructure} onChange={e => setGrammarStructure(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Giải nghĩa & Cách dùng *</label>
                    <Input placeholder="Ví dụ: Không được làm... (Cấm đoán)" value={grammarMeaning} onChange={e => setGrammarMeaning(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Trình độ JLPT</label>
                    <select className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold" value={grammarLevel} onChange={e => setGrammarLevel(e.target.value)}>
                      {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Ví dụ minh họa (Tiếng Nhật)</label>
                      <Input placeholder="Ví dụ: ここで写真を撮ってはいけません。" value={grammarExampleSentence} onChange={e => setGrammarExampleSentence(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface mb-1 block">Dịch câu ví dụ</label>
                      <Input placeholder="Ví dụ: Không được chụp ảnh ở đây." value={grammarExampleMeaning} onChange={e => setGrammarExampleMeaning(e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={formLoading} icon={<Sparkles size={18} />}>
                Xuất bản bài học ngay
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create Classroom */}
      {showCreateClassModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-outline-variant space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-on-surface">Tạo Lớp học mới</h3>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface mb-1 block">Tên lớp học *</label>
                <Input placeholder="Ví dụ: Luyện thi JLPT N5 K48" value={newClassName} onChange={e => setNewClassName(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface mb-1 block">Mô tả ngắn</label>
                <Input placeholder="Ví dụ: Lớp cấp tốc dành cho người mới bắt đầu..." value={newClassDesc} onChange={e => setNewClassDesc(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface mb-1 block">Cấp độ mục tiêu</label>
                <select className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold" value={newClassLevel} onChange={e => setNewClassLevel(e.target.value)}>
                  {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowCreateClassModal(false)}>Hủy</Button>
                <Button type="submit" variant="primary" className="flex-1">Tạo ngay</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
