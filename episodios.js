document.addEventListener('DOMContentLoaded', function () {
  const panels = Array.from(document.querySelectorAll('.temporada-resumen'));
  const links = Array.from(document.querySelectorAll('.temporada-foto'));
  function selectSeason() {
    const selected = panels.find(function (panel) { return '#' + panel.id === location.hash; });
    if (!selected && panels.some(function (panel) { return panel.hidden; })) return;
    const current = selected || panels[0];
    panels.forEach(function (panel) { panel.hidden = panel !== current; });
    links.forEach(function (link) {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (selected) requestAnimationFrame(function () {
      selected.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    });
  }
  window.addEventListener('hashchange', selectSeason);
  selectSeason();
});
