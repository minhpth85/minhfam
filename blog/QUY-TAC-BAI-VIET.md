# Quy tắc dựng trang bài viết blog

Áp dụng cho mọi bài mới và khi cập nhật bài cũ. Mẫu chuẩn: `site/toxic-productivity.html` (đối chiếu khi dựng bài mới).

## 1. Chữ trong bài: một font, một cỡ (quan trọng nhất)
- **Toàn bộ nội dung bài viết dùng cùng một font (font nội dung của website) và cùng một cỡ chữ, cùng giãn dòng.** Cỡ chữ đặt bằng biến `--body-fs` (18px máy tính, 17px điện thoại) và `--body-lh`.
- Gồm: đoạn văn, danh sách, tiêu đề phụ giữa bài (câu hỏi 1/ 2/ 3/), câu trích, ô so sánh, ô kêu gọi (CTA), ô P/s, chú thích ảnh.
- **Không phân cấp bằng cỡ chữ.** Cần nhấn mạnh thì chỉ dùng **in đậm** hoặc *in nghiêng*:
  - Tiêu đề phụ giữa bài: in đậm.
  - Câu trích / câu nhấn / chú thích ảnh / "Chậm cũng được. Dở cũng được.": in nghiêng.
  - Từ khóa quan trọng: in đậm.
- Không dùng chữ to, chữ in hoa nhỏ (uppercase), giãn chữ, đổi font, đổi màu chữ để phân cấp trong thân bài.
- **Ngoại lệ duy nhất: chữ cái đầu bài viết (drop cap) cỡ lớn như hiện tại.**
- Không áp dụng cho phần khung ngoài thân bài: tiêu đề bài (h1), câu dẫn dưới tiêu đề, dòng tác giả/ngày, menu, nút chia sẻ, thẻ "Bài liên quan".
- Khi thêm CSS cho thành phần mới trong `.prose`, phải đưa vào danh sách `.prose :is(...)` có `font-size:var(--body-fs)!important` để không bị cỡ khác ghi đè.
- Sau khi dựng, kiểm tra bằng trình duyệt: mọi phần tử trong `.prose` phải ra cùng một cỡ (18px/31px).

## 2. Ảnh
- Giữ nguyên tỉ lệ và kích thước file gốc của Minh, **không cắt**; hiển thị rộng tối đa 480px, căn giữa.
- Ảnh chụp màn hình công cụ: viền mảnh + đổ bóng nhẹ, bấm vào ảnh mở công cụ.

## 3. Bố cục trang bài
Thứ tự: chủ đề nhỏ → tiêu đề → câu dẫn nghiêng → tác giả · ngày · thời gian đọc → ảnh bìa + chú thích → cột "Đọc thêm" bên trái (dính khi cuộn) + thân bài + chia sẻ + "Quay lại" → "Bài liên quan" (3 ô).
- Chữ cái đầu bài là drop cap.
- Giọng văn của Minh giữ nguyên ("tui", "=))", emoji). Chỉ sửa lỗi gõ rõ ràng và báo lại cho Minh.
- Những gì Claude tự viết thêm (tiêu đề nếu Minh nhờ đặt, câu dẫn, chú thích ảnh, chủ đề) phải nói rõ để Minh duyệt.

## 4. Liên kết và đăng
- Có công cụ/dự án liên quan (vd. Shadow Work: https://shadowwork-journal.pages.dev/) thì dẫn link trong thân bài, ở cột "Đọc thêm" và có thể thêm ô CTA.
- Bài mới → bài nổi bật trang `site/blog.html`; bài trước dời xuống "Bài mới nhất"; các bài có link sang nhau ở "Đọc thêm" và "Bài liên quan".
- Lưu nguồn bài ở `blog/<ngày>-<ten-bai>/bai-viet.md` + `anh/bia.jpg`; ảnh dùng cho site đặt ở `site/anh/`.
- Chỉ xem trước, không tự đăng.
