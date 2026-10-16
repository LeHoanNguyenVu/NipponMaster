-- =============================================================================
-- Flyway Migration: V16 - Seed Example Sentences for All 118 N5 Kanjis
-- =============================================================================

-- 1. Số đếm
UPDATE kanjis SET example_sentence = '一つください。', example_romaji = 'Hitotsu kudasai.', example_meaning = 'Cho tôi xin 1 cái.' WHERE character = '一';
UPDATE kanjis SET example_sentence = 'りんごを二つ買います。', example_romaji = 'Ringo o futatsu kaimasu.', example_meaning = 'Tôi mua 2 quả táo.' WHERE character = '二';
UPDATE kanjis SET example_sentence = '三時にお茶を飲みます。', example_romaji = 'Sanji ni ocha o nomimasu.', example_meaning = 'Uống trà lúc 3 giờ.' WHERE character = '三';
UPDATE kanjis SET example_sentence = '日本には四季があります。', example_romaji = 'Nihon ni wa shiki ga arimasu.', example_meaning = 'Nhật Bản có bốn mùa.' WHERE character = '四';
UPDATE kanjis SET example_sentence = '五月に日本へ行きます。', example_romaji = 'Gogatsu ni Nihon e ikimasu.', example_meaning = 'Tôi đi Nhật Bản vào tháng năm.' WHERE character = '五';
UPDATE kanjis SET example_sentence = '毎朝六時に起きます。', example_romaji = 'Maiasa rokuji ni okimasu.', example_meaning = 'Mỗi sáng tôi thức dậy lúc 6 giờ.' WHERE character = '六';
UPDATE kanjis SET example_sentence = '七時に晩ご飯を食べます。', example_romaji = 'Shichiji ni bangohan o tabemasu.', example_meaning = 'Tôi ăn tối lúc 7 giờ.' WHERE character = '七';
UPDATE kanjis SET example_sentence = '八月に夏休みがあります。', example_romaji = 'Hachigatsu ni natsuyasumi ga arimasu.', example_meaning = 'Tháng 8 có kỳ nghỉ hè.' WHERE character = '八';
UPDATE kanjis SET example_sentence = '九時半に寝ます。', example_romaji = 'Kujihan ni nemasu.', example_meaning = 'Tôi đi ngủ lúc 9 giờ rưỡi.' WHERE character = '九';
UPDATE kanjis SET example_sentence = '十分休みましょう。', example_romaji = 'Juppun yasumimashou.', example_meaning = 'Nghỉ giải lao 10 phút nhé.' WHERE character = '十';
UPDATE kanjis SET example_sentence = 'このノートは百円です。', example_romaji = 'Kono nooto wa hyakuen desu.', example_meaning = 'Cuốn vở này có giá 100 Yên.' WHERE character = '百';
UPDATE kanjis SET example_sentence = '千円札を両替します。', example_romaji = 'Sen-en satsu o ryougae shimasu.', example_meaning = 'Đổi tờ tiền 1.000 Yên.' WHERE character = '千';
UPDATE kanjis SET example_sentence = '一万円で靴を買いました。', example_romaji = 'Ichiman-en de kutsu o kaimashita.', example_meaning = 'Mua đôi giày giá 1 vạn Yên.' WHERE character = '万';
UPDATE kanjis SET example_sentence = 'これは五百円です。', example_romaji = 'Kore wa gohyakuen desu.', example_meaning = 'Cái này giá 500 Yên.' WHERE character = '円';

-- 2. Lịch & Tuần
UPDATE kanjis SET example_sentence = '月曜日にテストがあります。', example_romaji = 'Getsuyoubi ni tesuto ga arimasu.', example_meaning = 'Thứ hai có bài kiểm tra.' WHERE character = '月';
UPDATE kanjis SET example_sentence = '火曜日は図書館へ行きます。', example_romaji = 'Kayoubi wa toshokan e ikimasu.', example_meaning = 'Thứ ba tôi đến thư viện.' WHERE character = '火';
UPDATE kanjis SET example_sentence = '水をたくさん飲みます。', example_romaji = 'Mizu o takusan nomimasu.', example_meaning = 'Uống thật nhiều nước.' WHERE character = '水';
UPDATE kanjis SET example_sentence = '木の下で涼みます。', example_romaji = 'Ki no shita de suzumimasu.', example_meaning = 'Hóng mát dưới bóng cây.' WHERE character = '木';
UPDATE kanjis SET example_sentence = '金曜日の夜は映画を見ます。', example_romaji = 'Kin-youbi no yoru wa eiga o mimasu.', example_meaning = 'Tối thứ sáu tôi xem phim.' WHERE character = '金';
UPDATE kanjis SET example_sentence = '土曜日に友達と遊びます。', example_romaji = 'Doyoubi ni tomodachi to asobimasu.', example_meaning = 'Thứ bảy đi chơi với bạn bè.' WHERE character = '土';
UPDATE kanjis SET example_sentence = '日曜日は家でゆっくりします。', example_romaji = 'Nichiyoubi wa ie de yukkuri shimasu.', example_meaning = 'Chủ nhật nghỉ ngơi ở nhà.' WHERE character = '日';
UPDATE kanjis SET example_sentence = '今年日本語を始めました。', example_romaji = 'Kotoshi nihongo o hajimemashita.', example_meaning = 'Năm nay tôi bắt đầu học tiếng Nhật.' WHERE character = '年';

-- 3. Con người & Cơ thể
UPDATE kanjis SET example_sentence = 'あの人は親切な先生です。', example_romaji = 'Ano hito wa shinsetsu na sensei desu.', example_meaning = 'Người đó là giáo viên tốt bụng.' WHERE character = '人';
UPDATE kanjis SET example_sentence = '口を開けてください。', example_romaji = 'Kuchi o akete kudasai.', example_meaning = 'Xin hãy mở miệng ra.' WHERE character = '口';
UPDATE kanjis SET example_sentence = '目が大きくて可愛いです。', example_romaji = 'Me ga ookikute kawaii desu.', example_meaning = 'Đôi mắt to tròn rất dễ thương.' WHERE character = '目';
UPDATE kanjis SET example_sentence = '耳を澄ませて聞きます。', example_romaji = 'Mimi o sumasete kikimasu.', example_meaning = 'Lắng tai chăm chú lắng nghe.' WHERE character = '耳';
UPDATE kanjis SET example_sentence = '手をきれいに洗います。', example_romaji = 'Te o kirei ni araimasu.', example_meaning = 'Rửa tay thật sạch sẽ.' WHERE character = '手';
UPDATE kanjis SET example_sentence = '足が速いですね。', example_romaji = 'Ashi ga hayai desu ne.', example_meaning = 'Chân bạn chạy nhanh thật đấy.' WHERE character = '足';
UPDATE kanjis SET example_sentence = '力持ちの男の人です。', example_romaji = 'Chikaramochi no otoko no hito desu.', example_meaning = 'Người đàn ông có sức khỏe dồi dào.' WHERE character = '力';

-- 4. Thiên nhiên 1
UPDATE kanjis SET example_sentence = '富士山は日本で一番高い山です。', example_romaji = 'Fujisan wa Nihon de ichiban takai yama desu.', example_meaning = 'Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản.' WHERE character = '山';
UPDATE kanjis SET example_sentence = '川で魚が泳いでいます。', example_romaji = 'Kawa de sakana ga oyoide imasu.', example_meaning = 'Cá đang bơi lội dưới dòng sông.' WHERE character = '川';
UPDATE kanjis SET example_sentence = '日本の田んぼの景色が好きです。', example_romaji = 'Nihon no tanbo no keshiki ga suki desu.', example_meaning = 'Tôi thích phong cảnh ruộng lúa ở Nhật Bản.' WHERE character = '田';
UPDATE kanjis SET example_sentence = '川のそばに丸い石があります。', example_romaji = 'Kawa no soba ni marui ishi ga arimasu.', example_meaning = 'Bên bờ sông có những hòn đá tròn.' WHERE character = '石';
UPDATE kanjis SET example_sentence = '公園にきれいな花が咲いています。', example_romaji = 'Kouen ni kirei na hana ga saite imasu.', example_meaning = 'Hoa nở rất đẹp trong công viên.' WHERE character = '花';
UPDATE kanjis SET example_sentence = '竹林の道を散歩します。', example_romaji = 'Chikurin no michi o sanpo shimasu.', example_meaning = 'Đi dạo trên con đường rừng tre.' WHERE character = '竹';
UPDATE kanjis SET example_sentence = '今日は朝から雨が降っています。', example_romaji = 'Kyou wa asa kara ame ga futte imasu.', example_meaning = 'Hôm nay trời mưa từ sáng sớm.' WHERE character = '雨';

-- 5. Phương hướng & Vị trí
UPDATE kanjis SET example_sentence = '机の上にノートがあります。', example_romaji = 'Tsukue no ue ni nooto ga arimasu.', example_meaning = 'Có quyển vở ở trên bàn.' WHERE character = '上';
UPDATE kanjis SET example_sentence = 'テーブルの下に猫がいます。', example_romaji = 'Teeburu no shita ni neko ga imasu.', example_meaning = 'Dưới gầm bàn có một chú mèo.' WHERE character = '下';
UPDATE kanjis SET example_sentence = '左へ曲がってください。', example_romaji = 'Hidari e magatte kudasai.', example_meaning = 'Xin hãy rẽ sang bên trái.' WHERE character = '左';
UPDATE kanjis SET example_sentence = '右手を高く挙げます。', example_romaji = 'Migite o takaku agemasu.', example_meaning = 'Giơ tay phải lên thật cao.' WHERE character = '右';
UPDATE kanjis SET example_sentence = '外へ散歩に出かけます。', example_romaji = 'Soto e sanpo ni dekakemasu.', example_meaning = 'Đi ra ngoài dạo mát.' WHERE character = '外';
UPDATE kanjis SET example_sentence = '部屋の内側に入ります。', example_romaji = 'Heya no uchigawa ni hairimasu.', example_meaning = 'Đi vào phía bên trong phòng.' WHERE character = '内';
UPDATE kanjis SET example_sentence = '箱の中に何がありますか。', example_romaji = 'Hako no naka ni nani ga arimasu ka.', example_meaning = 'Trong hộp có cái gì vậy?' WHERE character = '中';

-- 6. Trường học 1
UPDATE kanjis SET example_sentence = '大学で日本語を学びます。', example_romaji = 'Daigaku de nihongo o manabimasu.', example_meaning = 'Học tiếng Nhật ở trường đại học.' WHERE character = '学';
UPDATE kanjis SET example_sentence = '毎朝自転車で学校へ行きます。', example_romaji = 'Maiasa jitensha de gakkou e ikimasu.', example_meaning = 'Mỗi sáng tôi đi xe đạp đến trường.' WHERE character = '校';
UPDATE kanjis SET example_sentence = '先生、質問があります。', example_romaji = 'Sensei, shitsumon ga arimasu.', example_meaning = 'Thầy ơi, em có câu hỏi ạ.' WHERE character = '先';
UPDATE kanjis SET example_sentence = '私は留学生です。', example_romaji = 'Watashi wa ryuugakusei desu.', example_meaning = 'Tôi là du học sinh.' WHERE character = '生';
UPDATE kanjis SET example_sentence = 'お名前を書いてください。', example_romaji = 'Onamae o kaite kudasai.', example_meaning = 'Xin hãy viết tên của bạn vào đây.' WHERE character = '名';
UPDATE kanjis SET example_sentence = '漢字をたくさん覚えます。', example_romaji = 'Kanji o takusan oboemasu.', example_meaning = 'Ghi nhớ thật nhiều chữ Hán.' WHERE character = '字';
UPDATE kanjis SET example_sentence = '日本語の本を読みます。', example_romaji = 'Nihongo no hon o yomimasu.', example_meaning = 'Đọc sách tiếng Nhật.' WHERE character = '本';
UPDATE kanjis SET example_sentence = '体を動かして運動します。', example_romaji = 'Karada o ugokashite undou shimasu.', example_meaning = 'Vận động cơ thể để rèn luyện sức khỏe.' WHERE character = '体';

-- 7. Trường học 2
UPDATE kanjis SET example_sentence = '大きい家に住みたいです。', example_romaji = 'Ookii ie ni sumitai desu.', example_meaning = 'Tôi muốn sống trong ngôi nhà to lớn.' WHERE character = '大';
UPDATE kanjis SET example_sentence = '小さい犬を飼っています。', example_romaji = 'Chiisai inu o katte imasu.', example_meaning = 'Tôi nuôi một chú cún con nhỏ nhắn.' WHERE character = '小';
UPDATE kanjis SET example_sentence = '背が高い男の子です。', example_romaji = 'Se ga takai otokonoko desu.', example_meaning = 'Cậu bé có vóc dáng cao ráo.' WHERE character = '高';
UPDATE kanjis SET example_sentence = '友達と仲良く話します。', example_romaji = 'Tomodachi to nakayoku hanashimasu.', example_meaning = 'Nói chuyện thân thiết với bạn bè.' WHERE character = '友';
UPDATE kanjis SET example_sentence = '教室に入ってください。', example_romaji = 'Kyoushitsu ni haitte kudasai.', example_meaning = 'Xin mời bước vào lớp học.' WHERE character = '入';
UPDATE kanjis SET example_sentence = '電車から出ます。', example_romaji = 'Densha kara demasu.', example_meaning = 'Bước ra khỏi tàu điện.' WHERE character = '出';
UPDATE kanjis SET example_sentence = '正門の前で会いましょう。', example_romaji = 'Seimon no mae de aimashou.', example_meaning = 'Gặp nhau trước cổng chính nhé.' WHERE character = '門';

-- 8. Gia đình & Động vật
UPDATE kanjis SET example_sentence = '父は毎朝コーヒーを飲みます。', example_romaji = 'Chichi wa maiasa koohii o nomimasu.', example_meaning = 'Bố tôi uống cà phê mỗi sáng.' WHERE character = '父';
UPDATE kanjis SET example_sentence = '母と一緒に料理を作ります。', example_romaji = 'Haha to issho ni ryouri o tsukurimasu.', example_meaning = 'Cùng mẹ nấu ăn trong bếp.' WHERE character = '母';
UPDATE kanjis SET example_sentence = '子どもたちが公園で走っています。', example_romaji = 'Kodomotachi ga kouen de hashitte imasu.', example_meaning = 'Lũ trẻ đang chạy nhảy trong công viên.' WHERE character = '子';
UPDATE kanjis SET example_sentence = 'あの男の人は優しいです。', example_romaji = 'Ano otoko no hito wa yasashii desu.', example_meaning = 'Người đàn ông kia rất hiền từ.' WHERE character = '男';
UPDATE kanjis SET example_sentence = '女の子が歌を歌っています。', example_romaji = 'Onnanoko ga uta o utatte imasu.', example_meaning = 'Bé gái đang cất tiếng hát.' WHERE character = '女';
UPDATE kanjis SET example_sentence = '白い犬と散歩します。', example_romaji = 'Shiroi inu to sanpo shimasu.', example_meaning = 'Đi dạo cùng chú cún trắng.' WHERE character = '犬';
UPDATE kanjis SET example_sentence = '木の上で鳥が鳴いています。', example_romaji = 'Ki no ue de tori ga naite imasu.', example_meaning = 'Chim đang hót líu lo trên cây.' WHERE character = '鳥';

-- 9. Động từ 1
UPDATE kanjis SET example_sentence = '席から立ってください。', example_romaji = 'Seki kara tatte kudasai.', example_meaning = 'Xin vui lòng đứng dậy khỏi chỗ ngồi.' WHERE character = '立';
UPDATE kanjis SET example_sentence = '疲れたので少し休みます。', example_romaji = 'Tsukareta node sukoshi yasumimasu.', example_meaning = 'Vì mệt nên tôi nghỉ ngơi một chút.' WHERE character = '休';
UPDATE kanjis SET example_sentence = '映画を一緒に見ましょう。', example_romaji = 'Eiga o issho ni mimashou.', example_meaning = 'Hãy cùng nhau xem phim nhé.' WHERE character = '見';
UPDATE kanjis SET example_sentence = '先生の話をよく聞きます。', example_romaji = 'Sensei no hanashi o yoku kikimasu.', example_meaning = 'Chú ý lắng nghe lời thầy cô giảng.' WHERE character = '聞';
UPDATE kanjis SET example_sentence = '明日東京へ行きます。', example_romaji = 'Ashita Toukyou e ikimasu.', example_meaning = 'Ngày mai tôi sẽ đi Tokyo.' WHERE character = '行';
UPDATE kanjis SET example_sentence = '来週日本から友達が来ます。', example_romaji = 'Raishuu Nihon kara tomodachi ga kimasu.', example_meaning = 'Tuần tới bạn tôi từ Nhật Bản sẽ đến.' WHERE character = '来';
UPDATE kanjis SET example_sentence = '夕方早く家へ帰ります。', example_romaji = 'Yuugata hayaku ie e kaerimasu.', example_meaning = 'Tôi về nhà sớm vào buổi chiều tà.' WHERE character = '帰';

-- 10. Đồ ăn & Đồ uống
UPDATE kanjis SET example_sentence = '日本のお米は甘くておいしいです。', example_romaji = 'Nihon no okome wa amakute oishii desu.', example_meaning = 'Gạo Nhật Bản dẻo ngọt rất ngon.' WHERE character = '米';
UPDATE kanjis SET example_sentence = '温かいお茶をどうぞ。', example_romaji = 'Atatakai ocha o douzo.', example_meaning = 'Xin mời dùng tách trà ấm nóng.' WHERE character = '茶';
UPDATE kanjis SET example_sentence = '牛乳を毎日飲みます。', example_romaji = 'Gyuunyuu o mainichi nomimasu.', example_meaning = 'Tôi uống sữa bò mỗi ngày.' WHERE character = '牛';
UPDATE kanjis SET example_sentence = '晩ご飯に豚肉を食べます。', example_romaji = 'Bangohan ni butaniku o tabemasu.', example_meaning = 'Tôi ăn thịt heo vào bữa tối.' WHERE character = '肉';
UPDATE kanjis SET example_sentence = '川で新鮮な魚を釣りました。', example_romaji = 'Kawa de shinsen na sakana o tsurimashita.', example_meaning = 'Câu được cá tươi ngon ở con sông.' WHERE character = '魚';
UPDATE kanjis SET example_sentence = '海岸で貝殻を集めます。', example_romaji = 'Kaigan de kaigara o atsumemasu.', example_meaning = 'Nhặt vỏ sò bên bờ biển.' WHERE character = '貝';
UPDATE kanjis SET example_sentence = '私は日本料理が大好きです。', example_romaji = 'Watashi wa Nihon ryouri ga daisuki desu.', example_meaning = 'Tôi rất yêu thích ẩm thực Nhật Bản.' WHERE character = '好';
UPDATE kanjis SET example_sentence = '食べ物をたくさん買いました。', example_romaji = 'Tabemono o takusan kaimashita.', example_meaning = 'Mua thật nhiều đồ ăn thức uống.' WHERE character = '物';

-- 11. Thiên nhiên 2
UPDATE kanjis SET example_sentence = '小鳥が林の中を飛んでいます。', example_romaji = 'Kotori ga hayashi no naka o tonde imasu.', example_meaning = 'Chú chim nhỏ bay trong khu rừng thưa.' WHERE character = '林';
UPDATE kanjis SET example_sentence = '静かな森の中を散策します。', example_romaji = 'Shizuka na mori no naka o sansaku shimasu.', example_meaning = 'Đi dạo ngắm cảnh trong khu rừng rậm yên bình.' WHERE character = '森';
UPDATE kanjis SET example_sentence = '祖父が野菜の畑を耕します。', example_romaji = 'Sofu ga yasai no hatake o tagayashimasu.', example_meaning = 'Ông tôi chăm sóc vườn rau củ.' WHERE character = '畑';
UPDATE kanjis SET example_sentence = '険しい岩山を登ります。', example_romaji = 'Kewashii iwayama o noborimasu.', example_meaning = 'Leo lên ngọn núi đá hiểm trở.' WHERE character = '岩';
UPDATE kanjis SET example_sentence = '遠くから電車の音が聞こえます。', example_romaji = 'Tooku kara densha no oto ga kikoemasu.', example_meaning = 'Từ xa nghe thấy tiếng tàu điện chạy.' WHERE character = '音';
UPDATE kanjis SET example_sentence = '明るい笑顔で挨拶します。', example_romaji = 'Akarui egao de aisatsu shimasu.', example_meaning = 'Chào hỏi với nụ cười rạng rỡ.' WHERE character = '明';
UPDATE kanjis SET example_sentence = '暗くなる前に帰りましょう。', example_romaji = 'Kuraku naru mae ni kaerimashou.', example_meaning = 'Hãy về nhà trước khi trời tối nhé.' WHERE character = '暗';

-- 12. Động từ 2
UPDATE kanjis SET example_sentence = '日本語で何と言いますか。', example_romaji = 'Nihongo de nan to iimasu ka.', example_meaning = 'Cái này nói bằng tiếng Nhật thế nào?' WHERE character = '言';
UPDATE kanjis SET example_sentence = 'ノートにひらがなを書きます。', example_romaji = 'Nooto ni hiragana o kakimasu.', example_meaning = 'Viết chữ Hiragana vào vở.' WHERE character = '書';
UPDATE kanjis SET example_sentence = '図書館で小説を読みます。', example_romaji = 'Toshokan de shousetsu o yomimasu.', example_meaning = 'Đọc tiểu thuyết ở thư viện.' WHERE character = '読';
UPDATE kanjis SET example_sentence = '日本語で上手に話したいです。', example_romaji = 'Nihongo de jouzu ni hanashitai desu.', example_meaning = 'Tôi muốn giao tiếp tiếng Nhật thật lưu loát.' WHERE character = '話';
UPDATE kanjis SET example_sentence = '毎朝朝ごはんをしっかり食べます。', example_romaji = 'Maiasa asagohan o shikkari tabemasu.', example_meaning = 'Mỗi sáng đều ăn sáng đầy đủ.' WHERE character = '食';
UPDATE kanjis SET example_sentence = '冷たいジュースを飲みます。', example_romaji = 'Tsumetai juusu o nomimasu.', example_meaning = 'Uống một ly nước hoa quả mát lạnh.' WHERE character = '飲';
UPDATE kanjis SET example_sentence = 'スーパーで果物を買います。', example_romaji = 'Suupaa de kudamono o kaimasu.', example_meaning = 'Mua trái cây tươi ở siêu thị.' WHERE character = '買';

-- 13. Phố xá & Phương hướng
UPDATE kanjis SET example_sentence = '私の町は緑がいっぱいです。', example_romaji = 'Watashi no machi wa midori ga ippai desu.', example_meaning = 'Thị trấn của tôi ngập tràn cây xanh.' WHERE character = '町';
UPDATE kanjis SET example_sentence = '有名なお寺にお参りします。', example_romaji = 'Yuumei na otera ni omairi shimasu.', example_meaning = 'Đi viếng ngôi chùa nổi tiếng.' WHERE character = '寺';
UPDATE kanjis SET example_sentence = '電車で会社に通います。', example_romaji = 'Densha de kaisha ni kayoimasu.', example_meaning = 'Tôi đi làm bằng tàu điện.' WHERE character = '電';
UPDATE kanjis SET example_sentence = '新しい車を運転します。', example_romaji = 'Atarashii kuruma o unten shimasu.', example_meaning = 'Lái chiếc xe hơi mới.' WHERE character = '車';
UPDATE kanjis SET example_sentence = '東京駅の東口で待ち合わせます。', example_romaji = 'Toukyou eki no higashiguchi de machiawasemasu.', example_meaning = 'Hẹn gặp nhau ở cổng phía đông ga Tokyo.' WHERE character = '東';
UPDATE kanjis SET example_sentence = '西の空が赤く染まっています。', example_romaji = 'Nishi no sora ga akaku somatte imasu.', example_meaning = 'Bầu trời phía tây ửng đỏ ráng chiều.' WHERE character = '西';
UPDATE kanjis SET example_sentence = '部屋の窓は南を向いています。', example_romaji = 'Heya no mado wa minami o muite imasu.', example_meaning = 'Cửa sổ phòng hướng về phía nam.' WHERE character = '南';
UPDATE kanjis SET example_sentence = '北風が冷たく吹いています。', example_romaji = 'Kitakaze ga tsumetaku fuite imasu.', example_meaning = 'Gió bắc thổi từng cơn lạnh buốt.' WHERE character = '北';

-- 14. Giờ giấc
UPDATE kanjis SET example_sentence = '今何時ですか。', example_romaji = 'Ima nanji desu ka.', example_meaning = 'Bây giờ là mấy giờ rồi?' WHERE character = '時';
UPDATE kanjis SET example_sentence = '勉強の間に休憩を取ります。', example_romaji = 'Benkyou no aida ni kyuukei o torimasu.', example_meaning = 'Nghỉ giải lao giữa giờ học.' WHERE character = '間';
UPDATE kanjis SET example_sentence = '三時半におやつを食べます。', example_romaji = 'Sanjihan ni oyatsu o tabemasu.', example_meaning = 'Ăn xế lúc 3 giờ rưỡi chiều.' WHERE character = '半';
UPDATE kanjis SET example_sentence = 'あと十分で始まります。', example_romaji = 'Ato juppun de hajimarimasu.', example_meaning = 'Còn 10 phút nữa là bắt đầu rồi.' WHERE character = '分';
UPDATE kanjis SET example_sentence = '今から日本語の練習をします。', example_romaji = 'Ima kara nihongo no renshuu o shimasu.', example_meaning = 'Bắt đầu luyện tập tiếng Nhật từ bây giờ.' WHERE character = '今';
UPDATE kanjis SET example_sentence = '何を食べたいですか。', example_romaji = 'Nani o tabetai desu ka.', example_meaning = 'Bạn muốn ăn món gì?' WHERE character = '何';
UPDATE kanjis SET example_sentence = '夕方にきれいな夕日を見ました。', example_romaji = 'Yuugata ni kirei na yuuhi o mimashita.', example_meaning = 'Ngắm hoàng hôn tuyệt đẹp lúc chiều tà.' WHERE character = '夕';
UPDATE kanjis SET example_sentence = '漢字の書き方を教えてください。', example_romaji = 'Kanji no kakikata o oshiete kudasai.', example_meaning = 'Xin hãy chỉ cho tôi cách viết chữ Hán này.' WHERE character = '方';

-- 15. Tính từ
UPDATE kanjis SET example_sentence = '新しい教科書を開きます。', example_romaji = 'Atarashii kyoukasho o hirakimasu.', example_meaning = 'Mở cuốn sách giáo khoa mới ra.' WHERE character = '新';
UPDATE kanjis SET example_sentence = '古い建物を大切にします。', example_romaji = 'Furui tatemono o taisetsu ni shimasu.', example_meaning = 'Trân trọng gìn giữ những công trình kiến trúc cổ.' WHERE character = '古';
UPDATE kanjis SET example_sentence = 'この川はとても長いです。', example_romaji = 'Kono kawa wa totemo nagai desu.', example_meaning = 'Con sông này dài mênh mông.' WHERE character = '長';
UPDATE kanjis SET example_sentence = '安くておいしい料理を食べました。', example_romaji = 'Yasukute oishii ryouri o tabemashita.', example_meaning = 'Tôi đã ăn một món vừa rẻ vừa ngon.' WHERE character = '安';
UPDATE kanjis SET example_sentence = 'この店はお客さんが多いです。', example_romaji = 'Kono mise wa okyakusan ga ooi desu.', example_meaning = 'Cửa tiệm này rất đông khách.' WHERE character = '多';
UPDATE kanjis SET example_sentence = '塩を少し加えます。', example_romaji = 'Satou o sukoshi kuwaemasu.', example_meaning = 'Thêm một chút xíu muối vào.' WHERE character = '少';
UPDATE kanjis SET example_sentence = '元気いっぱい頑張ります。', example_romaji = 'Genki ippai gambarimasu.', example_meaning = 'Tràn đầy năng lượng và nỗ lực hết mình.' WHERE character = '元';
UPDATE kanjis SET example_sentence = '天気が良くて気持ちがいいです。', example_romaji = 'Tenki ga yokute kimochi ga ii desu.', example_meaning = 'Thời tiết đẹp khiến tâm trạng thật sảng khoái.' WHERE character = '気';
