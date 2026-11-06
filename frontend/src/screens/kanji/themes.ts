// Minh họa ngữ cảnh theo chủ đề tình huống cho câu đọc
export const SCENARIO_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; iconBg: string; meaningVi: string }
> = {
  1: { emoji: '🍎', badge: 'Quầy hoa quả', scene: 'Đi chợ mua sắm', iconBg: 'bg-red-50 text-red-600 border-red-200', meaningVi: 'Làm ơn cho tôi một quả táo.' },
  2: { emoji: '🏫', badge: 'Phòng học', scene: 'Giờ lên lớp', iconBg: 'bg-amber-50 text-amber-700 border-amber-200', meaningVi: 'Trong lớp học có một học sinh.' },
  3: { emoji: '🍊', badge: 'Quầy trái cây', scene: 'Mua quýt Nhật (Mikan)', iconBg: 'bg-orange-50 text-orange-600 border-orange-200', meaningVi: 'Tôi đã mua hai quả quýt.' },
  4: { emoji: '👥', badge: 'Bạn bè', scene: 'Đôi bạn cùng đi', iconBg: 'bg-blue-50 text-blue-600 border-blue-200', meaningVi: 'Tôi sẽ đi cùng hai người: anh Tanaka và anh Suzuki.' },
  5: { emoji: '🍰', badge: 'Tiệm bánh ngọt', scene: 'Thưởng thức bánh kem', iconBg: 'bg-pink-50 text-pink-600 border-pink-200', meaningVi: 'Tôi đã ăn ba cái bánh ngọt.' },
  6: { emoji: '🛋️', badge: 'Phòng khách', scene: 'Bạn bè sum họp', iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200', meaningVi: 'Trong phòng có bốn người bạn.' },
  7: { emoji: '🖊️', badge: 'Văn phòng phẩm', scene: 'Dụng cụ học tập', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200', meaningVi: 'Chiếc bút bi này giá 100 Yên.' },
  8: { emoji: '👔', badge: 'Shop thời trang', scene: 'Mua trang phục', iconBg: 'bg-teal-50 text-teal-600 border-teal-200', meaningVi: 'Giá của chiếc áo sơ mi là 3,000 Yên.' },
  9: { emoji: '💴', badge: 'Ví tiền', scene: 'Tài chính cá nhân', iconBg: 'bg-yellow-50 text-yellow-700 border-yellow-200', meaningVi: 'Trong ví tôi có 10,000 Yên (1 vạn).' },
  10: { emoji: '📚', badge: 'Giá sách', scene: 'Sắp xếp tài liệu', iconBg: 'bg-purple-50 text-purple-600 border-purple-200', meaningVi: 'Tôi đã xếp sáu cuốn sách ngay ngắn.' },
};

// Minh họa ngữ cảnh cho câu viết chữ Hán
export const WRITING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '🥖', badge: 'Tiệm bánh mì', scene: 'Bữa sáng', meaningVi: 'Tôi đã mua một ổ bánh mì.' },
  2: { emoji: '👨‍👩‍👧', badge: 'Gia đình', scene: 'Con cái', meaningVi: 'Anh Suzuki có hai người con.' },
  3: { emoji: '📓', badge: 'Bàn học', scene: 'Vở ghi chép', meaningVi: 'Trên bàn có ba cuốn vở ghi.' },
  4: { emoji: '🏡', badge: 'Tổ ấm', scene: 'Thành viên gia đình', meaningVi: 'Gia đình tôi có bốn người.' },
  5: { emoji: '🥚', badge: 'Hộp trứng', scene: 'Nhà bếp', meaningVi: 'Trong hộp có năm quả trứng.' },
  6: { emoji: '☕', badge: 'Quán cà phê', scene: 'Thức uống', meaningVi: 'Cốc cà phê này giá 100 Yên.' },
  7: { emoji: '📖', badge: 'Hiệu sách', scene: 'Từ điển Nhật', meaningVi: 'Cuốn từ điển này giá 3,000 Yên.' },
  8: { emoji: '💴', badge: 'Thanh toán', scene: 'Thu ngân', meaningVi: 'Tôi đã thanh toán bằng 10,000 Yên tiền Nhật.' },
  9: { emoji: '⌚', badge: 'Đồng hồ', scene: 'Trang sức', meaningVi: 'Giá của chiếc đồng hồ đeo tay là 8,000 Yên.' },
  10: { emoji: '🤝', badge: 'Gặp gỡ', scene: 'Bạn bè tụ họp', meaningVi: 'Sáu người bạn đã cùng nhau tụ họp.' },
};

// Minh họa ngữ cảnh đặc thù N4 Chương 1 (Chương 1: 家族 - Gia đình)
export const N4_CH1_READING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '👩', badge: 'Chị gái', scene: 'Sống tự lập ở Tokyo', meaningVi: 'Chị gái tôi đang sống một mình ở Tokyo.' },
  2: { emoji: '👨‍👩‍👧‍👦', badge: 'Gia đình', scene: 'Thành viên trong nhà', meaningVi: 'Gia đình tôi có 5 người.' },
  3: { emoji: '👨‍🏫', badge: 'Anh trai', scene: 'Nghề nghiệp giáo viên', meaningVi: 'Anh trai tôi là giáo viên tiếng Anh trường cấp ba.' },
  4: { emoji: '🙋‍♂️', badge: 'Bản thân', scene: 'Giới thiệu họ tên', meaningVi: 'Tên tôi là Yamada Taro.' },
  5: { emoji: '🎓', badge: 'Em gái', scene: 'Bước vào cổng đại học', meaningVi: 'Năm nay em gái tôi đã trở thành sinh viên đại học.' },
  6: { emoji: '👴👵', badge: 'Cha mẹ', scene: 'Kính trọng đấng sinh thành', meaningVi: 'Tôi rất kính trọng cha mẹ mình.' },
  7: { emoji: '🤝', badge: 'Anh em', scene: 'Thuận hòa yêu thương', meaningVi: 'Anh em trong nhà phải thuận hòa, đoàn kết.' },
  8: { emoji: '🛍️', badge: 'Vợ chồng', scene: 'Đi mua sắm cùng nhau', meaningVi: 'Tôi đã cùng vợ đi mua sắm.' },
  9: { emoji: '🌾', badge: 'Nuôi nấng', scene: 'Lớn lên giữa thiên nhiên', meaningVi: 'Anh ấy đã lớn lên giữa thiên nhiên Hokkaido.' },
  10: { emoji: '👴', badge: 'Ông nội', scene: 'Kỷ niệm người thầy xưa', meaningVi: 'Ông nội tôi ngày xưa là thầy giáo.' },
};

export const N4_CH1_WRITING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '🏥', badge: 'Chị gái', scene: 'Nghề y tá điều dưỡng', meaningVi: 'Chị gái tôi làm nghề y tá.' },
  2: { emoji: '👨‍👩‍👧', badge: 'Gia đình', scene: 'Giới thiệu tổ ấm', meaningVi: 'Tôi xin giới thiệu về gia đình mình.' },
  3: { emoji: '⚽', badge: 'Anh trai', scene: 'Xem bóng đá sôi động', meaningVi: 'Tôi đã cùng anh trai đi xem trận bóng đá.' },
  4: { emoji: '🎧', badge: 'Bản thân', scene: 'Sở thích nghe nhạc', meaningVi: 'Sở thích của tôi là nghe nhạc.' },
  5: { emoji: '✉️', badge: 'Em gái', scene: 'Lá thư từ phương xa', meaningVi: 'Tôi đã nhận được thư từ em gái gửi tới.' },
  6: { emoji: '🎮', badge: 'Em trai', scene: 'Đam mê trò chơi điện tử', meaningVi: 'Em trai tôi rất thích chơi điện tử.' },
  7: { emoji: '👵', badge: 'Nuôi dạy', scene: 'Bà nuôi 6 người con', meaningVi: 'Bà tôi đã nuôi nấng 6 người con khôn lớn.' },
  8: { emoji: '🏡', badge: 'Nhà ở', scene: 'Cuối tuần thảnh thơi ở nhà', meaningVi: 'Cuối tuần tôi thảnh thơi nghỉ ngơi ở nhà mình.' },
  9: { emoji: '📏', badge: 'Anh em', scene: 'Chiều cao các anh em', meaningVi: 'Trong số các anh em thì ai là người cao nhất?' },
  10: { emoji: '🧳', badge: 'Gia đình', scene: 'Cả nhà sum vầy du lịch', meaningVi: 'Cả gia đình sum họp cùng nhau đi du lịch.' },
};

// Minh họa ngữ cảnh đặc thù N3 Chương 1 (Chương 1: 生活 - Đời sống hàng ngày)
export const N3_CH1_READING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '⏰', badge: 'Thức dậy', scene: 'Bắt đầu ngày mới', meaningVi: 'Mỗi sáng tôi thức dậy lúc 6 giờ tập thể dục.' },
  2: { emoji: '🛌', badge: 'Giấc ngủ', scene: 'Nghỉ ngơi ban đêm', meaningVi: 'Tối qua do mệt nên tôi đã đi ngủ từ sớm lúc 11 giờ.' },
  3: { emoji: '🚿', badge: 'Tắm gội', scene: 'Vòi sen sảng khoái', meaningVi: 'Tắm vòi sen xong thấy tinh thần thật sảng khoái.' },
  4: { emoji: '♨️', badge: 'Nước nóng', scene: 'Đun nước pha trà', meaningVi: 'Đun nước sôi để chuẩn bị pha trà tiếp khách.' },
  5: { emoji: '🧼', badge: 'Rửa tay', scene: 'Vệ sinh trước bữa ăn', meaningVi: 'Rửa tay bằng xà phòng sạch sẽ trước khi ăn cơm.' },
  6: { emoji: '🧺', badge: 'Giặt giũ', scene: 'Quần áo thơm tho', meaningVi: 'Trời nắng ráo nên tôi đem đồ giặt ra phơi ngoài ban công.' },
  7: { emoji: '☀️', badge: 'Phơi đồ', scene: 'Chăn đệm dưới nắng', meaningVi: 'Thời tiết ấm áp nên tôi đem phơi chăn đệm.' },
  8: { emoji: '🏃', badge: 'Sinh hoạt', scene: 'Lối sống điều độ', meaningVi: 'Duy trì nhịp sống sinh hoạt điều độ, lành mạnh.' },
  9: { emoji: '🤲', badge: 'Nhặt đồ', scene: 'Đồ thất lạc rơi', meaningVi: 'Tôi nhặt được chiếc ví rơi trên vỉa hè và nộp cho bốt cảnh sát.' },
  10: { emoji: '🗑️', badge: 'Vứt rác', scene: 'Phân loại quy củ', meaningVi: 'Vứt rác vào đúng thùng rác theo quy định khu phố.' },
};

export const N3_CH1_WRITING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '🔥', badge: 'Rác cháy', scene: 'Lịch thu gom thứ Hai', meaningVi: 'Khu vực này thu gom rác cháy được vào thứ Hai hàng tuần.' },
  2: { emoji: '🛍️', badge: 'Túi rác', scene: 'Túi đựng chuyên dụng', meaningVi: 'Tôi mua túi nilon đựng rác chuyên dụng tại siêu thị.' },
  3: { emoji: '📅', badge: 'Thứ trong tuần', scene: 'Lịch trình bận rộn', meaningVi: 'Hôm nay là thứ mấy trong tuần?' },
  4: { emoji: '🔚', badge: 'Cuối tháng', scene: 'Kỳ thi sát hạch', meaningVi: 'Vào cuối tháng này sẽ có bài thi kiểm tra học kỳ.' },
  5: { emoji: '⏮️', badge: 'Hôm qua', scene: 'Cơn mưa tầm tã', meaningVi: 'Hôm qua trời mưa suốt cả một ngày dài.' },
  6: { emoji: '⏭️', badge: 'Ngày hôm sau', scene: 'Khởi hành từ sáng sớm', meaningVi: 'Sáng hôm sau tôi xuất phát từ sáng sớm đến nhà ga.' },
  7: { emoji: '📝', badge: 'Kế hoạch', scene: 'Lập dự định tuần tới', meaningVi: 'Tôi lên kế hoạch cụ thể cho chuyến công tác tuần tới.' },
  8: { emoji: '📌', badge: 'Cố định', scene: 'Ngày nghỉ định kỳ', meaningVi: 'Vì hôm nay là ngày nghỉ định kỳ nên cửa hàng đóng cửa.' },
  9: { emoji: '📎', badge: 'Công chuyện', scene: 'Việc bận phải về sớm', meaningVi: 'Vì có việc bận công chuyện nên tôi xin phép về sớm.' },
  10: { emoji: '📋', badge: 'Sự việc', scene: 'Việc quan trọng cần nhớ', meaningVi: 'Tôi đã ghi chép lại những sự việc quan trọng cần xử lý.' },
};

// Minh họa ngữ cảnh đặc thù N3 Chương 2 (Chương 2: 家 - Nhà ở & Không gian sống)
export const N3_CH2_READING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '🚪', badge: 'Ấn nút (押)', scene: 'Bấm chuông & Đẩy cửa', meaningVi: 'Xin vui lòng ấn nút bấm trên cánh cửa.' },
  2: { emoji: '📥', badge: 'Kéo ra (引)', scene: 'Rút ngăn kéo bàn', meaningVi: 'Kéo ngăn kéo ra để lấy tài liệu cần thiết.' },
  3: { emoji: '🤲', badge: 'Lấy đồ (取)', scene: 'Gia vị trên bàn ăn', meaningVi: 'Làm ơn lấy giúp tôi lọ muối trên bàn ăn.' },
  4: { emoji: '💡', badge: 'Tắt điện (消)', scene: 'Tiết kiệm năng lượng', meaningVi: 'Trước khi rời khỏi phòng nhớ tắt đèn chiếu sáng.' },
  5: { emoji: '🚪', badge: 'Cánh cửa (戸)', scene: 'Gió rung cánh cửa', meaningVi: 'Gió bão thổi mạnh làm cánh cửa rung lắc lọc cọc.' },
  6: { emoji: '🪟', badge: 'Cửa sổ (窓)', scene: 'Mở cửa thông gió', meaningVi: 'Thời tiết mát mẻ nên tôi mở cửa sổ để thoáng khí.' },
  7: { emoji: '🏢', badge: 'Tầng 3 (階)', scene: 'Căn hộ chung cư', meaningVi: 'Căn hộ của tôi nằm ở tầng 3 tòa chung cư.' },
  8: { emoji: '🪜', badge: 'Cầu thang (段)', scene: 'Bậc thang nhà ga', meaningVi: 'Tôi vội vã bước từng bậc thang leo lên nhà ga.' },
  9: { emoji: '🌱', badge: 'Trồng cây (植)', scene: 'Cây hoa ban công', meaningVi: 'Tôi trồng thêm một chậu hoa tươi ở ngoài ban công.' },
  10: { emoji: '🍁', badge: 'Lá cây (葉)', scene: 'Lá phong mùa thu', meaningVi: 'Khi mùa thu tới, lá cây bắt đầu chuyển màu đỏ rực.' },
};

export const N3_CH2_WRITING_THEMES: Record<
  number,
  { emoji: string; badge: string; scene: string; meaningVi: string }
> = {
  1: { emoji: '🍊', badge: 'Quả ngọt (実)', scene: 'Cây quýt sai trĩu', meaningVi: 'Cây quýt ngoài vườn năm nay đã kết trái chín mọng.' },
  2: { emoji: '🪴', badge: 'Gốc rễ (根)', scene: 'Tưới nước rễ cây', meaningVi: 'Tưới nước đẫm vào phần gốc rễ của cây hoa.' },
  3: { emoji: '🏗️', badge: 'Xây dựng (建)', scene: 'Tòa nhà mới mọc lên', meaningVi: 'Tại khu đất này sắp xây dựng một tòa nhà mới.' },
  4: { emoji: '🏢', badge: 'Niên hạn (築)', scene: 'Chung cư xây 5 năm', meaningVi: 'Khu chung cư này mới xây được 5 năm nên còn rất mới.' },
  5: { emoji: '🚉', badge: 'Khuôn viên (構)', scene: 'Quán cà phê trong ga', meaningVi: 'Bên trong khuôn viên nhà ga có một quán cà phê ấm cúng.' },
  6: { emoji: '🪵', badge: 'Chế tạo (造)', scene: 'Đồ gỗ thủ công', meaningVi: 'Món đồ nội thất này được chế tác từ gỗ tự nhiên.' },
  7: { emoji: '❄️', badge: 'Lắp đặt (設)', scene: 'Thiết bị điều hòa', meaningVi: 'Chúng tôi vừa lắp đặt máy điều hòa không khí trong phòng.' },
  8: { emoji: '🏛️', badge: 'Cột nhà (柱)', scene: 'Trụ cột vững chắc', meaningVi: 'Trụ cột của ngôi nhà được gia cố vô cùng chắc chắn.' },
  9: { emoji: '🏭', badge: 'Nhà kho (庫)', scene: 'Cất trữ đồ đạc', meaningVi: 'Cất gọn những đồ đạc ít dùng vào trong nhà kho.' },
  10: { emoji: '🧭', badge: 'Hướng nam (向)', scene: 'Ban công đón nắng', meaningVi: 'Ban công căn phòng quay về hướng Nam đón ánh nắng chan hòa.' },
};

// Thuật toán xáo trộn deterministic Fisher-Yates để ngân hàng đáp án luôn ngẫu nhiên, không bao giờ theo đúng thứ tự câu hỏi
export function getShuffledBank<T>(array: T[], seed: number): T[] {
  if (!Array.isArray(array) || array.length <= 1) return array || [];
  const result = [...array];
  let s = Math.abs(seed) || 42;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

// Chuyển đổi số thứ tự sang ký tự số khoanh tròn Nhật Bản (①, ②, ...) cỡ lớn, nổi bật
export const toCircledNum = (n: number | string) => {
  const s = String(n || '').replace(/[[\]()]/g, '').trim();
  const circledMap: Record<string, string> = {
    '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
    '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨', '10': '⑩',
    '11': '⑪', '12': '⑫', '13': '⑬', '14': '⑭', '15': '⑮',
    '16': '⑯', '17': '⑰', '18': '⑱', '19': '⑲', '20': '⑳',
  };
  return circledMap[s] || s || '①';
};

