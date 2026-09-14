document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.site-header .menu');
  const dialog = document.querySelector('#menu-overlay');
  menu.addEventListener('click', function () {
    dialog.showModal();
    menu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-abierto');
  });
  dialog.querySelector('.menu-cerrar').addEventListener('click', function () { dialog.close(); });
  dialog.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { dialog.close(); });
  });
  dialog.addEventListener('click', function (event) {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', function () {
    menu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-abierto');
    menu.focus({ preventScroll: true });
  });
});
