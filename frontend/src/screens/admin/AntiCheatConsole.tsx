import { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, UserX, CheckCircle2, 
  Activity, Search, Filter, RefreshCw, Zap, Lock
} from 'lucide-react';
import { adminAntiCheatApi, type CheatLog, type SecurityOverview, type ActionTaken } from '../../api/adminAntiCheatApi';

export default function AntiCheatConsole() {
  const [logs, setLogs] = useState<CheatLog[]>([]);
  const [overview, setOverview] = useState<SecurityOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('ALL');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [logsRes, overviewRes] = await Promise.all([
        adminAntiCheatApi.getLogs(),
        adminAntiCheatApi.getOverview(),
      ]);
      setLogs(logsRes || []);
      setOverview(overviewRes);
    } catch (err) {
      console.error('Lỗi tải nhật ký an ninh:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTakeAction = async (logId: number, action: ActionTaken) => {
    try {
      await adminAntiCheatApi.takeAction(logId, action);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi cập nhật xử lý');
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchSearch = log.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        log.ipAddress.includes(searchQuery);
    const matchAction = actionFilter === 'ALL' || log.actionTaken === actionFilter;
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Security Health KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xl">
            <ShieldCheck size={26} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Độ An Toàn Hệ Thống</span>
            <div className="text-2xl font-extrabold text-on-surface">{overview?.systemSecurityScore || 98} / 100</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            <Zap size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Mối Đe Dọa Đã Chặn</span>
            <div className="text-2xl font-extrabold text-on-surface">{overview?.totalThreatsDetected || 0}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tài Khoản Nghi Vấn</span>
            <div className="text-2xl font-extrabold text-on-surface">{overview?.flaggedUsersCount || 0}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center font-bold text-xl">
            <UserX size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tài Khoản Đã Khóa</span>
            <div className="text-2xl font-extrabold text-on-surface">{overview?.suspendedUsersCount || 0}</div>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <ShieldAlert size={22} className="text-primary" />
            Nhật Ký Cảnh Báo Gian Lận Thi Cử & Hack Bot
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Tự động giám sát tốc độ nộp bài, mẫu gõ phím bot và tần suất truy cập API bất thường
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Tìm theo user hoặc IP..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-2xl border border-outline-variant/40 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary w-full sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-2 rounded-2xl border border-outline-variant/40 text-xs">
            <Filter size={14} className="text-on-surface-variant" />
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="bg-transparent text-xs text-on-surface font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="FLAGGED">Nghi vấn (Flagged)</option>
              <option value="WARNING_SENT">Đã cảnh báo</option>
              <option value="ACCOUNT_SUSPENDED">Đã tạm khóa</option>
            </select>
          </div>

          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-2xl border border-outline-variant/40 bg-surface-container-low text-on-surface font-bold text-xs cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={14} /> Làm Mới
          </button>
        </div>
      </div>

      {/* Threat Logs Table */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-on-surface-variant animate-pulse">
            ⏳ Đang quét dữ liệu an ninh mạng...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant text-sm">
            Không phát hiện mối đe dọa gian lận nào khớp với bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low/60 border-b border-outline-variant/30 text-on-surface-variant font-bold uppercase tracking-wider">
                  <th className="p-4">Tài Khoản / IP</th>
                  <th className="p-4">Loại Hành Vi Vi Phạm</th>
                  <th className="p-4">Độ Tin Cậy Gian Lận</th>
                  <th className="p-4">Trạng Thái Xử Lý</th>
                  <th className="p-4 text-right">Thao Tác Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-medium text-on-surface">
                {filteredLogs.map(log => {
                  return (
                    <tr key={log.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-4 space-y-0.5">
                        <div className="font-bold text-on-surface">{log.username}</div>
                        <div className="text-[11px] font-mono text-on-surface-variant">{log.ipAddress}</div>
                      </td>

                      <td className="p-4 space-y-1">
                        <span className="font-bold text-primary">{log.activityTypeName}</span>
                        <div className="text-[11px] text-on-surface-variant max-w-xs">{log.detailReason}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-extrabold ${log.confidenceScore >= 90 ? 'text-error' : 'text-amber-600'}`}>
                            {log.confidenceScore}%
                          </span>
                          <div className="w-16 h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div
                              className={`h-full ${log.confidenceScore >= 90 ? 'bg-error' : 'bg-amber-500'}`}
                              style={{ width: `${log.confidenceScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        {log.actionTaken === 'ACCOUNT_SUSPENDED' && (
                          <span className="px-3 py-1 rounded-full bg-error/15 text-error font-bold border border-error/30 inline-flex items-center gap-1">
                            <Lock size={12} /> Đã Khóa Tài Khoản
                          </span>
                        )}
                        {log.actionTaken === 'FLAGGED' && (
                          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 font-bold border border-amber-500/30 inline-flex items-center gap-1">
                            <AlertTriangle size={12} /> Cảnh Báo Nghi Vấn
                          </span>
                        )}
                        {log.actionTaken === 'WARNING_SENT' && (
                          <span className="px-3 py-1 rounded-full bg-primary/15 text-primary font-bold border border-primary/30 inline-flex items-center gap-1">
                            <Activity size={12} /> Đã Gửi Nhắc Nhở
                          </span>
                        )}
                        {log.actionTaken === 'RESOLVED_SAFE' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-bold border border-emerald-500/30 inline-flex items-center gap-1">
                            <CheckCircle2 size={12} /> Xác Minh An Toàn
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleTakeAction(log.id, 'ACCOUNT_SUSPENDED')}
                            className="px-2.5 py-1.5 rounded-xl bg-error/10 text-error font-bold hover:bg-error/20 cursor-pointer transition-colors"
                            title="Khóa tài khoản vi phạm"
                          >
                            🚫 Khóa
                          </button>
                          <button
                            onClick={() => handleTakeAction(log.id, 'RESOLVED_SAFE')}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold hover:bg-emerald-500/20 cursor-pointer transition-colors"
                            title="Đánh dấu an toàn"
                          >
                            ✅ Bỏ qua
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
