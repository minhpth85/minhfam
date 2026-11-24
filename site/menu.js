/* Menu thu gọn trên điện thoại: nút ≡ bên phải, bấm để sổ danh sách trang.
   Lấy các link từ thanh menu chính (.nav) nên không phải sửa từng trang. */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var nav = header.querySelector('.nav');
  var tools = header.querySelector('.tools');
  if (!nav || !tools) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'menu-btn';
  btn.className = 'icon-btn menu-btn';
  btn.setAttribute('aria-label', 'Mở mục lục');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'm-panel');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  tools.insertBefore(btn, tools.firstChild);

  var panel = document.createElement('nav');
  panel.id = 'm-panel';
  panel.className = 'm-panel';
  panel.setAttribute('aria-label', 'Mục lục');
  panel.hidden = true;
  panel.innerHTML = nav.innerHTML;
  header.appendChild(panel);

  function set(open) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Đóng mục lục' : 'Mở mục lục');
  }
  btn.addEventListener('click', function () { set(panel.hidden); });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !header.contains(e.target)) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); }
  });
})();
