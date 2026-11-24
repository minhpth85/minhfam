# Minh Fam · Website cá nhân

Góc nhỏ học công khai (Learn in Public): dự án, thư viện sách, blog và giới thiệu bản thân.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `site/` | Website hoàn chỉnh: các trang HTML, `minhfam.css`, `noi-dung.js` (danh sách sách, bài, dự án), `anh/` |
| `blog/` | Nguồn bài viết, mỗi bài một thư mục (`bai-viet.md` + `anh/`) |
| `du-an/` | Nguồn dự án, mỗi dự án một thư mục (`thong-tin.md` + `anh/`) |
| `about-me/` | Thông tin giới thiệu và ảnh |
| `tai-nguyen-chung/` | Ảnh đại diện, CV dùng chung |
| `tai-lieu/` | Hướng dẫn dữ liệu, hướng dẫn làm sách, nối form, design system |
| `scripts/` | `build.mjs`: quét `blog/`, `du-an/` rồi cập nhật trang chủ, blog và tạo trang bài mới |
| `luu-tru/` | Bản xem trước cũ, không đăng |

Thư mục bắt đầu bằng `_` là mẫu, không lên website. Chi tiết: `tai-lieu/HUONG-DAN.md`.

## Xem trước

```bash
npx http-server site -p 8765 -c-1
```

## Đăng bài mới

Thêm thư mục bài trong `blog/` (copy từ `_mau-bai-viet`), rồi chạy `node scripts/build.mjs` và push. Muốn tự chạy khi push: chép `cho-dang/cap-nhat-website.yml` vào `.github/workflows/` (cần token có quyền `workflow`).
