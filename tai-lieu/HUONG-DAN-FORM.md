# Nối form gửi ý tưởng với Google Sheet

**Trạng thái:** đã nối với Google Form Ý tưởng cuốn sách tiếp theo (3 câu: cách xưng hô, khó khăn lớn nhất, email hoặc Facebook). Nếu đổi form khác, làm lại hai bước dưới và sửa `IDEA_FORM` ở cuối `site/thu-vien.html`.

Form nằm cuối trang Thư viện (`site/thu-vien.html`, mục "Kết nối"). Dữ liệu đi vào Google Form, và Google Form tự ghi vào Google Sheet.

## Bước 1. Tạo Google Form (khoảng 3 phút)
1. Vào forms.google.com, tạo biểu mẫu trống, đặt tên "Ý tưởng cho Thư viện".
2. Thêm 3 câu hỏi, đúng thứ tự:
   - **Chủ đề bạn muốn đọc sâu** (Đoạn văn, bắt buộc)
   - **Cách xưng hô** (Trả lời ngắn, không bắt buộc)
   - **Email** (Trả lời ngắn, không bắt buộc)
3. Tab **Câu trả lời**, bấm biểu tượng Google Sheets để tạo bảng tính nhận dữ liệu.
4. Trong Sheet: **Công cụ > Quy tắc thông báo** để nhận email mỗi khi có người gửi.

## Bước 2. Lấy địa chỉ gửi và mã các ô
1. Trong Form, bấm dấu ba chấm > **Nhận đường liên kết điền sẵn**.
2. Điền chữ bất kỳ vào cả 3 câu (ví dụ AAA, BBB, CCC), bấm **Nhận đường liên kết**, rồi **Sao chép**.
3. Link có dạng:
   `https://docs.google.com/forms/d/e/XXXX/viewform?usp=pp_url&entry.111=AAA&entry.222=BBB&entry.333=CCC`
4. Gửi link đó cho Claude, hoặc tự điền vào `IDEA_FORM` ở cuối `thu-vien.html`:
   - `action`: `https://docs.google.com/forms/d/e/XXXX/formResponse` (đổi `viewform` thành `formResponse`)
   - `fields`: `idea` = entry của AAA, `name` = entry của BBB, `email` = entry của CCC

## Ghi chú
- Để trống `action` thì form mở email thay thế, nên trang vẫn dùng được.
- Có ô ẩn chống spam và giới hạn gửi lại sau 8 giây.
- Gửi xong, trang chỉ báo "đã nhận" vì Google không trả kết quả về trình duyệt. Hãy gửi thử một ý tưởng rồi mở Sheet kiểm tra.
