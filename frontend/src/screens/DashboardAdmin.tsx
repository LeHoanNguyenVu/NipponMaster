import { Users, BookOpen, ShieldCheck, AlertTriangle, Activity, Settings2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface DashboardAdminProps {
  username?: string;
}

export default function DashboardAdmin({ username }: DashboardAdminProps) {
  return (
    <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="primary" className="mb-3">Admin Hệ thống</Badge>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Quản trị viên, {username || 'Admin'}
          </h1>
          <p className="text-lg text-on-surface-variant">
            Tổng quan hệ thống NipponMaster — giám sát, phê duyệt và cấu hình.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<Settings2 size={16} />}>Cài đặt hệ thống</Button>
          <Button variant="primary" icon={<ShieldCheck size={16} />}>Phê duyệt tài khoản</Button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: '1,284', icon: Users, color: 'text-primary' },
          { label: 'Giảng viên chờ duyệt', value: '3', icon: ShieldCheck, color: 'text-secondary' },
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

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Giảng viên chờ phê duyệt</h2>
            <ShieldCheck size={18} className="text-outline" />
          </div>
          <div className="flex-1 flex items-center justify-center py-12 text-on-surface-variant text-sm">
            Chức năng đang được phát triển...
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Hoạt động hệ thống</h2>
            <Activity size={18} className="text-outline" />
          </div>
          <div className="flex-1 flex items-center justify-center py-12 text-on-surface-variant text-sm">
            Chức năng đang được phát triển...
          </div>
        </Card>
      </div>
    </div>
  );
}
