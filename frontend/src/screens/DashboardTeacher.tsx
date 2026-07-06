import { BookOpen, Users, Star, TrendingUp, Clock, PlayCircle, FileText, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface DashboardTeacherProps {
  username?: string;
}

export default function DashboardTeacher({ username }: DashboardTeacherProps) {
  return (
    <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">Giảng viên</Badge>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Xin chào, {username || 'Giảng viên'}!
          </h1>
          <p className="text-lg text-on-surface-variant">
            Quản lý lớp học và theo dõi tiến độ học viên của bạn.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<FileText size={16} />}>Tạo bài học</Button>
          <Button variant="primary" icon={<PlayCircle size={16} />}>Bắt đầu lớp học</Button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng học viên', value: '48', icon: Users, color: 'text-primary' },
          { label: 'Bài học đã đăng', value: '12', icon: BookOpen, color: 'text-secondary' },
          { label: 'Đánh giá trung bình', value: '4.8/5', icon: Star, color: 'text-tertiary' },
          { label: 'Giờ giảng dạy', value: '120h', icon: Clock, color: 'text-outline' },
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
            <h2 className="text-lg font-bold text-on-surface">Lớp học của tôi</h2>
            <TrendingUp size={18} className="text-outline" />
          </div>
          <div className="flex-1 flex items-center justify-center py-12 text-on-surface-variant text-sm">
            Chức năng đang được phát triển...
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Phản hồi học viên</h2>
            <MessageSquare size={18} className="text-outline" />
          </div>
          <div className="flex-1 flex items-center justify-center py-12 text-on-surface-variant text-sm">
            Chức năng đang được phát triển...
          </div>
        </Card>
      </div>
    </div>
  );
}
