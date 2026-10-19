import { useAuthStore } from '../store/useAuthStore';

/**
 * userScope.ts — Tiền tố định danh người dùng (User Scope)
 * Đảm bảo dữ liệu (Streak, Điểm danh, Thẻ đã xem, Bộ thẻ Daily Deck...) 
 * được cô lập riêng biệt theo từng tài khoản, không bị rò rỉ khi đổi user trên cùng trình duyệt.
 */
export function getUserScope(): string {
  try {
    const user = useAuthStore.getState().user;
    if (user?.email) return `u_${user.email.toLowerCase().replace(/[^a-z0-9]/g, '_')}_`;
    if (user?.username) return `u_${user.username.toLowerCase().replace(/[^a-z0-9]/g, '_')}_`;
    if (user?.id) return `u_${user.id}_`;
  } catch {}

  try {
    const storedEmail = localStorage.getItem('nippon_current_user_email');
    if (storedEmail) return `u_${storedEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}_`;
  } catch {}

  return 'guest_';
}
