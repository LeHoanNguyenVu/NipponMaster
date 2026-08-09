import { useState } from 'react';
import { Users, BookOpen, ShieldCheck, AlertTriangle, Activity, Settings2, Sparkles, LayoutDashboard } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import UserManagementConsole from './admin/UserManagementConsole';

interface DashboardAdminProps {
  username?: string;
}

export default function DashboardAdmin({ username }: DashboardAdminProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');

  return (
    <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="primary" className="mb-3">Admin Hệ thống</Badge>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Quản trị viên, {username || 'Admin'}
          </h1>
          <p className="text-lg text-on-surface-variant">
            Tổng quan hệ thống NipponMaster — giám sát, phân quyền và cấu hình.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/60 gap-1">
          {[
            { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
            { id: 'users', label: 'Quản lý Người dùng', icon: Users },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Tổng người dùng', value: '1,284', icon: Users, color: 'text-primary' },
              { label: 'Giảng viên hệ thống', value: '12', icon: ShieldCheck, color: 'text-secondary' },
              { label: 'Bài học đã xuất bản', value: '156', icon: BookOpen, color: 'text-tertiary' },
              { label: 'Sự cố hệ thống', value: '0', icon: AlertTriangle, color: 'text-error' },
            ].map((stat, i) => (
              <Card key={i} className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <div className="text-3xl font-bold text-on-surface">{stat.value}</div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-on-surface">Lối tắt Quản lý User & Phân Quyền</h2>
                <Users size={18} className="text-primary" />
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Xem toàn bộ người dùng, lọc theo vai trò (Student, Teacher, Admin, Guest), thực hiện khóa/mở khóa tài khoản hoặc reset mật khẩu.
              </p>
              <Button
                variant="primary"
                size="sm"
                icon={<Users size={16} />}
                onClick={() => setActiveTab('users')}
              >
                Mở Console Quản Lý User
              </Button>
            </Card>

            <Card className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-on-surface">Nhật ký Hoạt động Hệ thống</h2>
                <Activity size={18} className="text-outline" />
              </div>
              <div className="flex-1 flex items-center justify-center py-8 text-on-surface-variant text-xs italic">
                Hạ tầng ghi nhận nhật ký (System Logs) đang được kết nối...
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT CONSOLE */}
      {activeTab === 'users' && (
        <div className="animate-fade-in">
          <UserManagementConsole />
        </div>
      )}
    </div>
  );
}
