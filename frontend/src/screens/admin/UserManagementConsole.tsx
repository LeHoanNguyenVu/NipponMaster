/**
 * UserManagementConsole.tsx — Trung Tâm Quản Lý Người Dùng & Phân Quyền Động (Role ADMIN)
 * Tasks 14.1 & 14.2 in PLAN_ADMIN.md
 */
import { useState, useEffect, useCallback } from 'react';
import { 
  Users, UserCheck, UserX, Shield, GraduationCap, Search, Filter, 
  Lock, Unlock, Key, RefreshCw, CheckCircle2, ShieldAlert, Sparkles, Check, X
} from 'lucide-react';
import { adminApi, type AdminUser } from '../../api/adminApi';

export default function UserManagementConsole() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Feedback Toast
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals state
  const [roleModalUser, setRoleModalUser] = useState<AdminUser | null>(null);
  const [newRole, setNewRole] = useState<string>('STUDENT');
  const [pwdModalUser, setPwdModalUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const payload: any = {};
      if (roleFilter !== 'ALL') payload.role = roleFilter;
      if (statusFilter !== 'ALL') payload.isActive = statusFilter === 'ACTIVE';
      if (search.trim()) payload.search = search.trim();

      const data = await adminApi.getUsers(payload);
      setUsers(data.content || []);
    } catch (err: any) {
      console.error('Lỗi tải danh sách người dùng:', err);
    } finally {
      setLoading(false);
    }
  }, [roleFilter, statusFilter, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle single Lock/Unlock toggle
  const handleToggleStatus = async (user: AdminUser) => {
    const nextStatus = !user.isActive;
    try {
      await adminApi.updateUserStatus(user.id, nextStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isActive: nextStatus } : u));
      showToast('success', `Đã ${nextStatus ? 'mở khóa' : 'khóa'} tài khoản ${user.email}`);
    } catch (err: any) {
      showToast('error', err.message || 'Không thể cập nhật trạng thái');
    }
  };

  // Handle Role Change
  const handleChangeRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleModalUser) return;
    setActionLoading(true);
    try {
      await adminApi.updateUserRole(roleModalUser.id, newRole);
      setUsers(prev => prev.map(u => u.id === roleModalUser.id ? { ...u, role: newRole as any } : u));
      showToast('success', `Đã cập nhật role thành ${newRole} cho ${roleModalUser.email}`);
      setRoleModalUser(null);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi cập nhật role');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Password Reset
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdModalUser || !newPassword.trim()) return;
    setActionLoading(true);
    try {
      await adminApi.resetPassword(pwdModalUser.id, newPassword.trim());
      showToast('success', `Đã đặt lại mật khẩu mới cho ${pwdModalUser.email}`);
      setPwdModalUser(null);
      setNewPassword('');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi đặt lại mật khẩu');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Bulk Status Change
  const handleBulkStatusChange = async (isActive: boolean) => {
    if (selectedIds.length === 0) return;
    try {
      await adminApi.bulkUpdateStatus(selectedIds, isActive);
      setUsers(prev => prev.map(u => selectedIds.includes(u.id) ? { ...u, isActive } : u));
      showToast('success', `Đã ${isActive ? 'mở khóa' : 'khóa'} ${selectedIds.length} tài khoản chọn!`);
      setSelectedIds([]);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi cập nhật hàng loạt');
    }
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Quick Stats
  const totalCount = users.length;
  const activeCount = users.filter(u => u.isActive).length;
  const lockedCount = users.filter(u => !u.isActive).length;
  const teacherCount = users.filter(u => u.role === 'TEACHER').length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <Sparkles size={14} /> USER MANAGEMENT CONSOLE
          </div>
          <h2 className="text-2xl font-extrabold text-on-surface mt-0.5">
            Trung Tâm Quản Lý Người Dùng & Phân Quyền
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Quản lý danh sách tài khoản, khóa/mở khóa, reset mật khẩu và nâng/hạ quyền động hệ thống.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/40 text-on-surface text-xs font-bold hover:bg-surface-container-high cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Làm Mới Dữ Liệu
        </button>
      </div>

      {/* Toast Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between animate-fade-in ${
          feedback.type === 'success' ? 'bg-secondary/15 border border-secondary text-secondary' : 'bg-error/15 border border-error text-error'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} /> {feedback.text}
          </div>
          <button onClick={() => setFeedback(null)} className="underline cursor-pointer">Đóng</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Tổng tài khoản', value: totalCount, icon: Users, color: 'text-primary' },
          { label: 'Đang hoạt động', value: activeCount, icon: UserCheck, color: 'text-secondary' },
          { label: 'Tài khoản bị khóa', value: lockedCount, icon: UserX, color: 'text-error' },
          { label: 'Giảng viên', value: teacherCount, icon: GraduationCap, color: 'text-tertiary' },
          { label: 'Quản trị viên (Admin)', value: adminCount, icon: Shield, color: 'text-amber-500' },
        ].map((st, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col justify-between gap-2 shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>{st.label}</span>
              <st.icon size={16} className={st.color} />
            </div>
            <div className="text-2xl font-extrabold text-on-surface">{st.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-4 space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-2.5 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          {/* Role Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { id: 'ALL', label: '🔍 Tất cả' },
              { id: 'STUDENT', label: '🎓 Học viên' },
              { id: 'TEACHER', label: '👨‍🏫 Giảng viên' },
              { id: 'ADMIN', label: '⚙️ Admin' },
              { id: 'GUEST', label: '🌐 Khách' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRoleFilter(r.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  roleFilter === r.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Action Bar (when selected) */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/30 text-xs font-bold animate-fade-in">
            <span>Đã chọn <strong>{selectedIds.length}</strong> tài khoản</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusChange(true)}
                className="px-3 py-1 rounded-lg bg-secondary text-on-secondary cursor-pointer hover:bg-secondary/80 flex items-center gap-1"
              >
                <Unlock size={12} /> Mở Khóa Hàng Loạt
              </button>
              <button
                onClick={() => handleBulkStatusChange(false)}
                className="px-3 py-1 rounded-lg bg-error text-on-error cursor-pointer hover:bg-error/80 flex items-center gap-1"
              >
                <Lock size={12} /> Khóa Hàng Loạt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-16 text-xs text-primary font-bold animate-pulse">
            Đang tải dữ liệu người dùng từ CSDL...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-xs text-on-surface-variant">
            Không tìm thấy người dùng nào phù hợp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-outline-variant/40 text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === users.length && users.length > 0}
                      onChange={e => setSelectedIds(e.target.checked ? users.map(u => u.id) : [])}
                      className="accent-primary cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5">Người Dùng</th>
                  <th className="p-3.5">Vai Trò (Role)</th>
                  <th className="p-3.5">JLPT Level</th>
                  <th className="p-3.5">Trạng Thái</th>
                  <th className="p-3.5">Ngày Tham Gia</th>
                  <th className="p-3.5 text-right">Thao Tác Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {users.map(u => {
                  const isSelected = selectedIds.includes(u.id);

                  return (
                    <tr key={u.id} className={`hover:bg-surface-container-low/50 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}>
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={e => {
                            setSelectedIds(prev =>
                              e.target.checked ? [...prev, u.id] : prev.filter(id => id !== u.id)
                            );
                          }}
                          className="accent-primary cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              (u.fullName || u.email).charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-on-surface line-clamp-1">{u.fullName || 'Chưa cập nhật'}</div>
                            <div className="text-[11px] text-on-surface-variant line-clamp-1">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide uppercase ${
                          u.role === 'ADMIN' ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30' :
                          u.role === 'TEACHER' ? 'bg-tertiary/15 text-tertiary border border-tertiary/30' :
                          u.role === 'STUDENT' ? 'bg-primary/15 text-primary border border-primary/30' :
                          'bg-surface-container text-on-surface-variant'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      {/* JLPT Level */}
                      <td className="p-3.5">
                        <span className="font-bold text-on-surface">{u.jlptLevel || 'N5'}</span>
                        {u.targetLevel && <span className="text-[10px] text-on-surface-variant block">Mục tiêu: {u.targetLevel}</span>}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                          u.isActive ? 'bg-secondary/15 text-secondary' : 'bg-error/15 text-error'
                        }`}>
                          {u.isActive ? <Check size={10} /> : <X size={10} />}
                          {u.isActive ? 'Active' : 'Locked'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-3.5 text-on-surface-variant text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </td>

                      {/* Admin Actions */}
                      <td className="p-3.5 text-right space-x-1">
                        {/* Role Change */}
                        <button
                          onClick={() => { setRoleModalUser(u); setNewRole(u.role); }}
                          title="Đổi Role"
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary cursor-pointer"
                        >
                          <Shield size={14} />
                        </button>

                        {/* Reset Password */}
                        <button
                          onClick={() => setPwdModalUser(u)}
                          title="Đặt lại Mật khẩu"
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-tertiary cursor-pointer"
                        >
                          <Key size={14} />
                        </button>

                        {/* Lock / Unlock */}
                        <button
                          onClick={() => handleToggleStatus(u)}
                          title={u.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          className={`p-1.5 rounded-lg cursor-pointer ${
                            u.isActive ? 'bg-error/10 hover:bg-error/20 text-error' : 'bg-secondary/10 hover:bg-secondary/20 text-secondary'
                          }`}
                        >
                          {u.isActive ? <Lock size={14} /> : <Unlock size={14} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Change Role */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-outline-variant space-y-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <Shield className="text-primary" size={18} /> Phân Quyền Tài Khoản
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{roleModalUser.email}</p>
              </div>
              <button onClick={() => setRoleModalUser(null)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangeRoleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface mb-1.5 block">Chọn Vai Trò (Role) mới *</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-outline-variant bg-surface text-xs font-bold"
                >
                  <option value="STUDENT">🎓 STUDENT (Học viên)</option>
                  <option value="TEACHER">👨‍🏫 TEACHER (Giảng viên / Soạn bài)</option>
                  <option value="ADMIN">⚙️ ADMIN (Quản trị hệ thống)</option>
                  <option value="GUEST">🌐 GUEST (Khách vãng lai)</option>
                </select>
              </div>

              {newRole === 'ADMIN' && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-medium flex items-start gap-2">
                  <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Cảnh báo: Cấp quyền ADMIN cho phép tài khoản này có toàn quyền quản trị hệ thống!</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRoleModalUser(null)}
                  className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer hover:bg-primary-container"
                >
                  {actionLoading ? 'Đang cập nhật...' : 'Xác Nhận Đổi Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {pwdModalUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-outline-variant space-y-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <Key className="text-tertiary" size={18} /> Đặt Lại Mật Khẩu
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{pwdModalUser.email}</p>
              </div>
              <button onClick={() => setPwdModalUser(null)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface mb-1.5 block">Nhập Mật khẩu mới *</label>
                <input
                  type="text"
                  placeholder="Nhập ít nhất 6 ký tự..."
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs font-mono font-bold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPwdModalUser(null)}
                  className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !newPassword.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-tertiary text-on-tertiary font-bold text-xs cursor-pointer hover:opacity-90 disabled:opacity-40"
                >
                  {actionLoading ? 'Đang đặt lại...' : 'Đổi Mật Khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
