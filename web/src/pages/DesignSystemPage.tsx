import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkle, ArrowRight, Envelope, Lock, Info, BookOpen } from '@phosphor-icons/react';

export default function DesignSystemPage() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleTestLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleValidateInput = (val: string) => {
    setInputValue(val);
    if (val.length > 0 && val.length < 5) {
      setInputError('Tên phải dài hơn 5 ký tự.');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <header className="space-y-4 border-b border-charcoal-900 pb-8">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-crimson-950/40 border border-crimson-800/40 rounded-lg text-crimson-400">
              <Sparkle size={24} weight="fill" />
            </span>
            <span className="text-xs font-bold tracking-widest text-crimson-500 uppercase">
              NipponMaster Design System
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Thư Viện Thành Phần Tối Giản
          </h1>
          <p className="text-charcoal-300 text-sm md:text-base max-w-[70ch] leading-relaxed">
            Thiết kế dựa trên phong cách tasteskill, kết hợp tông màu Charcoal mực nhạt
            và Crimson anh đào. Đảm bảo tính tương thích cao, độ tương phản a11y tốt
            và phản hồi lực tương tác chân thực.
          </p>
        </header>

        {/* Colors Palette Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Bảng Màu Độc Bản (Color Palette)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Charcoal Swatches */}
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-charcoal-300">
                Charcoal (Nền & Trung tính)
              </h3>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-charcoal-950 border border-charcoal-800"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">950</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-charcoal-900"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">900</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-charcoal-800"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">800</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-charcoal-700"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">700</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-charcoal-500"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">500</span>
                </div>
              </div>
            </Card>

            {/* Crimson Swatches */}
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-charcoal-300">
                Crimson (Màu Nhấn Anh Đào)
              </h3>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-crimson-950"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">950</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-crimson-800"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">800</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-crimson-700"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">700</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-crimson-600"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">600</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-12 rounded bg-crimson-400"></div>
                  <span className="text-[10px] text-charcoal-400 mt-1">400</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Nút Bấm (Buttons)
          </h2>
          <Card className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Variants */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-charcoal-300 uppercase">
                  Biến thể (Variants)
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-charcoal-300 uppercase">
                  Kích thước (Sizes)
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large Size</Button>
                </div>
              </div>

              {/* Interactivity & Loading */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-charcoal-300 uppercase">
                  Tương tác & Trạng thái tải
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Đang xử lý</Button>
                  <Button onClick={handleTestLoading} isLoading={loading}>
                    {loading ? 'Đang chạy' : 'Click để tải 2s'}
                  </Button>
                  <Button disabled>Nút bị vô hiệu hóa</Button>
                </div>
              </div>

              {/* Icons */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-charcoal-300 uppercase">
                  Nút kèm Icon (Phosphor Icons)
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button icon={<ArrowRight size={16} />} iconPosition="right">
                    Tiếp tục
                  </Button>
                  <Button variant="secondary" icon={<BookOpen size={16} />}>
                    Bài học
                  </Button>
                  <Button variant="ghost" icon={<Info size={16} />} />
                </div>
              </div>

            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Nhập Liệu (Inputs)
          </h2>
          <Card className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Input
                label="Tên hiển thị"
                placeholder="Nhập tên tiếng Nhật của bạn..."
                helperText="Tên này sẽ hiển thị trên bảng xếp hạng của bạn."
              />

              <Input
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                icon={<Lock size={18} />}
              />

              <Input
                label="Họ tên (Validation)"
                placeholder="Nhập tối thiểu 5 ký tự..."
                value={inputValue}
                onChange={(e) => handleValidateInput(e.target.value)}
                error={inputError}
              />

              <Input
                label="Email"
                type="email"
                placeholder="example@domain.com"
                icon={<Envelope size={18} />}
                disabled
                helperText="Email không thể thay đổi sau khi đăng ký."
              />

            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Thẻ chứa (Cards)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card>
              <h3 className="text-lg font-bold text-white mb-2">Thẻ cơ bản (Static Card)</h3>
              <p className="text-xs text-charcoal-300 leading-relaxed">
                Thiết kế viền mỏng tinh tế, không bóng đổ đen nhòe nhoẹt. Thích hợp hiển thị nội dung tĩnh.
              </p>
            </Card>

            <Card interactive>
              <h3 className="text-lg font-bold text-white mb-2">Thẻ tương tác (Interactive Card)</h3>
              <p className="text-xs text-charcoal-300 leading-relaxed">
                Hover vào thẻ này sẽ thấy viền sáng lên và nâng nhẹ bề mặt. Có cảm giác vật lý.
              </p>
            </Card>

            <Card padding="lg" className="border-crimson-900/30 bg-crimson-950/10">
              <h3 className="text-lg font-bold text-crimson-400 mb-2 font-mono">Bản Tin Nổi Bật</h3>
              <p className="text-xs text-charcoal-200 leading-relaxed">
                Sử dụng class tùy biến viền và nền màu đỏ Crimson nhạt để làm nổi bật thông tin bài học.
              </p>
            </Card>

          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Nhãn phân loại (Badges)
          </h2>
          <Card className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
              <div className="text-xs text-charcoal-400 font-medium">Size Small</div>
              <div className="flex gap-2">
                <Badge variant="primary">N5</Badge>
                <Badge variant="secondary">Danh từ</Badge>
                <Badge variant="outline">Từ vựng</Badge>
                <Badge variant="crimson">Học thuộc</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-charcoal-400 font-medium">Size Medium</div>
              <div className="flex gap-2">
                <Badge variant="primary" size="md">N5</Badge>
                <Badge variant="secondary" size="md">Động từ</Badge>
                <Badge variant="outline" size="md">Ngữ pháp</Badge>
                <Badge variant="crimson" size="md">Cần ôn tập</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Form Example Mock */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-crimson-600 rounded-full"></span>
            Ứng Dụng Thực Tế (Form Mockup)
          </h2>
          <div className="max-w-md mx-auto">
            <Card className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Đăng ký tài khoản</h3>
                <p className="text-xs text-charcoal-400">
                  Bắt đầu hành trình chinh phục tiếng Nhật N5 của bạn hôm nay.
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input label="Địa chỉ Email" type="email" placeholder="email@example.com" icon={<Envelope size={18} />} />
                <Input label="Mật khẩu" type="password" placeholder="Tối thiểu 6 ký tự" icon={<Lock size={18} />} />
                <Button className="w-full" icon={<ArrowRight size={16} />} iconPosition="right">
                  Đăng ký ngay
                </Button>
              </form>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
