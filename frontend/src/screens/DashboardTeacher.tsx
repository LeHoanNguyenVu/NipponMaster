import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Users, Star, TrendingUp, PlusCircle, 
  UserPlus, Copy, Check, Sparkles, Languages, Shapes, BookType, 
  ShieldCheck, GraduationCap, FileText, Upload
} from 'lucide-react';
import ExamBuilderStudio from './ExamBuilderStudio';
import ContentCmsStudio from './teacher/ContentCmsStudio';
import TeacherGradebookConsole from './teacher/TeacherGradebookConsole';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'studio' | 'exams' | 'gradebook'>('overview');
  const [showExamStudio, setShowExamStudio] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);

  // Exam List & Filter state
  const [examList, setExamList] = useState<any[]>([]);
  const [examSearch, setExamSearch] = useState('');
  const [examLevelFilter, setExamLevelFilter] = useState<string>('ALL');
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
      const [statsData, classesData, examsData] = await Promise.all([
        teacherApi.getStats().catch(() => null),
        teacherApi.getClasses().catch(() => []),
        teacherApi.getExams().catch(() => []),
      ]);
      if (statsData) setStats(statsData);
      setClasses(classesData || []);
      setExamList(examsData || []);
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
        <div className="flex flex-wrap bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/60 gap-1">
          {[
            { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
            { id: 'classes', label: 'Lớp học', icon: Users },
            { id: 'studio', label: 'Studio Bài Học (CMS)', icon: Sparkles },
            { id: 'exams', label: 'Soạn Đề Thi JLPT', icon: FileText },
            { id: 'gradebook', label: 'Bảng Điểm & Analytics', icon: GraduationCap },
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
                <Button variant="primary" className="w-full mt-2" icon={<FileText size={16} />} onClick={() => setShowExamStudio(true)}>
                  ✍️ Studio Tạo Đề Thi JLPT
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

      {/* TAB 3: CONTENT STUDIO (CMS) */}
      {activeTab === 'studio' && (
        <div className="gsap-fade-tab">
          <ContentCmsStudio />
        </div>
      )}

      {/* TAB 4: EXAM MANAGEMENT & BUILDER STUDIO */}
      {activeTab === 'exams' && (
        <div className="space-y-6 gsap-fade-tab">
          {showExamStudio ? (
            <ExamBuilderStudio
              initialExam={editingExam}
              onBack={() => {
                setShowExamStudio(false);
                setEditingExam(null);
                fetchTeacherData();
              }}
            />
          ) : (
            <div className="space-y-6">
              {/* Header & Create Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Quản lý Kho Đề Thi JLPT</h2>
                  <p className="text-sm text-on-surface-variant">Tạo mới, chỉnh sửa, import câu hỏi hàng loạt và quản lý đề thi JLPT N5-N1.</p>
                </div>

                <Button
                  variant="primary"
                  icon={<PlusCircle size={16} />}
                  onClick={() => {
                    setEditingExam(null);
                    setShowExamStudio(true);
                  }}
                >
                  Tạo đề thi mới
                </Button>
              </div>

              {/* Search Bar & Filter Pills */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
                {/* Search input */}
                <input
                  type="text"
                  placeholder="🔍 Tìm kiếm đề thi theo tên hoặc nội dung..."
                  value={examSearch}
                  onChange={e => setExamSearch(e.target.value)}
                  className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-semibold focus:outline-none focus:border-primary"
                />

                {/* Level Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setExamLevelFilter(lvl)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        examLevelFilter === lvl
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {lvl === 'ALL' ? '🔍 Tất cả' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Cards Grid */}
              {(() => {
                const filtered = examList.filter(e => {
                  const matchSearch = !examSearch || e.title?.toLowerCase().includes(examSearch.toLowerCase());
                  const matchLevel = examLevelFilter === 'ALL' || e.jlptLevel === examLevelFilter;
                  return matchSearch && matchLevel;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-16 border border-dashed border-outline-variant/60 rounded-3xl p-6 bg-surface-container-lowest text-on-surface-variant text-sm space-y-3">
                      <p>Không tìm thấy đề thi nào phù hợp với bộ lọc.</p>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<PlusCircle size={16} />}
                        onClick={() => {
                          setEditingExam(null);
                          setShowExamStudio(true);
                        }}
                      >
                        Tạo đề thi mới ngay
                      </Button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(ex => (
                      <div key={ex.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 space-y-3 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="crimson">{ex.jlptLevel || 'N5'}</Badge>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ex.isPublished ? 'bg-secondary/15 text-secondary' : 'bg-surface-container text-on-surface-variant'
                            }`}>
                              {ex.isPublished ? '✅ Đã xuất bản' : '📝 Bản nháp'}
                            </span>
                          </div>

                          <h3 className="font-bold text-on-surface text-base line-clamp-2">{ex.title}</h3>
                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{ex.description || 'Chưa có mô tả'}</p>

                          <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-medium mt-3 pt-3 border-t border-outline-variant/20">
                            <span>⏱️ {ex.durationMinutes || 60} phút</span>
                            <span>❓ {ex.questions?.length || 0} câu hỏi</span>
                            <span>🏆 {ex.totalScore || 100} điểm</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/30">
                          <button
                            onClick={async () => {
                              try {
                                const detail = await teacherApi.getExamById(ex.id);
                                setEditingExam(detail);
                                setShowExamStudio(true);
                              } catch {
                                setEditingExam(ex);
                                setShowExamStudio(true);
                              }
                            }}
                            className="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 cursor-pointer text-center"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Bạn có chắc chắn muốn xóa đề thi "${ex.title}"?`)) {
                                try {
                                  await teacherApi.deleteExam(ex.id);
                                  fetchTeacherData();
                                } catch (err: any) {
                                  alert(err.message || 'Lỗi khi xóa đề thi');
                                }
                              }
                            }}
                            className="px-3 py-2 rounded-xl bg-error/10 text-error text-xs font-bold hover:bg-error/20 cursor-pointer"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TEACHER GRADEBOOK & ANALYTICS */}
      {activeTab === 'gradebook' && (
        <div className="gsap-fade-tab">
          <TeacherGradebookConsole />
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
