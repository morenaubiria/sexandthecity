document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.ep-buscador');
  if (searchForm) {
    const input = document.querySelector('#buscar-episodio');
    const status = document.querySelector('#ep-busqueda-estado');
    const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const episodes = Array.from(document.querySelectorAll('.ep-tarjeta')).map(card => {
      const code = card.querySelector('.ep-etiqueta').textContent.match(/T(\d+)\s*·\s*E(\d+)/);
      const aliases = code ? ` temporada ${Number(code[1])} capitulo ${Number(code[2])} episodio ${Number(code[2])}` : '';
      return { card, text: normalize(card.textContent + aliases) };
    });
    function filterEpisodes() {
      const words = normalize(input.value).split(' ').filter(Boolean);
      let count = 0;
      episodes.forEach(({ card, text }) => {
        card.hidden = !words.every(word => text.includes(word));
        if (!card.hidden) count++;
        else card.querySelector('details').open = false;
      });
      status.textContent = count === 0
        ? 'No encontramos capítulos en esta selección. Probá con otra palabra o limpiá la búsqueda.'
        : (words.length ? `${count} ${count === 1 ? 'capítulo encontrado' : 'capítulos encontrados'}` : '');
    }
    searchForm.hidden = false;
    input.addEventListener('input', filterEpisodes);
    searchForm.addEventListener('submit', event => { event.preventDefault(); filterEpisodes(); });
    searchForm.addEventListener('reset', event => {
      event.preventDefault();
      input.value = '';
      filterEpisodes();
      input.focus();
    });
    filterEpisodes();
  }

  const summaries = document.querySelectorAll('.ep-tarjeta details');
  summaries.forEach(function (summary) {
    summary.addEventListener('toggle', function () {
      if (!summary.open) return;
      summaries.forEach(function (other) {
        if (other !== summary) other.open = false;
      });
    });
  });

  const panels = Array.from(document.querySelectorAll('.temporada-resumen'));
  const links = Array.from(document.querySelectorAll('.temporada-foto'));
  if (!panels.length) return;
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
