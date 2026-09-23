document.addEventListener('DOMContentLoaded', function () {
  const links = Array.from(document.querySelectorAll('.pieza-imagen'));
  const dialog = document.querySelector('.foto-ampliada-closet');

  if (!dialog || !links.length) return;

  const image = dialog.querySelector('img');
  const title = dialog.querySelector('figcaption');
  const description = dialog.querySelector('.foto-descripcion');
  let index = 0;
  let trigger = null;

  function getMeta(link) {
    const pieza = link.closest('.pieza');
    const heading = pieza ? pieza.querySelector('h3')?.textContent.trim() : 'Detalle del look';
    const text = pieza ? pieza.querySelector('details p')?.textContent.trim() : '';
    return { heading: heading || 'Detalle del look', text: text || 'Sin descripción disponible.' };
  }

  function show(nextIndex) {
    index = (nextIndex + links.length) % links.length;
    const link = links[index];
    const meta = getMeta(link);

    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || meta.heading;
    title.textContent = meta.heading;
    description.textContent = meta.text;
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      trigger = link;
      show(i);
      dialog.showModal();
      document.body.classList.add('foto-abierta');
    });
  });

  dialog.querySelector('.foto-cerrar').addEventListener('click', function () {
    dialog.close();
  });

  dialog.querySelector('.foto-anterior').addEventListener('click', function () {
    show(index - 1);
  });

  dialog.querySelector('.foto-siguiente').addEventListener('click', function () {
    show(index + 1);
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  dialog.addEventListener('click', function (event) {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog &&
      (event.clientX < rect.left || event.clientX > rect.right ||
       event.clientY < rect.top || event.clientY > rect.bottom)) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {
    document.body.classList.remove('foto-abierta');
    if (trigger) trigger.focus({ preventScroll: true });
  });
});
