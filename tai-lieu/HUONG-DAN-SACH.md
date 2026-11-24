# Hướng dẫn làm một cuốn sách đọc trên trang Thư viện

Gói lại các yêu cầu của Minh khi làm sách. Mẫu chuẩn: `site/the-mountain-is-you.html`.
Mỗi lần làm sách mới, đưa file này cho Claude và nói: "làm sách mới theo HUONG-DAN-SACH.md".

## 1. Mục tiêu
- Trang sách chỉ để **đọc**: ít xao nhãng, chữ dễ chịu, đọc dài không mỏi mắt.
- Giữ giao diện chung của website (xem `minhfam-design-system.md`): nền kem, xanh rừng, Spectral cho tiêu đề và thân bài, Work Sans cho thanh công cụ, nút, nhãn. Không thêm màu ngoài bảng.

## 2. Tên file và vị trí
- Mỗi sách là **một file HTML** trong `site/`.
- Tên file = tên sách, chữ thường, không dấu, nối bằng gạch ngang. Ví dụ: `the-mountain-is-you.html`.
- Ảnh minh họa đặt trong `site/anh/`, đặt tên có tiền tố tên sách, ví dụ `the-mountain-is-you-ch1-nui.jpg`.

## 3. Trang đọc phải có
1. **Thanh trên cùng cố định** (luôn hiện khi cuộn, không tự ẩn): nút về Thư viện, Mục lục, % tiến độ cả cuốn, nút **Aa**.
2. **Thanh tiến độ** mỏng ở mép trên, theo chương đang đọc.
3. **Mục lục** kéo ra từ bên trái, đánh dấu chương đang đọc.
4. **Aa tùy chỉnh**: cỡ chữ, độ rộng dòng, giãn dòng, nền (sáng / giấy ngả vàng / tối). Lưu lại cho lần sau. **Không có lựa chọn đổi font**: thân bài luôn là Spectral.
5. **Nhớ chỗ đọc dở**: mở lại đúng chương và vị trí cuộn.
6. **Cuối chương**: nút chương trước / chương sau. Phím tắt: ←/→ đổi chương, `T` mục lục, `Esc` đóng.
7. Cột chữ rộng 680px, chữ thân Spectral 19px, dòng cao khoảng 31px (1.63), chữ cái đầu chương to hơn.
8. Dùng tốt trên điện thoại, không tràn ngang. Có sẵn kiểu in (ẩn thanh công cụ).

## 4. Nội dung
- Nội dung nằm trong mảng `CH` ở cuối file. Mỗi chương: `{t:"Tiêu đề", body:"<p>…</p>"}`.
- Thẻ dùng được: `<p>`, `<h2>`, `<blockquote>`, `<ul>`, `<hr>`, `<figure>`, và khối ghi chú `<div class="note"><b>Nhãn</b>…</div>`.
- Đoạn đầu mỗi chương thêm `class="first"` để có chữ cái đầu to.
- **Bản quyền**: sách của người khác thì chỉ viết ghi chú / tóm lược bằng lời mới, ghi rõ đó là ghi chú. Chỉ đăng nguyên văn khi Minh có quyền.
- Minh sẽ tự cập nhật nội dung sau, nên bản đầu chỉ cần khung chương đúng.

## 5. Hình minh họa
Minh cung cấp ảnh sau. Khi có ảnh, chèn vào `body` của chương:

```html
<figure>
  <img src="anh/ten-anh.jpg" alt="Mô tả ảnh cho người dùng đọc màn hình" loading="lazy">
  <figcaption>Chú thích ngắn</figcaption>
</figure>
```
- Ảnh rộng hơn cột chữ: dùng `<figure class="wide">`.
- Ảnh bìa: để vào `anh:` của sách trong Thư viện (xem mục 6). Tỉ lệ bìa 3:4.
- Nên nén ảnh dưới khoảng 300 KB mỗi ảnh để trang tải nhanh.

## 6. Đưa sách lên trang Thư viện
Mở `site/thu-vien.html`, thêm một dòng vào mảng `BOOKS`:

```js
{id:"the-mountain-is-you", ten:"The Mountain Is You", mota:"Một câu mô tả.",
 chude:"Phát triển bản thân", status:"doc-ngay", link:"the-mountain-is-you.html",
 anh:"", gia:null, giaGoc:null, c1:"#17301d", c2:"#4a9b60", noibat:true}
```
- `status`: `doc-ngay` (đã có) hoặc `sap-co` (sắp ra mắt).
- `anh:""` thì dùng bìa màu tự tạo; `c1`, `c2` chỉ lấy từ bảng màu design system.
- `noibat:true` để hiện trên giá sách ở đầu trang (3 cuốn đầu).
- Muốn gom combo: thêm vào `COMBOS`, ghép các cuốn bằng `id`.

## 7. Kiểm tra trước khi giao
- Không có lỗi trong console; chuyển chương, mục lục, nút Aa, ba nền hoạt động.
- Cuộn xuống, thanh trên cùng vẫn cố định.
- Xem thử ở khổ điện thoại, không bị tràn ngang.
- Nút "Đọc ngay" ở Thư viện mở đúng file.
- Claude cho Minh xem trước, **Minh duyệt rồi mới đăng**.
