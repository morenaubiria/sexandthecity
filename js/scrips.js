document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.querySelector('.detalle-personajes');
  const details = document.querySelectorAll('.detalle-personaje');
  let trigger = null;

  function closeDetail() {
    if (overlay.open) overlay.close();
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (link.classList.contains('personaje-link')) {
        trigger = link;
        details.forEach(function (detail) { detail.hidden = detail !== target; });
        overlay.setAttribute('aria-labelledby', 'titulo-' + target.id);
        overlay.showModal();
        overlay.scrollTop = 0;
        document.body.classList.add('detalle-abierto');
        target.querySelector('.cerrar-detalle').focus();
      } else {
        target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    });
  });

  overlay.querySelectorAll('.cerrar-detalle, .volver-detalle').forEach(function (button) {
    button.addEventListener('click', closeDetail);
  });
  overlay.addEventListener('click', function (event) {
    const rect = overlay.getBoundingClientRect();
    if (event.target === overlay &&
        (event.clientX < rect.left || event.clientX > rect.right ||
         event.clientY < rect.top || event.clientY > rect.bottom)) closeDetail();
  });
  overlay.addEventListener('close', function () {
    document.body.classList.remove('detalle-abierto');
    if (trigger) trigger.focus({ preventScroll: true });
  });
});
