import { useEffect, useRef, useState } from 'react';
import { Crown, Check, Sparkles, Shield, Zap, Star, ArrowRight, BadgeCheck, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { subscriptionApi, type SubscriptionPlan, type UserSubscription } from '../api/subscriptionApi';
import { useAuthStore } from '../store/useAuthStore';
import gsap from 'gsap';

const levelEmoji: Record<string, string> = {
  N5: '🌸', N4: '🎋', N3: '⛩️', N2: '🏯', N1: '🗻',
};

const levelGradients: Record<string, string> = {
  N5: 'from-rose-400 via-pink-500 to-rose-600',
  N4: 'from-amber-400 via-orange-500 to-amber-600',
  N3: 'from-emerald-400 via-teal-500 to-emerald-600',
  N2: 'from-blue-400 via-indigo-500 to-blue-600',
  N1: 'from-violet-400 via-purple-500 to-violet-600',
};

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [mySubscriptions, setMySubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [successPlanId, setSuccessPlanId] = useState<number | null>(null);
  const { user, fetchMe } = useAuthStore();

  useEffect(() => {
    const load = async () => {
      try {
        const [planData, subData] = await Promise.all([
          subscriptionApi.getPlans(),
          user ? subscriptionApi.getMySubscriptions() : Promise.resolve([]),
        ]);
        setPlans(planData);
        setMySubscriptions(subData);
      } catch (err) {
        console.error('Failed to load pricing data', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // GSAP animations
  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.pricing-fade-in',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
        );

        // Shimmer animation on featured card
        const featured = containerRef.current?.querySelector('.pricing-featured');
        if (featured) {
          gsap.fromTo(featured,
            { boxShadow: '0 0 0 0 rgba(192,21,56,0)' },
            {
              boxShadow: '0 0 40px 4px rgba(192,21,56,0.15)',
              duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
            }
          );
        }

        // Hover micro-interactions
        const cards = containerRef.current?.querySelectorAll('.pricing-card');
        cards?.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  const isOwned = (plan: SubscriptionPlan): boolean => {
    return mySubscriptions.some(
      (sub) =>
        sub.status === 'ACTIVE' &&
        ((plan.planType === 'FULL_BUNDLE' && sub.planType === 'FULL_BUNDLE') ||
         (plan.jlptLevel && sub.jlptLevel === plan.jlptLevel))
    );
  };

  const hasFullBundle = mySubscriptions.some(
    (sub) => sub.status === 'ACTIVE' && sub.planType === 'FULL_BUNDLE'
  );

  const handlePurchase = async (planId: number) => {
    if (!user) {
      window.location.hash = '#/auth';
      return;
    }
    setPurchasing(planId);
    try {
      await subscriptionApi.createCheckout(planId);
      setSuccessPlanId(planId);
      // Refresh data
      const [subData] = await Promise.all([
        subscriptionApi.getMySubscriptions(),
        fetchMe(),
      ]);
      setMySubscriptions(subData);
    } catch (err: any) {
      alert(err?.message || 'Lỗi thanh toán. Vui lòng thử lại.');
    } finally {
      setPurchasing(null);
    }
  };

  // Separate plans
  const singlePlans = plans.filter((p) => p.planType === 'SINGLE_LEVEL');
  const bundlePlan = plans.find((p) => p.planType === 'FULL_BUNDLE');

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 animate-pulse">
        <div className="h-12 bg-surface-container-high w-1/2 rounded-xl" />
        <div className="h-6 bg-surface-container-high w-2/3 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-surface-container-high rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-10 font-sans">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto space-y-4 pricing-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
          <Crown size={14} />
          Gói Học Premium
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
          Đầu tư cho <span style={{ color: '#c01538' }}>tương lai</span> tiếng Nhật của bạn
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Chọn gói phù hợp để mở khóa toàn bộ kho tàng từ vựng, Kanji và ngữ pháp. Học không giới hạn trong 365 ngày.
        </p>
      </header>

      {/* Success Banner */}
      {successPlanId && (
        <div
          className="pricing-fade-in"
          style={{
            background: 'linear-gradient(135deg, #2b5f43 0%, #1b3d2b 100%)',
            borderRadius: 16, padding: '20px 28px',
            display: 'flex', alignItems: 'center', gap: 16,
            color: '#fff', boxShadow: '0 4px 20px rgba(43,95,67,0.3)',
          }}
        >
          <BadgeCheck size={32} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
              🎉 Thanh toán thành công!
            </h3>
            <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>
              Gói học đã được kích hoạt. Bạn có thể bắt đầu học ngay!
            </p>
          </div>
          <button
            onClick={() => setSuccessPlanId(null)}
            style={{
              marginLeft: 'auto', padding: '8px 16px', borderRadius: 8,
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
            }}
          >
            Đóng
          </button>
        </div>
      )}

      {/* Bundle Plan — Featured */}
      {bundlePlan && (
        <div
          className="pricing-fade-in pricing-featured pricing-card"
          style={{
            background: 'linear-gradient(135deg, #c01538 0%, #9f1239 50%, #881337 100%)',
            borderRadius: 24, padding: '2px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Badge */}
          {bundlePlan.badge && (
            <div
              style={{
                position: 'absolute', top: 20, right: 20, zIndex: 10,
                padding: '6px 16px', borderRadius: 99,
                background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
                color: '#fff', fontWeight: 800, fontSize: 12,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <Star size={14} className="fill-current" />
              {bundlePlan.badge}
            </div>
          )}

          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 22, padding: '36px 40px',
              display: 'flex', flexWrap: 'wrap', gap: 40,
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: '1 1 400px', minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  👑
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 24, margin: 0, lineHeight: 1.2 }}>
                    {bundlePlan.name}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>
                    {bundlePlan.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {bundlePlan.features.map((feat, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500,
                    }}
                  >
                    <Check size={14} style={{ color: '#4ade80', flexShrink: 0 }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                Chỉ từ
              </div>
              <div style={{ color: '#fff', fontSize: 48, fontWeight: 900, lineHeight: 1 }}>
                {formatPrice(bundlePlan.price)}
                <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.7 }}> ₫</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4, marginBottom: 20 }}>
                / {bundlePlan.durationDays} ngày
              </div>

              {isOwned(bundlePlan) || hasFullBundle ? (
                <div
                  style={{
                    padding: '14px 32px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.2)', color: '#fff',
                    fontWeight: 700, fontSize: 15,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <BadgeCheck size={18} /> Đã sở hữu
                </div>
              ) : (
                <button
                  onClick={() => handlePurchase(bundlePlan.id)}
                  disabled={purchasing === bundlePlan.id}
                  style={{
                    padding: '14px 36px', borderRadius: 14,
                    background: '#fff', color: '#c01538',
                    fontWeight: 800, fontSize: 15, border: 'none',
                    cursor: purchasing === bundlePlan.id ? 'wait' : 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    opacity: purchasing === bundlePlan.id ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (purchasing !== bundlePlan.id) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.25)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                  }}
                >
                  {purchasing === bundlePlan.id ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <Zap size={18} className="fill-current" />
                  )}
                  {purchasing === bundlePlan.id ? 'Đang xử lý...' : 'Mua trọn gói ngay'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 pricing-fade-in">
        <div className="flex-1 h-px bg-outline-variant/50" />
        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
          Hoặc chọn gói lẻ theo trình độ
        </span>
        <div className="flex-1 h-px bg-outline-variant/50" />
      </div>

      {/* Single Level Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {singlePlans.map((plan) => {
          const owned = isOwned(plan) || hasFullBundle;
          const isPurchasing = purchasing === plan.id;
          const gradient = plan.jlptLevel ? levelGradients[plan.jlptLevel] : '';
          const emoji = plan.jlptLevel ? levelEmoji[plan.jlptLevel] : '📚';

          return (
            <div
              key={plan.id}
              className={`pricing-fade-in pricing-card relative bg-surface-container-lowest rounded-2xl border shadow-sm flex flex-col overflow-hidden transition-all ${
                owned ? 'border-secondary/40' : 'border-outline-variant hover:border-primary/40'
              }`}
            >
              {/* Level badge top bar */}
              <div
                className={`bg-gradient-to-r ${gradient} px-5 py-4 text-white`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 28 }}>{emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.2 }}>
                      {plan.jlptLevel}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 500 }}>
                      {plan.name.split('—')[1]?.trim() || ''}
                    </div>
                  </div>
                </div>
                {plan.badge && (
                  <span
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      padding: '3px 10px', borderRadius: 99,
                      background: 'rgba(255,255,255,0.25)',
                      fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: '#fff',
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-on-surface">
                      <Check size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-on-surface-variant pl-5">
                      +{plan.features.length - 4} tính năng khác
                    </li>
                  )}
                </ul>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-black text-on-surface">{formatPrice(plan.price)}</span>
                  <span className="text-sm text-on-surface-variant font-medium"> ₫ / năm</span>
                </div>

                {/* Action */}
                {owned ? (
                  <div
                    className="w-full py-3 bg-secondary/10 text-secondary rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <BadgeCheck size={16} /> Đã sở hữu
                  </div>
                ) : (
                  <Button
                    onClick={() => handlePurchase(plan.id)}
                    disabled={isPurchasing}
                    isLoading={isPurchasing}
                    variant="primary"
                    size="md"
                    icon={!isPurchasing ? <ArrowRight size={16} /> : undefined}
                    iconPosition="right"
                    className="w-full"
                  >
                    {isPurchasing ? 'Đang xử lý...' : 'Mua ngay'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust indicators */}
      <div className="pricing-fade-in flex flex-wrap items-center justify-center gap-8 text-on-surface-variant py-6">
        {[
          { icon: Shield, text: 'Thanh toán an toàn 100%' },
          { icon: Sparkles, text: 'Cập nhật nội dung miễn phí' },
          { icon: Lock, text: 'Hoàn tiền trong 7 ngày' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-medium">
            <item.icon size={16} className="text-outline" />
            {item.text}
          </div>
        ))}
      </div>

      {/* My Subscriptions History */}
      {mySubscriptions.length > 0 && (
        <div className="pricing-fade-in bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm">
          <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
            <BadgeCheck size={20} className="text-secondary" />
            Lịch sử gói học đã mua
          </h2>
          <div className="space-y-3">
            {mySubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                    style={{
                      background: sub.status === 'ACTIVE' ? 'rgba(43,95,67,0.1)' : 'rgba(0,0,0,0.05)',
                      color: sub.status === 'ACTIVE' ? '#2b5f43' : '#71717a',
                    }}
                  >
                    {sub.jlptLevel === 'ALL' ? '👑' : (levelEmoji[sub.jlptLevel] || '📦')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{sub.planName}</h4>
                    <p className="text-xs text-on-surface-variant">
                      Thanh toán: {formatPrice(sub.amount)} {sub.currency} • {sub.paymentProvider}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant">
                    {sub.startDate ? new Date(sub.startDate).toLocaleDateString('vi-VN') : '—'}
                    {' → '}
                    {sub.endDate ? new Date(sub.endDate).toLocaleDateString('vi-VN') : '—'}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: sub.status === 'ACTIVE' ? 'rgba(43,95,67,0.1)' : 'rgba(186,26,26,0.1)',
                      color: sub.status === 'ACTIVE' ? '#2b5f43' : '#ba1a1a',
                    }}
                  >
                    {sub.status === 'ACTIVE' ? '✓ Đang hoạt động' : sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
