import { useState, useEffect } from 'react';
import {
  Users,
  Award,
  AlertTriangle,
  Download,
  Search,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Loader2,
  Filter,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { teacherCmsApi, type AnalyticsOverviewData, type ClassroomGradebookData, type GradebookStudentItem } from '../../api/teacherCmsApi';
import axiosClient from '../../api/axiosClient';

export default function TeacherGradebookConsole() {
  const [overview, setOverview] = useState<AnalyticsOverviewData | null>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [gradebook, setGradebook] = useState<ClassroomGradebookData | null>(null);

  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingGradebook, setLoadingGradebook] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAtRiskOnly, setFilterAtRiskOnly] = useState(false);

  // Fetch Overview and Teacher Classrooms
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingOverview(true);
        const [overviewRes, classesRes] = await Promise.all([
          teacherCmsApi.getAnalyticsOverview(),
          axiosClient.get('/teacher/classes'),
        ]);

        if (overviewRes.data?.data) {
          setOverview(overviewRes.data.data);
        }

        const clsList = classesRes.data?.data || classesRes.data || [];
        setClassrooms(clsList);

        if (clsList.length > 0) {
          setSelectedClassId(clsList[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOverview(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch Gradebook for selected Classroom
  useEffect(() => {
    if (!selectedClassId) return;

    const fetchGradebook = async () => {
      try {
        setLoadingGradebook(true);
        const res = await teacherCmsApi.getClassroomGradebook(selectedClassId);
        if (res.data?.data) {
          setGradebook(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingGradebook(false);
      }
    };

    fetchGradebook();
  }, [selectedClassId]);

  // CSV Export Trigger
  const handleExportCsv = () => {
    if (!selectedClassId) return;
    const url = teacherCmsApi.exportGradebookCsvUrl(selectedClassId);
    window.open(url, '_blank');
  };

  const filteredStudents = (gradebook?.students || []).filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || s.fullName?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q);
    const matchesRisk = !filterAtRiskOnly || s.atRiskWarning;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-teal-500/10 via-surface-container-low to-primary/10 p-6 rounded-3xl border border-outline-variant/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingUp size={16} />
            <span>Thống Kê Phổ Điểm & Bảng Điểm Giảng Viên (Gradebook Analytics)</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface">Bảng Điểm & Quản Lý Học Lực Lớp Học</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-medium">
            Theo dõi tiến độ, phổ điểm các bài thi thử JLPT và phát hiện học viên học yếu để hỗ trợ kịp thời.
          </p>
        </div>

        {selectedClassId && (
          <Button
            onClick={handleExportCsv}
            icon={<Download size={18} />}
            className="shadow-md shadow-teal-600/20 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Xuất Báo Cáo Điểm (.CSV) 📥
          </Button>
        )}
      </div>

      {/* Analytics Metric Cards */}
      {loadingOverview ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="flex items-center gap-4 bg-surface-container-lowest border-outline-variant/30">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tổng Số Lớp</span>
              <p className="text-2xl font-black text-on-surface">{overview?.totalClassrooms || classrooms.length}</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-4 bg-surface-container-lowest border-outline-variant/30">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tổng Học Viên</span>
              <p className="text-2xl font-black text-on-surface">{overview?.totalStudents || 0}</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-4 bg-surface-container-lowest border-outline-variant/30">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Award size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Điểm Trung Bình</span>
              <p className="text-2xl font-black text-on-surface">{overview?.averageClassScore || 0}%</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-4 bg-surface-container-lowest border-outline-variant/30">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Cần Hỗ Trợ (&lt;50%)</span>
              <p className="text-2xl font-black text-rose-600">{overview?.atRiskStudentCount || 0} học viên</p>
            </div>
          </Card>
        </div>
      )}

      {/* Class Selector Bar & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
        {/* Class Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Chọn Lớp Học:</label>
          <select
            value={selectedClassId || ''}
            onChange={(e) => setSelectedClassId(Number(e.target.value))}
            className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs font-bold text-on-surface focus:outline-hidden focus:border-primary"
          >
            {classrooms.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.level}) — Mã: {cls.joinCode}
              </option>
            ))}
          </select>
        </div>

        {/* Search & Risk Filter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterAtRiskOnly(!filterAtRiskOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterAtRiskOnly
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Filter size={14} />
            Chỉ học viên yếu (&lt;50%)
          </button>

          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={16} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm học viên..."
              className="pl-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Gradebook Table */}
      {loadingGradebook ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="animate-spin text-primary" size={36} />
          <span className="text-xs font-semibold text-on-surface-variant">Đang nạp bảng điểm lớp học...</span>
        </div>
      ) : !gradebook || filteredStudents.length === 0 ? (
        <Card padding="lg" className="text-center py-12">
          <Users className="mx-auto text-on-surface-variant/40 mb-2" size={40} />
          <h3 className="text-base font-bold text-on-surface">Không tìm thấy dữ liệu học viên</h3>
          <p className="text-xs text-on-surface-variant mt-1">Lớp học chưa có sinh viên đăng ký hoặc từ khóa tìm kiếm không khớp.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Class Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-xs font-semibold">
            <div className="flex items-center gap-4">
              <span className="text-on-surface">Lớp: <strong className="text-primary">{gradebook.classroomName}</strong></span>
              <span className="text-on-surface">Trình độ: <Badge variant="crimson">{gradebook.jlptLevel}</Badge></span>
              <span className="text-on-surface">Sĩ số: <strong>{gradebook.totalStudents} sinh viên</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <span>ĐTB Lớp: <strong className="text-amber-600">{gradebook.classAverageScore}%</strong></span>
              <span>Cao nhất: <strong className="text-emerald-600">{gradebook.highestScore}%</strong></span>
              <span>Thấp nhất: <strong className="text-rose-600">{gradebook.lowestScore}%</strong></span>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xs">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-surface-container-low text-xs uppercase font-bold text-on-surface-variant tracking-wider border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-4">STT</th>
                  <th className="px-6 py-4">Học Viên</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Thi Thử Gần Nhất</th>
                  <th className="px-6 py-4">Tiến Độ Bài Học</th>
                  <th className="px-6 py-4">Trạng Thái Học Lực</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredStudents.map((s, idx) => (
                  <tr key={s.studentId} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface-variant text-xs">{idx + 1}</td>
                    <td className="px-6 py-4 font-bold text-on-surface">{s.fullName}</td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">{s.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-black text-sm ${
                          s.latestExamScore >= 80
                            ? 'text-emerald-600'
                            : s.latestExamScore >= 60
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {s.latestExamScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${s.completedLessonsPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-on-surface">{s.completedLessonsPercent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {s.atRiskWarning ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertTriangle size={13} /> Cần Hỗ Trợ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 size={13} /> Đạt Chuẩn
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
