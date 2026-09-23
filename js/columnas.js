document.addEventListener('DOMContentLoaded', function () {
  const list = document.querySelector('.frases-lista');
  let targetScroll = null;
  let scrollTimer;
  list.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () { targetScroll = null; }, 180);
  });
  list.addEventListener('pointerdown', function () { targetScroll = null; });
  list.addEventListener('wheel', function () { targetScroll = null; }, { passive: true });
  function moveQuote(direction) {
    const card = list.querySelector('.frase');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap);
    const max = Math.max(0, list.scrollWidth - list.clientWidth);
    const current = targetScroll === null ? list.scrollLeft : targetScroll;
    let next = Math.max(0, Math.min(max, current + direction * step));
    if (direction > 0 && current >= max - 2) next = 0;
    if (direction < 0 && current <= 2) next = max;
    targetScroll = next;
    list.scrollTo({ left: next, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  list.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveQuote(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  document.querySelector('.frase-anterior').addEventListener('click', function () { moveQuote(-1); });
  document.querySelector('.frase-siguiente').addEventListener('click', function () { moveQuote(1); });
  const all = document.querySelector('#leer-todas');
  const readings = Array.from(document.querySelectorAll('.lectura details'));
  // Abrir una lectura cierra las demás; el grupo HTML también funciona sin JS.
  readings.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      readings.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });
  all.removeAttribute('aria-expanded');
  all.textContent = 'LEER COLUMNAS ↗';
  all.addEventListener('click', function () {
    const first = readings[0];
    if (!first) return;
    first.open = true;
    first.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    first.querySelector('summary').focus({ preventScroll: true });
  });
});
