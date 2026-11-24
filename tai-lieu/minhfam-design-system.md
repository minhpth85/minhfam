# Minh Fam

Design system cho website cá nhân của Minh: một trang vừa để đọc (bài viết, nhật ký học nghề) vừa để giới thiệu và bán kiến thức chuyên môn (khóa học). Cảm giác chung là "tạp chí nhỏ trên mạng": ấm, sáng, có chữ serif để đọc và chữ sans gọn cho phần thao tác.

Nguồn: rút ra từ trang demo phối Spectral + Work Sans, màu kế thừa từ Herbloom. Herbloom vẫn dùng cho khóa học, slide và mạng xã hội; hệ này dành riêng cho website cá nhân.

## Cách đọc hệ này (dành cho Claude và người dựng trang)

1. Đọc README này, rồi `tokens.json` để lấy giá trị chính xác.
2. Khi dựng trang, dùng đúng tên token (`--primary`, `--bg-alt`, `.reading`...), không tự đặt mã màu mới.
3. Mỗi thành phần có hướng dẫn riêng trong `components/<Tên>/README.md`.

## Nguyên tắc nội dung

- Giọng văn: gần gũi, kể lại như người đã làm, câu ngắn, không hô hào. Xưng "mình" khi nói về bản thân, gọi người đọc là "bạn".
- Tiêu đề nói điều người đọc nhận được, không nói tên chuyên mục. Ví dụ: "Vì sao chữ có chân đọc lâu không mỏi mắt" tốt hơn "Bài viết về typography".
- Mỗi bài có một việc nhỏ để làm ngay ở cuối ("Bài tập nhỏ cho tuần này...").
- Không dùng emoji trong giao diện. Không số liệu bịa; chưa có thì để chỗ trống đánh dấu rõ.

## Typography: hai font, hai vai

| Vai | Font | Dùng cho | Không dùng cho |
|---|---|---|---|
| Nội dung | **Spectral** (serif) | tiêu đề lớn, đoạn văn dài, câu trích, tên khóa học | nút, menu, nhãn nhỏ |
| Giao diện | **Work Sans** (sans-serif) | menu, nút, nhãn eyebrow, chip, thông tin phụ, footer | đoạn văn dài hơn ba dòng |

Lý do: serif có chân giúp mắt bám theo dòng khi đọc lâu; sans-serif có hình chữ gọn, quét nhanh khi bấm và chọn. Hai font giữ hai vai rõ ràng thì trang có nhịp, không tranh nhau.

Cách tải: Google Fonts, `Spectral` (400, 500, 600, 400 nghiêng) và `Work Sans` (400, 500, 600, 700). Cả hai có bộ chữ tiếng Việt đầy đủ. Luôn khai báo font dự phòng như trong `type.families`.

Quy tắc chữ:
- Thân bài (`reading`) 19px, dòng cao 31px, cột đọc rộng tối đa 680px.
- Tiêu đề Spectral dùng độ đậm 600 và `letter-spacing` âm nhẹ như token ghi.
- Chữ nhỏ nhất 12px (`caption`, `eyebrow`). Eyebrow luôn viết HOA, màu `primary-text`.
- Mobile: `display` xuống 44/50, `h1` xuống 32/38, các cỡ còn lại giữ nguyên.

## Màu

Nền kem ấm, chữ ngả xanh, một màu hành động xanh lá, một khối tối xanh rừng để nhấn nhịp trang. Hổ phách chỉ làm khối màu nhỏ.

- Nền trang `bg`; section xen kẽ `bg-alt` (khối bài viết); thẻ `surface`.
- Nút chính `primary` với chữ `on-primary`; link và chip dùng `primary-text`.
- Khối tối dùng `surface-inverse`, chữ `text-on-inverse`, chữ nhấn `text-highlight-inverse`.
- Hổ phách: `accent` chỉ là nền; chữ hổ phách dùng `accent-text`.
- Có sẵn bảng dark theme; mọi cặp chữ và nền đã chọn để đạt tỷ lệ tương phản 4.5:1 (3:1 từ 24px trở lên).

Lưu ý tương phản: `green-600` làm chữ chỉ từ 24px; chữ nhỏ màu xanh luôn dùng `primary-text`. Chữ trên `accent` là `ink-900`.

## Bố cục và khoảng cách

- Khung nội dung rộng tối đa 1120px, lề hai bên `space-8` (mobile `space-4`).
- Padding dọc section: `space-20` đến `space-24` trên desktop, `space-16` trên mobile.
- Khoảng giữa tiêu đề section và nội dung: `space-12`. Giữa các thẻ: `space-6`.
- Bo góc: nút `radius-md`, thẻ và khối `radius-lg`, chip `radius-full`.
- Bóng rất nhẹ: `shadow-sm` cho thẻ, `shadow-md` khi hover.

## Thứ tự trang gợi ý cho website cá nhân

1. Nav: tên bạn bên trái, menu giữa, một nút hành động bên phải.
2. Hero: eyebrow, tiêu đề `display`, đoạn `lead`, hai nút (chính và link).
3. Bài viết mới nhất, nền `bg-alt`: cột thông tin bên trái (chủ đề, thời gian đọc), bài viết bên phải.
4. Khóa học: lưới thẻ khóa học, nền `bg`.
5. Khối tối `surface-inverse`: một ý cốt lõi của bạn, hoặc lời mời đăng ký.
6. Footer nhỏ bằng Work Sans, chữ `text-muted`.

## Thành phần

Nav, Button, Chip, CourseCard, Article. Mỗi thành phần có xem trước trực tiếp và hướng dẫn dùng.

## Không làm

- Không dùng Spectral cho nút hoặc menu; không dùng Work Sans cho đoạn văn dài.
- Không dùng đen thuần `#000` hoặc trắng tinh làm nền trang.
- Không thêm màu mới ngoài bảng; cần thêm thì thêm vào `tokens.json` trước.
- Không gradient xanh tím, không thẻ viền một bên cho thông báo, không emoji.
