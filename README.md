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
| `luu-tru/` | Bản xem trước cũ, không đăng |

Thư mục bắt đầu bằng `_` là mẫu, không lên website. Chi tiết: `tai-lieu/HUONG-DAN.md`.

## Xem trước

```bash
npx http-server site -p 8765 -c-1
```
