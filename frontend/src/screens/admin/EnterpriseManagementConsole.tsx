import { useState, useEffect } from 'react';
import { 
  Building2, PlusCircle, 
  Upload, Edit, Trash2, Search, X
} from 'lucide-react';
import { adminEnterpriseApi, type EnterpriseOrg, type EnterpriseAnalytics, type StudentImportItem } from '../../api/adminEnterpriseApi';

export default function EnterpriseManagementConsole() {
  const [orgs, setOrgs] = useState<EnterpriseOrg[]>([]);
  const [analytics, setAnalytics] = useState<EnterpriseAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Create/Edit State
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [editingOrg, setEditingOrg] = useState<EnterpriseOrg | null>(null);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formMaxSeats, setFormMaxSeats] = useState(100);
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDurationDays, setFormDurationDays] = useState(365);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Modal Bulk Import State
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedOrgForImport, setSelectedOrgForImport] = useState<EnterpriseOrg | null>(null);
  const [rawTextImport, setRawTextImport] = useState('');
  const [parsedStudents, setParsedStudents] = useState<StudentImportItem[]>([]);
  const [importResult, setImportResult] = useState<{ success: number; total: number } | null>(null);
  const [importSubmitting, setImportSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [orgsRes, analyticsRes] = await Promise.all([
        adminEnterpriseApi.getOrgs(),
        adminEnterpriseApi.getAnalytics(),
      ]);
      setOrgs(orgsRes || []);
      setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu B2B:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Parse Raw Text to Student Items
  const handleParseText = (text: string) => {
    setRawTextImport(text);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const items: StudentImportItem[] = lines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      const email = parts[0] || '';
      const fullName = parts[1] || email.split('@')[0];
      const targetLevel = (parts[2] && ['N5','N4','N3','N2','N1'].includes(parts[2].toUpperCase())) 
        ? parts[2].toUpperCase() as any : 'N5';
      return { email, fullName, targetLevel };
    }).filter(item => item.email.includes('@'));

    setParsedStudents(items);
  };

  const handleOpenCreateModal = () => {
    setEditingOrg(null);
    setFormName('');
    setFormCode('');
    setFormMaxSeats(100);
    setFormEmail('');
    setFormPhone('');
    setFormDurationDays(365);
    setShowOrgModal(true);
  };

  const handleOpenEditModal = (org: EnterpriseOrg) => {
    setEditingOrg(org);
    setFormName(org.name);
    setFormCode(org.code);
    setFormMaxSeats(org.maxSeats);
    setFormEmail(org.contactEmail || '');
    setFormPhone(org.contactPhone || '');
    setFormDurationDays(365);
    setShowOrgModal(true);
  };

  const handleSubmitOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) return;

    setFormSubmitting(true);
    try {
      if (editingOrg) {
        await adminEnterpriseApi.updateOrg(editingOrg.id, {
          name: formName,
          code: formCode,
          maxSeats: formMaxSeats,
          contactEmail: formEmail,
          contactPhone: formPhone,
        });
      } else {
        await adminEnterpriseApi.createOrg({
          name: formName,
          code: formCode,
          maxSeats: formMaxSeats,
          contactEmail: formEmail,
          contactPhone: formPhone,
          durationDays: formDurationDays,
        });
      }
      setShowOrgModal(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi lưu tổ chức B2B');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteOrg = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tổ chức B2B này không?')) return;
    try {
      await adminEnterpriseApi.deleteOrg(id);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi xóa tổ chức B2B');
    }
  };

  const handleOpenImportModal = (org: EnterpriseOrg) => {
    setSelectedOrgForImport(org);
    setRawTextImport('');
    setParsedStudents([]);
    setImportResult(null);
    setShowImportModal(true);
  };

  const handleSubmitImport = async () => {
    if (!selectedOrgForImport || parsedStudents.length === 0) return;
    setImportSubmitting(true);
    try {
      const res = await adminEnterpriseApi.bulkImportStudents(selectedOrgForImport.id, parsedStudents);
      setImportResult({ success: res.successCount, total: res.totalRequested });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi import danh sách sinh viên');
    } finally {
      setImportSubmitting(false);
    }
  };

  const filteredOrgs = orgs.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Analytics KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            🏢
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tổ Chức Đối Tác</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.totalOrgsCount || orgs.length}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl">
            🎟️
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tổng Ghế Bản Quyền</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.totalSeatsAllocated || 0}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-xl">
            👥
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Sinh Viên Active B2B</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.totalActiveStudents || 0}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xl">
            📈
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tỉ Lệ Đạt Tiến Độ</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.avgCompletionRate || 82.5}%</div>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Building2 size={22} className="text-primary" />
            Danh Sách Trường Học & Doanh Nghiệp B2B
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Quản lý số lượng ghế tài khoản VIP và kích hoạt sinh viên hàng loạt
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc mã trường..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-2xl border border-outline-variant/40 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary w-full sm:w-64"
            />
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-primary text-on-primary font-bold text-xs cursor-pointer hover:opacity-90 shadow-sm flex items-center justify-center gap-2"
          >
            <PlusCircle size={16} /> + Tạo Tổ Chức B2B
          </button>
        </div>
      </div>

      {/* Grid of Enterprise Orgs */}
      {loading ? (
        <div className="p-12 text-center text-sm font-semibold text-on-surface-variant animate-pulse">
          ⏳ Đang tải danh sách tổ chức B2B...
        </div>
      ) : filteredOrgs.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30 text-on-surface-variant text-sm">
          Chưa có tổ chức B2B nào. Hãy bấm "+ Tạo Tổ Chức B2B" để thêm mới.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrgs.map(org => {
            const seatPercent = Math.min(100, Math.round((org.activeSeats / (org.maxSeats || 1)) * 100));
            return (
              <div key={org.id} className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold tracking-wider">
                      {org.code}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary/15 text-secondary">
                      Hạn: {org.validUntil ? new Date(org.validUntil).toLocaleDateString('vi-VN') : '1 Năm'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-on-surface line-clamp-1">{org.name}</h3>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
                      <span>Ghế bản quyền đã kích hoạt:</span>
                      <span className="text-primary">{org.activeSeats} / {org.maxSeats} seats</span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${seatPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenImportModal(org)}
                    className="px-3.5 py-2 rounded-xl bg-secondary/10 text-secondary font-bold text-xs cursor-pointer hover:bg-secondary/20 flex items-center gap-1.5"
                  >
                    <Upload size={14} /> Import Sinh Viên
                  </button>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenEditModal(org)}
                      className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteOrg(org.id)}
                      className="p-2 rounded-xl text-error hover:bg-error/10 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal Create / Edit Org ── */}
      {showOrgModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-outline-variant space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface">
                {editingOrg ? 'Chỉnh Sửa Tổ Chức B2B' : 'Tạo Mới Tổ Chức B2B'}
              </h3>
              <button onClick={() => setShowOrgModal(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitOrg} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface mb-1 block">Tên Trường / Tổ Chức *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đại Học Bách Khoa Hà Nội"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface mb-1 block">Mã Viết Tắt (Code) *</label>
                  <input
                    type="text"
                    required
                    placeholder="HUST"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:border-primary uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface mb-1 block">Số Ghế Tối Đa *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formMaxSeats}
                    onChange={e => setFormMaxSeats(Number(e.target.value))}
                    className="w-full p-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:border-primary font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface mb-1 block">Email Đại Diện Liên Hệ</label>
                <input
                  type="email"
                  placeholder="b2b@hust.edu.vn"
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrgModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface-variant cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold cursor-pointer hover:opacity-90"
                >
                  {formSubmitting ? 'Đang lưu...' : 'Lưu Tổ Chức'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Bulk Import Students ── */}
      {showImportModal && selectedOrgForImport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-lg w-full border border-outline-variant space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  📥 Bulk Import Sinh Viên — {selectedOrgForImport.name}
                </h3>
                <span className="text-xs text-on-surface-variant">
                  Mã: {selectedOrgForImport.code} | Đã dùng: {selectedOrgForImport.activeSeats}/{selectedOrgForImport.maxSeats} ghế
                </span>
              </div>
              <button onClick={() => setShowImportModal(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface block">
                Dán danh sách Email sinh viên (Định dạng: `email, họ_tên, trình_độ` mỗi dòng):
              </label>
              <textarea
                rows={5}
                value={rawTextImport}
                onChange={e => handleParseText(e.target.value)}
                placeholder={`sv01@hust.edu.vn, Nguyễn Văn A, N5\nsv02@hust.edu.vn, Trần Thị B, N4`}
                className="w-full p-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:border-primary font-mono"
              />

              {parsedStudents.length > 0 && (
                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-xs space-y-1">
                  <span className="font-bold text-secondary">
                    ✅ Đã trích xuất {parsedStudents.length} email hợp lệ để kích hoạt VIP:
                  </span>
                  <div className="max-h-24 overflow-y-auto font-mono text-[11px] text-on-surface-variant pt-1 space-y-0.5">
                    {parsedStudents.map((item, idx) => (
                      <div key={idx}>• {item.email} ({item.fullName} - {item.targetLevel})</div>
                    ))}
                  </div>
                </div>
              )}

              {importResult && (
                <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary text-secondary text-xs font-bold flex items-center justify-between">
                  <span>🎉 Đã import và kích hoạt tài khoản thành công cho {importResult.success} / {importResult.total} sinh viên!</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface-variant cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={handleSubmitImport}
                disabled={importSubmitting || parsedStudents.length === 0}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold cursor-pointer hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5"
              >
                {importSubmitting ? 'Đang Import...' : `🚀 Xác Nhận Import (${parsedStudents.length} SV)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
