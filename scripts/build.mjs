#!/usr/bin/env node
/* Quét dữ liệu nguồn và cập nhật website. Không cần cài thư viện nào.
 *
 *   node scripts/build.mjs
 *
 * - blog/<ngày>-<slug>/bai-viet.md  -> danh sách POSTS trong site/noi-dung.js
 *                                     + trang site/<slug>.html (chỉ tạo nếu chưa có)
 *                                     + ảnh bìa site/anh/<slug>.jpg (chỉ chép nếu chưa có)
 * - du-an/<slug>/thong-tin.md       -> danh sách PROJECTS_TU_DONG trong site/noi-dung.js
 * Thư mục bắt đầu bằng "_" là mẫu, bỏ qua. Bài có "nhap: true" bỏ qua.
 * Trang HTML đã có sẽ KHÔNG bị ghi đè (để giữ các bài dựng tay).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "site");
const JS = path.join(SITE, "noi-dung.js");
const log = (...a) => console.log("•", ...a);

/* ---------- front matter ---------- */
function parseValue(v) {
  v = v.replace(/\s+#.*$/, "").trim();
  if (v === "") return "";
  if (v === "true") return true;
  if (v === "false") return false;
  if (v.startsWith("[") && v.endsWith("]"))
    return v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
  return v.replace(/^["']|["']$/g, "");
}
function parseMd(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const k = line.match(/^([\w-]+):\s*(.*)$/);
    if (k) meta[k[1]] = parseValue(k[2]);
  }
  return { meta, body: m[2].replace(/<!--[\s\S]*?-->/g, "").trim() };
}

/* ---------- markdown nhỏ gọn ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function inline(s) {
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) =>
    /^https?:/.test(u) ? `<a href="${u}" target="_blank" rel="noopener">${t}</a>` : `<a href="${u}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return s;
}
function markdown(src) {
  const blocks = src.split(/\n{2,}/);
  const out = [];
  for (const b of blocks) {
    const t = b.trim();
    if (!t) continue;
    const lines = t.split("\n");
    if (lines.every((l) => /^\s*[-*]\s+/.test(l)))
      out.push("<ul>\n" + lines.map((l) => `  <li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("\n") + "\n</ul>");
    else if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l)))
      out.push("<ol>\n" + lines.map((l) => `  <li>${inline(l.replace(/^\s*\d+[.)]\s+/, ""))}</li>`).join("\n") + "\n</ol>");
    else if (lines.every((l) => /^>/.test(l)))
      out.push(`<blockquote class="pull"><p>${inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</p></blockquote>`);
    else if (/^#{1,6}\s/.test(t))
      /* quy tắc blog: tiêu đề phụ chỉ in đậm, không đổi cỡ chữ */
      out.push(`<p><strong>${inline(t.replace(/^#{1,6}\s+/, ""))}</strong></p>`);
    else if (/^-{3,}$/.test(t)) out.push("<hr>");
    else out.push(`<p>${inline(lines.join(" "))}</p>`);
  }
  return out.map((x) => "        " + x.replace(/\n/g, "\n        ")).join("\n");
}

/* ---------- tiện ích ---------- */
const ngayVN = (iso) => { const p = iso.split("-"); return `${p[2]}/${p[1]}/${p[0]}`; };
const words = (s) => (s.match(/\S+/g) || []).length;
const slugOf = (dir) => dir.replace(/^\d{4}-\d{2}-\d{2}-/, "");
const subdirs = (d) =>
  fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith("_")).map((e) => e.name) : [];
const js = (o) => JSON.stringify(o);

/* ---------- 1. BÀI VIẾT ---------- */
const posts = [];
for (const dir of subdirs(path.join(ROOT, "blog"))) {
  const file = path.join(ROOT, "blog", dir, "bai-viet.md");
  if (!fs.existsSync(file)) continue;
  const { meta, body } = parseMd(file);
  if (meta.nhap === true) { log("bỏ qua (nháp):", dir); continue; }
  const slug = slugOf(dir);
  const ngay = meta.ngay || dir.slice(0, 10);
  const thes = Array.isArray(meta.the) ? meta.the : meta.the ? [meta.the] : [];
  const anhNguon = path.join(ROOT, "blog", dir, String(meta["anh-bia"] || "anh/bia.jpg"));
  const anhDich = path.join(SITE, "anh", slug + path.extname(anhNguon || ".jpg"));
  let anhRel = "anh/" + path.basename(anhDich);
  if (fs.existsSync(anhNguon)) {
    if (!fs.existsSync(anhDich)) { fs.copyFileSync(anhNguon, anhDich); log("chép ảnh bìa:", anhRel); }
  } else if (!fs.existsSync(anhDich)) { anhRel = "anh/ve-sketch.jpg"; log("thiếu ảnh bìa, dùng ảnh tạm:", dir); }
  posts.push({
    dir, slug, body, ngay,
    ten: meta["tieu-de"] || slug,
    tomtat: meta["tom-tat"] || "",
    chude: thes.slice(0, 2),
    phut: Number(meta.phut) || Math.max(1, Math.round(words(body) / 200)),
    link: slug + ".html", anh: anhRel,
    vitri: meta["vi-tri-anh"] || "50% 50%",
    noibat: meta["noi-bat"] === true,
    duan: meta["link-du-an"] || "",
  });
}
posts.sort((a, b) => (a.ngay < b.ngay ? 1 : a.ngay > b.ngay ? -1 : (b.noibat - a.noibat) || a.slug.localeCompare(b.slug)));

/* trang chủ cần ít nhất 4 bài: thiếu thì thêm bài demo giữ chỗ */
const postEntries = posts.map((p) => {
  const e = { id: p.slug, ten: p.ten, tomtat: p.tomtat, chude: p.chude, ngay: p.ngay, phut: p.phut, link: p.link, anh: p.anh, vitri: p.vitri };
  if (p.noibat) e.noibat = true;
  return e;
});
if (postEntries.length < 4)
  postEntries.push({ id: "demo-bai-viet", ten: "Bài viết demo: một ghi chép nhỏ sắp được đăng", tomtat: "Đây là bài demo để giữ chỗ cho layout. Khi có bài mới, bài này sẽ tự nhường chỗ.", chude: ["Demo"], ngay: "2026-11-20", phut: 3, link: "blog.html", anh: "anh/ve-sketch.jpg", vitri: "50% 40%", demo: true });

/* trang bài: chỉ tạo khi chưa có */
const khuon = fs.readFileSync(path.join(ROOT, "scripts", "mau-bai-viet.html"), "utf8");
for (const p of posts) {
  const out = path.join(SITE, p.link);
  if (fs.existsSync(out)) continue;
  const khac = posts.filter((x) => x.slug !== p.slug);
  const docThem = [
    p.duan ? `          <li><a href="${esc(p.duan)}" target="_blank" rel="noopener"><div class="thumb ph sm" style="--c1:#4a9b60;--c2:#17301d"></div><div><small>Dự án</small><span>Xem dự án liên quan</span></div></a></li>` : "",
    ...khac.slice(0, 2).map((x) => `          <li><a href="${x.link}"><img class="thumb" src="${x.anh}" alt="" style="object-fit:cover"><div><small>${esc(x.chude[0] || "Bài viết")}</small><span>${esc(x.ten)}</span></div></a></li>`),
  ].filter(Boolean).join("\n");
  const lienQuan = khac.slice(0, 3).map((x) =>
    `      <a class="card" href="${x.link}" style="background:var(--surface)">\n        <div class="ph"><img src="${x.anh}" alt=""></div>\n        <div class="body"><span class="cat soft">${esc(x.chude[0] || "Bài viết")}</span><h3>${esc(x.ten)}</h3><p>${esc(x.tomtat)}</p></div>\n      </a>`).join("\n");
  const vars = {
    TIEU_DE_ESC: esc(p.ten), TOM_TAT_ESC: esc(p.tomtat), ANH: p.anh,
    CHU_DE: esc(p.chude[0] || "Bài viết"), NGAY: ngayVN(p.ngay), PHUT: p.phut,
    DOC_THEM: docThem, NOI_DUNG: markdown(p.body), LIEN_QUAN: lienQuan,
  };
  fs.writeFileSync(out, khuon.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? "")));
  log("tạo trang bài mới:", p.link);
}

/* ---------- 2. DỰ ÁN ---------- */
const projects = [];
for (const dir of subdirs(path.join(ROOT, "du-an"))) {
  const file = path.join(ROOT, "du-an", dir, "thong-tin.md");
  if (!fs.existsSync(file)) continue;
  const { meta, body } = parseMd(file);
  if (meta.nhap === true) continue;
  const gioiThieu = (body.match(/##\s*Giới thiệu ngắn\s*\n+([\s\S]*?)(\n##|$)/) || [])[1];
  const cn = Array.isArray(meta["cong-nghe"]) ? meta["cong-nghe"] : [];
  const link = meta["link-demo"] || "du-an.html";
  projects.push({
    id: dir, ten: meta["tieu-de"] || dir,
    mota: (gioiThieu || meta["mo-ta"] || "").trim().replace(/\s*\n\s*/g, " "),
    nhan: meta["trang-thai"] || "Dự án", bia: meta["tieu-de"] || dir,
    phu: cn.join(" · "), chips: [meta["trang-thai"] || "Dự án"].filter(Boolean),
    cta: "Xem dự án", link, ngoai: /^https?:/.test(link),
    c1: "#17301d", c2: "#4a9b60", noibat: meta["noi-bat"] === true,
  });
}

/* ---------- 3. ghi vào noi-dung.js ---------- */
let src = fs.readFileSync(JS, "utf8");
function block(name, text) {
  const re = new RegExp(`(/\\* AUTO:${name}:BEGIN[^\\n]*\\*/\\n)[\\s\\S]*?(\\n/\\* AUTO:${name}:END \\*/)`);
  if (!re.test(src)) throw new Error(`Thiếu khối AUTO:${name} trong noi-dung.js`);
  src = src.replace(re, (_, a, b) => a + text + b);
}
block("POSTS", "var POSTS=[\n" + postEntries.map((e) => "  " + js(e)).join(",\n") + "\n];");
block("PROJECTS", "var PROJECTS_TU_DONG=[\n" + projects.map((e) => "  " + js(e)).join(",\n") + "\n];");
fs.writeFileSync(JS, src);
log(`xong: ${posts.length} bài viết, ${projects.length} dự án tự động.`);
