document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contacto-form');
  const message = document.querySelector('#mensaje');
  const download = document.querySelector('#descargar-nota');
  const status = document.querySelector('#contacto-estado');
  let url;
  form.addEventListener('input', () => {
    document.querySelector('#contador').textContent = `${message.value.length} / 2000 caracteres`;
    download.hidden = true;
    status.textContent = '';
    if (url) { URL.revokeObjectURL(url); url = null; }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    if (['nombre','asunto','mensaje'].some(key => !values.get(key).trim())) {
      status.textContent = 'Completá el nombre, el asunto y el mensaje con algo más que espacios.';
      return;
    }
    const text = `Nombre: ${values.get('nombre')}\nMail: ${values.get('email')}\nAsunto: ${values.get('asunto')}\n\n${values.get('mensaje')}`;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    download.href = url;
    download.hidden = false;
    status.textContent = 'Tu nota está preparada para descargar. Todavía no se envió.';
  });
  document.querySelector('#consultar-novedades').addEventListener('click', () => {
    const subject = document.querySelector('#asunto');
    subject.value = 'Quiero conocer las novedades';
    subject.dispatchEvent(new Event('input', {bubbles:true}));
    document.querySelector('#escribinos').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.querySelector('#nombre').focus({preventScroll:true});
  });
});
