import { useState, useEffect } from 'react';
import {
  CreditCard, Plus, Gift, Edit3, Trash2, Eye, EyeOff,
  CheckCircle2, TrendingUp, Users, Award, Sparkles, X, AlertCircle
} from 'lucide-react';
import {
  adminSubscriptionApi,
  type SubscriptionPlanItem,
  type CreatePlanPayload,
  type AnalyticsResponse
} from '../../api/adminSubscriptionApi';

export default function SubscriptionPlanConsole() {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanItem | null>(null);
  const [showGrantModal, setShowGrantModal] = useState(false);

  // Form states - Plan
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPlanType, setFormPlanType] = useState<'SINGLE_LEVEL' | 'FULL_BUNDLE'>('SINGLE_LEVEL');
  const [formJlptLevel, setFormJlptLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [formPrice, setFormPrice] = useState<number>(299000);
  const [formDurationDays, setFormDurationDays] = useState<number>(180);
  const [formBadge, setFormBadge] = useState('');
  const [formFeatures, setFormFeatures] = useState('');

  // Form states - Grant VIP
  const [grantEmail, setGrantEmail] = useState('');
  const [grantPlanId, setGrantPlanId] = useState<number | undefined>(undefined);
  const [grantDays, setGrantDays] = useState<number>(30);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansData, analyticsData] = await Promise.all([
        adminSubscriptionApi.getAllPlansAdmin(),
        adminSubscriptionApi.getAnalytics().catch(() => null),
      ]);
      setPlans(plansData);
      setAnalytics(analyticsData);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể tải dữ liệu gói dịch vụ' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingPlan(null);
    setFormName('');
    setFormDesc('');
    setFormPlanType('SINGLE_LEVEL');
    setFormJlptLevel('N5');
    setFormPrice(299000);
    setFormDurationDays(180);
    setFormBadge('');
    setFormFeatures('Truy cập toàn bộ bài học N5\nLuyện viết Kanji AI Canvas\nThẻ Flashcard SM-2 lặp lại ngắt quãng\nĐấu trường 1v1 thách đấu');
    setShowPlanModal(true);
  };

  const openEditModal = (plan: SubscriptionPlanItem) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormDesc(plan.description || '');
    setFormPlanType(plan.planType);
    setFormJlptLevel((plan.jlptLevel as any) || 'N5');
    setFormPrice(plan.price);
    setFormDurationDays(plan.durationDays);
    setFormBadge(plan.badge || '');
    setFormFeatures(plan.features ? plan.features.join('\n') : '');
    setShowPlanModal(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      setActionLoading(true);
      const payload: CreatePlanPayload = {
        name: formName.trim(),
        description: formDesc.trim(),
        planType: formPlanType,
        jlptLevel: formPlanType === 'SINGLE_LEVEL' ? formJlptLevel : undefined,
        price: formPrice,
        currency: 'VND',
        durationDays: formDurationDays,
        badge: formBadge.trim() || undefined,
        features: formFeatures.split('\n').map(f => f.trim()).filter(Boolean),
      };

      if (editingPlan) {
        await adminSubscriptionApi.updatePlan(editingPlan.id, payload);
        setMessage({ type: 'success', text: `Cập nhật gói "${formName}" thành công!` });
      } else {
        await adminSubscriptionApi.createPlan(payload);
        setMessage({ type: 'success', text: `Tạo mới gói "${formName}" thành công!` });
      }
      setShowPlanModal(false);
      fetchData();
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Lỗi khi lưu gói học' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (plan: SubscriptionPlanItem) => {
    try {
      setActionLoading(true);
      await adminSubscriptionApi.togglePlanStatus(plan.id, !plan.isActive);
      setMessage({
        type: 'success',
        text: `Đã ${!plan.isActive ? 'BẬT hiển thị' : 'ẨN'} gói "${plan.name}"`,
      });
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Lỗi khi đổi trạng thái gói' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePlan = async (plan: SubscriptionPlanItem) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa gói "${plan.name}" không?`)) return;
    try {
      setActionLoading(true);
      await adminSubscriptionApi.deletePlan(plan.id);
      setMessage({ type: 'success', text: `Đã xóa gói "${plan.name}"` });
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể xóa gói dịch vụ này' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleGrantVip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantEmail.trim()) return;

    try {
      setActionLoading(true);
      await adminSubscriptionApi.grantVipManual({
        email: grantEmail.trim(),
        planId: grantPlanId,
        customDurationDays: grantDays,
      });
      setMessage({ type: 'success', text: `Cấp VIP ${grantDays} ngày cho học viên "${grantEmail}" thành công!` });
      setShowGrantModal(false);
      setGrantEmail('');
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không tìm thấy học viên hoặc lỗi cấp VIP' });
    } finally {
      setActionLoading(false);
    }
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* ── Notification Toast ── */}
      {message && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-semibold animate-fade-in ${
          message.type === 'success'
            ? 'bg-secondary/10 border-secondary/30 text-secondary'
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-70">
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Top Header Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <CreditCard className="text-primary" size={28} />
            <span>Quản Lý Gói Dịch Vụ & Thanh Toán (Subscription CMS)</span>
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">
            Thiết lập bảng giá, cấp VIP cho học viên & xem thống kê doanh thu thực tế
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGrantModal(true)}
            className="px-4 py-2.5 rounded-xl border border-secondary text-secondary hover:bg-secondary/10 font-bold text-sm cursor-pointer flex items-center gap-2 transition-colors"
          >
            <Gift size={16} /> Cấp VIP Thủ Công
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 shadow-md flex items-center gap-2 transition-opacity"
          >
            <Plus size={18} /> + Tạo Gói Mới
          </button>
        </div>
      </div>

      {/* ── Analytics KPI Cards ── */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold">Tổng Doanh Thu</span>
              <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary tracking-tight">
              {formatVND(analytics.totalRevenue || 0)}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Thanh toán thành công qua Stripe & QR</p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold">Hội Viên VIP Active</span>
              <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Users size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold text-primary tracking-tight">
              {analytics.activeVipCount || 0} học viên
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Đang mở khóa bài học toàn hệ thống</p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold">Tổng Số Đơn Đã Mua</span>
              <div className="w-8 h-8 rounded-xl bg-tertiary/15 text-tertiary flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold text-on-surface tracking-tight">
              {analytics.totalSubscriptions || 0} đơn hàng
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Tính cả mua mới và gia hạn</p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold">Gói Bán Chạy Nhất</span>
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles size={18} />
              </div>
            </div>
            <div className="text-lg font-bold text-on-surface truncate tracking-tight">
              {analytics.topSellingPlan || 'N/A'}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Tỷ lệ chọn mua cao nhất</p>
          </div>
        </div>
      )}

      {/* ── Plans Grid List ── */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
          <span>Danh Sách Gói Dịch Vụ Hiện Có</span>
          <span className="text-xs bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant font-semibold">
            {plans.length} gói
          </span>
        </h2>

        {loading ? (
          <div className="p-12 text-center text-on-surface-variant text-sm">
            ⏳ Đang tải danh sách gói dịch vụ...
          </div>
        ) : plans.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-3xl space-y-3">
            <CreditCard size={40} className="text-on-surface-variant/30 mx-auto" />
            <p className="text-sm font-semibold text-on-surface-variant">Chưa có gói dịch vụ nào trong hệ thống</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold"
            >
              + Tạo gói đầu tiên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => {
              const isHidden = plan.isActive === false;

              return (
                <div
                  key={plan.id}
                  className={`bg-surface-container-lowest border rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                    isHidden
                      ? 'border-outline-variant/20 opacity-60 bg-surface-container/20'
                      : 'border-outline-variant/40 shadow-sm hover:border-primary/50'
                  }`}
                >
                  {/* Badge & Status Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {plan.badge && (
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary text-on-primary uppercase tracking-wide">
                            {plan.badge}
                          </span>
                        )}
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          plan.planType === 'FULL_BUNDLE'
                            ? 'bg-secondary/15 text-secondary'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          {plan.planType === 'FULL_BUNDLE' ? 'Trọn Gói N5-N1' : `Đơn Cấp (${plan.jlptLevel || 'N5'})`}
                        </span>
                      </div>

                      {/* Active Status Badge */}
                      <button
                        onClick={() => handleToggleStatus(plan)}
                        title={isHidden ? 'Bấm để BẬT bán gói này' : 'Bấm để ẨN gói này'}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1 transition-colors ${
                          isHidden
                            ? 'bg-outline-variant/30 text-on-surface-variant hover:bg-outline-variant/50'
                            : 'bg-secondary/15 text-secondary hover:bg-secondary/25'
                        }`}
                      >
                        {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                        <span>{isHidden ? 'Đã Ẩn' : 'Đang Bán'}</span>
                      </button>
                    </div>

                    {/* Plan Name & Description */}
                    <h3 className="text-xl font-bold text-on-surface mb-1">{plan.name}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 min-h-[32px] mb-4">
                      {plan.description || 'Gói mở khóa bài học chuẩn cấu trúc JLPT.'}
                    </p>

                    {/* Price & Duration */}
                    <div className="bg-surface-container-low/60 rounded-2xl p-4 mb-4 border border-outline-variant/20">
                      <div className="text-2xl font-bold text-primary">
                        {formatVND(plan.price)}
                      </div>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        Hạn sử dụng: <strong>{plan.durationDays} ngày</strong> ({Math.round(plan.durationDays / 30)} tháng)
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Đặc Quyền Gói</div>
                      {plan.features && plan.features.length > 0 ? (
                        plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                            <CheckCircle2 size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-on-surface-variant italic">Mở khóa toàn bộ bài học & tính năng AI</div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(plan)}
                      className="px-3 py-1.5 rounded-xl border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 size={14} /> Chỉnh Sửa
                    </button>

                    <button
                      onClick={() => handleDeletePlan(plan)}
                      className="px-3 py-1.5 rounded-xl text-error text-xs font-semibold hover:bg-error/10 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal Add / Edit Plan ── */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-xl border border-outline-variant/30 space-y-5 animate-scale-up my-8">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <CreditCard className="text-primary" size={20} />
                <span>{editingPlan ? 'Chỉnh Sửa Gói Dịch Vụ' : 'Tạo Gói Dịch Vụ Mới'}</span>
              </h3>
              <button onClick={() => setShowPlanModal(false)} className="p-1 hover:bg-surface-container rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Tên Gói Dịch Vụ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ví dụ: Gói N3 Cấp Tốc / Trọn Gói N5-N1"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Loại Gói *
                  </label>
                  <select
                    value={formPlanType}
                    onChange={e => setFormPlanType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="SINGLE_LEVEL">Single Level (Mua 1 cấp độ)</option>
                    <option value="FULL_BUNDLE">Full Bundle (Trọn gói N5-N1)</option>
                  </select>
                </div>

                {formPlanType === 'SINGLE_LEVEL' && (
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Level JLPT Áp Dụng *
                    </label>
                    <select
                      value={formJlptLevel}
                      onChange={e => setFormJlptLevel(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="N5">Level N5</option>
                      <option value="N4">Level N4</option>
                      <option value="N3">Level N3</option>
                      <option value="N2">Level N2</option>
                      <option value="N1">Level N1</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Giá Bán (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={10000}
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Thời Hạn (Ngày) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formDurationDays}
                    onChange={e => setFormDurationDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Badge Nổi Bật (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Phổ Biến / Best Value / Tiết Kiệm 40%"
                  value={formBadge}
                  onChange={e => setFormBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Mô Tả Ngắn
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt gói học..."
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Danh Sách Tính Năng (Mỗi tính năng 1 dòng)
                </label>
                <textarea
                  rows={4}
                  placeholder={"Mở khóa bài học N5\nLuyện viết Kanji AI\nThẻ Flashcards lặp ngắt quãng"}
                  value={formFeatures}
                  onChange={e => setFormFeatures(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPlanModal(false)}
                  className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:opacity-90 disabled:opacity-50"
                >
                  {actionLoading ? '⏳ Đang lưu...' : editingPlan ? 'Cập Nhật Gói' : 'Tạo Gói Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Manual VIP Grant ── */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 shadow-xl border border-outline-variant/30 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Gift className="text-secondary" size={20} />
                <span>Cấp Quyền VIP Thủ Công</span>
              </h3>
              <button onClick={() => setShowGrantModal(false)} className="p-1 hover:bg-surface-container rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleGrantVip} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Email Học Viên *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nhap_email_hoc_vien@gmail.com"
                  value={grantEmail}
                  onChange={e => setGrantEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Chọn Gói Học Tặng
                </label>
                <select
                  value={grantPlanId || ''}
                  onChange={e => setGrantPlanId(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">-- Chọn Gói Mặc Định (Trọn Gói) --</option>
                  {plans.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatVND(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Số Ngày Hạn Cấp (Ví dụ: 30, 90, 365)
                </label>
                <input
                  type="number"
                  min={1}
                  value={grantDays}
                  onChange={e => setGrantDays(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:opacity-90 disabled:opacity-50"
                >
                  {actionLoading ? '⏳ Đang cấp...' : '🎁 Cấp VIP Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
