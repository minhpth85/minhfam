# Website cá nhân – Hướng dẫn đưa dữ liệu

Chỉ cần bỏ nội dung vào đúng thư mục, rồi nhờ Claude: "cập nhật website".

```
website-ca-nhan/
├── du-an/            Mỗi dự án = 1 thư mục con
│   └── _mau-du-an/   Copy thư mục này, đổi tên (vd: ung-dung-hoc-tieng-anh)
│       ├── thong-tin.md
│       └── anh/
├── blog/             Mỗi bài = 1 thư mục con
│   └── _mau-bai-viet/  Copy, đổi tên (vd: 2026-11-22-tieu-de)
│       ├── bai-viet.md
│       └── anh/
├── about-me/         Chỉ 1 file thong-tin.md + thư mục anh/
├── tai-nguyen-chung/ Ảnh đại diện, CV dùng chung
├── site/             Website hoàn chỉnh (HTML, CSS, noi-dung.js, anh/) — đây là phần đăng lên
├── tai-lieu/         Hướng dẫn và design system (file này nằm ở đây)
├── scripts/          build.mjs: quét blog/ và du-an/, cập nhật website
└── luu-tru/          Bản xem trước cũ, không đăng
```

## Quy tắc
- Thư mục bắt đầu bằng `_` (như `_mau-...`) là mẫu, **không** lên website.
- Tên thư mục: chữ thường, không dấu, nối bằng gạch ngang.
- Phần giữa hai dấu `---` ở đầu file là thông tin cấu hình; phần dưới là nội dung (Markdown).
- Ảnh đặt trong thư mục `anh/` của chính mục đó.
- Bài blog có `nhap: true` thì chưa đăng.
- Dự án có `noi-bat: true` sẽ hiện ở trang chủ.

- Quy tắc dựng bài blog (chữ một cỡ, chỉ in đậm/in nghiêng...): xem `blog/QUY-TAC-BAI-VIET.md`.

## Quy trình cập nhật
1. Bạn bỏ dữ liệu vào thư mục.
2. Bạn nhắn Claude "cập nhật website".
3. Claude đọc dữ liệu mới, dựng lại trang, cho bạn xem trước.
4. Bạn duyệt rồi mới đăng (Claude không tự đăng).

## Giao diện
- Các trang chính (trang chủ, dự án, thư viện, blog, bài viết, về Minh) nạp `site/minhfam.css`: token màu, chữ (Spectral + Work Sans), nút, chip, đầu trang, chân trang. Sửa giao diện chung thì sửa file này, không sửa từng trang. Trang đọc sách và trang cẩm nang có bộ token riêng, cùng giá trị.
- Quy tắc thiết kế: xem `minhfam-design-system.md`.


## Thêm nội dung mới (trang chủ tự cập nhật)

### Bài blog và dự án: hoàn toàn tự động
1. Copy `blog/_mau-bai-viet/` thành `blog/<ngày>-<ten-bai>/`, điền đầu file và nội dung, bỏ ảnh bìa vào `anh/bia.jpg`.
   (Dự án: copy `du-an/_mau-du-an/` thành `du-an/<ten-du-an>/`.)
2. Chạy `node scripts/build.mjs`, **hoặc** (khi đã bật GitHub Action, xem `cho-dang/`) push lên GitHub để tự chạy.
3. Script sẽ: cập nhật danh sách `POSTS` / `PROJECTS_TU_DONG` trong `site/noi-dung.js` (trang chủ, Blog tự đổi theo, kể cả số đếm), chép ảnh bìa sang `site/anh/`, và **tạo trang `site/<ten-bai>.html`** nếu chưa có.

Các trường tùy chọn ở đầu `bai-viet.md`: `phut` (số phút đọc, mặc định tính theo số chữ), `noi-bat: true` (bài to nhất), `vi-tri-anh: top` (vị trí cắt ảnh), `link-du-an` (link dự án liên quan). `nhap: true` thì chưa đăng.

Lưu ý:
- Trang HTML đã có thì script **không ghi đè**; muốn dựng lại thì xóa file đó rồi chạy lại.
- Khối giữa `AUTO:...BEGIN` và `AUTO:...END` trong `noi-dung.js` là tự sinh, đừng sửa tay (sửa ở file `.md`).
- Bài mới sinh ra theo khuôn `scripts/mau-bai-viet.html`; bài cần bố cục đặc biệt (ô so sánh, CTA...) thì chỉnh tay trong file HTML sau khi sinh.

### Sách: vẫn thêm tay
Mỗi cuốn là một trang HTML riêng nên thêm một dòng vào `BOOKS` trong `site/noi-dung.js` (xuống **cuối**; trang chủ hiện 3 cuốn `doc-ngay` ở cuối, `status:"sap-co"` hiện ở dòng "Sắp có"). Trang Thư viện tự xếp **mới nhất lên đầu** (cuốn `doc-ngay` thêm sau cùng) và gắn nhãn **"Sách mới"** trên bìa cuốn đó; sách `sap-co` xếp sau cùng. Ảnh đặt trong `site/anh/`, ghi đường dẫn dạng `anh/ten-anh.jpg`.

Còn viết tay: trang **Dự án** (`du-an.html`, vì có mô tả chi tiết riêng) và các trang sách.
