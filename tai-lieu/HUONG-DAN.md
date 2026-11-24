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

Danh sách sách, bài viết và dự án nằm trong **một file**: `site/noi-dung.js`.
Trang chủ, Thư viện và Blog đều đọc từ đó, nên chỉ cần thêm **một mục** là cả ba trang tự cập nhật, kể cả số đếm ("3 cuốn · 1 sắp có", "3 bài viết") trên trang chủ.

| Muốn thêm | Thêm vào danh sách | Ghi chú |
|---|---|---|
| Sách mới | `BOOKS` | Thêm xuống **cuối**. Trang chủ hiện 3 cuốn `doc-ngay` ở cuối. `status:"sap-co"` thì hiện ở dòng "Sắp có". |
| Bài blog mới | `POSTS` | Điền `ngay` dạng `2026-11-24`. Bài mới nhất tự lên đầu. `noibat:true` cho bài to nhất. |
| Dự án mới | `PROJECTS` | Trang chủ hiện 2 dự án đầu có `noibat:true`. |

Mỗi mục chỉ cần copy một dòng có sẵn rồi đổi chữ. Ảnh đặt trong `site/anh/`, ghi đường dẫn dạng `anh/ten-anh.jpg`.

Hai chỗ vẫn viết tay: trang **Dự án** (`du-an.html`, vì có mô tả chi tiết riêng) và chính **trang bài viết / trang sách** (mỗi bài một file HTML). Thêm dự án mới thì nhớ thêm cả ở `du-an.html`.
