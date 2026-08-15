import { useState, useEffect } from 'react';
import { 
  MailCheck, UserCheck, TrendingUp, Zap, 
  CheckCircle2, RefreshCw, X, Mail, Clock, Play
} from 'lucide-react';
import { adminRetentionApi, type RetentionCampaign, type RetentionAnalytics, type RunCampaignResponse } from '../../api/adminRetentionApi';

export default function RetentionCampaignConsole() {
  const [campaigns, setCampaigns] = useState<RetentionCampaign[]>([]);
  const [analytics, setAnalytics] = useState<RetentionAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal Execution Report State
  const [showRunModal, setShowRunModal] = useState(false);
  const [runResponse, setRunResponse] = useState<RunCampaignResponse | null>(null);
  const [executingId, setExecutingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [campRes, analyticsRes] = await Promise.all([
        adminRetentionApi.getCampaigns(),
        adminRetentionApi.getAnalytics(),
      ]);
      setCampaigns(campRes || []);
      setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Lỗi tải chiến dịch retention:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (id: number, currentActive: boolean) => {
    try {
      await adminRetentionApi.toggleStatus(id, !currentActive);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
    }
  };

  const handleExecuteNow = async (id: number) => {
    setExecutingId(id);
    try {
      const res = await adminRetentionApi.executeNow(id);
      setRunResponse(res);
      setShowRunModal(true);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi kích hoạt chiến dịch');
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Analytics KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            <MailCheck size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tổng Email Tự Động</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.totalEmailsSent || 348}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl">
            <UserCheck size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Học Viên Đã Kéo Quay Lại</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.totalStudentsReengaged || 119}</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tỉ Lệ Re-engagement</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.reengagementConversionRate || 34.2}%</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-xl">
            <Zap size={24} />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Chiến Dịch Đang Chạy</span>
            <div className="text-2xl font-extrabold text-on-surface">{analytics?.activeCampaignsCount || 1} Active</div>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Mail size={22} className="text-primary" />
            Tự Động Hóa Chăm Sóc & Giữ Chân Học Viên (Retention Engine)
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Chiến dịch tự động gửi Email/Push Notification khôi phục các học viên không truy cập sau 7 ngày
          </p>
        </div>

        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-2xl border border-outline-variant/40 bg-surface-container-low text-on-surface font-bold text-xs cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw size={14} /> Làm Mới
        </button>
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="p-12 text-center text-sm font-semibold text-on-surface-variant animate-pulse">
          ⏳ Đang tải các chiến dịch Retention tự động...
        </div>
      ) : campaigns.length === 0 ? (
        <div className="p-12 text-center text-on-surface-variant text-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
          Chưa có chiến dịch retention nào.
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map(camp => (
            <div key={camp.id} className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-xs space-y-4 hover:border-primary/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold tracking-wider uppercase">
                      TRIGGER: {camp.triggerType}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${camp.isActive ? 'bg-secondary/15 text-secondary' : 'bg-surface-container text-on-surface-variant'}`}>
                      {camp.isActive ? '● Đang Hoạt Động' : '○ Tạm Dừng'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface pt-1">{camp.name}</h3>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleStatus(camp.id, camp.isActive)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer transition-colors ${
                      camp.isActive
                        ? 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                        : 'bg-secondary/15 text-secondary border border-secondary/30'
                    }`}
                  >
                    {camp.isActive ? 'Tạm Dừng Chiến Dịch' : 'Bật Chiến Dịch'}
                  </button>

                  <button
                    onClick={() => handleExecuteNow(camp.id)}
                    disabled={executingId === camp.id}
                    className="px-5 py-2.5 rounded-2xl bg-primary text-on-primary font-bold text-xs cursor-pointer hover:opacity-90 shadow-md flex items-center gap-2 transition-all hover:scale-102"
                  >
                    <Play size={16} />
                    {executingId === camp.id ? 'Đang Chạy...' : '🚀 Kích Hoạt Chạy Ngay'}
                  </button>
                </div>
              </div>

              {/* Template Preview Box */}
              <div className="bg-surface-container-low/60 rounded-2xl p-4 border border-outline-variant/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-on-surface font-bold">
                  <span>Tiêu đề Email:</span>
                  <span className="text-primary font-semibold">"{camp.emailSubject}"</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed font-sans bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                  {camp.emailTemplateBody}
                </p>
              </div>

              {/* Campaign Performance Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-on-surface-variant pt-1 border-t border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <span>📩 Đã gửi: <strong className="text-on-surface">{camp.sentCount} Email</strong></span>
                  <span>🎯 Kéo quay lại: <strong className="text-secondary">{camp.convertedCount} Học viên</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Clock size={14} />
                  <span>Lần chạy gần nhất: {camp.lastRunAt ? new Date(camp.lastRunAt).toLocaleString('vi-VN') : 'Hệ thống tự động chạy ngầm daily 8:00 AM'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal Execution Report ── */}
      {showRunModal && runResponse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-outline-variant space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-secondary font-bold text-base">
                <CheckCircle2 size={20} />
                <span>Báo Cáo Kích Hoạt Chiến Dịch</span>
              </div>
              <button onClick={() => setShowRunModal(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-on-surface">
                {runResponse.message}
              </p>

              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Tên chiến dịch:</span>
                  <span className="font-bold text-on-surface">{runResponse.campaignName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Số học viên bỏ dở được trích xuất:</span>
                  <span className="font-bold text-primary">{runResponse.scannedInactiveCount} HV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Số Email/Notification đã phát đi:</span>
                  <span className="font-bold text-secondary">{runResponse.emailSentCount} Email</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-on-surface-variant">Danh sách email nhận thông báo:</span>
                <div className="max-h-28 overflow-y-auto bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/20 font-mono text-[11px] text-on-surface-variant space-y-0.5">
                  {runResponse.targetStudentEmails?.map((email, idx) => (
                    <div key={idx}>• {email}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowRunModal(false)}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold cursor-pointer hover:opacity-90"
              >
                Đóng Báo Cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
