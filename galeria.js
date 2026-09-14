document.addEventListener('DOMContentLoaded', function () {
  const links = Array.from(document.querySelectorAll('.galeria-foto > a'));
  const dialog = document.querySelector('.foto-ampliada');
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let index = 0;
  let trigger;
  function show(next) {
    index = (next + links.length) % links.length;
    image.src = links[index].href;
    image.alt = links[index].querySelector('img').alt;
    caption.textContent = links[index].dataset.caption;
  }
  links.forEach(function (link, i) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); trigger = link; show(i);
      dialog.showModal(); document.body.classList.add('foto-abierta');
    });
  });
  dialog.querySelector('.foto-cerrar').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.foto-anterior').addEventListener('click', function () { show(index - 1); });
  dialog.querySelector('.foto-siguiente').addEventListener('click', function () { show(index + 1); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1)); }
  });
  dialog.addEventListener('click', function (event) {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', function () { document.body.classList.remove('foto-abierta'); if (trigger) trigger.focus({ preventScroll: true }); });
});
