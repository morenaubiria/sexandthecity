document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const footer = document.querySelector('.site-footer');
  if (footer) {
    const quickLinks = [
      { href: 'index.html', label: 'INICIO', current: currentPage === 'index.html' },
      { href: 'personajes.html', label: 'PERSONAJES', current: currentPage === 'personajes.html' },
      { href: 'columnas.html', label: 'CARRIE’S COLUMNS', current: currentPage === 'columnas.html' },
      { href: 'closet.html', label: 'CARRIE’S CLOSET', current: currentPage === 'closet.html' },
      { href: 'galeria.html', label: 'GALERÍA', current: currentPage === 'galeria.html' },
      { href: 'episodios.html', label: 'EPISODIOS', current: currentPage === 'episodios.html' }
    ];
    footer.innerHTML = quickLinks.map(function (item) {
      return '<a href="' + item.href + '"' + (item.current ? ' aria-current="page"' : '') + '>' + item.label + '</a>';
    }).join('');
  }

  document.querySelectorAll('.site-header nav a, .site-footer a, .menu-enlaces a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === currentPage || href.endsWith('/' + currentPage)) {
      link.setAttribute('aria-current', 'page');
    }


  });

  const menu = document.querySelector('.site-header .menu');
  const dialog = document.querySelector('#menu-overlay');

  if (menu && dialog) {
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
  }

});
